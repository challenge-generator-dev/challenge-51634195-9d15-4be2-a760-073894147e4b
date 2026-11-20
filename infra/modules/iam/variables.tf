# Variables para el módulo IAM
# Este módulo crea políticas y roles IAM necesarios para que la aplicación
# pueda interactuar con DynamoDB y otros servicios de AWS.

variable "role_name" {
  description = "Nombre del rol IAM para la aplicación"
  type        = string
  default     = "orders-app-role"
}

variable "policy_name" {
  description = "Nombre de la política IAM para acceso a DynamoDB"
  type        = string
  default     = "orders-dynamodb-access-policy"
}

variable "dynamodb_table_arn" {
  description = "ARN de la tabla DynamoDB a la que se otorgará acceso"
  type        = string
}

variable "tags" {
  description = "Tags para los recursos IAM"
  type        = map(string)
  default = {
    Environment = "dev"
    Project     = "orders-management"
  }
}

variable "additional_policies" {
  description = "Lista de ARNs de políticas adicionales para adjuntar al rol"
  type        = list(string)
  default     = []
}

variable "trusted_entities" {
  description = "Entidades confiables para asumir el rol (ej: servicios AWS)"
  type        = list(string)
  default = [
    "lambda.amazonaws.com",
    "ecs-tasks.amazonaws.com"
  ]
}

variable "dynamodb_actions" {
  description = "Lista de acciones permitidas sobre DynamoDB"
  type        = list(string)
  default = [
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