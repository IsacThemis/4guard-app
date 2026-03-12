# 🦅 MANUAL MAESTRO DE COLABORADORES: BIENVENIDO A PROMETEO TITAN

Este documento es tu guía definitiva para instalar, comprender y trabajar con el ecosistema **Prometeo TITAN**. Está diseñado para ser intuitivo y rápido, ya seas un desarrollador experto o un perfil menos técnico. Nuestro objetivo es común: mantener la **Deuda Técnica Cero**.

---

## 📍 1. ¿Qué es TITAN? (En palabras simples)
TITAN no es solo una carpeta con código, es una arquitectura de gobierno para Inteligencia Artificial. Piensa en él como una **Mente Digital** dividida en tres partes:

1.  **El Cerebro (`core`)**: El servidor principal escrito en TypeScript (Clean Architecture) donde TITAN piensa y procesa la información.
2.  **La Mochila de Habilidades (`skills`)**: Herramientas integradas que TITAN usa para tareas especializadas (leyes, diseño estructural, organización de tareas).
3.  **El Puente (`.opencode`)**: Un túnel de comunicación que permite a TITAN compartir su inteligencia con IAs externas como OpenCode o Claude Desktop.

---

## 🛠️ 2. Preparando tu Computadora (Requisitos Previos)
Antes de empezar, necesitamos dotar a tu PC de estas 5 herramientas. Instálalas si no las tienes (basta con dar "Siguiente" durante la instalación de cada una):

1.  **Node.js (v20+)**: El motor principal que hace que TITAN despierte.
2.  **Docker Desktop**: La "caja fuerte" donde TITAN levanta sus recuerdos (Redis) y bases de datos a largo plazo (MySQL).
3.  **Python (v3.10+)**: El traductor vital para que el "Puente" funcione sin fallos en Windows.
4.  **Antigravity / VS Code**: Tu libreta digital para leer y editar el proyecto.
5.  **Git**: El controlador de versiones que nos permite guardar cambios de manera segura.

---

## 🚀 3. Guía de Despliegue (Paso a Paso)

### Paso A: Obtención del Código
Abre tu consola (o Git Bash) y baja el proyecto a tu computadora. Ábrelo en Antigravity o VS Code.
```bash
git clone <url-del-repositorio>
cd "Prometeo TITAN"
```

### Paso B: Encender la Memoria (Infraestructura)
Abre la terminal de tu editor (`Ctrl + Ñ`) y arranca las bases de datos en segundo plano:
```bash
docker-compose up -d
```
*(TITAN necesita Redis activado para usar su ChronicleKeeper).*

### Paso C: Enseñar a TITAN a pensar (Compilación)
Dentro de la misma terminal, entra a la zona del cerebro y prepáralo:
```bash
cd core
npm install
npm run build
```

---

## 🔌 4. Integraciones Avanzadas y El Puente

### Opción A: Conectando el Puente OpenCode
Para que herramientas externas vean las habilidades de TITAN, busca el archivo **`Sync-Skills.bat`** en la carpeta principal o en tu escritorio y dale doble clic. Esto alineará automáticamente todas las piezas en Windows.

### Opción B: Configurando tu Cliente MCP (ej. Claude Desktop)
Para hablar directo con el núcleo TITAN desde tu aplicación de IA, edita tu archivo de configuración `mcp_config.json` agregando lo siguiente:

