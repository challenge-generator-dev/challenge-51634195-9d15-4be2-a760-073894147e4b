# Valores para el entorno de desarrollo
# Estas variables personalizan los recursos de infraestructura para el entorno de desarrollo

# Configuración de DynamoDB para el entorno de desarrollo
table_name        = "orders-dev-table"
billing_mode      = "PAY_PER_REQUEST"
read_capacity     = 5
write_capacity    = 5
hash_key          = "orderId"
range_key         = null

# Atributos de la tabla DynamoDB
attributes = [
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

# Índices secundarios globales
global_secondary_indexes = [
  {
    name            = "userId-index"
    hash_key        = "userId"
    range_key       = "createdAt"
    projection_type = "ALL"
    read_capacity   = 5
    write_capacity  = 5
  }
]

# Habilitar stream para captura de cambios
enable_stream     = true
stream_view_type  = "NEW_AND_OLD_IMAGES"

# Configuración de IAM
role_name         = "orders-app-dev-role"
policy_name       = "orders-dynamodb-dev-access-policy"

# Entidades confiables para el rol
trusted_entities = [
  "lambda.amazonaws.com",
  "ecs-tasks.amazonaws.com",
  "apigateway.amazonaws.com"
]

# Acciones permitidas sobre DynamoDB
dynamodb_actions = [
  "dynamodb:PutItem",
  "dynamodb:GetItem",
  "dynamodb:UpdateItem",
  "dynamodb:DeleteItem",
  "dynamodb:Query",
  "dynamodb:Scan",
  "dynamodb:BatchWriteItem",
  "dynamodb:BatchGetItem",
  "dynamodb:DescribeTable",
  "dynamodb:ListTables"
]

# Tags comunes para todos los recursos
tags = {
  Environment = "dev"
  Project     = "orders-management"
  ManagedBy   = "terraform"
  Owner       = "dev-team"
  CostCenter  = "engineering"
}

# Políticas adicionales (ARNs de políticas gestionadas por AWS)
additional_policies = []

# Configuración de región
aws_region = "us-east-1"

# Nombre del bucket S3 para state remoto (opcional)
# Descomenta si usas backend remoto
# bucket_name         = "terraform-state-dev-bucket"
# dynamodb_table_name = "terraform-locks"