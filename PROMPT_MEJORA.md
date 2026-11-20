# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `api/src/application/services/order.service.ts` — La pieza p2 (Definición de puertos para operaciones CRUD, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- `api/src/application/services/order.service.impl.ts` — La pieza p3 (Implementación de lógica de negocio para órdenes, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).
- `api/src/infrastructure/repositories/dynamo-order.repository.ts` — La pieza p4 (Implementación de adaptador de salida para DynamoDB, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).
- `api/src/modules/dynamodb/orders-table.tf` — La pieza p6 (Declaración de tabla DynamoDB en Terraform, fase f3) vive aqui: este archivo es su unico dueno (blueprint v2).
- `api/src/modules/iam/dynamodb-orders-policy.tf` — La pieza p7 (Declaración de políticas de acceso en Terraform, fase f3) vive aqui: este archivo es su unico dueno (blueprint v2).
- `api/src/application/services/order-state-machine.ts` — La pieza p8 (Validación de transiciones de estado para órdenes, fase f4) vive aqui: este archivo es su unico dueno (blueprint v2).
- `client/src/features/orders/hooks/use-order-state.ts` — La pieza p1 (Gestión de estado local con hooks, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- `client/src/features/orders/components/OrderForm.tsx` — La pieza p5 (Implementación de formulario para crear órdenes, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).

## Mapa de componentes

El repo tiene una carpeta por componente. Cada uno se instala y verifica dentro de la suya.

| Componente | Carpeta | Rol | Capa | Track | Tecnologias |
|---|---|---|---|---|---|
| `api` | `api/` | practice | server | Node | DynamoDB |
| `client` | `client/` | chapter, support | client | React | React |
| `infra` | `infra/` | support | infra | Terraform (AWS) | Terraform |
| `infra-local` | (raiz) | support | infra | Compose local | DynamoDB |

## Orden de arranque

1. `docker compose up -d` (en la raiz) — levanta la infraestructura local.
2. `cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform -chdir=modules/iam init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate && terraform -chdir=modules/iam validate` — componente `infra` (support).
3. `cd api && npm install --no-audit --no-fund && npm run build` — componente `api` (practice).
4. `cd client && npm install --no-audit --no-fund && npm run build` — componente `client` (chapter, support).

### Contratos entre componentes

- `api` expone http (api: http://localhost:3000):
  - `POST /orders`
  - `GET /orders`
  - `GET /orders/:id`
  - `PUT /orders/:id`
  - `DELETE /orders/:id`

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Archivos que la arquitectura del reto declara y no estan

Creálos con implementacion real, en la capa que les corresponde:

- `api/src/acceptance/f1.test.ts`
- `api/src/acceptance/f2.test.ts`
- `api/src/acceptance/f4.test.ts`

## Como saber que terminaste

```bash
(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform -chdir=modules/iam init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate && terraform -chdir=modules/iam validate) && docker compose config -q
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología React, Advanced L2

### Brecha de conocimiento
CRUD de ordenes en DynamoDB desde la interfaz

### Misión / candidato
Gestionar ordenes

### Reto
- Tema: Persistir ordenes en DynamoDB desde la interfaz
- Seniority: advanced-l2
- Tipo: practical
- Título: Implementación de operaciones CRUD de ordenes en DynamoDB
- Tiempo estimado: 20 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Configuración del entorno y creación de la estructura básica — objetivo: Configurar el entorno de desarrollo y crear la estructura básica del proyecto. — entregable (NO resolver): Proyecto React configurado con Vite 5 y estructura básica creada.
- Fase 2: Implementación de la lógica de negocio y persistencia en DynamoDB — objetivo: Implementar la lógica de negocio para las operaciones CRUD de órdenes y persistirlas en DynamoDB. — entregable (NO resolver): Lógica de negocio implementada y conectada a DynamoDB para las operaciones CRUD de órdenes.
- Fase 3: Versionado de la infraestructura con Terraform — objetivo: Versionar la infraestructura del proyecto utilizando Terraform. — entregable (NO resolver): Infraestructura versionada con Terraform.
- Fase 4: Pruebas de aceptación y validación — objetivo: Realizar pruebas de aceptación para validar las operaciones CRUD de órdenes y el cambio de estado. — entregable (NO resolver): Pruebas de aceptación implementadas y ejecutadas con éxito.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: api/package.json ===
{
  "name": "reto-nest",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "test": "jest"
  },
  "dependencies": {
    "@aws-sdk/client-dynamodb": "3.1173.0",
    "@aws-sdk/lib-dynamodb": "3.1173.0",
    "@nestjs/common": "10.4.22",
    "@nestjs/core": "10.4.22",
    "@nestjs/platform-express": "10.4.22",
    "class-transformer": "0.5.1",
    "class-validator": "0.15.1",
    "express": "5.3.0",
    "reflect-metadata": "0.2.2",
    "rxjs": "7.8.2"
  },
  "devDependencies": {
    "@types/express": "4.17.25",
    "@types/node": "22.20.5",
    "typescript": "5.7.3",
    "jest": "29.7.0",
    "ts-jest": "29.2.5",
    "@types/jest": "29.5.14"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node"
  }
}

// === ARCHIVO: api/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "dist",
    "strict": true,
    "strictPropertyInitialization": false,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    "types": [
      "node",
      "jest"
    ]
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "_pendiente",
    "tests",
    "test",
    "src/**/*.spec.ts",
    "src/**/*.test.ts"
  ]
}

// === ARCHIVO: api/src/domain/models/order-item.model.ts ===
import { IsInt, IsNumber, IsString, Min } from 'class-validator';

export class OrderItem {
  @IsString()
  productId: string;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsNumber()
  @Min(0)
  price: number;

  constructor(productId: string, quantity: number, price: number) {
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
    this.validateInvariants();
  }

  private validateInvariants(): void {
    if (this.quantity <= 0) {
      throw new Error('Quantity must be greater than zero');
    }
    if (this.price < 0) {
      throw new Error('Price cannot be negative');
    }
  }

  get total(): number {
    return this.quantity * this.price;
  }

  updateQuantity(newQuantity: number): void {
    if (newQuantity <= 0) {
      throw new Error('Quantity must be greater than zero');
    }
    this.quantity = newQuantity;
  }

  updatePrice(newPrice: number): void {
    if (newPrice < 0) {
      throw new Error('Price cannot be negative');
    }
    this.price = newPrice;
  }
}

// === ARCHIVO: api/src/domain/models/order.model.ts ===
import { IsArray, IsDateString, IsEnum, IsString } from 'class-validator';
import { OrderItem } from './order-item.model';

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export class Order {
  @IsString()
  id: string;

  @IsString()
  customerId: string;

  @IsArray()
  items: OrderItem[];

  @IsEnum(OrderStatus)
  status: OrderStatus;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;

  constructor(
    id: string,
    customerId: string,
    items: OrderItem[],
    status: OrderStatus = OrderStatus.PENDING,
    createdAt: string = new Date().toISOString(),
    updatedAt: string = new Date().toISOString()
  ) {
    this.id = id;
    this.customerId = customerId;
    this.items = items;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.validateInvariants();
  }

  private validateInvariants(): void {
    if (!this.id || this.id.trim() === '') {
      throw new Error('Order ID cannot be empty');
    }
    if (!this.customerId || this.customerId.trim() === '') {
      throw new Error('Customer ID cannot be empty');
    }
    if (this.items.length === 0) {
      throw new Error('Order must have at least one item');
    }
  }

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.total, 0);
  }

  updateStatus(newStatus: OrderStatus): void {
    const validTransitions: Record<OrderStatus, OrderStatus[]> = {
      [OrderStatus.PENDING]: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
      [OrderStatus.PROCESSING]: [OrderStatus.COMPLETED, OrderStatus.CANCELLED],
      [OrderStatus.COMPLETED]: [],
      [OrderStatus.CANCELLED]: []
    };

    if (!validTransitions[this.status].includes(newStatus)) {
      throw new Error(`Invalid status transition from ${this.status} to ${newStatus}`);
    }
    this.status = newStatus;
    this.updatedAt = new Date().toISOString();
  }

  addItem(item: OrderItem): void {
    this.items.push(item);
    this.updatedAt = new Date().toISOString();
  }

  removeItem(productId: string): void {
    const index = this.items.findIndex(item => item.productId === productId);
    if (index === -1) {
      throw new Error(`Item with productId ${productId} not found`);
    }
    this.items.splice(index, 1);
    this.updatedAt = new Date().toISOString();
  }
}

// === ARCHIVO: api/src/domain/models/create-order-request.model.ts ===
import { IsArray, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderItem } from './order-item.model';
import { Order, OrderStatus } from './order.model';

// Solicitud de creación de orden: valida los datos de entrada antes de convertirlos en una Order del dominio.
export class CreateOrderRequest {
  @IsString()
  customerId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItem)
  items: OrderItem[];

  constructor(customerId: string, items: OrderItem[]) {
    this.customerId = customerId;
    this.items = items;
    this.validateInvariants();
  }

  private validateInvariants(): void {
    if (!this.customerId || this.customerId.trim() === '') {
      throw new Error('Customer ID cannot be empty');
    }
    if (!Array.isArray(this.items) || this.items.length === 0) {
      throw new Error('Order must have at least one item');
    }
    for (const item of this.items) {
      if (item.quantity <= 0) {
        throw new Error(`Quantity must be greater than zero for product ${item.productId}`);
      }
      if (item.price < 0) {
        throw new Error(`Price cannot be negative for product ${item.productId}`);
      }
    }
  }

  toOrder(id: string): Order {
    return new Order(
      id,
      this.customerId,
      this.items.map(item => new OrderItem(item.productId, item.quantity, item.price)),
      OrderStatus.PENDING
    );
  }
}

// === ARCHIVO: api/src/domain/models/update-order-request.model.ts ===
import { IsEnum } from 'class-validator';
import { OrderStatus } from './order.model';

export class UpdateOrderRequest {
  @IsEnum(OrderStatus)
  status: OrderStatus;

  constructor(status: OrderStatus) {
    this.status = status;
    this.validateInvariants();
  }

  private validateInvariants(): void {
    if (!Object.values(OrderStatus).includes(this.status)) {
      throw new Error('Invalid order status');
    }
  }
}

// === ARCHIVO: api/src/domain/ports/order-repository.port.ts ===
import { Order } from '../models/order.model';
import { CreateOrderRequest } from '../models/create-order-request.model';
import { UpdateOrderRequest } from '../models/update-order-request.model';

export interface OrderRepository {
  create(order: CreateOrderRequest): Promise<Order>;
  findAll(): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  update(id: string, updateRequest: UpdateOrderRequest): Promise<Order>;
  delete(id: string): Promise<void>;
}

// === ARCHIVO: api/src/infrastructure/aws/dynamodb-client.ts ===
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DynamoDBClientService {
  private readonly client: DynamoDBClient;
  private readonly docClient: DynamoDBDocumentClient;

  constructor() {
    this.client = new DynamoDBClient({
      region: process.env.AWS_REGION || 'us-east-1',
      endpoint: process.env.DYNAMODB_ENDPOINT || undefined,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'default',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'default'
      }
    });
    this.docClient = DynamoDBDocumentClient.from(this.client);
  }

  async putItem(tableName: string, item: any): Promise<void> {
    const command = new PutCommand({
      TableName: tableName,
      Item: item
    });
    await this.docClient.send(command);
  }

  async getItem(tableName: string, key: Record<string, any>): Promise<any> {
    const command = new GetCommand({
      TableName: tableName,
      Key: key
    });
    const response = await this.docClient.send(command);
    return response.Item;
  }

  async updateItem(tableName: string, key: Record<string, any>, updateExpression: string, expressionAttributeValues: Record<string, any>): Promise<any> {
    const command = new UpdateCommand({
      TableName: tableName,
      Key: key,
      UpdateExpression: updateExpression,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: 'ALL_NEW'
    });
    const response = await this.docClient.send(command);
    return response.Attributes;
  }

  async deleteItem(tableName: string, key: Record<string, any>): Promise<void> {
    const command = new DeleteCommand({
      TableName: tableName,
      Key: key
    });
    await this.docClient.send(command);
  }

  async scanItems(tableName: string): Promise<any[]> {
    const command = new ScanCommand({
      TableName: tableName
    });
    const response = await this.docClient.send(command);
    return response.Items || [];
  }
}

// === ARCHIVO: api/src/application/services/order.service.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable, Inject } from '@nestjs/common';
import { OrderRepository } from '../../domain/ports/order-repository.port';
import { Order } from '../../domain/models/order.model';
import { CreateOrderRequest } from '../../domain/models/create-order-request.model';
import { UpdateOrderRequest } from '../../domain/models/update-order-request.model';

@Injectable()
export class OrderService {
  constructor(@Inject('OrderRepository') private readonly orderRepository: OrderRepository) {}

  async create(order: CreateOrderRequest): Promise<Order> {
    throw new Error('TODO(reto): create');
  }

  async list(): Promise<Order[]> {
    throw new Error('TODO(reto): list');
  }

  async get(id: string): Promise<Order> {
    throw new Error('TODO(reto): get');
  }

  async update(id: string, order: UpdateOrderRequest): Promise<Order> {
    throw new Error('TODO(reto): update');
  }

  async delete(id: string): Promise<void> {
    throw new Error('TODO(reto): delete');
  }
}

// === ARCHIVO: api/src/application/services/order.service.impl.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from '../../domain/models/order.model';
import { CreateOrderRequest } from '../../domain/models/create-order-request.model';
import { UpdateOrderRequest } from '../../domain/models/update-order-request.model';
import { OrderRepository } from '../../domain/ports/order-repository.port';
import { OrderItem } from '../../domain/models/order-item.model';

@Injectable()
export class OrderServiceImpl extends OrderService {
  constructor(private readonly repository: OrderRepository) {
    super(repository);
  }

  async create(order: CreateOrderRequest): Promise<Order> {
    throw new Error('TODO(reto): create');
  }

  async list(): Promise<Order[]> {
    throw new Error('TODO(reto): list');
  }

  async get(id: string): Promise<Order> {
    throw new Error('TODO(reto): get');
  }

  async update(id: string, order: UpdateOrderRequest): Promise<Order> {
    throw new Error('TODO(reto): update');
  }

  async delete(id: string): Promise<void> {
    throw new Error('TODO(reto): delete');
  }

  private generateOrderId(): string {
    throw new Error('TODO(reto): generateOrderId');
  }
}

// === ARCHIVO: api/src/infrastructure/repositories/dynamo-order.repository.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable, Logger } from '@nestjs/common';
import { OrderRepository } from '../../domain/ports/order-repository.port';
import { Order, OrderStatus } from '../../domain/models/order.model';
import { CreateOrderRequest } from '../../domain/models/create-order-request.model';
import { UpdateOrderRequest } from '../../domain/models/update-order-request.model';
import { DynamoDBClientService } from '../aws/dynamodb-client';
import { OrderItem } from '../../domain/models/order-item.model';

@Injectable()
export class DynamoOrderRepository implements OrderRepository {
  private readonly logger = new Logger(DynamoOrderRepository.name);
  private readonly tableName = process.env.ORDERS_TABLE_NAME || 'orders';

  constructor(private readonly dynamoClient: DynamoDBClientService) {}

  async create(orderRequest: CreateOrderRequest): Promise<Order> {
    throw new Error('TODO(reto): create');
  }

  async findAll(): Promise<Order[]> {
    throw new Error('TODO(reto): findAll');
  }

  async findById(id: string): Promise<Order | null> {
    throw new Error('TODO(reto): findById');
  }

  async update(id: string, updateRequest: UpdateOrderRequest): Promise<Order> {
    throw new Error('TODO(reto): update');
  }

  async delete(id: string): Promise<void> {
    throw new Error('TODO(reto): delete');
  }

  private mapToOrder(item: any): Order {
    throw new Error('TODO(reto): mapToOrder');
  }
}

// === ARCHIVO: api/src/modules/dynamodb/orders-table.tf ===
# TODO(reto): implementa este bloque
# resource "aws_dynamodb_table" "orders" {
# }

// === ARCHIVO: api/src/modules/iam/dynamodb-orders-policy.tf ===
# TODO(reto): implementa este bloque
# resource "aws_iam_policy" "dynamodb_orders_access" {
# }

// === ARCHIVO: api/src/application/services/order-state-machine.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Order, OrderStatus } from '../../domain/models/order.model';

export class InvalidStateTransitionError extends Error {
  constructor(from: OrderStatus, to: OrderStatus) {
    super(`Invalid state transition from ${from} to ${to}`);
    this.name = 'InvalidStateTransitionError';
  }
}

export class InvalidStateError extends Error {
  constructor(state: string) {
    super(`Invalid order state: ${state}`);
    this.name = 'InvalidStateError';
  }
}

export class OrderStateMachine {
  private static readonly VALID_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
    [OrderStatus.PENDING]: [OrderStatus.PROCESSING, OrderStatus.CANCELLED],
    [OrderStatus.PROCESSING]: [OrderStatus.COMPLETED, OrderStatus.CANCELLED],
    [OrderStatus.COMPLETED]: [],
    [OrderStatus.CANCELLED]: []
  };

  static transition(order: Order, newStatus: OrderStatus): Order {
    throw new Error('TODO(reto): transition');
  }

  static canTransition(order: Order, newStatus: OrderStatus): boolean {
    throw new Error('TODO(reto): canTransition');
  }

  static getAllowedTransitions(order: Order): OrderStatus[] {
    throw new Error('TODO(reto): getAllowedTransitions');
  }

  private static isValidStatus(status: any): status is OrderStatus {
    throw new Error('TODO(reto): isValidStatus');
  }

  static isTerminalState(status: OrderStatus): boolean {
    throw new Error('TODO(reto): isTerminalState');
  }

  static isActiveState(status: OrderStatus): boolean {
    throw new Error('TODO(reto): isActiveState');
  }
}

// === ARCHIVO: api/src/acceptance/f3.test.ts ===
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

const execAsync = promisify(exec);

describe('Terraform Infrastructure - Phase f3', () => {
  const terraformDir = path.join(process.cwd(), 'src', 'modules');

  const mockProviderConfig = `
provider "aws" {
  region = "us-east-1"
  skip_credentials_validation = true
  skip_requesting_account_id  = true
  skip_metadata_api_check     = true
  access_key                  = "mock"
  secret_key                  = "mock"
}
`;

  beforeAll(async () => {
    if (!fs.existsSync(terraformDir)) {
      fs.mkdirSync(terraformDir, { recursive: true });
    }
  });

  describe('p6: should declare orders table with correct attributes', () => {
    it('declares Table with hash_key id and billing_mode PAY_PER_REQUEST', async () => {
      const dynamodbPath = path.join(terraformDir, 'dynamodb', 'orders-table.tf');
      
      expect(fs.existsSync(dynamodbPath)).toBe(true);
      
      const content = fs.readFileSync(dynamodbPath, 'utf-8');
      
      expect(content).toContain('resource "aws_dynamodb_table" "orders"');
      expect(content).toContain('name = "orders"');
      expect(content).toContain('billing_mode = "PAY_PER_REQUEST"');
      expect(content).toContain('hash_key = "id"');
      expect(content).toContain('attribute {');
      expect(content).toContain('name = "id"');
      expect(content).toContain('type = "S"');
    });
  });

  describe('p6: should fail if required attributes are missing', () => {
    it('fails with validation error when attributes missing', async () => {
      const invalidConfig = `
resource "aws_dynamodb_table" "orders" {
  name = "orders"
}
`;
      const testDir = path.join(terraformDir, 'test-invalid');
      fs.mkdirSync(testDir, { recursive: true });
      fs.writeFileSync(path.join(testDir, 'main.tf'), invalidConfig);
      fs.writeFileSync(path.join(testDir, 'provider.tf'), mockProviderConfig);

      try {
        await execAsync('cd ' + testDir + ' && terraform init -backend=false', { 
          cwd: testDir,
          env: { ...process.env, AWS_ACCESS_KEY_ID: 'mock', AWS_SECRET_ACCESS_KEY: 'mock' }
        });
      } catch (error) {
        // Expected to fail during init if provider not configured
      }
    });
  });

  describe('p6: should apply successfully with valid configuration', () => {
    it('creates Table in DynamoDB with valid config', async () => {
      const dynamodbPath = path.join(terraformDir, 'dynamodb', 'orders-table.tf');
      const content = fs.readFileSync(dynamodbPath, 'utf-8');
      
      const hasResource = content.includes('resource "aws_dynamodb_table" "orders"');
      const hasName = content.includes('name = "orders"');
      const hasBillingMode = content.includes('billing_mode');
      const hasHashKey = content.includes('hash_key');
      
      expect(hasResource).toBe(true);
      expect(hasName).toBe(true);
      expect(hasBillingMode).toBe(true);
      expect(hasHashKey).toBe(true);
    });
  });

  describe('p6: should fail if DynamoDB service is unavailable', () => {
    it('fails with service error when DynamoDB unavailable', async () => {
      const dynamodbPath = path.join(terraformDir, 'dynamodb', 'orders-table.tf');
      const content = fs.readFileSync(dynamodbPath, 'utf-8');
      
      expect(content).toContain('aws_dynamodb_table');
      expect(content).toContain('name = "orders"');
    });
  });

  describe('p7: should declare policy with correct permissions', () => {
    it('allows PutItem, GetItem, UpdateItem, DeleteItem, and Scan on orders table', async () => {
      const iamPath = path.join(terraformDir, 'iam', 'dynamodb-orders-policy.tf');
      
      expect(fs.existsSync(iamPath)).toBe(true);
      
      const content = fs.readFileSync(iamPath, 'utf-8');
      
      expect(content).toContain('resource "aws_iam_policy" "dynamodb_orders_access"');
      expect(content).toContain('dynamodb:PutItem');
      expect(content).toContain('dynamodb:GetItem');
      expect(content).toContain('dynamodb:UpdateItem');
      expect(content).toContain('dynamodb:DeleteItem');
      expect(content).toContain('dynamodb:Scan');
    });
  });

  describe('p7: should fail if policy is too permissive', () => {
    it('fails with security validation error for excessive permissions', async () => {
      const iamPath = path.join(terraformDir, 'iam', 'dynamodb-orders-policy.tf');
      const content = fs.readFileSync(iamPath, 'utf-8');
      
      const hasAdminAccess = content.includes('"dynamodb:*"') || 
                            content.includes('"*"') && content.includes('Action');
      
      expect(hasAdminAccess).toBe(false);
    });
  });

  describe('p7: should apply successfully with valid policy', () => {
    it('creates Policy and attaches successfully', async () => {
      const iamPath = path.join(terraformDir, 'iam', 'dynamodb-orders-policy.tf');
      const content = fs.readFileSync(iamPath, 'utf-8');
      
      const hasResource = content.includes('resource "aws_iam_policy" "dynamodb_orders_access"');
      const hasName = content.includes('name = "dynamodb_orders_access"');
      const hasPolicy = content.includes('policy = jsonencode');
      const hasStatement = content.includes('Statement');
      
      expect(hasResource).toBe(true);
      expect(hasName).toBe(true);
      expect(hasPolicy).toBe(true);
      expect(hasStatement).toBe(true);
    });
  });
});

// === ARCHIVO: api/src/infrastructure/config/app.config.ts ===
import { Global, Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { OrderService } from '../../application/services/order.service';
import { OrderServiceImpl } from '../../application/services/order.service.impl';
import { DynamoOrderRepository } from '../repositories/dynamo-order.repository';
import { DynamoDBClientService } from '../aws/dynamodb-client';

// Token de inyeccion del puerto de repositorio. El puerto es una interface (tipo, no valor),
// por eso se inyecta y exporta mediante este token de cadena, nunca por la interface.
export const ORDER_REPOSITORY_TOKEN = 'OrderRepository';

// Modulo de configuracion de infraestructura: conecta los adaptadores de salida con los puertos del dominio.
@Global()
@Module({
  providers: [
    DynamoDBClientService,
    {
      provide: 'DYNAMODB_TABLE_NAME',
      useValue: process.env.DYNAMODB_TABLE_NAME || 'orders',
    },
    {
      provide: ORDER_REPOSITORY_TOKEN,
      useClass: DynamoOrderRepository,
    },
    {
      provide: OrderService,
      useClass: OrderServiceImpl,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
  ],
  exports: [
    OrderService,
    ORDER_REPOSITORY_TOKEN,
    DynamoDBClientService,
    'DYNAMODB_TABLE_NAME',
  ],
})
export class AppConfigModule {}

// === ARCHIVO: api/src/main.ts ===
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Validacion global: los DTOs se transforman y se rechazan propiedades no declaradas.
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Sin prefijo global: las rutas quedan exactamente como las declara el contrato (/orders, /orders/:id).
  app.enableShutdownHooks();

  const rawPort = process.env.PORT ?? '3000';
  const port = Number.parseInt(rawPort, 10);
  if (Number.isNaN(port) || port <= 0) {
    throw new Error(`Puerto invalido en la variable PORT: ${rawPort}`);
  }

  await app.listen(port);

  logger.log(`Aplicacion escuchando en http://localhost:${port}`);
  logger.log(`Endpoints disponibles en http://localhost:${port}/orders`);
}

bootstrap().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  // Un fallo de arranque no debe dejar el proceso colgado con un estado ambiguo.
  console.error(`No se pudo arrancar la aplicacion: ${message}`);
  process.exit(1);
});

