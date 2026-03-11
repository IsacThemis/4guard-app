#!/bin/bash
# ✅ TITAN Blueprint Validator: Architectural Integrity

echo "🔍 Validating Clean Architecture layers..."

# Rule: Domain must not import Infrastructure or Presentation
grep -r "from '../../infrastructure'" src/domain && echo "❌ ERROR: Domain imports Infrastructure" && exit 1
grep -r "from '../../presentation'" src/domain && echo "❌ ERROR: Domain imports Presentation" && exit 1

# Rule: Domain must not import Application (if application layer exists)
grep -r "from '../../application'" src/domain && echo "❌ ERROR: Domain imports Application" && exit 1

echo "🟢 SUCCESS: Clean Architecture layers are isolated."
exit 0
