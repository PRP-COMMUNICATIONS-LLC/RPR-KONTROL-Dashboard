# KONTROL React + Backend Inventory (current repo)

**Scope:** PERPLEXITY workspace (Google Drive path)  
**Date:** 2026-01-29  
**Purpose:** Identify dashboard UI and backend logic for future carve-out into KONTROL repo(s) and mcp-proxy / governance Firestore. Website and hosting remain untouched.

---

## 1. Dashboard / governance-style UI (in this workspace)

There is **no** "KONTROL" React app in this repo. The compliance/risk dashboard is **Angular**:

| Location | Description |
|----------|-------------|
| **rpr-verify-v1.1/** | RPR-VERIFY-V1 Angular app – Reporting & Compliance Dashboard |
| `rpr-verify-v1.1/src/components/dashboard/dashboard.component.ts` | Dashboard: KPIs, SLA chart, dispute outcomes, fraud analysis, vulnerable customer metrics |
| `rpr-verify-v1.1/src/components/cases/cases-list.component.ts` | Cases list (filters, grid, pagination) |
| `rpr-verify-v1.1/src/components/cases/case-detail.component.ts` | Case detail (tabs, risk analysis) |
| `rpr-verify-v1.1/src/components/disputes/dispute-detail.component.ts` | Dispute detail (timeline, docs, actions) |
| `rpr-verify-v1.1/src/components/sidebar.component.ts` | Sidebar nav (Dashboard, Cases, Disputes, Reports) |
| `rpr-verify-v1.1/src/app.routes.ts` | Routes: `/dashboard`, `/cases`, `/cases/:id`, `/disputes` |
| `rpr-verify-v1.1/blueprint.md` | Design system and component tree |

**Stack:** Angular v20+, Signals, Tailwind, D3.js. Firebase used only for **hosting** (firebase.json → `dist/rpr-verify-v1/browser`). No Firestore or governance APIs in this app’s source.

**rpr-communications---global-reach/**  
- Second Angular app; case-detail has a TODO for Firestore. Not labeled KONTROL.

**rpr_flutter_app/**  
- Flutter RPR VERIFY (Dashboard, Reports, Settings). Not React; separate product surface.

---

## 2. Backend / Firestore / governance logic (in this workspace)

- **No dedicated KONTROL backend** or SENTINEL/KONTROL integration code under this workspace.
- Handover doc references the **canonical** RPR-VERIFY repo at:
  - `/Users/puvansivanasan/PERPLEXITY/RPR-VERIFY/RPR-VERIFY-V1/`  
  with `frontend/` (Angular + Firestore `cases`, file upload to Storage) and `backend/` (Node/Express, Cloud Run, Firebase Admin, GCS, Drive). That path is **outside** this Google Drive PERPLEXITY folder.

**In this workspace:**

| Item | Role |
|------|------|
| `rpr-verify-v1.1/firebase.json` | Hosting config only |
| `rpr-verify-v1.1/DEPLOYMENT.md` | Firebase Hosting deploy notes |
| Root `src:app:config:firebase.config.ts` | Firestore `getFirestore(app)` – standalone config (unusual filename) |
| `rpr-communications---global-reach/` case-detail | TODO: “Replace with actual Firestore data when available” |
| **POST MORTEN-LOCKED/RPR-VERIFY-HANDOVER-DOCUMENT.md** | Firestore collections (`cases`), Cloud Run backend, env, components list |
| **POST MORTEN-LOCKED/RPR-VERIFY-INCIDENT-REPORT.md** | Incident and audit/history notes |

**Governance / MCP (outside app code):**

| Item | Role |
|------|------|
| `spaces/RPR COMMUNICATIONS/RPR-SPACE-CONFIG.json` | `governance_auto_enforcement`, rules; “Do not change governance or protocols” |
| Cursor MCP `user-rpr-governance-mcp` | Under `.cursor/` (Pieces LTM / memory tools); not in this repo tree |

---

## 3. Firestore collections (from handover)

- **cases:** `caseNumber`, `clientName`, `status`, `createdAt`, `documents[]`
- Handover also references Firestore rules, service-to-Firestore writes, and future “governance” Firestore in the canonical RPR-VERIFY backend.

---

## 4. Recommended carve-out (next phase)

- **UI to move:** Treat **rpr-verify-v1.1** (or a clone) as the “compliance dashboard” surface; rename/rebrand to KONTROL as needed. Optionally include relevant routes/components from **rpr-communications---global-reach**.
- **Backend:** Carve out or replicate governance APIs and Firestore usage from the canonical repo (`/Users/puvansivanasan/PERPLEXITY/RPR-VERIFY/RPR-VERIFY-V1/backend`) into KONTROL backend, pointing at **mcp-proxy** and governance Firestore.
- **Leave in place:** Current website hosting (e.g. Firebase Hosting for rpr-verify-v1.1) and any non-KONTROL app code until explicitly migrated.