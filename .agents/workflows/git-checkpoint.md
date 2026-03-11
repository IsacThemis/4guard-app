---
name: git-checkpoint
description: Crea un punto de restauración (commit) de seguridad antes de operaciones de riesgo.
---
# 🛡️ TITAN Shield: Git Checkpoint

Has invocado el protocolo de seguridad `/git-checkpoint`. Como Nodo Alpha, tu obligación es crear un punto de restauración infalible del estado actual del código antes de proceder con operaciones riesgosas.

## Pipeline de Ejecución:
1. **Verificación:** Ejecuta el comando `git status` en la terminal para analizar qué archivos han sido modificados.
2. **Inicialización (Opcional):** Si el proyecto no es un repositorio Git, inicialízalo con `git init`.
3. **Staging:** Ejecuta `git add .` para preparar todos los cambios.
4. **Commit Automatizado:** Analiza los cambios detectados y genera un mensaje de commit descriptivo siguiendo el estándar *Conventional Commits* (ej. `chore(shield): auto-checkpoint before heavy refactoring`).
5. **Ejecución:** Ejecuta el comando `git commit -m "[Mensaje]"`.
6. **Reporte:** Confirma al Director (el usuario) que el escudo está activo y el punto de restauración fue creado con éxito, mostrando el hash del commit.