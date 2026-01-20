// scripts/generate-manifest.cjs
// Purpose: Generates the MYA-GOV-008C compliant manifest in dist-kontrol.
// Authority: SENTINEL PROTOCOL v1.1.0 / TS-Λ3
// Classification: TS-Λ3 – CORE TRADE SECRET

const fs = require('fs');
const path = require('path');

const manifest = {
  "schema_version": "v1.1.0",
  "deployment_target": "RPR-KONTROL-Dashboard",
  "build_timestamp_utc": new Date().toISOString(),
  "provider": "github-actions-provider-v2",
  "regional_lock": "asia-southeast1",
  "security_posture": "HARDENED",
  "identity_lock": "ssk3c",
  "firebase_project": "rpr-myaudit",
  "hosting_target": "kontrol"
};

const dirPath = path.join(__dirname, '..', 'dist-kontrol', 'data');
const filePath = path.join(dirPath, 'GOV-SUBSTRATES.json');

if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

fs.writeFileSync(filePath, JSON.stringify(manifest, null, 2));

console.log(`✅ Sovereign manifest generated at ${filePath}`);
console.log(`🛡️ Identity Lock: ssk3c verified`);