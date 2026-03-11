---
name: audit
description: Flujo maestro de verificación. Escanea el proyecto en busca de violaciones a la Deuda Técnica Cero (Performance, Seguridad, Calidad).
---

# ✅ TITAN Verify: Auditoría Integral

Has invocado el protocolo de verificación `/audit`. Tu misión es escanear el proyecto en busca de violaciones a la "Deuda Técnica Cero". No modifiques el código aún; tu tarea es actuar como un auditor implacable y generar un reporte.

## Matriz de Auditoría:

### 1. Calidad Arquitectónica (Quality)
- **Regla Anti-Any:** Busca el uso del tipo `any` en archivos TypeScript. Su uso está estrictamente PROHIBIDO.
- **Basura:** Escanea en busca de `console.log`, variables no utilizadas, o bloques de código comentados.
- **Clean Architecture:** Revisa que la capa `domain/` no esté importando absolutamente nada de `infrastructure/` o `presentation/`.

### 2. Seguridad (Security)
- **Secretos:** Busca API Keys, contraseñas de bases de datos (ej. cadenas de conexión de Prisma) o tokens harcodeados en el código fuente.
- **Validación:** Asegúrate de que las rutas HTTP estén validando sus entradas con Zod.

### 3. Rendimiento (Performance)
- **Fugas de memoria:** En frontend/WebGL, asegúrate de que existan funciones de limpieza (ej. `dispose()`).
- **Bloqueos:** Detecta funciones asíncronas (`async`) que no estén usando `await` correctamente o que bloqueen el hilo principal (I/O síncrono).

## Salida Esperada:
Genera un reporte estructurado en Markdown con 3 niveles:
- 🔴 **CRÍTICO:** Rompe las reglas de TITAN (Deuda técnica detectada).
- 🟡 **ADVERTENCIA:** Código que funciona pero puede mejorar.
- 🟢 **PASADO:** Módulos que cumplen la excelencia.

Finaliza el reporte preguntando al Director: *"¿Deseas que active el protocolo de Auto-Reparación para solucionar los errores críticos?"*