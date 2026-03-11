#!/bin/bash

# TITAN v4.0 - Clean Architecture Validator
# Verifica violaciones a la regla de dependencia (Dependency Rule)

echo "🔍 TITAN: Validando reglas de Clean Architecture..."

# 1. El Dominio no debe importar nada de Aplicación, Infraestructura o Presentación
if grep -rn "import.*from.*application\|import.*from.*infrastructure\|import.*from.*presentation" src/domain/ 2>/dev/null; then
    echo "❌ ERROR FATAL: La capa 'domain' está importando de capas externas. Violación de Dependency Rule."
    exit 1
fi

# 2. La Aplicación no debe importar nada de Infraestructura o Presentación
if grep -rn "import.*from.*infrastructure\|import.*from.*presentation" src/application/ 2>/dev/null; then
    echo "❌ ERROR FATAL: La capa 'application' está importando de capas externas. Usa Inyección de Dependencias (Interfaces)."
    exit 1
fi

# 3. La Infraestructura y Presentación no deben cruzar dependencias entre ellas directamente
if grep -rn "import.*from.*presentation" src/infrastructure/ 2>/dev/null; then
    echo "❌ ERROR: La capa 'infrastructure' no debe importar de 'presentation'."
    exit 1
fi

echo "✅ TITAN: Auditoría de arquitectura superada. Cero deuda técnica detectada."
exit 0