# Implementación de operaciones CRUD de ordenes en DynamoDB

El sistema debe permitir la gestión de órdenes a través de una interfaz de usuario construida con React. Las órdenes se persistirán en DynamoDB. El objetivo es implementar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) de órdenes en DynamoDB desde la interfaz y versionar la infraestructura utilizando Terraform.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Persistir ordenes en DynamoDB desde la interfaz |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 20 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Tener el proyecto base del reto funcionando en tu máquina: clonar el repositorio, instalar las herramientas y verificar que compila y arranca antes de empezar a practicar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Instala las herramientas para ejecutar el proyecto: Node.js 18+ y npm · Terraform 1.5+.
- Clona el repositorio del reto (el enlace viene en la entrega del reto y en la sección "Repositorio del Proyecto" del PDF) y ábrelo en tu IDE.
- Instala las dependencias y compila ejecutando `(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform -chdir=modules/iam init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate && terraform -chdir=modules/iam validate) && docker compose config -q` en la raíz del repositorio.
- Confirma que el comando termina sin errores: el proyecto arranca y sus pruebas corren.
- Ubica los archivos de práctica: son los que contienen `TODO(reto)` (búscalos en el repositorio). Lee el README.md y el AGENTS.md antes de empezar.

**Entregable:** El proyecto compila/arranca sin errores con `(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform -chdir=modules/iam init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate && terraform -chdir=modules/iam validate) && docker compose config -q`.

<details>
<summary>Pistas de conocimiento</summary>

- Los archivos con `TODO(reto)` son el ejercicio: el resto del repositorio ya está resuelto y no hace falta tocarlo.
- Si el comando de verificación falla, revisa la versión de las herramientas instaladas antes de modificar código.
- AGENTS.md describe el reto, el comando de verificación y las reglas del repositorio.

</details>

### Fase 1: Configuración del entorno y creación de la estructura básica

**Objetivo:** Configurar el entorno de desarrollo y crear la estructura básica del proyecto.

**Tiempo estimado:** 4 horas

**Instrucciones:**

- Configurar Vite 5 como herramienta de build del cliente React.
- Inicializar el proyecto con las dependencias necesarias.
- Crear la estructura básica del proyecto incluyendo las rutas y componentes necesarios para la gestión de órdenes.

**Entregable:** Proyecto React configurado con Vite 5 y estructura básica creada.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de Vite 5 para la configuración del proyecto React.
- Creación de componentes y rutas en React.

</details>

### Fase 2: Implementación de la lógica de negocio y persistencia en DynamoDB

**Objetivo:** Implementar la lógica de negocio para las operaciones CRUD de órdenes y persistirlas en DynamoDB.

**Tiempo estimado:** 8 horas

**Instrucciones:**

- Implementar la lógica de negocio para crear, leer, actualizar y eliminar órdenes.
- Configurar y conectar DynamoDB para la persistencia de órdenes.
- Asegurar que las operaciones CRUD se realicen correctamente y que los datos se persistan en DynamoDB.

**Entregable:** Lógica de negocio implementada y conectada a DynamoDB para las operaciones CRUD de órdenes.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de hooks para manejar el estado local en React.
- Configuración y conexión de DynamoDB en el proyecto.

</details>

### Fase 3: Versionado de la infraestructura con Terraform

**Objetivo:** Versionar la infraestructura del proyecto utilizando Terraform.

**Tiempo estimado:** 4 horas

**Instrucciones:**

- Configurar Terraform para versionar la infraestructura del proyecto.
- Crear los archivos de configuración necesarios para la infraestructura.
- Aplicar la configuración de Terraform para versionar la infraestructura.

**Entregable:** Infraestructura versionada con Terraform.

<details>
<summary>Pistas de conocimiento</summary>

- Uso de Terraform para versionar la infraestructura.
- Creación de archivos de configuración en Terraform.

</details>

### Fase 4: Pruebas de aceptación y validación

**Objetivo:** Realizar pruebas de aceptación para validar las operaciones CRUD de órdenes y el cambio de estado.

**Tiempo estimado:** 4 horas

**Instrucciones:**

- Implementar pruebas de aceptación para crear una orden y cambiar su estado.
- Ejecutar las pruebas de aceptación y validar que las operaciones CRUD funcionan correctamente.
- Asegurar que las pruebas de aceptación cubren los casos de uso especificados.

**Entregable:** Pruebas de aceptación implementadas y ejecutadas con éxito.

<details>
<summary>Pistas de conocimiento</summary>

- Implementación de pruebas de aceptación en React.
- Ejecución y validación de pruebas de aceptación.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son las operaciones CRUD y cómo se implementan en DynamoDB?
- **paraQueSirve**: ¿Para qué sirve versionar la infraestructura con Terraform?
- **comoSeUsa**: ¿Cómo se usa Vite 5 para configurar un proyecto React?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar operaciones CRUD en DynamoDB?
- **queDecisionesImplica**: ¿Qué decisiones implica la elección de Vite 5 sobre otras herramientas de build?

## Criterios de Evaluacion

