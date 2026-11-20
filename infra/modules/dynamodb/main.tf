# Módulo DynamoDB: tabla configurable con índices, streams, autoscaling y parámetro SSM.

resource "aws_dynamodb_table" "orders_table" {
  name             = var.table_name
  billing_mode     = var.billing_mode
  hash_key         = var.hash_key
  range_key        = var.range_key
  stream_enabled   = var.enable_stream
  stream_view_type = var.enable_stream ? var.stream_view_type : null

  dynamic "attribute" {
    for_each = var.attributes
    content {
      name = attribute.value.name
      type = attribute.value.type
    }
  }

  dynamic "global_secondary_index" {
    for_each = var.global_secondary_indexes
    content {
      name            = global_secondary_index.value.name
      hash_key        = global_secondary_index.value.hash_key
      range_key       = global_secondary_index.value.range_key
      projection_type = global_secondary_index.value.projection_type
      read_capacity   = global_secondary_index.value.read_capacity
      write_capacity  = global_secondary_index.value.write_capacity
    }
  }

  dynamic "replica" {
    for_each = var.replica_regions
    content {
      region_name = replica.value
    }
  }

  tags = var.tags

  point_in_time_recovery {
    enabled = var.enable_point_in_time_recovery
  }

  ttl {
    attribute_name = var.ttl_attribute
    enabled        = var.enable_ttl
  }

  server_side_encryption {
    enabled     = var.enable_encryption
    kms_key_arn = var.kms_key_arn
  }

  timeouts {
    create = var.timeouts_create
    update = var.timeouts_update
    delete = var.timeouts_delete
  }
}

# Cada elemento de initial_items se serializa al formato JSON que espera DynamoDB:
# { "atributo": { "TIPO": valor } }. El tipo por atributo sale de initial_items_attribute_types.
resource "aws_dynamodb_table_item" "orders_table_item" {
  count = length(var.initial_items)

  table_name = aws_dynamodb_table.orders_table.name
  hash_key   = var.hash_key

  item = jsonencode({
    for attr_name, attr_value in var.initial_items[count.index] :
    attr_name => {
      (lookup(var.initial_items_attribute_types, attr_name, "S")) = attr_value
    }
  })

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_dynamodb_resource_policy" "orders_table_policy" {
  count = var.resource_policy != null ? 1 : 0

  resource_arn = aws_dynamodb_table.orders_table.arn
  policy       = var.resource_policy
}

resource "aws_appautoscaling_target" "dynamodb_table_read_target" {
  count = var.enable_autoscaling && var.billing_mode == "PROVISIONED" ? 1 : 0

  max_capacity       = var.autoscaling_read_max_capacity
  min_capacity       = var.autoscaling_read_min_capacity
  resource_id        = "table/${var.table_name}"
  scalable_dimension = "dynamodb:table:ReadCapacityUnits"
  service_namespace  = "dynamodb"
}

resource "aws_appautoscaling_target" "dynamodb_table_write_target" {
  count = var.enable_autoscaling && var.billing_mode == "PROVISIONED" ? 1 : 0

  max_capacity       = var.autoscaling_write_max_capacity
  min_capacity       = var.autoscaling_write_min_capacity
  resource_id        = "table/${var.table_name}"
  scalable_dimension = "dynamodb:table:WriteCapacityUnits"
  service_namespace  = "dynamodb"
}

resource "aws_appautoscaling_policy" "dynamodb_table_read_policy" {
  count = var.enable_autoscaling && var.billing_mode == "PROVISIONED" ? 1 : 0

  name               = "${var.table_name}-read-autoscaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = "table/${var.table_name}"
  scalable_dimension = "dynamodb:table:ReadCapacityUnits"
  service_namespace  = "dynamodb"

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "DynamoDBReadCapacityUtilization"
    }

    target_value       = var.autoscaling_read_target_value
    scale_in_cooldown  = var.autoscaling_scale_in_cooldown
    scale_out_cooldown = var.autoscaling_scale_out_cooldown
  }
}

resource "aws_appautoscaling_policy" "dynamodb_table_write_policy" {
  count = var.enable_autoscaling && var.billing_mode == "PROVISIONED" ? 1 : 0

  name               = "${var.table_name}-write-autoscaling"
  policy_type        = "TargetTrackingScaling"
  resource_id        = "table/${var.table_name}"
  scalable_dimension = "dynamodb:table:WriteCapacityUnits"
  service_namespace  = "dynamodb"

  target_tracking_scaling_policy_configuration {
    predefined_metric_specification {
      predefined_metric_type = "DynamoDBWriteCapacityUtilization"
    }

    target_value       = var.autoscaling_write_target_value
    scale_in_cooldown  = var.autoscaling_scale_in_cooldown
    scale_out_cooldown = var.autoscaling_scale_out_cooldown
  }
}

resource "aws_dynamodb_contributor_insights" "orders_table_insights" {
  count = var.enable_contributor_insights ? 1 : 0

  table_name = aws_dynamodb_table.orders_table.name
}

resource "aws_ssm_parameter" "dynamodb_table_name" {
  count = var.ssm_parameter_store_enabled ? 1 : 0

  name        = var.ssm_parameter_name
  description = "Nombre de la tabla DynamoDB ${var.table_name}"
  type        = "String"
  value       = aws_dynamodb_table.orders_table.name
  tier        = var.ssm_parameter_tier

  tags = var.tags

  lifecycle {
    create_before_destroy = true
  }
}