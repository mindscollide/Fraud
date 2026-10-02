# FRMU Backend — Server API Endpoints

Server: `192.168.18.243` (Windows server, hostname `TRESMARK`). All 11 backend services run as separate IIS sites, each on its own port. Every endpoint is `POST` only — this is an RPC-over-HTTP dispatch pattern, not REST (see `SRS-Fraud-Digitization.md` §8 for the FE-side wiring).

**All 11 services are now deployed to this server.**

**Important:** 5 of these services were renamed during deployment. The route path is **not** derived from the service's original folder/project name — use the table below.

⚠️ **Check before assuming this is fully wired up**: `src/Common/Api/apis-end-points.js` line 2 has `baseURL = "http://192.168.18.241"` (used only by the dead/legacy WOF endpoints, not the 11 Fraud services below) — that's `.241`, one digit off from this server's `.243`. Confirm whether that's a typo or genuinely a different box.

## Base URLs

| Service | Port | Route path | Full base URL | Status |
|---|---|---|---|---|
| ERM_AuthService | 9000 | `/Fraud_Auth` *(renamed from `/ERM_Auth`)* | `http://192.168.18.243:9000/Fraud_Auth` | ✅ Deployed |
| Fraud_ADCService | 64384 | `/Fraud_ADC` *(renamed from `/Fraud_ADCService`)* | `http://192.168.18.243:64384/Fraud_ADC` | ✅ Deployed |
| Fraud_CCService | 25457 | `/Fraud_CC` *(renamed from `/Fraud_CCService`)* | `http://192.168.18.243:25457/Fraud_CC` | ✅ Deployed |
| Fraud_DCService | 30843 | `/Fraud_DC` *(renamed from `/Fraud_DCService`)* | `http://192.168.18.243:30843/Fraud_DC` | ✅ Deployed |
| Fraud_NPIService | 36495 | `/Fraud_NPI` *(renamed from `/Fraud_NPIService`)* | `http://192.168.18.243:36495/Fraud_NPI` | ✅ Deployed |
| Fraud_Admin | 8577 | `/Fraud_Admin` | `http://192.168.18.243:8577/Fraud_Admin` | ✅ Deployed |
| Fraud_Approval | 20272 | `/Fraud_Approval` | `http://192.168.18.243:20272/Fraud_Approval` | ✅ Deployed |
| Fraud_Audit | 18512 | `/Fraud_Audit` | `http://192.168.18.243:18512/Fraud_Audit` | ✅ Deployed |
| Fraud_BBKonnect | 30076 | `/Fraud_BBKonnect` | `http://192.168.18.243:30076/Fraud_BBKonnect` | ✅ Deployed |
| Fraud_NegativeDatabase | 4655 | `/Fraud_NegativeDatabase` | `http://192.168.18.243:4655/Fraud_NegativeDatabase` | ✅ Deployed |
| Fraud_Reports | 9004 | `/Fraud_Reports` | `http://192.168.18.243:9004/Fraud_Reports` | ✅ Deployed |

## Exact FE file to update: `src/Common/Api/apis-end-points.js`

This is where every one of these base URLs is hardcoded (lines 17–28). Current content (still pointing at `localhost` + old route names for the 5 renamed ones — this needs updating now that all 11 are on the server):

```js
const authenticationApi = "http://localhost:9000/ERM_Auth"; // ERM_AuthService
const abcactionauth = authenticationApi;
const SetupFormApi2 = authenticationApi;
const SetupFormApi = "http://localhost:8577/Fraud_Admin"; // Fraud_Admin
const InvestigationOfficerAPI = "http://localhost:25457/Fraud_CCService"; // Fraud_CCService
const InvestigationOfficerAPIDC = "http://localhost:30843/Fraud_DCService"; // Fraud_DCService
const InvestigationOfficerAPIADC = "http://localhost:64384/Fraud_ADCService"; // Fraud_ADCService
const InvestigationOfficerAPIBBK = "http://localhost:30076/Fraud_BBKonnect"; // Fraud_BBKonnect
const InvestigationOfficerAPINONAPI = "http://localhost:36495/Fraud_NPIService"; // Fraud_NPIService
const InvestigationOfficerAPINDB = "http://localhost:4655/Fraud_NegativeDatabase"; // Fraud_NegativeDatabase
const InvestigationManagerAPI = "http://localhost:20272/Fraud_Approval"; // Fraud_Approval
const downloadExcelFile = "http://localhost:9004/Fraud_Reports"; // Fraud_Reports
```