- Configuración correcta del entorno de desarrollo con Vite 5.
- Implementación de la lógica de negocio para las operaciones CRUD de órdenes.
- Persistencia correcta de órdenes en DynamoDB.
- Versionado de la infraestructura con Terraform.
- Implementación y ejecución exitosa de pruebas de aceptación para crear una orden y cambiar su estado.

## Mapa de fases

La **Fase 0** es clonar el repositorio, instalar dependencias y correr las pruebas de aceptacion: todas fallan porque la logica de cada pieza esta pendiente.

| Fase | Pieza (skill) | Archivo:simbolo | Criterios | Prueba | Comando |
|------|---------------|-----------------|-----------|--------|---------|
| f1 — Configuración del entorno y creación de la estructura básica | Gestión de estado local con hooks | `client/src/features/orders/hooks/use-order-state.ts:useOrderState` | El proyecto React está configurado con Vite 5 y estructura básica creada; Los modelos y puertos iniciales para órdenes están definidos | — | — |
| f1 — Configuración del entorno y creación de la estructura básica | Definición de puertos para operaciones CRUD | `api/src/application/services/order.service.ts:OrderService` | El proyecto React está configurado con Vite 5 y estructura básica creada; Los modelos y puertos iniciales para órdenes están definidos | — | — |
| f2 — Implementación de la lógica de negocio y persistencia en DynamoDB | Implementación de lógica de negocio para órdenes | `api/src/application/services/order.service.impl.ts:OrderServiceImpl` | Las operaciones CRUD de órdenes están implementadas y conectadas a DynamoDB; La lógica de negocio maneja errores de persistencia y validaciones | — | — |
| f2 — Implementación de la lógica de negocio y persistencia en DynamoDB | Implementación de adaptador de salida para DynamoDB | `api/src/infrastructure/repositories/dynamo-order.repository.ts:DynamoOrderRepository` | Las operaciones CRUD de órdenes están implementadas y conectadas a DynamoDB; La lógica de negocio maneja errores de persistencia y validaciones | — | — |
| f2 — Implementación de la lógica de negocio y persistencia en DynamoDB | Implementación de formulario para crear órdenes | `client/src/features/orders/components/OrderForm.tsx:OrderForm` | Las operaciones CRUD de órdenes están implementadas y conectadas a DynamoDB; La lógica de negocio maneja errores de persistencia y validaciones | — | — |
| f3 — Versionado de la infraestructura con Terraform | Declaración de tabla DynamoDB en Terraform | `api/src/modules/dynamodb/orders-table.tf:aws_dynamodb_table.orders` | La tabla de DynamoDB para órdenes está declarada en Terraform; Las políticas de acceso a DynamoDB están definidas y aplicadas; La infraestructura se despliega correctamente y maneja errores de provisión | `api/src/acceptance/f3.test.ts` | `cd api && npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f3.test.ts` |
| f3 — Versionado de la infraestructura con Terraform | Declaración de políticas de acceso en Terraform | `api/src/modules/iam/dynamodb-orders-policy.tf:aws_iam_policy.dynamodb_orders_access` | La tabla de DynamoDB para órdenes está declarada en Terraform; Las políticas de acceso a DynamoDB están definidas y aplicadas; La infraestructura se despliega correctamente y maneja errores de provisión | `api/src/acceptance/f3.test.ts` | `cd api && npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f3.test.ts` |
| f4 — Pruebas de aceptación y validación | Validación de transiciones de estado para órdenes | `api/src/application/services/order-state-machine.ts:OrderStateMachine` | Las pruebas de aceptación cubren crear una orden y cambiar su estado; Las pruebas validan errores de persistencia y transiciones inválidas; Las pruebas se ejecutan con éxito en un entorno local | — | — |
| f4 — Pruebas de aceptación y validación | Implementación de pruebas de aceptación e2e | — | Las pruebas de aceptación cubren crear una orden y cambiar su estado; Las pruebas validan errores de persistencia y transiciones inválidas; Las pruebas se ejecutan con éxito en un entorno local | — | — |

## Pruebas de aceptacion

Las pruebas de aceptacion (columna "Prueba" de la tabla) son de **solo lectura**: definen que significa "listo". No las edites, no las borres y no les agregues `skip`; lo que se resuelve es el codigo de cada pieza.

## Restricciones del pedido

| Restriccion | Donde se cumple | Estado |
|-------------|-----------------|--------|
| Usar Vite 5 como herramienta de build del cliente React (dependencia vite en package.json) | chequeo estatico (manifest): exige `vite` | Verificada |
| No usar Redux Toolkit; el estado local se maneja con hooks | chequeo estatico (manifest): prohibe `@reduxjs/toolkit`, `redux` | Verificada |
| Las pruebas de aceptacion cubren crear una orden y cambiar su estado | sin ubicar | Restriccion no verificada en sin ubicar |

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

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
(cd api && npm install --no-audit --no-fund && npm run build) && (cd client && npm install --no-audit --no-fund && npm run build) && (cd infra && terraform init -backend=false && terraform -chdir=environments/dev init -backend=false && terraform -chdir=modules/dynamodb init -backend=false && terraform -chdir=modules/iam init -backend=false && terraform validate && terraform -chdir=environments/dev validate && terraform -chdir=modules/dynamodb validate && terraform -chdir=modules/iam validate) && docker compose config -q
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