// === ARCHIVO: api/src/app.module.ts ===
import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { DynamoDBClientService } from './infrastructure/aws/dynamodb-client';
import { OrderServiceImpl } from './application/services/order.service.impl';
import { DynamoOrderRepository } from './infrastructure/repositories/dynamo-order.repository';
import { OrderController } from './infrastructure/controllers/order.controller';
import { AllExceptionsFilter } from './infrastructure/filters/global-exception.filter';
import { AppConfigModule } from './infrastructure/config/app.config';

@Module({
  imports: [AppConfigModule],
  controllers: [OrderController],
  providers: [
    DynamoDBClientService,
    {
      provide: 'OrderRepository',
      useClass: DynamoOrderRepository,
    },
    {
      provide: 'OrderService',
      useClass: OrderServiceImpl,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}

// === ARCHIVO: api/src/infrastructure/controllers/order.controller.ts ===
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import { OrderService } from '../../application/services/order.service';
import { CreateOrderRequest } from '../../domain/models/create-order-request.model';
import { UpdateOrderRequest } from '../../domain/models/update-order-request.model';
import { Order } from '../../domain/models/order.model';

/**
 * Adaptador de entrada HTTP para el recurso /orders.
 * Solo traduce la petición HTTP a una llamada al caso de uso y devuelve su resultado.
 * Las validaciones de negocio y los errores de dominio viven en la capa de aplicación;
 * su traducción a respuestas HTTP la resuelve el filtro global de excepciones.
 */
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createOrder(@Body() createOrderRequest: CreateOrderRequest): Promise<Order> {
    return this.orderService.create(createOrderRequest);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async listOrders(): Promise<Order[]> {
    return this.orderService.list();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOrder(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
    return this.orderService.get(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateOrder(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateOrderRequest: UpdateOrderRequest,
  ): Promise<Order> {
    return this.orderService.update(id, updateOrderRequest);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteOrder(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.orderService.delete(id);
  }
}

// === ARCHIVO: api/src/infrastructure/filters/global-exception.filter.ts ===
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors: string[] | undefined;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        const responseObj = exceptionResponse as Record<string, unknown>;
        message = (responseObj.message as string) || exception.message;
        
        if (Array.isArray(responseObj.message)) {
          errors = responseObj.message;
          message = 'Validation failed';
        }
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      this.logger.error(`Unhandled exception: ${exception.message}`, exception.stack);
    }

    const responseBody: Record<string, unknown> = {
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
    };

    if (errors) {
      responseBody['errors'] = errors;
    }

    response.status(status).json(responseBody);
  }
}

// === ARCHIVO: client/src/main.tsx ===
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router';
import './index.css';

// Punto de entrada del cliente React.
// Monta el arbol de rutas (src/app/router.ts) dentro del nodo #root definido en index.html.
// StrictMode ayuda a detectar efectos secundarios no idempotentes durante el desarrollo.
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('No se encontro el elemento #root en index.html');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// === ARCHIVO: client/package.json ===
{
  "name": "reto-react",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "tsc --noEmit && vite build",
    "test": "vitest run"
  },
  "dependencies": {
    "@testing-library/react": "16.3.3",
    "axios": "1.21.1",
    "msw": "2.15.0",
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "react-hook-form": "7.92.0",
    "react-router-dom": "7.18.6",
    "vitest": "4.0.18"
  },
  "devDependencies": {
    "@types/react": "18.3.31",
    "@types/react-dom": "18.3.7",
    "@vitejs/plugin-react": "4.7.0",
    "typescript": "5.7.3",
    "vite": "5.4.21"
  }
}

// === ARCHIVO: client/tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": [
      "ES2020",
      "DOM",
      "DOM.Iterable"
    ],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "strictPropertyInitialization": false,
    "noEmit": true,
    "isolatedModules": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "allowImportingTsExtensions": true,
    "useDefineForClassFields": true,
    "types": [
      "vite/client"
    ]
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "_pendiente",
    "tests",
    "src/**/*.test.ts",
    "src/**/*.test.tsx",
    "src/**/*.spec.ts",
    "src/**/*.spec.tsx"
  ]
}

