# Módulo IAM para la aplicación de gestión de órdenes
# Este módulo crea los recursos IAM necesarios para que la aplicación pueda
# interactuar con DynamoDB y otros servicios de AWS de forma segura.

# ============================================
# Política IAM para acceso a DynamoDB
# ============================================

resource "aws_iam_policy" "dynamodb_access" {
  name        = var.policy_name
  description = "Política IAM para acceso a la tabla DynamoDB de órdenes"

  # Policy que permite las operaciones configuradas sobre la tabla
  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = var.dynamodb_actions
        Resource = [
          var.dynamodb_table_arn,
          "${var.dynamodb_table_arn}/index/*"
        ]
      },
      {
        Effect = "Allow"
        Action = [
          "dynamodb:DescribeTable",
          "dynamodb:ListTagsOfResource"
        ]
        Resource = var.dynamodb_table_arn
      }
    ]
  })

  tags = var.tags
}

# ============================================
# Rol IAM para la aplicación
# ============================================

resource "aws_iam_role" "app_role" {
  name = var.role_name

  # Configuración de confianza del rol
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = var.trusted_entities
        }
        Action = "sts:AssumeRole"
        Condition = {
          Bool = {
            "aws:SecureTransport" = "true"
          }
        }
      }
    ]
  })

  # Descripción del propósito del rol
  description = "Rol IAM para la aplicación de gestión de órdenes"

  # Tags aplicados al rol
  tags = var.tags

  # Protección contra eliminación accidental
  lifecycle {
    create_before_destroy = true
  }
}

# ============================================
# Adjuntar política de DynamoDB al rol
# ============================================

resource "aws_iam_role_policy_attachment" "dynamodb_policy_attachment" {
  role       = aws_iam_role.app_role.name
  policy_arn = aws_iam_policy.dynamodb_access.arn
}

# ============================================
# Adjuntar políticas adicionales si se especifican
# ============================================

resource "aws_iam_role_policy_attachment" "additional_policies" {
  count = length(var.additional_policies)

  role       = aws_iam_role.app_role.name
  policy_arn = var.additional_policies[count.index]
}

# ============================================
# Instance Profile para EC2 (opcional)
# ============================================

resource "aws_iam_instance_profile" "app_instance_profile" {
  name = var.role_name
  role = aws_iam_role.app_role.name

  tags = var.tags

  lifecycle {
    create_before_destroy = true
  }
}

# ============================================
# Policy para CloudWatch Logs (opcional)
# ============================================

resource "aws_iam_policy" "cloudwatch_logs" {
  name        = "${var.policy_name}-logs"
  description = "Política IAM para acceso a CloudWatch Logs"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ]
        Resource = "arn:aws:logs:*:*:*"
      }
    ]
  })

  tags = var.tags
}

resource "aws_iam_role_policy_attachment" "cloudwatch_logs_attachment" {
  role       = aws_iam_role.app_role.name
  policy_arn = aws_iam_policy.cloudwatch_logs.arn
}

# ============================================
# Policy para X-Ray (opcional)
# ============================================

resource "aws_iam_policy" "xray" {
  name        = "${var.policy_name}-xray"
  description = "Política IAM para acceso a X-Ray"

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "xray:PutTraceSegments",
          "xray:PutTelemetryRecords",
          "xray:GetSamplingRules",
          "xray:GetSamplingTargets"
        ]
        Resource = "*"
      }
    ]
  })

  tags = var.tags
}

resource "aws_iam_role_policy_attachment" "xray_attachment" {
  role       = aws_iam_role.app_role.name
  policy_arn = aws_iam_policy.xray.arn
}