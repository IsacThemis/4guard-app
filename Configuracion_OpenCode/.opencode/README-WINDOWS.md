# 🌉 TITAN Bridge: Antigravity ↔️ OpenCode (Windows Documentation)

Esta integración permite que **OpenCode** acceda y use todas tus habilidades de **Antigravity** de forma automática.

## 📁 Estructura de Directorios
- **Root**: `%USERPROFILE%\.opencode\`
- **Skills Compartidas**: `%USERPROFILE%\.opencode\shared-skills\`
- **Lógica de Puente**: `%USERPROFILE%\.opencode\antigravity-bridge\`
- **Backups**: `%USERPROFILE%\.opencode\backups\`

## 🚀 Cómo usar
### Sincronización Manual
- Ejecuta el archivo `Sync-Skills.bat` en tu Escritorio.
- O usa PowerShell: `powershell -File C:\Users\USUARIO\sync-skills-to-opencode.ps1`

### Automatización
- Se ha configurado una tarea programada en Windows (**AntigravityOpenCodeSync**) que se ejecuta diariamente a las 09:00 AM.

### Verificación de Salud
- Ejecuta el script de salud: `powershell -File C:\Users\USUARIO\.opencode\check-bridge-health.ps1`
- Para inspección vía Python: `python C:\Users\USUARIO\.opencode\antigravity-integration.py health`

### Inspección de Skills (CLI)
Ahora puedes leer el contenido de las habilidades directamente desde la terminal:
- **Listar**: `python C:\Users\USUARIO\.opencode\antigravity-integration.py list`
- **Leer**: `python C:\Users\USUARIO\.opencode\antigravity-integration.py read WORKFLOW`
- **Alias (Run)**: `python C:\Users\USUARIO\.opencode\antigravity-integration.py run BLUEPRINTS`

## ⚙️ Configuración
El archivo `config.yaml` en `.opencode` define las rutas absolutas y parámetros de sincronización. No modifiques las rutas a menos que muevas la instalación de Antigravity.

## 🛠️ Troubleshooting Windows
1. **Errores de Permisos**: Asegúrate de ejecutar PowerShell como Administrador si la tarea programada falla.
2. **Path**: Si `python` no es reconocido, asegúrate de tenerlo en tu PATH de Windows.
3. **Execution Policy**: Los scripts usan `-ExecutionPolicy Bypass` para evitar bloqueos de ejecución de Windows.

---
**TITAN NOMINAL - Estatus: Puente Operativo**
