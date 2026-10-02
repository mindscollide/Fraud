//>>>>Exports :
// Login Page
export { default as Login } from "./Authentication/Login/Login";
export { default as SignUp } from "./Authentication/SignUp/SignUp";
// Dashboard
export { default as Dashboard } from "./Dashboard/dashboard";
// Audit Trial
export { default as AuditTrail } from "./AuditTrial/audit-trial";
// User Management
export { default as EditUser } from "../Container/Admin/SystemAdmin/UserManagement/EditUser/edit-user";
export { default as PendingDeletionApprovals } from "../Container/Admin/SystemAdmin/DisputeCases/DeletionApproval/deletion-approval-sa";
export { default as ViewDeleteCases } from "../Container/Admin/SystemAdmin/DisputeCases/ViewDeleteCases/view-delete-cases";
export { default as SystemAdminUserAudit } from "../Container/Admin/SystemAdmin/UserAudit/user-audit";
export { default as NewRequestList } from "../Container/Admin/SystemAdmin/NewRequestList/new-request-list";
export { default as CreditCardDisputes } from "./Admin/SystemAdmin/Reports/CreditCardDisputes/credit-card-disputes";
export { default as DebitCardDisputes } from "./Admin/SystemAdmin/Reports/DebitCardDisputes/debit-card-disputes";
export { default as ADCDisputes } from "./Admin/SystemAdmin/Reports/ADCDisputes/ADC-disputes";
export { default as NONAPIDisputes } from "./Admin/SystemAdmin/Reports/NONAPIDisputes/non-api-disputes";
export { default as BBKonnectDisputes } from "./Admin/SystemAdmin/Reports/BBKonnectDisputes/bb-konnect-disputes";
export { default as AGEINGMIS } from "./Admin/SystemAdmin/Reports/AgeingMIS/ageingmis";
export { default as RegionWiseStaffList } from "./Admin/SystemAdmin/Reports/RegionWiseStaffList/region-wise-staff-list";
export { default as ApprovalFlow } from "./Admin/SystemAdmin/Setup/ApprovalFlow/approve-flow";
export { default as ApprovalReasons } from "./Admin/SystemAdmin/Setup/ApprovalReasons/approval-reasons";
export { default as FraudType } from "./Admin/SystemAdmin/Setup/FraudType/fraud-type";
export { default as Source } from "./Admin/SystemAdmin/Setup/Source/source";
export { default as IndividualInvolved } from "./Admin/SystemAdmin/Setup/IndividualInvolved/individual-involved";
export { default as Channel } from "./Admin/SystemAdmin/Setup/Channel/channel";
export { default as ForgedDocuments } from "./Admin/SystemAdmin/Setup/ForgedDocuments/forged-documents";
export { default as FraudNotAFraud } from "./Admin/SystemAdmin/Setup/Fraud-NotAFraud/fraud-notafraud";
export { default as CompanySegment } from "./Admin/SystemAdmin/Setup/CompanySegment/company-segment";
export { default as Holiday } from "./Admin/SystemAdmin/Setup/Holiday/holiday.js";
export { default as CaseDecision } from "./Admin/SystemAdmin/Setup/CaseDecision/case-decision.js";
export { default as SourceOfIB } from "./Admin/SystemAdmin/Setup/SourceOfIB/source-of-ib";
export { default as City } from "./Admin/SystemAdmin/Setup/City/city";
export { default as Region } from "./Admin/SystemAdmin/Setup/Region/region";
export { default as CityAndRegionMapping } from "./Admin/SystemAdmin/Setup/CityAndRegionMapping/city-and-region-mapping";
export { default as EscalationMatrix } from "./Admin/SystemAdmin/Setup/EscalationMatrix/escalation-matrix";
export { default as ClassificationOfAdvances } from "./Admin/SystemAdmin/Setup/ClassificationOfAdvances/classification-of-advances";
export { default as ManagementUnit } from "./Admin/SystemAdmin/Setup/ManagementUnit/management-unit";
export { default as NatureOfCharge } from "./Admin/SystemAdmin/Setup/NatureOfCharge/nature-of-charge";
export { default as NatureOfSecurity } from "./Admin/SystemAdmin/Setup/NatureOfSecurity/nature-of-security";
export { default as ReasonOfWriteOff } from "./Admin/SystemAdmin/Setup/ReasonOfWriteOff/reason-of-write-off";
export { default as RejectionReasons } from "./Admin/SystemAdmin/Setup/RejectionReasons/rejection-reasons";

// 404 Page Not Found
export { default as NotFound } from "./404/404"