**Should become** (all 11, pointing at the server now):

```js
const authenticationApi = "http://192.168.18.243:9000/Fraud_Auth"; // ERM_AuthService (renamed route)
const abcactionauth = authenticationApi;
const SetupFormApi2 = authenticationApi;
const SetupFormApi = "http://192.168.18.243:8577/Fraud_Admin"; // Fraud_Admin
const InvestigationOfficerAPI = "http://192.168.18.243:25457/Fraud_CC"; // Fraud_CCService (renamed route)
const InvestigationOfficerAPIDC = "http://192.168.18.243:30843/Fraud_DC"; // Fraud_DCService (renamed route)
const InvestigationOfficerAPIADC = "http://192.168.18.243:64384/Fraud_ADC"; // Fraud_ADCService (renamed route)
const InvestigationOfficerAPIBBK = "http://192.168.18.243:30076/Fraud_BBKonnect"; // Fraud_BBKonnect
const InvestigationOfficerAPINONAPI = "http://192.168.18.243:36495/Fraud_NPI"; // Fraud_NPIService (renamed route)
const InvestigationOfficerAPINDB = "http://192.168.18.243:4655/Fraud_NegativeDatabase"; // Fraud_NegativeDatabase
const InvestigationManagerAPI = "http://192.168.18.243:20272/Fraud_Approval"; // Fraud_Approval
const downloadExcelFile = "http://192.168.18.243:9004/Fraud_Reports"; // Fraud_Reports
```

Note the 5 route-name changes (`/ERM_Auth`→`/Fraud_Auth`, `/Fraud_ADCService`→`/Fraud_ADC`, `/Fraud_CCService`→`/Fraud_CC`, `/Fraud_DCService`→`/Fraud_DC`, `/Fraud_NPIService`→`/Fraud_NPI`) — the other 6 keep their original route paths, only the host/port changes for those.

## Request shape (every endpoint, all 11 services)

`POST` with `multipart/form-data` body:

| Field | Required | Notes |
|---|---|---|
| `RequestMethod` | Yes | Must be `"ServiceManager.<MethodName>"` — matches what's already in `apis-config.js` (e.g. `RequestMethod: "ServiceManager.Login"`), so no change needed there, only the base URLs above. |
| `RequestData` | Yes | JSON string, the actual method's request model. |
| `RequestDateTime` | No | Several methods ignore it entirely. |

Header `_token`: required for every method except the token-exempt list (`Login`, `RefreshToken`, `SignUp`, `ValidateEmailFromAD`, `ValidateEmailAndPasswordFromAD`, `RoleList`, `ValidateToken`, `OfficialHolidays`, `AllTransactionTypes`, `AllRegion`, `NextGeneratedID`).

## Test login

`RequestMethod=ServiceManager.Login`, body:
```json
{"UserName":"admin","Password":"anything","Device":"FE","DeviceID":"fe-1"}
```
`AllowAuthToLDAP=false` in this environment means any password works — only `UserName` is checked against the seeded `LDAPAccount`. Other seeded test users (any password): `sysadmin`, `invofficer`, `invmanager`, `qamanager`, `mismanager` — see `SRS-Fraud-Digitization.md` §2 for what each role can do.

## Recommended: verify each service is actually reachable before wiring up FE

From any machine that can reach `192.168.18.243`, or from the server itself:
```bash
curl -X POST http://192.168.18.243:9000/Fraud_Auth -F "RequestMethod=ServiceManager.Login" -F "RequestData={\"UserName\":\"admin\",\"Password\":\"x\",\"Device\":\"Test\",\"DeviceID\":\"d1\"}"
```
Repeat for the other 10 ports/routes with any lightweight `ServiceManager.*` call (or just check for a non-timeout response — even a 400/404 confirms the site is up, whereas a connection refused/timeout means IIS or the firewall needs a look).