// === ARCHIVO: client/vite.config.ts ===
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({ plugins: [react()] });

// === ARCHIVO: client/index.html ===
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reto</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

// === ARCHIVO: client/src/vite-env.d.ts ===
/// <reference types="vite/client" />

// === ARCHIVO: client/src/shared/models/order.model.ts ===
/**
 * Modelo de orden para el cliente.
 * Representa una orden con sus items y estado.
 */
export interface Order {
    id: string;
    customerId: string;
    items: OrderItem[];
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
}

// === ARCHIVO: client/src/shared/models/create-order-request.model.ts ===
/**
 * DTO para creación de órdenes en el cliente.
 * Contiene los datos necesarios para crear una nueva orden.
 */
export interface CreateOrderRequest {
    customerId: string;
    items: OrderItem[];
}

export interface OrderItem {
    productId: string;
    quantity: number;
    price: number;
}

// === ARCHIVO: client/src/shared/services/order.service.ts ===
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Order, OrderItem } from '../models/order.model';
import { CreateOrderRequest } from '../models/create-order-request.model';

/**
 * Servicio para interactuar con la API de órdenes.
 * Proporciona métodos para realizar operaciones CRUD sobre órdenes.
 */
export class OrderService {
    private readonly httpClient: AxiosInstance;
    private readonly baseUrl: string;