// Investigation Officer
export { default as AddEditCreditCardDispute } from "./InvestigationOfficer/CreditCardDispute/AddEdit/add-edit";
export { default as CustomerDetailsCreditCardDispute } from "./InvestigationOfficer/CreditCardDispute/AddEdit/customer-details";
export { default as AddNewCustomerDetails } from "./InvestigationOfficer/CreditCardDispute/AddEdit/add-new-customer-details";
export { default as ViewCustomerDetails } from "./InvestigationOfficer/CreditCardDispute/AddEdit/view-add-edit";
export { default as EditCreditCardDispute } from "./InvestigationOfficer/CreditCardDispute/AddEdit/edit-ccd.js";
export { default as SearchCreditCardDispute } from "./InvestigationOfficer/CreditCardDispute/Search/search-credit-card";
export { default as AddEditDebitCardDispute } from "./InvestigationOfficer/DebitCardDisputes/AddEdit/add-edit";
export { default as AddEditDCDispute } from "./InvestigationOfficer/DebitCardDisputes/AddEdit/add-edit-2";

export { default as AddNewCustomerDetailsDC } from "./InvestigationOfficer/DebitCardDisputes/AddEdit/add-new-customer-details";
export { default as ViewCustomerDetailsDC } from "./InvestigationOfficer/DebitCardDisputes/AddEdit/view-add-edit";
export { default as EditDebitCardDispute } from "./InvestigationOfficer/DebitCardDisputes/AddEdit/edit-dcd";
export { default as SearchDebitCardDispute } from "./InvestigationOfficer/DebitCardDisputes/Search/search-debit-card";
export { default as CustomerDetailsDebitCardDispute } from "./InvestigationOfficer/DebitCardDisputes/AddEdit/customer-details";
export { default as CustomerDetailsDebitCardDisputeAccount } from "./InvestigationOfficer/DebitCardDisputes/AddEdit/customer-details-account";
export { default as AddEditADCD } from "./InvestigationOfficer/AlternateDeliveryChannelDisputes/AddEdit/add-edit";
export { default as AddEditACDispute } from "./InvestigationOfficer/AlternateDeliveryChannelDisputes/AddEdit/add-edit-2";
export { default as AddNewCustomerDetailsADC } from "./InvestigationOfficer/AlternateDeliveryChannelDisputes/AddEdit/add-new-customer-details";
export { default as CustomerDetailsADCAccount } from "./InvestigationOfficer/AlternateDeliveryChannelDisputes/AddEdit/customer-details-account";
export { default as CustomerDetailsADCD } from "./InvestigationOfficer/AlternateDeliveryChannelDisputes/AddEdit/customer-details";
export { default as EditADCDispute } from "./InvestigationOfficer/AlternateDeliveryChannelDisputes/AddEdit/edit-adc";
export { default as ViewCustomerDetailsADC } from "./InvestigationOfficer/AlternateDeliveryChannelDisputes/AddEdit/view-add-edit";
export { default as SearchADCD } from "./InvestigationOfficer/AlternateDeliveryChannelDisputes/Search/search-adcd";
// export { default as AddEditNONAPI } from "./InvestigationOfficer/NonAPI(E-Com)Disputes/AddEdit/add-edit";
// export { default as SearchNONAPI } from "./InvestigationOfficer/NonAPI(E-Com)Disputes/Search/search-nonapi";

//NONAPI EXPORTS
export { default as AddEditNONAPIDispute } from "./InvestigationOfficer/NonAPI(E-Com)Disputes/AddEdit/add-edit";
export { default as AddEditNONAPIDispute2 } from "./InvestigationOfficer/NonAPI(E-Com)Disputes/AddEdit/add-edit-2";
export { default as AddNewCustomerDetailsNONAPI } from "./InvestigationOfficer/NonAPI(E-Com)Disputes/AddEdit/add-new-customer-details";
export { default as ViewCustomerDetailsNONAPI } from "./InvestigationOfficer/NonAPI(E-Com)Disputes/AddEdit/view-add-edit";
export { default as EditNONAPIDispute } from "./InvestigationOfficer/NonAPI(E-Com)Disputes/AddEdit/edit-nonapi";
export { default as SearchNONAPIDispute } from "./InvestigationOfficer/NonAPI(E-Com)Disputes/Search/search-nonapi-disputes";
export { default as CustomerDetailsNONAPIDispute } from "./InvestigationOfficer/NonAPI(E-Com)Disputes/AddEdit/customer-details";
export { default as CustomerDetailsNONAPIDisputeAccount } from "./InvestigationOfficer/NonAPI(E-Com)Disputes/AddEdit/customer-details-account";