```json
{
  "mcpServers": {
    "prometeo-titan": {
      "command": "node",
      "args": ["C:/Ruta/Absoluta/Hacia/El/Proyecto/Prometeo TITAN/core/dist/index.js"]
    }
  }
}
```
> [!IMPORTANT]
> Debes cambiar la propiedad `args` por la ruta real y absoluta donde guardaste la carpeta del proyecto en tu disco duro. (Ojo: usa `/` en lugar de `\` para evitar errores en el JSON).

---

## 🚀 5. El Nodo Beta: OpenCode y el Puente de Sincronización
Si quieres operar con la misma configuración avanzada que usamos actualmente, puedes habilitar OpenCode como un "Nodo Beta" conectado a TITAN. OpenCode funcionará como una extensión que lee las habilidades de TITAN de manera sincronizada.

### A. Preparar el Entorno del Puente
Hemos incluido una carpeta limpia pre-configurada para facilitarte la vida. 
1. Ve a la carpeta `Configuracion_OpenCode` dentro de este proyecto.
2. Copia la carpeta **`.opencode`** que se encuentra adentro.
3. Pégala en tu carpeta de usuario de Windows (ej. `C:\Users\TU_USUARIO\`).

### B. Archivos y Rutas Clave del Puente
Al copiar esa carpeta, tu PC ahora tiene los siguientes archivos configurados:
- **Directorio Compartido (`shared-skills`)**: `C:\Users\TU_USUARIO\.opencode\shared-skills` (Aquí llegarán las skills listas para OpenCode).
- **El Motor (`sync-skills-to-opencode.ps1`)**: Script de PowerShell que une las skills de Antigravity para OpenCode.
- **Configuración (`config.yaml`)**: Reglas de sincronización y rutas absolutas.
- **Acceso Rápido (`Sync-Skills.bat`)**: Sirve para forzar la sincronización con un simple doble clic (ideal para usuarios no técnicos).
- **Inspección de Salud (`antigravity-integration.py`)**: Script en Python para revisar si las skills pasaron correctamente.

### C. Pasos para Activar el Nodo Beta en OpenCode
1.  **Abre OpenCode** en tu computadora.
2.  Ve a la configuración de OpenCode (ícono de engranaje o `Settings`).
3.  Busca la sección de **Skills**, **Agentes** o *Directorios de Plugins*.
4.  Añade la ruta del directorio compartido: `C:\Users\TU_USUARIO\.opencode\shared-skills` (reemplaza `TU_USUARIO` por tu verdadero nombre de usuario).
5.  Guarda. OpenCode detectará los clusters (BLUEPRINTS, WORKFLOW, etc.).

### D. Manteniendo la Sincronización
Recuerda que TITAN (Antigravity) siempre es la "fuente de verdad". Si se añaden nuevas skills a TITAN, deberás:
- Ejecutar el archivo preconfigurado **`Sync-Skills.bat`** (doble clic). 
- Esto empujará todas las novedades a `shared-skills`, permitiendo que OpenCode asimile el nuevo conocimiento.

### E. Inspección y Diagnóstico del Puente (CLI)
Si en algún momento necesitas verificar exactamente qué habilidades se están compartiendo o si la sincronización fue exitosa, abre tu terminal y ejecuta los siguientes comandos Python (asegúrate de cambiar `TU_USUARIO` por tu nombre de usuario real):

1. **Revisar la salud del puente (Asegurar carpetas y manifiesto):**
   ```bash
   python C:\Users\TU_USUARIO\.opencode\antigravity-integration.py health
   ```
2. **Listar todas las Skills enviadas a OpenCode:**
   ```bash
   python C:\Users\TU_USUARIO\.opencode\antigravity-integration.py list
   ```
3. **Leer el contenido interno de una Skill (Ejemplo: WORKFLOW):**
   ```bash
   python C:\Users\TU_USUARIO\.opencode\antigravity-integration.py read WORKFLOW
   ```

### F. ¿Qué hacer si cambian las reglas del Puente?
Si el equipo central de TITAN realiza modificaciones en la arquitectura del puente (por ejemplo, si actualizamos el script `sync-skills-to-opencode.ps1` o el archivo `config.yaml` dentro del repositorio), tus colegas solo necesitan hacer esto para estar al día:

1.  Hacer un `git pull` (o descargar la última versión del código fuente) para traer los cambios más recientes.
2.  Volver a copiar el contenido de la carpeta `Configuracion_OpenCode\.opencode`.
3.  Pegarlo en su carpeta de usuario de Windows (`C:\Users\TU_USUARIO\`), reemplazando los archivos viejos por los nuevos.
   *(Nota: Esto no borrará sus configuraciones personales de OpenCode, solo actualizará el motor de sincronización interno).*

---

## 🧠 6. El Arsenal de Habilidades (TITAN Skills)
Una vez conectado, TITAN tiene 5 clusters de "súper poderes" operativos:
1.  **BLUEPRINTS**: Conoce nuestros estándares limpios de creación de código.
2.  **WORKFLOW**: Te avisa de reglas de gobernanza antes de que rompas algo.
3.  **SUPERPOWERS**: Módulos de automatización avanzada (como el puente).
4.  **NOTEBOOKLM**: Sabe buscar en cuadernos externos para darte respuestas precisas.
5.  **PLANNING**: Analiza problemas difusos y genera hojas de ruta claras.

---

## 🛡️ 7. Protocolos Básicos de Seguridad
Para asegurar que todo se mantenga limpio *(NOMINAL)*, hay comandos que deberás usar como colaborador:

- **Auditoría Final (`/audit`)**: Escribe siempre esto antes de terminar de trabajar. TITAN revisará el Typescript y los módulos para darte el "Visto Bueno".
- **Punto de Guardado (`/git-checkpoint`)**: Escribe esto antes de tocar algo sensible. Es similar a guardar tu progreso en un juego.
- **Notas de Privacidad**: El archivo `.gitignore` ya protege contraseñas (`.env`) y librerías (`node_modules`). ¡Nunca las envíes al repositorio público! (Nota: Verifica cambiar el password de `docker-compose.yml` si sales de local).

---

## 🤝 8. ¿Necesitas Diagnóstico?
Si el sistema deja de responderte o las habilidades no cargan:
1. Ejecuta de nuevo `Sync-Skills.bat`.
2. O pregúntale al chat: *¿TITAN, estás operativo?* Él sabe cómo auto-diagnosticarse.

---
**¡Listo! Prometeo TITAN está listo para ayudarte** 🚀
