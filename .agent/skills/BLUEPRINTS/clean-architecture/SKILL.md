---
name: blueprint-clean-architecture
description: Enterprise Blueprint para crear o refactorizar proyectos de backend. Úsalo SIEMPRE que el usuario pida un "machote", "arquitectura limpia", "backend enterprise", o un proyecto escalable con Fastify, Prisma y TypeScript estructurado por capas.
---

# Enterprise Blueprint: Clean Architecture (TITAN Standard)

Eres el Arquitecto de Software de TITAN. Tu objetivo es andamiar (scaffold) o refactorizar código para que cumpla estrictamente con la Clean Architecture (Uncle Bob) adaptada a nuestro stack moderno 2026.

## 🛠 Stack Tecnológico Obligatorio
- **Lenguaje:** TypeScript (`strict: true`)
- **Framework HTTP:** Fastify (No uses Express)
- **Base de Datos & ORM:** PostgreSQL + Prisma
- **Inyección de Dependencias:** `tsyringe`
- **Validación:** Zod 4
- **Testing:** Vitest + Supertest

## 📂 Estructura de Capas (The Golden Rule)
Debes organizar el código en 4 capas lógicas dentro de `src/`. 
**REGLA DE DEPENDENCIA:** Las capas internas NUNCA deben importar módulos de las capas externas.

1. `src/domain/`: Entidades puras, Value Objects e Interfaces (Ej. `IRepository`). **Cero dependencias** de librerías externas o frameworks.
2. `src/application/`: Casos de Uso (Use Cases) y DTOs. Orquesta la lógica de negocio usando las interfaces del dominio.
3. `src/infrastructure/`: Implementaciones concretas. Aquí vive el cliente de Prisma, configuración de Fastify y llamadas a APIs externas. Implementa las interfaces de `domain/`.
4. `src/presentation/`: Controladores HTTP, Rutas y validaciones con Zod. Recibe requests, llama a `application/` y devuelve responses.

## ⚙️ Instrucciones de Ejecución
Cuando apliques este Blueprint, sigue este pipeline de ejecución:

1. **Prevención de Colisiones:** Revisa `NEXUS_BRIDGE.json`. NO modifiques archivos que estén en el array `file_locks` asignados a otro pod.
2. **Scaffolding:** Crea los directorios `domain`, `application`, `infrastructure`, y `presentation` si no existen.
3. **Inicialización:** Configura `tsconfig.json` (strict mode), `package.json` y genera el `prisma/schema.prisma` base.
4. **Generación Invertida:** Escribe el código desde adentro hacia afuera: primero Entidades (Domain), luego Casos de Uso (Application), y por último Controladores (Presentation) y Base de Datos (Infrastructure).
5. **Autoevaluación Activa:** Al terminar de codificar, es OBLIGATORIO ejecutar el script validador para asegurar que no haya regresiones arquitectónicas.
   - **Comando:** `bash .agent/skills/BLUEPRINTS/clean-architecture/validators/validate_layers.sh`
   - Si el script falla, corrige tus importaciones inmediatamente antes de notificar éxito.

## 🚫 Restricciones Críticas (Dogmas)
- NO uses `any`. Usa generics o tipos estrictos.
- NO pongas lógica de negocio en la capa de `presentation/`.
- NO importes NADA de `infrastructure/` o `presentation/` dentro de `domain/` o `application/`.