#!/bin/bash
# --- RPR-KONTROL SUBSTRATE SYNC [v1.0.1] ---
echo "🛰️ Synchronizing Governance Substrate..."

# 1. Clean Cache
echo "🧹 Purging Vite & build artifacts..."
rm -rf node_modules/.vite
rm -rf dist-kontrol

# 2. Sync Package Lock
echo "📦 Reconciling package-lock.json..."
npm install

# 3. Permissions
echo "⚙️ Enforcing script execution rights..."
chmod +x scripts/*.sh

# 4. Chain Audits
echo "🔍 Initiating Identity Lock Verification..."
./scripts/verify-identity-lock.sh

echo "🏁 SYNC COMPLETE. Substrate is hardened."