//BBKONNEKT EXPORTS
export { default as AddEditBBKDispute } from "./InvestigationOfficer/BBKonnectDisputes(BBK)/AddEdit/add-edit";
export { default as AddEditBBKDispute2 } from "./InvestigationOfficer/BBKonnectDisputes(BBK)/AddEdit/add-edit-2";
export { default as AddNewCustomerDetailsBBK } from "./InvestigationOfficer/BBKonnectDisputes(BBK)/AddEdit/add-new-customer-details";
export { default as ViewCustomerDetailsBBK } from "./InvestigationOfficer/BBKonnectDisputes(BBK)/AddEdit/view-add-edit";
export { default as EditBBKDispute } from "./InvestigationOfficer/BBKonnectDisputes(BBK)/AddEdit/edit-bbk";
export { default as SearchBBKDispute } from "./InvestigationOfficer/BBKonnectDisputes(BBK)/Search/search-bbk-disputes";
export { default as CustomerDetailsBBKDispute } from "./InvestigationOfficer/BBKonnectDisputes(BBK)/AddEdit/customer-details";
export { default as CustomerDetailsBBKDisputeAccount } from "./InvestigationOfficer/BBKonnectDisputes(BBK)/AddEdit/customer-details-account";
export { default as CustomerDetailsBBKDisputeMobile } from "./InvestigationOfficer/BBKonnectDisputes(BBK)/AddEdit/customer-details-mobile";

//Negative Database
export { default as AddEditNegativeDatabase } from "./InvestigationOfficer/NegativeDatabase/AddEdit/add-edit";
export { default as AddNewCustomerDetailsND } from "./InvestigationOfficer/NegativeDatabase/AddEdit/add-new-customer-details";
export { default as SearchNegativeDatabase } from "./InvestigationOfficer/NegativeDatabase/Search/search-negativedatabase";
export { default as EditNegativeDataBase } from "./InvestigationOfficer/NegativeDatabase/AddEdit/edit-ndb";
export { default as ViewNDB } from "./InvestigationOfficer/NegativeDatabase/AddEdit/view";


//GlobalSearchIO
export { default as SearchDisputeIO } from "./InvestigationOfficer/DisputeCases/Search/search-dispute-cases";

//Reports Investigation Officer
export { default as IOCreditCardDisputes } from "./InvestigationOfficer/Reports/CreditCardDisputes/credit-card-disputes";
export { default as IODebitCardDisputes } from "./InvestigationOfficer/Reports/DebitCardDisputes/debit-card-disputes";
export { default as IOADCDisputes } from "./InvestigationOfficer/Reports/ADCDisputes/ADC-disputes";
export { default as IONONAPIDisputes } from "./InvestigationOfficer/Reports/NONAPIDisputes/non-api-disputes";
export { default as IOBBKonnectDisputes } from "./InvestigationOfficer/Reports/BBKonnectDisputes/bb-konnect-disputes";
export { default as IOAGEINGMIS } from "./InvestigationOfficer/Reports/AgeingMIS/ageingmis";
export { default as IORegionWiseStaffList } from "./InvestigationOfficer/Reports/RegionWiseStaffList/region-wise-staff-list";
export { default as NDRrecord } from "./InvestigationOfficer/Reports/NDRecords/nd-records";


//Investigation Manager
export { default as PendingApprovals } from "./InvestigationManager/DisputeCases/pending-approval";
export { default as SearchDisputeIM } from "./InvestigationManager/DisputeCases/search-dispute-cases";
export { default as IMCreditCardDisputes } from "./InvestigationManager/Reports/CreditCardDisputes/credit-card-disputes";
export { default as IMDebitCardDisputes } from "./InvestigationManager/Reports/DebitCardDisputes/debit-card-disputes";
export { default as IMADCDisputes } from "./InvestigationManager/Reports/ADCDisputes/ADC-disputes";
export { default as IMNONAPIDisputes } from "./InvestigationManager/Reports/NONAPIDisputes/non-api-disputes";
export { default as IMBBKonnectDisputes } from "./InvestigationManager/Reports/BBKonnectDisputes/bb-konnect-disputes";
export { default as IMAGEINGMIS } from "./InvestigationManager/Reports/AgeingMIS/ageingmis";
export { default as IMRegionWiseStaffList } from "./InvestigationManager/Reports/RegionWiseStaffList/region-wise-staff-list";

//QA Manager
export { default as DeleteDisputeCases } from "./QAManager/delete-dispute-cases";