# Infraestructura del Entorno de Desarrollo

Este directorio contiene la configuración de infraestructura Terraform para el entorno de desarrollo del proyecto de gestión de órdenes.

## Estructura del Directorio

```
environments/
└── dev/
    ├── terraform.tfvars   # Valores de variables para desarrollo
    ├── variables.tf       # Definición de variables del entorno
    └── README.md          # Este archivo
```

## Recursos Creados

### Amazon DynamoDB

Se crea una tabla DynamoDB para persistir las órdenes con los siguientes atributos:

- **Partition Key (Hash Key)**: `orderId` - Identificador único de la orden
- **Sort Key (Range Key)**: No configurada en el entorno de desarrollo
- **Índices Secundarios Globales**:
  - `userId-index`: Permite consultas por `userId` ordenado por `createdAt`
- **Stream Habilitado**: Captura cambios en la tabla para procesamiento de eventos
- **Modo de Facturación**: `PAY_PER_REQUEST` (sob demanda)

### AWS IAM

Se crea un rol IAM con política adjunta para permitir las siguientes operaciones sobre DynamoDB:

- `PutItem` - Crear nuevas órdenes
- `GetItem` - Consultar una orden específica
- `UpdateItem` - Actualizar una orden existente
- `DeleteItem` - Eliminar una orden
- `Query` - Consultas por clave de partición
- `Scan` - Escaneo completo de la tabla
- `BatchWriteItem` - Operaciones por lotes
- `BatchGetItem` - Consulta por lotes

El rol puede ser asumido por:
- AWS Lambda
- ECS Tasks
- API Gateway

## Uso

### Prerrequisitos

1. AWS CLI configurado con credenciales válidas
2. Terraform >= 1.9.0 instalado
3. Acceso a la región `us-east-1`

### Inicialización

```bash
cd environments/dev
terraform init
```

### Plan de Ejecución

Para ver los cambios que se aplicarán:

```bash
terraform plan
```

### Aplicar Cambios

Para crear los recursos:

```bash
terraform apply
```

### Destruir Recursos

Para eliminar todos los recursos creados:

```bash
terraform destroy
```

## Variables Principales

| Variable | Descripción | Valor por Defecto |
|----------|-------------|-------------------|
| `table_name` | Nombre de la tabla DynamoDB | `orders-dev-table` |
| `billing_mode` | Modo de facturación | `PAY_PER_REQUEST` |
| `role_name` | Nombre del rol IAM | `orders-app-dev-role` |
| `aws_region` | Región de AWS | `us-east-1` |

## Integración con Módulos

Este entorno utiliza los siguientes módulos del proyecto:

- `modules/dynamodb` - Creación de la tabla DynamoDB
- `modules/iam` - Configuración de roles y políticas IAM

Los módulos se invocan desde el archivo de configuración principal del entorno.

## Notas de Desarrollo

- El modo `PAY_PER_REQUEST` es ideal para desarrollo ya que no tiene costo mínimo
- El stream de DynamoDB está habilitado para capturar cambios en tiempo real
- Los recursos están etiquetados para facilitar la identificación y facturación
- El rol IAM sigue el principio de mínimo privilegio necesario para las operaciones CRUD

## Validación Local

Para validar la configuración de Terraform:

```bash
terraform validate
terraform fmt -check
```

Para verificar el formato de las variables:

```bash
cd environments/dev
terraform validate
```