# Outputs del módulo DynamoDB
# Estos outputs exponen los recursos creados por el módulo para ser utilizados por otros módulos
# o para referencia en la configuración de otros servicios.

output "table_arn" {
  description = "ARN de la tabla DynamoDB creada"
  value       = aws_dynamodb_table.orders_table.arn
}

output "table_name" {
  description = "Nombre de la tabla DynamoDB creada"
  value       = aws_dynamodb_table.orders_table.name
}

output "table_id" {
  description = "ID de la tabla DynamoDB creada"
  value       = aws_dynamodb_table.orders_table.id
}

output "stream_arn" {
  description = "ARN del stream de la tabla DynamoDB (si está habilitado)"
  value       = var.enable_stream ? aws_dynamodb_table.orders_table.stream_arn : null
}

output "stream_label" {
  description = "Etiqueta del stream de la tabla DynamoDB (si está habilitado)"
  value       = var.enable_stream ? aws_dynamodb_table.orders_table.stream_label : null
}