    constructor() {
        this.baseUrl = 'http://localhost:3000';
        this.httpClient = axios.create({
            baseURL: this.baseUrl,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    /**
     * Crea una nueva orden.
     * @param request Datos de la orden a crear.
     * @returns La orden creada.
     */
    async createOrder(request: CreateOrderRequest): Promise<Order> {
        try {
            const response: AxiosResponse<Order> = await this.httpClient.post('/orders', request);
            return response.data;
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    }

    /**
     * Obtiene todas las órdenes.
     * @returns Lista de órdenes.
     */
    async listOrders(): Promise<Order[]> {
        try {
            const response: AxiosResponse<Order[]> = await this.httpClient.get('/orders');
            return response.data;
        } catch (error) {
            console.error('Error listing orders:', error);
            throw error;
        }
    }

    /**
     * Obtiene una orden por su ID.
     * @param id ID de la orden.
     * @returns La orden correspondiente.
     */
    async getOrder(id: string): Promise<Order> {
        try {
            const response: AxiosResponse<Order> = await this.httpClient.get(`/orders/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error getting order:', error);
            throw error;
        }
    }

    /**
     * Actualiza una orden existente.
     * @param id ID de la orden a actualizar.
     * @param status Nuevo estado de la orden.
     * @returns La orden actualizada.
     */
    async updateOrder(id: string, status: string): Promise<Order> {
        try {
            const response: AxiosResponse<Order> = await this.httpClient.put(`/orders/${id}`, { status });
            return response.data;
        } catch (error) {
            console.error('Error updating order:', error);
            throw error;
        }
    }

    /**
     * Elimina una orden por su ID.
     * @param id ID de la orden a eliminar.
     */
    async deleteOrder(id: string): Promise<void> {
        try {
            await this.httpClient.delete(`/orders/${id}`);
        } catch (error) {
            console.error('Error deleting order:', error);
            throw error;
        }
    }
}

// === ARCHIVO: client/src/features/orders/hooks/use-order-state.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { useState, useCallback } from 'react';
import { Order } from '../../../shared/models/order.model';

interface UseOrderStateReturn {
  orders: Order[];
  loading: boolean;
  error: Error | null;
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  updateOrderInState: (updatedOrder: Order) => void;
  removeOrder: (orderId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: Error | null) => void;
}

export function useOrderState(): UseOrderStateReturn {
  throw new Error('TODO(reto): useOrderState');
}

// === ARCHIVO: client/src/features/orders/components/OrderForm.tsx ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { useForm } from 'react-hook-form';
import { CreateOrderRequest } from '../../../shared/models/create-order-request.model';
import { OrderItem } from '../../../shared/models/order.model';

interface OrderFormProps {
  onSubmit: (order: CreateOrderRequest) => Promise<void>;
}

interface FormData {
  customerId: string;
  productId: string;
  quantity: string;
  price: string;
}

export function OrderForm({ onSubmit }: OrderFormProps): JSX.Element {
  throw new Error('TODO(reto): anonymous');
}

// === ARCHIVO: client/src/features/orders/pages/OrdersPage.tsx ===
import { useEffect } from 'react';
import { OrderForm } from '../components/OrderForm';
import { useOrderState } from '../hooks/use-order-state';
import { OrderService } from '../../../shared/services/order.service';
import { Order } from '../../../shared/models/order.model';
import { CreateOrderRequest } from '../../../shared/models/create-order-request.model';

const orderService = new OrderService();

export function OrdersPage() {
  const {
    orders,
    loading,
    error,
    setOrders,
    addOrder,
    updateOrderInState,
    removeOrder,
    setLoading,
    setError,
  } = useOrderState();

  useEffect(() => {
    let cancelled = false;

    const loadOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await orderService.listOrders();
        if (!cancelled) {
          setOrders(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Error al cargar órdenes'));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadOrders();

    return () => {
      cancelled = true;
    };
  }, [setOrders, setLoading, setError]);

  const handleCreateOrder = async (request: CreateOrderRequest) => {
    setLoading(true);
    setError(null);
    try {
      const newOrder = await orderService.createOrder(request);
      addOrder(newOrder);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al crear orden'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId: string, status: string) => {
    setLoading(true);
    setError(null);
    try {
      const updated = await orderService.updateOrder(orderId, status);
      updateOrderInState(updated);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al actualizar orden'));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    setLoading(true);
    setError(null);
    try {
      await orderService.deleteOrder(orderId);
      removeOrder(orderId);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al eliminar orden'));
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (order: Order, newStatus: string) => {
    handleUpdateStatus(order.id, newStatus);
  };

  return (
    <div className="orders-page">
      <h1>Gestión de Órdenes</h1>

      {error && (
        <div className="error-message" role="alert">
          {error.message}
        </div>
      )}

      <section className="orders-form-section">
        <h2>Crear Nueva Orden</h2>
        <OrderForm onSubmit={handleCreateOrder} />
      </section>

      <section className="orders-list-section">
        <h2>Órdenes Existentes</h2>

        {loading && <p>Cargando órdenes...</p>}

        {!loading && orders.length === 0 && (
          <p>No hay órdenes disponibles</p>
        )}

        {!loading && orders.length > 0 && (
          <ul className="orders-list">
            {orders.map((order) => (
              <li key={order.id} className="order-item">
                <div className="order-info">
                  <strong>ID:</strong> {order.id}<br />
                  <strong>Cliente:</strong> {order.customerId}<br />
                  <strong>Estado:</strong> {order.status}<br />
                  <strong>Items:</strong> {order.items.length}<br />
                  <strong>Creado:</strong> {new Date(order.createdAt).toLocaleString()}
                </div>
                <div className="order-actions">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order, e.target.value)}
                    aria-label={`Cambiar estado de orden ${order.id}`}
                  >
                    <option value="pending">Pendiente</option>
                    <option value="processing">Procesando</option>
                    <option value="completed">Completado</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    aria-label={`Eliminar orden ${order.id}`}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

// === ARCHIVO: client/src/__tests__/OrderAcceptanceTests.tsx ===
import { describe, it, expect, beforeAll, beforeEach, afterEach, afterAll } from 'vitest';
import { setupServer } from 'msw/node';
import { http, HttpResponse, delay } from 'msw';
import { OrderService } from '../shared/services/order.service';
import { Order, OrderItem } from '../shared/models/order.model';
import { CreateOrderRequest } from '../shared/models/create-order-request.model';

// Base de datos en memoria que simula el backend de ordenes.
// Se reinicia antes de cada prueba para que las pruebas sean independientes.
const seedOrders: Order[] = [
  {
    id: 'order-1',
    customerId: 'customer-1',
    items: [{ productId: 'product-1', quantity: 2, price: 29.99 }],
    status: 'pending',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 'order-2',
    customerId: 'customer-2',
    items: [{ productId: 'product-2', quantity: 1, price: 49.99 }],
    status: 'completed',
    createdAt: '2024-01-14T15:30:00Z',
    updatedAt: '2024-01-15T09:00:00Z'
  }
];

const VALID_STATUSES = ['pending', 'completed', 'shipped'];

let store: Order[] = [];

function resetStore(): void {
  store = seedOrders.map(order => ({
    ...order,
    items: order.items.map(item => ({ ...item }))
  }));
}

const server = setupServer(
  http.get('http://localhost:3000/orders', async () => {
    await delay(50);
    return HttpResponse.json(store);
  }),

  http.get('http://localhost:3000/orders/:id', async ({ params }) => {
    await delay(50);
    const id = String(params.id);
    const order = store.find(o => o.id === id);
    if (!order) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(order);
  }),

  http.post('http://localhost:3000/orders', async ({ request }) => {
    await delay(50);
    const body = (await request.json()) as { customerId: string; items: OrderItem[] };

    if (!body.customerId || body.customerId.trim() === '') {
      return HttpResponse.json({ message: 'customerId es obligatorio' }, { status: 400 });
    }
    if (!Array.isArray(body.items) || body.items.length === 0) {
      return HttpResponse.json({ message: 'La orden debe tener al menos un item' }, { status: 400 });
    }

    const now = new Date().toISOString();
    const newOrder: Order = {
      id: 'order-new',
      customerId: body.customerId,
      items: body.items,
      status: 'pending',
      createdAt: now,
      updatedAt: now
    };
    store.push(newOrder);
    return HttpResponse.json(newOrder, { status: 201 });
  }),

  http.put('http://localhost:3000/orders/:id', async ({ params, request }) => {
    await delay(50);
    const id = String(params.id);
    const body = (await request.json()) as { status: string };

    const index = store.findIndex(o => o.id === id);
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    if (!VALID_STATUSES.includes(body.status)) {
      return HttpResponse.json({ message: 'Estado invalido' }, { status: 400 });
    }

    const updatedOrder: Order = {
      ...store[index],
      status: body.status,
      updatedAt: new Date().toISOString()
    };
    store[index] = updatedOrder;
    return HttpResponse.json(updatedOrder);
  }),

  http.delete('http://localhost:3000/orders/:id', async ({ params }) => {
    await delay(50);
    const id = String(params.id);
    const index = store.findIndex(o => o.id === id);
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    store.splice(index, 1);
    return new HttpResponse(null, { status: 204 });
  })
);

describe('OrderAcceptanceTests - E2E', () => {
  let orderService: OrderService;

  beforeAll(() => {
    server.listen({ onUnhandledRequest: 'error' });
  });

  beforeEach(() => {
    resetStore();
    orderService = new OrderService();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  describe('Creación de órdenes', () => {
    it('debe crear una orden exitosamente con datos válidos', async () => {
      const createRequest: CreateOrderRequest = {
        customerId: 'customer-new',
        items: [{ productId: 'product-3', quantity: 3, price: 19.99 }]
      };

      const result = await orderService.createOrder(createRequest);

      expect(result).toBeDefined();
      expect(result.id).toBe('order-new');
      expect(result.customerId).toBe(createRequest.customerId);
      expect(result.items).toHaveLength(1);
      expect(result.items[0].productId).toBe('product-3');
      expect(result.status).toBe('pending');
    });

    it('debe rechazar creación con customerId vacío', async () => {
      const invalidRequest: CreateOrderRequest = {
        customerId: '',
        items: [{ productId: 'product-1', quantity: 1, price: 10 }]
      };

      await expect(orderService.createOrder(invalidRequest)).rejects.toThrow();
    });

    it('debe rechazar creación sin items', async () => {
      const invalidRequest: CreateOrderRequest = {
        customerId: 'customer-1',
        items: []
      };

      await expect(orderService.createOrder(invalidRequest)).rejects.toThrow();
    });
  });

  describe('Listado de órdenes', () => {
    it('debe obtener todas las órdenes', async () => {
      const orders = await orderService.listOrders();

      expect(orders).toBeDefined();
      expect(orders).toHaveLength(2);
      expect(orders[0].id).toBe('order-1');
      expect(orders[1].id).toBe('order-2');
    });

    it('debe retornar array vacío cuando no hay órdenes', async () => {
      server.use(
        http.get('http://localhost:3000/orders', () => {
          return HttpResponse.json([]);
        })
      );

      const orders = await orderService.listOrders();

      expect(orders).toEqual([]);
    });
  });

  describe('Obtención de orden por ID', () => {
    it('debe obtener una orden específica por su ID', async () => {
      const order = await orderService.getOrder('order-1');

      expect(order).toBeDefined();
      expect(order.id).toBe('order-1');
      expect(order.customerId).toBe('customer-1');
      expect(order.items).toHaveLength(1);
    });

    it('debe lanzar error cuando la orden no existe', async () => {
      await expect(orderService.getOrder('non-existent')).rejects.toThrow();
    });
  });

  describe('Actualización de órdenes', () => {
    it('debe actualizar el estado de una orden existente', async () => {
      const updatedOrder = await orderService.updateOrder('order-1', 'completed');

      expect(updatedOrder).toBeDefined();
      expect(updatedOrder.id).toBe('order-1');
      expect(updatedOrder.status).toBe('completed');
    });

    it('debe rechazar actualización de orden inexistente', async () => {
      await expect(orderService.updateOrder('non-existent', 'completed')).rejects.toThrow();
    });

    it('debe rechazar estado inválido', async () => {
      await expect(orderService.updateOrder('order-1', 'invalid-status')).rejects.toThrow();
    });
  });

  describe('Eliminación de órdenes', () => {
    it('debe eliminar una orden exitosamente', async () => {
      await expect(orderService.deleteOrder('order-1')).resolves.toBeUndefined();
    });

    it('debe rechazar eliminación de orden inexistente', async () => {
      await expect(orderService.deleteOrder('non-existent')).rejects.toThrow();
    });
  });

  describe('Integración completa del flujo CRUD', () => {
    it('debe ejecutar el flujo completo: crear, listar, obtener, actualizar, eliminar', async () => {
      const createRequest: CreateOrderRequest = {
        customerId: 'customer-integration',
        items: [{ productId: 'product-integration', quantity: 1, price: 99.99 }]
      };

      const createdOrder = await orderService.createOrder(createRequest);
      expect(createdOrder.id).toBeDefined();

      const orders = await orderService.listOrders();
      expect(orders.length).toBeGreaterThan(0);

      const fetchedOrder = await orderService.getOrder(createdOrder.id);
      expect(fetchedOrder.id).toBe(createdOrder.id);

      const updatedOrder = await orderService.updateOrder(createdOrder.id, 'shipped');
      expect(updatedOrder.status).toBe('shipped');

      await orderService.deleteOrder(createdOrder.id);

      await expect(orderService.getOrder(createdOrder.id)).rejects.toThrow();
    });
  });
});

// === ARCHIVO: client/src/features/orders/OrderAcceptanceTests.impl.ts ===
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { OrderService } from '../../shared/services/order.service';
import { Order, OrderItem } from '../../shared/models/order.model';

interface TestScenario<T> {
  name: string;
  setup: () => void;
  execute: () => Promise<T>;
  assert: (result: T) => void;
}

export class OrderAcceptanceTestsImpl {
  private orderService: OrderService;
  private testResults: Array<{ scenario: string; passed: boolean; error?: string }> = [];

  constructor(orderService: OrderService) {
    this.orderService = orderService;
  }

  async runAllTests(): Promise<void> {
    console.log('Iniciando pruebas de aceptación de órdenes...');
    
    await this.testCreateOrder();
    await this.testListOrders();
    await this.testGetOrder();
    await this.testUpdateOrder();
    await this.testDeleteOrder();
    await this.testFullCrudFlow();
    
    this.printResults();
  }

  private async testCreateOrder(): Promise<void> {
    const scenarios: Array<TestScenario<Order>> = [
      {
        name: 'Crear orden con datos válidos',
        setup: () => {},
        execute: async () => {
          return await this.orderService.createOrder({
            customerId: 'customer-test-1',
            items: [{ productId: 'prod-1', quantity: 2, price: 25.50 }]
          });
        },
        assert: (order) => {
          expect(order.customerId).toBe('customer-test-1');
          expect(order.items).toHaveLength(1);
          expect(order.status).toBe('pending');
        }
      },
      {
        name: 'Crear orden con múltiples items',
        setup: () => {},
        execute: async () => {
          return await this.orderService.createOrder({
            customerId: 'customer-test-2',
            items: [
              { productId: 'prod-1', quantity: 1, price: 100 },
              { productId: 'prod-2', quantity: 3, price: 15 }
            ]
          });
        },
        assert: (order) => {
          expect(order.items).toHaveLength(2);
          expect(order.items[0].price).toBe(100);
          expect(order.items[1].quantity).toBe(3);
        }
      }
    ];

    await this.runScenarios('Crear Orden', scenarios);
  }

  private async testListOrders(): Promise<void> {
    const scenarios: Array<TestScenario<Order[]>> = [
      {
        name: 'Listar todas las órdenes',
        setup: () => {},
        execute: async () => {
          return await this.orderService.listOrders();
        },
        assert: (orders) => {
          expect(Array.isArray(orders)).toBe(true);
          expect(orders.length).toBeGreaterThanOrEqual(0);
        }
      }
    ];

    await this.runScenarios('Listar Órdenes', scenarios);
  }

  private async testGetOrder(): Promise<void> {
    const scenarios: Array<TestScenario<Order>> = [
      {
        name: 'Obtener orden existente',
        setup: async () => {
          await this.orderService.createOrder({
            customerId: 'customer-get-test',
            items: [{ productId: 'prod-x', quantity: 1, price: 10 }]
          });
        },
        execute: async () => {
          return await this.orderService.getOrder('order-new');
        },
        assert: (order) => {
          expect(order).toBeDefined();
          expect(order.id).toBeDefined();
        }
      }
    ];

    await this.runScenarios('Obtener Orden', scenarios);
  }

  private async testUpdateOrder(): Promise<void> {
    const scenarios: Array<TestScenario<Order>> = [
      {
        name: 'Actualizar estado de orden a completed',
        setup: async () => {
          await this.orderService.createOrder({
            customerId: 'customer-update-test',
            items: [{ productId: 'prod-y', quantity: 1, price: 20 }]
          });
        },
        execute: async () => {
          return await this.orderService.updateOrder('order-new', 'completed');
        },
        assert: (order) => {
          expect(order.status).toBe('completed');
        }
      },
      {
        name: 'Actualizar estado de orden a cancelled',
        setup: async () => {
          await this.orderService.createOrder({
            customerId: 'customer-cancel-test',
            items: [{ productId: 'prod-z', quantity: 1, price: 30 }]
          });
        },
        execute: async () => {
          return await this.orderService.updateOrder('order-new', 'cancelled');
        },
        assert: (order) => {
          expect(order.status).toBe('cancelled');
        }
      }
    ];

    await this.runScenarios('Actualizar Orden', scenarios);
  }

  private async testDeleteOrder(): Promise<void> {
    const scenarios: Array<TestScenario<void>> = [
      {
        name: 'Eliminar orden existente',
        setup: async () => {
          await this.orderService.createOrder({
            customerId: 'customer-delete-test',
            items: [{ productId: 'prod-del', quantity: 1, price: 50 }]
          });
        },
        execute: async () => {
          await this.orderService.deleteOrder('order-new');
        },
        assert: () => {
          expect(true).toBe(true);
        }
      }
    ];

    await this.runScenarios('Eliminar Orden', scenarios);
  }

  private async testFullCrudFlow(): Promise<void> {
    const scenarios: Array<TestScenario<void>> = [
      {
        name: 'Flujo completo CRUD',
        setup: () => {},
        execute: async () => {
          const created = await this.orderService.createOrder({
            customerId: 'customer-flow',
            items: [{ productId: 'prod-flow', quantity: 1, price: 75 }]
          });
          
          const listed = await this.orderService.listOrders();
          expect(listed.length).toBeGreaterThan(0);
          
          const fetched = await this.orderService.getOrder(created.id);
          expect(fetched.id).toBe(created.id);
          
          const updated = await this.orderService.updateOrder(created.id, 'processing');
          expect(updated.status).toBe('processing');
          
          await this.orderService.deleteOrder(created.id);
        },
        assert: () => {
          expect(true).toBe(true);
        }
      }
    ];

    await this.runScenarios('Flujo CRUD Completo', scenarios);
  }

  private async runScenarios<T>(
    category: string,
    scenarios: Array<TestScenario<T>>
  ): Promise<void> {
    for (const scenario of scenarios) {
      try {
        scenario.setup();
        const result = await scenario.execute();
        scenario.assert(result);
        this.testResults.push({ scenario: `${category}: ${scenario.name}`, passed: true });
      } catch (error) {
        this.testResults.push({
          scenario: `${category}: ${scenario.name}`,
          passed: false,
          error: error instanceof Error ? error.message : 'Error desconocido'
        });
      }
    }
  }

  private printResults(): void {
    console.log('\n=== Resultados de Pruebas de Aceptación ===');
    
    const passed = this.testResults.filter(r => r.passed).length;
    const failed = this.testResults.filter(r => !r.passed).length;
    
    this.testResults.forEach(result => {
      const status = result.passed ? '✓' : '✗';
      console.log(`${status} ${result.scenario}`);
      if (result.error) {
        console.log(`  Error: ${result.error}`);
      }
    });
    
    console.log(`\nTotal: ${passed} pasadas, ${failed} fallidas`);
    
    if (failed > 0) {
      throw new Error(`${failed} prueba(s) de aceptación fallida(s)`);
    }
  }
}

export function createOrderAcceptanceTestRunner(): OrderAcceptanceTestsImpl {
  const orderService = new OrderService();
  return new OrderAcceptanceTestsImpl(orderService);
}

// === ARCHIVO: client/src/index.css ===
/* Estilos pendientes: archivo creado automaticamente porque otro modulo lo importa. */


// === ARCHIVO: client/src/app/router.tsx ===
import { createBrowserRouter } from 'react-router-dom';
import { OrdersPage } from '../features/orders/pages/OrdersPage';

// Arbol de rutas de la aplicacion.
// La capa app solo define el enrutado; la logica de cada pantalla vive en src/features.
// La ruta raiz muestra el listado de ordenes, que es el flujo principal del reto.
export const router = createBrowserRouter([
  {
    path: '/',
    element: <OrdersPage />,
  },
  {
    path: '*',
    element: (
      <div className="not-found">
        <h1>Pagina no encontrada</h1>
        <p>La ruta solicitada no existe en la aplicacion.</p>
      </div>
    ),
  },
]);

// === ARCHIVO: infra/versions.tf ===
terraform {
  required_version = ">= 1.9.0, < 2.0.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "= 5.100.0"
    }
  }
}

// === ARCHIVO: infra/providers.tf ===
provider "aws" {
  region = "us-east-1"
}

// === ARCHIVO: infra/modules/dynamodb/variables.tf ===
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

// === ARCHIVO: infra/modules/dynamodb/outputs.tf ===
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

// === ARCHIVO: infra/modules/iam/variables.tf ===
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

// === ARCHIVO: infra/environments/dev/terraform.tfvars ===
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

// === ARCHIVO: infra/environments/dev/variables.tf ===
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

// === ARCHIVO: infra/README.md ===
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

// === ARCHIVO: infra/modules/dynamodb/main.tf ===
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

// === ARCHIVO: infra/modules/iam/main.tf ===
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

// === ARCHIVO: docker-compose.yml ===
# Infraestructura local del reto. SOLO desarrollo: credenciales de ejemplo (local-dev-only), puertos en loopback.
# Levantar: docker compose up -d --wait
name: infra-local
services:
  dynamodb-local:
    image: "amazon/dynamodb-local:2.5.2"
    command: ["-jar","DynamoDBLocal.jar","-sharedDb","-inMemory"]
    ports:
      - "127.0.0.1:8000:8000"
    healthcheck:
      test: ["CMD-SHELL","bash -c ':> /dev/tcp/127.0.0.1/8000' || exit 1"]
      interval: 10s
      timeout: 5s
      retries: 10
      start_period: 5s


// === ARCHIVO: infra-local/README.md ===
# Infraestructura local

Servicios de soporte para el reto, definidos en `docker-compose.yml` (raiz del repo).

```bash
docker compose up -d --wait
```

| Servicio | Imagen | Puertos (host) |
|---|---|---|
| DynamoDB Local | `amazon/dynamodb-local:2.5.2` | 8000 |

Credenciales: solo de desarrollo local (`local-dev-only`, `local`). No son secretos ni deben reutilizarse.
Los scripts de `infra-local/` (tablas, topics) se ejecutan con el compose en estado healthy.


// === ARCHIVO: infra-local/dynamodb/create-tables.sh ===
#!/usr/bin/env bash
# Crea las tablas en DynamoDB Local (idempotente). Credenciales dummy: DynamoDB Local no valida firmas.
set -euo pipefail

export AWS_ACCESS_KEY_ID=local
export AWS_SECRET_ACCESS_KEY=local
export AWS_REGION=us-east-1
ENDPOINT="${DYNAMODB_ENDPOINT:-http://localhost:8000}"

create_table() {
  local name="$1" pk="$2" sk="${3:-}"
  if aws dynamodb describe-table --table-name "$name" --endpoint-url "$ENDPOINT" >/dev/null 2>&1; then
    echo "Tabla $name ya existe"
    return
  fi
  local attrs="AttributeName=$pk,AttributeType=S"
  local keys="AttributeName=$pk,KeyType=HASH"
  if [ -n "$sk" ]; then
    attrs="$attrs AttributeName=$sk,AttributeType=S"
    keys="$keys AttributeName=$sk,KeyType=RANGE"
  fi
  # shellcheck disable=SC2086
  aws dynamodb create-table --table-name "$name" --attribute-definitions $attrs --key-schema $keys \
    --billing-mode PAY_PER_REQUEST --endpoint-url "$ENDPOINT" >/dev/null
  echo "Tabla $name creada"
}

create_table "app-items" "id"

```
