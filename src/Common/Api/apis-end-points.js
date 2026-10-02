// this is our base url or machine api
const baseURL = "http://192.168.18.241";

// Legacy WOF (Write-Off) endpoints — predate the Fraud pivot, no corresponding
// backend service exists anymore. Kept only because a few dead action creators
// (completeReport/creditPolicyReport/balanceSheetReport in reports_actions.js)
// still import them; not wired into any reachable route.
const findCustomerFromMisysServiceURL = ":9001/WOF_Search";
const findCustomerAccountDetailsFromMisysServiceURL = ":9001/WOF_Search";
const WriteOffServiceURL = ":9002/WOF_Persist";
const ApprovalsServiceURL_legacyUnused = ":9003/WOF_Approvals";
const reportsURL_legacyUnused = ":9004/WOF_Reports";

// Deployed backend instances on the shared server (192.168.18.243) — all 11
// services are live there, 5 of them renamed to a shorter route path during
// deployment (see API-Endpoints-Server.md for the full table).
const authenticationApi = "http://192.168.18.243:9000/Fraud_Auth"; // ERM_AuthService (renamed route)
const abcactionauth = authenticationApi; // ERM_AuthService (alias used by SignUp flow)
const SetupFormApi2 = authenticationApi; // ERM_AuthService (Roles/EscalationMatrix/User admin live here too)
const SetupFormApi = "http://192.168.18.243:8577/Fraud_Admin"; // Fraud_Admin
const InvestigationOfficerAPI = "http://192.168.18.243:25457/Fraud_CC"; // Fraud_CCService (renamed route)
const InvestigationOfficerAPIDC = "http://192.168.18.243:30843/Fraud_DC"; // Fraud_DCService (renamed route)
const InvestigationOfficerAPIADC = "http://192.168.18.243:64384/Fraud_ADC"; // Fraud_ADCService (renamed route)
const InvestigationOfficerAPIBBK = "http://192.168.18.243:30076/Fraud_BBKonnect"; // Fraud_BBKonnect
const InvestigationOfficerAPINONAPI = "http://192.168.18.243:36495/Fraud_NPI"; // Fraud_NPIService (renamed route)
const InvestigationOfficerAPINDB = "http://192.168.18.243:4655/Fraud_NegativeDatabase"; // Fraud_NegativeDatabase
const InvestigationManagerAPI = "http://192.168.18.243:20272/Fraud_Approval"; // Fraud_Approval
const downloadExcelFile = "http://192.168.18.243:9004/Fraud_Reports"; // Fraud_Reports (all *ReportExcel + AuditTrailReportDownload calls)

// Legacy WOF endpoints kept as-is (unused, see note above)
const findCustomerFromMisysApi = baseURL + findCustomerFromMisysServiceURL;
const findCustomerAccountDetailsFromMisysApi =
  baseURL + findCustomerAccountDetailsFromMisysServiceURL;
const WriteOffApi = baseURL + WriteOffServiceURL;
const ApprovalsApi = baseURL + ApprovalsServiceURL_legacyUnused;
const reportsApi = baseURL + reportsURL_legacyUnused;

export {
  authenticationApi,
  findCustomerFromMisysApi,
  findCustomerAccountDetailsFromMisysApi,
  WriteOffApi,
  ApprovalsApi,
  reportsApi,
  SetupFormApi,
  downloadExcelFile,
  abcactionauth,
  InvestigationOfficerAPI,
  InvestigationOfficerAPIDC,
  InvestigationOfficerAPIADC,
  InvestigationOfficerAPINONAPI,
  InvestigationOfficerAPIBBK,
  InvestigationManagerAPI,
  SetupFormApi2,
  InvestigationOfficerAPINDB,
};
