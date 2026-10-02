# SRS — Fraud Digitization (reference digest)

Digest of `SRS - Fraud Digitization.docx` (Version 6.0, prepared by Muhammad Aamir / Minds Collide (Pvt.) Ltd. for HBL), located at
`E:\FRUAD\SRS\SRS - Fraud Digitization\SRS - Fraud Digitization\SRS - Fraud Digitization.docx`.
This file is a working reference for developing `FRAUD-MAIN-GIT` (the frontend) — it summarizes requirements and business rules, and maps them to where they live (or should live) in this codebase. It is **not** the source of truth; when in doubt, re-read the original `.docx` (also `BRD_FRMU.docx` and `FRMU - Signup & Security Admin.docx` in the same folder, not yet digested here).

## 1. Purpose & scope

A platform for HBL's Fraud/Risk Management Unit (FRMU) to log, investigate, approve, and report on customer dispute cases across channels, plus maintain a Negative Database of known-fraud individuals/entities. Centralizes what was previously handled via Excel (~100,000 legacy entries per product, 5 products, to be migrated).

Key non-functional requirements called out in the SRS:
- Full audit log per action: User Name, User ID, Action, Old Value, New Value, Date & Time.
- Users are assigned per-Region (South/North/Central) and can hold multiple Transaction Types.
- Dispute cases sent for approval are visible to **all** Investigation Managers assigned that Transaction Type (first-come-first-served, not per-case assignment) — see [Container/InvestigationManager](src/Container/InvestigationManager).
- IMEI # auto-captured for disputed IB/MB (Digital Banking) transactions.
- All sources except Credit Card come from "Data Lake" (IB/MB, Konnect, IRIS).
- Search fields: auto-generated Reference #, CNIC, Approval Code, Transaction ID, IMEI #, Account #, Merchant name/ID, Date Period, Customer Name.
- Dates: `DD-MM-YYYY`, calendar picker on every date field, amounts comma-formatted.
- LOVs: single-select, searchable.
- One Reference # groups all transactions of the *same dispute type* against the *same* Card/Account Number, until closed; different dispute types against the same number get separate Reference #s.
- "Maker Checker" (the Save vs Save & Send-for-Approval split) must be configurable — not currently exposed as a toggle anywhere in this repo; treat as an implicit always-on requirement.
- Expected load: 20–25 concurrent users/region, 15–20 cases/day (300–500/month).

