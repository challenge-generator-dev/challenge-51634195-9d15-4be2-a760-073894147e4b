# Variables del entorno de desarrollo: DynamoDB e IAM.
# Los valores por defecto son consumidos por los módulos de modules/.

variable "aws_region" {
  description = "Región de AWS donde se crearán los recursos"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Nombre del entorno (dev, staging, prod)"
  type        = string
  default     = "dev"
}

variable "project_name" {
  description = "Nombre del proyecto para identificar recursos"
  type        = string
  default     = "orders-management"
}

# Nombre de la tabla DynamoDB que consume el módulo dynamodb
variable "table_name" {
  description = "Nombre de la tabla DynamoDB del entorno"
  type        = string
  default     = "orders-dev-table"
}

variable "dynamodb_config" {
  description = "Configuración de la tabla DynamoDB para el entorno"
  type = object({
    table_name       = string
    billing_mode     = string
    read_capacity    = number
    write_capacity   = number
    hash_key         = string
    range_key        = optional(string)
    enable_stream    = bool
    stream_view_type = optional(string)
  })
  default = {
    table_name       = "orders-dev-table"
    billing_mode     = "PAY_PER_REQUEST"
    read_capacity    = 5
    write_capacity   = 5
    hash_key         = "orderId"
    range_key        = null
    enable_stream    = true
    stream_view_type = "NEW_AND_OLD_IMAGES"
  }
}

variable "iam_config" {
  description = "Configuración de roles y políticas IAM"
  type = object({
    role_name        = string
    policy_name      = string
    trusted_entities = list(string)
    dynamodb_actions = list(string)
  })
  default = {
    role_name        = "orders-app-dev-role"
    policy_name      = "orders-dynamodb-dev-access-policy"
    trusted_entities = ["lambda.amazonaws.com", "ecs-tasks.amazonaws.com"]
    dynamodb_actions = [
      "dynamodb:PutItem",
      "dynamodb:GetItem",
      "dynamodb:UpdateItem",
      "dynamodb:DeleteItem",
      "dynamodb:Query",
      "dynamodb:Scan",
      "dynamodb:BatchWriteItem",
      "dynamodb:BatchGetItem"
    ]
  }
}

variable "dynamodb_attributes" {
  description = "Lista de atributos para la tabla DynamoDB"
  type = list(object({
    name = string
    type = string
  }))
  default = [
    { name = "orderId", type = "S" },
    { name = "userId", type = "S" },
    { name = "status", type = "S" },
    { name = "createdAt", type = "S" }
  ]
}

variable "dynamodb_gsi" {
  description = "Índices secundarios globales para la tabla DynamoDB"
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

variable "common_tags" {
  description = "Tags comunes para todos los recursos del entorno"
  type        = map(string)
  default = {
    Environment = "dev"
    Project     = "orders-management"
    ManagedBy   = "terraform"
  }
}

variable "additional_policy_arns" {
  description = "ARNs de políticas IAM adicionales para adjuntar al rol"
  type        = list(string)
  default     = []
}

variable "enable_dynamodb" {
  description = "Habilitar la creación de la tabla DynamoDB"
  type        = bool
  default     = true
}

variable "enable_iam" {
  description = "Habilitar la creación de recursos IAM"
  type        = bool
  default     = true
}

variable "use_remote_backend" {
  description = "Usar backend remoto para el estado de Terraform"
  type        = bool
  default     = false
}

variable "backend_config" {
  description = "Configuración del backend remoto"
  type = object({
    bucket         = string
    dynamodb_table = string
    key            = string
    region         = string
  })
  default = null
}