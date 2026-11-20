# Variables para el módulo DynamoDB
# Este módulo crea una tabla DynamoDB para persistir órdenes con los atributos necesarios
# para soportar las operaciones CRUD desde la interfaz de usuario.

variable "table_name" {
  description = "Nombre de la tabla DynamoDB para órdenes"
  type        = string
  default     = "orders-table"
}

variable "billing_mode" {
  description = "Modo de facturación para la tabla DynamoDB (PROVISIONED o PAY_PER_REQUEST)"
  type        = string
  default     = "PAY_PER_REQUEST"
}

variable "read_capacity" {
  description = "Capacidad de lectura provisionada (solo aplica si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
}

variable "write_capacity" {
  description = "Capacidad de escritura provisionada (solo aplica si billing_mode es PROVISIONED)"
  type        = number
  default     = 5
}

variable "hash_key" {
  description = "Clave hash (partition key) para la tabla DynamoDB"
  type        = string
  default     = "orderId"
}

variable "range_key" {
  description = "Clave de rango (sort key) para la tabla DynamoDB (opcional)"
  type        = string
  default     = null
}

variable "attributes" {
  description = "Lista de atributos para la tabla DynamoDB"
  type = list(object({
    name = string
    type = string
  }))
  default = [
    {
      name = "orderId"
      type = "S"
    },
    {
      name = "userId"
      type = "S"
    },
    {
      name = "status"
      type = "S"
    },
    {
      name = "createdAt"
      type = "S"
    }
  ]
}

variable "global_secondary_indexes" {
  description = "Lista de índices secundarios globales para la tabla DynamoDB"
  type = list(object({
    name            = string
    hash_key        = string
    range_key       = string
    projection_type = string
    read_capacity   = number
    write_capacity  = number
  }))
  default = [
    {
      name            = "userId-index"
      hash_key        = "userId"
      range_key       = "createdAt"
      projection_type = "ALL"
      read_capacity   = 5
      write_capacity  = 5
    }
  ]
}

variable "tags" {
  description = "Tags para la tabla DynamoDB"
  type        = map(string)
  default = {
    Environment = "dev"
    Project     = "orders-management"
  }
}

variable "enable_stream" {
  description = "Habilitar stream para la tabla DynamoDB"
  type        = bool
  default     = false
}

variable "stream_view_type" {
  description = "Tipo de vista del stream (KEYS_ONLY, NEW_IMAGE, OLD_IMAGE, NEW_AND_OLD_IMAGES)"
  type        = string
  default     = null
}

variable "replica_regions" {
  description = "Regiones donde se replica la tabla (global tables). Lista de nombres de región AWS"
  type        = list(string)
  default     = []
}

variable "enable_point_in_time_recovery" {
  description = "Habilitar Point-In-Time Recovery (PITR) para la tabla"
  type        = bool
  default     = true
}

variable "ttl_attribute" {
  description = "Nombre del atributo que contiene el timestamp de expiración (TTL)"
  type        = string
  default     = "expiresAt"
}

variable "enable_ttl" {
  description = "Habilitar Time To Live (TTL) sobre el atributo indicado en ttl_attribute"
  type        = bool
  default     = false
}

variable "enable_encryption" {
  description = "Habilitar cifrado en reposo con una clave KMS gestionada por el cliente"
  type        = bool
  default     = true
}

variable "kms_key_arn" {
  description = "ARN de la clave KMS usada para cifrar la tabla (si es null se usa la clave administrada por AWS)"
  type        = string
  default     = null
}

variable "timeouts_create" {
  description = "Tiempo máximo de espera para la creación de la tabla (ej. 10m)"
  type        = string
  default     = "10m"
}

variable "timeouts_update" {
  description = "Tiempo máximo de espera para la actualización de la tabla (ej. 60m)"
  type        = string
  default     = "60m"
}

variable "timeouts_delete" {
  description = "Tiempo máximo de espera para la eliminación de la tabla (ej. 10m)"
  type        = string
  default     = "10m"
}

variable "initial_items" {
  description = "Items iniciales a cargar en la tabla. Cada elemento es un mapa atributo => valor en formato JSON"
  type        = list(map(string))
  default     = []
}

variable "initial_items_attribute_types" {
  description = "Mapa de atributo a tipo DynamoDB (S, N, B) usado para construir los items iniciales"
  type        = map(string)
  default     = {}
}

variable "resource_policy" {
  description = "Política de recursos (JSON) a adjuntar a la tabla DynamoDB. Null para no crear política"
  type        = string
  default     = null
}

variable "enable_autoscaling" {
  description = "Habilitar Application Auto Scaling sobre la capacidad provisionada (solo PROVISIONED)"
  type        = bool
  default     = false
}

variable "autoscaling_read_max_capacity" {
  description = "Capacidad máxima de lectura para Auto Scaling"
  type        = number
  default     = 100
}

variable "autoscaling_read_min_capacity" {
  description = "Capacidad mínima de lectura para Auto Scaling"
  type        = number
  default     = 5
}

variable "autoscaling_write_max_capacity" {
  description = "Capacidad máxima de escritura para Auto Scaling"
  type        = number
  default     = 100
}

variable "autoscaling_write_min_capacity" {
  description = "Capacidad mínima de escritura para Auto Scaling"
  type        = number
  default     = 5
}

variable "autoscaling_read_target_value" {
  description = "Porcentaje objetivo de utilización de lectura para disparar el escalado"
  type        = number
  default     = 70
}

variable "autoscaling_write_target_value" {
  description = "Porcentaje objetivo de utilización de escritura para disparar el escalado"
  type        = number
  default     = 70
}

variable "autoscaling_scale_in_cooldown" {
  description = "Tiempo de espera (segundos) tras una reducción de capacidad antes de permitir otra acción de escalado"
  type        = number
  default     = 60
}

variable "autoscaling_scale_out_cooldown" {
  description = "Tiempo de espera (segundos) tras un aumento de capacidad antes de permitir otra acción de escalado"
  type        = number
  default     = 60
}

variable "enable_contributor_insights" {
  description = "Habilitar CloudWatch Contributor Insights sobre la tabla DynamoDB para analizar patrones de acceso"
  type        = bool
  default     = false
}

variable "ssm_parameter_store_enabled" {
  description = "Publicar el nombre de la tabla en AWS Systems Manager Parameter Store"
  type        = bool
  default     = true
}

variable "ssm_parameter_name" {
  description = "Nombre del parámetro en SSM Parameter Store donde se publica el nombre de la tabla"
  type        = string
  default     = "/orders-management/dev/dynamodb/table-name"
}

variable "ssm_parameter_tier" {
  description = "Tier del parámetro SSM (Standard o Advanced)"
  type        = string
  default     = "Standard"
}