Explicitly deferred to **Phase 2** (do not expect these to exist yet, and don't be surprised if FE code has dead/commented-out stubs for them): Excel bulk-transaction upload per dispute type, Suspicious IMEI alerting, Acquiring (POS/IPG) & Application-level DB, high-aging escalation report, IMEI Utility screen, Merchant Acquiring Database, BB Konnect Agent Cases, disputed E-Commerce transactions as a distinct flow.

## 2. Roles

| Role | roleID (FE) | Capabilities |
|---|---|---|
| Security Administrator | — (separate LDAP-gated flow, not modeled as an app roleID in `routingData.js`) | Creates users (final step after System Admin approves signup), edits user role/active-status, views Security Admin reports |
| System Administrator | `2` | Configures all Setup/LOV screens, reassigns Region + Transaction Types for IO/IM/QA/MIS users, approves/rejects signup requests, approves/rejects QA Manager's delete requests, views deleted cases |
| Investigation Officer | `3` | Capture/edit/search/export disputes for their assigned Transaction Types (CC, DC, ADC, Non-API, BBK, Negative Database) |
| Investigation Manager | `4` | Approve/reject "Pending For Approval" cases for their assigned Transaction Type(s); export all Transaction Types |
| QA Manager | `5` | Delete dispute cases (any status) — routes to System Admin for approval; view/export Audit Trail; export all Transaction Types |
| MIS Manager | `6` | View/export Audit Trail; export all Transaction Types |

This matches the `roleID` branches already in [store/actions/auth-actions.js](src/store/actions/auth-actions.js) and the `UserSelection()` switch in [Routes/routingData.js](src/Routes/routingData.js). Security Administrator has no `roleID` branch in current FE login code — worth confirming with backend whether it logs into this same portal or a separate LDAP/Active-Directory-management tool (the doc's user-creation email flow reads as if Security Admin operates in "LAMS", a distinct system referenced only by name in the email templates).

## 3. Signup & user provisioning flow

1. **Requester** (any future IO/IM/QA/MIS user) hits Signup, enters LDAP login+password, verified live against LDAP (`domestic.hbl.com` per backend config). On success, picks First Name, Last Name, Region(s) (multi-select, select-all/deselect-all, ≥1 required — note: region selection here is *only* for the Region-wise Staff List report, it does **not** restrict which regions' cases a user can work), Transaction Type(s) (multi-select, ≥1 required — auto-all for QA Manager/MIS Manager signups, user can still edit), and Role.
2. Signup fires an email to **System Administrator** with the request details + a login link.
3. System Administrator sees a notification badge, opens Pending Signup Requests, must enter comments before Accept/Reject enable.
   - Reject → email to requester with the rejection reason, flow ends.
   - Accept → email to **Security Administrator** with the same details + login link, notification badge increments for Security Admin.
4. Security Administrator sees the request in a grid (Email, First Name, Last Name, Role, Create User, Delete User icons).
   - Delete User → modal requires a Reason, then removes the request and emails the requester (rejection) and the System Administrator (informational).
   - Create User → confirm dialog → user is created, requester gets a "welcome, click to login" email, System Administrator gets a confirmation email.
5. Post-creation edits: **Security Administrator – Edit User** can change Role and Active/Inactive status only. **System Administrator – Edit User** can reassign Region(s) and Transaction Type(s) for active IO/IM users only (≥1 of each required).

FE code: [Container/Authentication/SignUp](src/Container/Authentication/SignUp), [Container/Admin/SystemAdmin/NewRequestList](src/Container/Admin/SystemAdmin/NewRequestList), [Container/Admin/SystemAdmin/UserManagement/EditUser](src/Container/Admin/SystemAdmin/UserManagement/EditUser). The email bodies above are backend-owned (`ERM_AuthService`/`SharedResources/EmailTemplate`), not FE — listed here only so you recognize expected email content if debugging a reported "wrong email text" issue.

## 4. Setups (LOVs) — System Administrator only

Route: `SystemAdmin/*`, container: [Container/Admin/SystemAdmin/Setup](src/Container/Admin/SystemAdmin/Setup). Every LOV screen (Fraud Type, Source, Individual Involved, Channel, Forged Documents, Fraud/Not-A-Fraud, Company Segment, Source of IB Channel Creation, City, Region, City & Region Mapping, Escalation Matrix, Approval Reasons, Rejection Reasons) shares **one interaction pattern**, spelled out in full only under "Fraud Type" in the SRS and referenced by "see Fraud Type" everywhere else:

- Add: enter value → confirm dialog → inserted into grid with Edit/Delete icons.
- Edit: click Edit → value loads into the input, row disappears from grid, button becomes "Update" → confirm dialog → grid updated.
- Delete: click Delete → if the value is referenced elsewhere ("already in use"), show a blocking info dialog and refuse; otherwise confirm dialog → removed.

Two setups have extra logic beyond the generic pattern:
- **City / Region / City & Region Mapping**: City codes must match the codes used in the transactional/Data Lake databases — this mapping is how a dispute case's Region gets auto-derived at save time (fetch transaction → get its city code → look up Region via City&Region Mapping). If Region auto-assignment on a dispute looks wrong, check this mapping table first, not the dispute-save code.
- **Escalation Matrix**: `{Days threshold, Roles}` pairs. A scheduled job (backend — see `Scheduler/EscalationMatrixEmail.cs` in `ERM_AuthService`, out of FE scope) emails everyone with a matching role once a case's TAT exceeds the threshold while status is In Process or Pending For Approval, attaching a report of `{Reference #, Customer Name, Account Number, Dispute Type, Transaction Amount, Created By, Status, TAT}`.

Seed LOV values given by business (useful for sanity-checking dropdown contents against a fresh DB): Fraud Type (Account Takeover, Call Spoofing, Counterfeit/Skimmed, Fraudulent Use of Account, HBL Konnect, Lost, NRI, Silicon Thumb, Stolen, Suspected Counterfeit), Source (ATM, IBFT-ATM, POS), Individual Involved (Company, Customer, Merchant, Staff-Contractual, Staff-Permanent), Channel (Branches, CIU, FRMU-Investigation, FRMU-Vigilance, PBA-FPF, Risk Management), Forged Documents (Bank Statement, Mule Account, Others, Salary Certificate, Salary Slip, Tempered CNIC), Fraud/Not-A-Fraud (Fraud, Others, Plea Bargain), Company Segment (Individual, Proprietorship, Partnership, Pvt. Ltd., Public Ltd., Public Sector Enterprises), Source of IB Channel Creation (Debit Card, Credit Card, Account Only).

## 5. Dispute case lifecycle (shared across all 6 channels)

Every one of Credit Card (CCD), Debit Card (DCD), ADC, Non-API/E-Com, BB-Konnect (BBK), and — partially — Negative Database (ND) follows the **same skeleton**; the SRS itself only fully documents CCD and DCD, and says the rest are "similar, images omitted." Treat CCD/DCD as the canonical spec for any of the others.

**Entry point** — a dispute type's "Add/Edit" screen always starts with a lookup, not a blank form:
- CCD and ND search by **CNIC only**.
- DCD, ADC, Non-API, BBK search by **CNIC or Account Number** (user picks which).
- CNIC-path: search Fraud DB first; if not found there, search IRIS/Digital Banking; if found there, list that CNIC's distinct Account Numbers (date range required, defaults to 1 year) for the user to pick one.
- Account-Number-path: search Fraud DB first; if not found, search IRIS/Digital Banking directly by that number.
- If found in Fraud DB: show a read-only Customer header (CNIC/Account/Name/City) + a grid of that customer's existing cases (`Case Reference #, ..., Status ∈ {In Process, Pending For Approval, Approved}, Edit`). Edit icon only shows for `In Process` rows. If none are `In Process`, an "Add New Record" button appears instead.
- If not found anywhere: block creation with a "no record, do you wish to create a new record" / "not found in IRIS" style message per the exact wording in the SRS (useful for matching QA test expectations to the literal strings).

**Form sections**, once past the lookup: **Customer Details** (mostly read-only/auto-populated from IRIS for DCD/ADC/Non-API/BBK; manually entered for CCD since it has no IRIS lookup yet) → **Transaction Details** (a selectable grid of auto-fetched transactions **plus** a manual add-row form with the same fields; duplicate Transaction IDs are rejected) → **Date** (Case Received Date auto = today; **Case Resolved**/**Case Resolved Date** are read-only, flipped to Yes/today only when an Investigation Manager approves the case — i.e. these are *derived*, never user-editable, even on Edit) → **Other/Closure Details** (channel-specific fields, TAT/Aging auto-calculated on working days) → **Files Upload** (Word/Excel/PDF/image, ≤10MB, click filename to preview in a read-only modal).

**Save behavior** — always exactly three buttons, same rules everywhere:
- *Save* → status `In Process`, still editable.
- *Save & Send For Approval* → status `Pending For Approval`, **not** editable by the Investigation Officer anymore, appears in Investigation Manager's Pending Approvals. Blocked with a validation error unless **Case Decision** has been entered (Closure Details) — check this field first if "Save & Send For Approval" mysteriously does nothing.
- *Refresh* → discard in-progress edits (confirm dialog), reload the form.
- Reference # is generated only on first Save, format `Year+Month+Date + 3-digit product code + 3-digit serial`, and becomes permanently read-only afterward (Edit screens must never let this field be changed).
- Every "at least one transaction required" channel (DC/ADC/Non-API/BBK) additionally blocks Save/Send-for-Approval if zero transactions are selected/added — this is a distinct validation from the Case-Decision one above.

**Search screens** (per channel, e.g. [Container/InvestigationOfficer/CreditCardDispute/Search](src/Container/InvestigationOfficer/CreditCardDispute/Search)): multi-field AND search (≥1 field required), a "Display In Process only" checkbox, a results grid, Reference # as a clickable link opening a read-only detail modal. Edit is only offered for `In Process` rows and only to Investigation Officers; delete is QA-Manager-only regardless of status (see §6).

### Channel-specific deltas worth knowing

| Channel | Distinguishing fields / fraud vector | Notes |
|---|---|---|
| **CCD** | Credit Card Number (masked), Credit Limit, POS/ATM fields, On-Us/Off-Us, MCC, Acquirer ID/Name, ARN, **TC 40 Reporting**, **Safe Reporting**, Point of Compromise (POC) | Only channel with **no** live transaction-source lookup yet ("we do not have the facility to search Transaction ID... system will let the user manually enter" — flagged in the SRS itself as a future backend change request); Transaction Details is manual-only, no pre-fetched grid. |
| **DCD** | HBL/Other-Bank Account Number, Branch Code/Name, MCC, ARN, Source (LOV), **In Favor of CM**, **Customer Liability** | Auto-fetches transactions from IRIS/Digital Banking once Account Number resolves. |
| **ADC** | Beneficiary Account/Bank, **Mobile # Culprit**, **IMEI # / MAC Address**, **URL/Website**, **IP Address**, Demographic Change, Flexi Loan, Android/iOS, Fund Layered A/c #, Source of IB Channel Creation | Digital-channel-fraud specific fields (device/network forensics) not present in any other channel. |
| **Non-API (E-Com)** | Same transaction field set as DCD (Other Bank Account #, Response, Potential Save, Acquirer Terminal ID, etc.) | Closure Details trimmed vs DCD (TC 40 Reporting + POC only, no In-Favor-of-CM/Customer-Liability). |
| **BBK** | Transaction Posting Date, Month/Year split fields, Transaction Mode/City, **Initial Blocking Date/Block**, Case Initiated/Detection/Customer-Dispute Date (4 separate dates vs. everyone else's 1), **In Favor of Customer** + liability split across Other/Internally/Insurance buckets, Analyst Name, Tracking Sheet Attached, 3 separate TAT figures | Only channel with mobile-number as an alternate customer-lookup key (matches `getAllAccountsByMobileNumberBBK` in [apis-config.js](src/Common/Api/apis-config.js)) and the most bespoke Closure Details of any channel. |
| **Negative Database (ND)** | Individual Involved, Channel, Forged Documents, Fraud/Not-A-Fraud, Company Name/Segment/Address, Office/Residence Phone, **multi-comment thread** (each comment stamped with author+date; a user can only edit their *own* prior comments — Edit icon disabled on others') | Not a "dispute" in the approval-workflow sense — no Save & Send For Approval, no Investigation Manager step, no TAT. Search fields are Mobile Number/Customer Name/CNIC/Company Name (not Reference Number). |

## 6. Approval, deletion, and QA workflows

- **Investigation Manager – Pending for Approval** ([Container/InvestigationManager](src/Container/InvestigationManager)): a shared queue per Transaction Type — *any* IM holding that Transaction Type can Accept/Reject *any* case in it (first responder wins, not per-user assignment). Accept/Reject both require selecting a Reason (Approval/Rejection LOV) + comments (≤300 chars). Reject sends the case back to `In Process` (editable again by IOs); Accept sets it `Approved`.
- **QA Manager – Delete Dispute Cases** ([Container/QAManager/delete-dispute-cases.js](src/Container/QAManager/delete-dispute-cases.js)): QA Manager can request deletion of a case in *any* status. This does **not** delete immediately — it routes to System Administrator's Deletion Approval queue.
- **System Administrator – Deletion Approval** ([Container/Admin/SystemAdmin/DisputeCases/DeletionApproval](src/Container/Admin/SystemAdmin/DisputeCases/DeletionApproval)): same Accept/Reject-with-reason UI as IM approvals. Accept = hard delete (case vanishes from all reports except View Deleted Cases); Reject = case returns to `In Process` and becomes editable again (only if it was `In Process` before the delete request).
- **System Administrator – View Delete Cases** ([Container/Admin/SystemAdmin/DisputeCases/ViewDeleteCases](src/Container/Admin/SystemAdmin/DisputeCases/ViewDeleteCases)): read-only search over deleted cases.

## 7. Reports

All per-channel reports (Credit Card, Debit Card, ADC, Non-API, BBK — [Container/*/Reports](src/Container/InvestigationOfficer/Reports)) share the same shape: date-range + a handful of channel-specific ID fields → Search (server-side, with loader) → Download Report (Excel, **`In Process` cases only** per the SRS — worth double-checking against actual backend behavior since this seems like an odd filter for a "report" feature, may be intentional to keep closed-case data out of ad-hoc exports). Reports include Region Name and Created-By username, list every transaction per case, and accept intentional data repetition for repeated case-level fields (no "serial #" column needed).

- **Ageing MIS**: 3 flavors (Summary/Details/Amount-Wise), all `In Process` + `Pending For Approval` cases, Excel/CSV only, exact calculation spec lives in `Ageing MIS.xlsx` (not in this repo).
- **Region wise Staff List**: single Region filter (optional — omitted means all regions).
- **Security Administrator Reports** (Access Details, Login History, Status Wise, Last Login): all share one search form (Login ID, date range, First/Last Name, Status ∈ All/Active/Inactive).
- **Audit Trail** ([Container/AuditTrial/audit-trial.js](src/Container/AuditTrial/audit-trial.js)): QA Manager + MIS Manager only, searchable by Case Reference #, Customer Name, Debit/Credit Card Number, Action By, Action, date range; view-details modal shows a tabular breakdown.
- **QA Manager – Security Administrator Activity Logging**: Excel-only (no on-screen grid), Date Range filter, logs Security Admin's own login/action timestamps — a meta-audit of the auditor's auditor.

## 8. Cross-reference: SRS section → FE code

| SRS feature | FE location |
|---|---|
| Roles / login redirect | [store/actions/auth-actions.js](src/store/actions/auth-actions.js) `signIn` |
| Role→menu mapping | [Routes/routingData.js](src/Routes/routingData.js) `UserSelection` |
| Transaction-Type gating (ttid) | [Routes/CustomRoutes.js](src/Routes/CustomRoutes.js), `allowedTransactionTypes` in `localStorage` |
| Setups/LOVs | [Container/Admin/SystemAdmin/Setup](src/Container/Admin/SystemAdmin/Setup), actions in [store/actions/setup-forms-actions.js](src/store/actions/setup-forms-actions.js) |
| Per-channel Add/Edit/Search | [Container/InvestigationOfficer/{CreditCardDispute,DebitCardDisputes,AlternateDeliveryChannelDisputes,NonAPI(E-Com)Disputes,BBKonnectDisputes(BBK),NegativeDatabase}](src/Container/InvestigationOfficer) |
| IM approvals | [Container/InvestigationManager](src/Container/InvestigationManager) |
| QA delete / SA deletion-approval / view-deleted | [Container/QAManager](src/Container/QAManager), [Container/Admin/SystemAdmin/DisputeCases](src/Container/Admin/SystemAdmin/DisputeCases) |
| Reports | [Container/*/Reports](src/Container/InvestigationOfficer/Reports), [store/actions/reports_actions.js](src/store/actions/reports_actions.js) |
| Audit Trail | [Container/AuditTrial/audit-trial.js](src/Container/AuditTrial/audit-trial.js) |

## 9. Open questions / things this digest could not resolve from the SRS alone

- Whether Security Administrator logs into this same React app at all, or only interacts via email links into a separate tool ("LAMS") — the SRS never shows a Security-Admin `roleID` in the login redirect logic.
- "Maker Checker feature is required but it should be configurable" — no configuration surface for this is described anywhere else in the document; current FE code always shows both Save and Save & Send For Approval unconditionally.
- Exact TAT/Aging working-day calculation rules (referenced as living in an external `Ageing MIS.xlsx`, not reproduced in the SRS text).
