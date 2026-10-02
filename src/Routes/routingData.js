// all routing related data like rendering components and their paths sits here in this file
import {
  ApprovalFlow,
  ApprovalReasons,
  PendingDeletionApprovals,
  ViewDeleteCases,
  FraudType,
  Holiday,
  CaseDecision,
  Source,
  IndividualInvolved,
  Channel,
  ForgedDocuments,
  FraudNotAFraud,
  CompanySegment,
  ClassificationOfAdvances,
  ManagementUnit,
  NatureOfCharge,
  NatureOfSecurity,
  ReasonOfWriteOff,
  RejectionReasons,
  NewRequestList,
  AddEditCreditCardDispute,
  NotFound,
  SourceOfIB,
  City,
  Region,
  CityAndRegionMapping,
  EscalationMatrix,
  AuditTrail,
  EditUser,
  SearchCreditCardDispute,
  AddEditDebitCardDispute,
  AddEditDCDispute,
  SearchDebitCardDispute,
  SearchADCD,
  SearchNegativeDatabase,
  CustomerDetailsCreditCardDispute,
  AddNewCustomerDetails,
  ViewCustomerDetails,
  EditCreditCardDispute,
  PendingApprovals,
  SearchDisputeIM,
  CustomerDetailsDebitCardDispute,
  AddNewCustomerDetailsDC,
  EditDebitCardDispute,
  ViewCustomerDetailsDC,
  CustomerDetailsDebitCardDisputeAccount,
  AddEditADCD,
  AddNewCustomerDetailsADC,
  CustomerDetailsADCAccount,
  CustomerDetailsADCD,
  EditADCDispute,
  ViewCustomerDetailsADC,
  DeleteDisputeCases,
  AddEditACDispute,
  //NONAPI
  AddEditNONAPIDispute,
  AddEditNONAPIDispute2,
  AddNewCustomerDetailsNONAPI,
  CustomerDetailsNONAPIDisputeAccount,
  ViewCustomerDetailsNONAPI,
  SearchNONAPIDispute,
  CustomerDetailsNONAPIDispute,
  EditNONAPIDispute,
  //BBKONNECT
  AddEditBBKDispute,
  AddEditBBKDispute2,
  AddNewCustomerDetailsBBK,
  CustomerDetailsBBKDisputeAccount,
  ViewCustomerDetailsBBK,
  SearchBBKDispute,
  CustomerDetailsBBKDispute,
  EditBBKDispute,
  SearchDisputeIO,
  CustomerDetailsBBKDisputeMobile,
  //REPORT IO
  IOCreditCardDisputes,
  IODebitCardDisputes,
  IOADCDisputes,
  IONONAPIDisputes,
  IOBBKonnectDisputes,
  IOAGEINGMIS,
  IORegionWiseStaffList,
  NDRrecord,

  // NEGATIE DATA BASE
  AddEditNegativeDatabase,
  EditNegativeDataBase,
  AddNewCustomerDetailsND,
  ViewNDB,
} from "../Container";

import {
  SystemAdminLinks,
  InvestigationOfficer,
  InvestigationManager,
  QAManager,
  MISManager,
} from "./Links";

const SystemAdminRouteData = [
  { component: EditUser, path: "SystemAdmin/EditUser", ttid: 12 },
  {
    component: PendingDeletionApprovals,
    path: "SystemAdmin/PendingDeletionApprovals",
    ttid: 12,
  },
  { component: ViewDeleteCases, path: "SystemAdmin/ViewDeleteCases", ttid: 12 },
  { component: FraudType, path: "SystemAdmin/FraudType", ttid: 12 },
  { component: Source, path: "SystemAdmin/Source", ttid: 12 },
  {
    component: IndividualInvolved,
    path: "SystemAdmin/IndividualInvolved",
    ttid: 12,
  },
  { component: Channel, path: "SystemAdmin/Channel", ttid: 12 },
  { component: ForgedDocuments, path: "SystemAdmin/ForgedDocuments", ttid: 12 },
  { component: FraudNotAFraud, path: "SystemAdmin/Fraud-NotAFraud", ttid: 12 },
  { component: CompanySegment, path: "SystemAdmin/CompanySegment", ttid: 12 },
  { component: Holiday, path: "SystemAdmin/Holiday", ttid: 12 },
  { component: CaseDecision, path: "SystemAdmin/CaseDecision", ttid: 12 },
  { component: SourceOfIB, path: "SystemAdmin/SourceOfIB", ttid: 12 },
  { component: City, path: "SystemAdmin/City", ttid: 12 },
  { component: Region, path: "SystemAdmin/Region", ttid: 12 },
  {
    component: CityAndRegionMapping,
    path: "SystemAdmin/CityAndRegionMapping",
    ttid: 12,
  },
  {
    component: EscalationMatrix,
    path: "SystemAdmin/EscalationMatrix",
    ttid: 12,
  },
  { component: ApprovalFlow, path: "SystemAdmin/ApprovalFlow", ttid: 12 },
  { component: ApprovalReasons, path: "SystemAdmin/ApprovalReasons", ttid: 12 },
  {
    component: ClassificationOfAdvances,
    path: "SystemAdmin/ClassificationOfAdvances",
    ttid: 12,
  },
  { component: ManagementUnit, path: "SystemAdmin/ManagementUnit", ttid: 12 },
  { component: NatureOfCharge, path: "SystemAdmin/NatureOfCharge", ttid: 12 },
  {
    component: NatureOfSecurity,
    path: "SystemAdmin/NatureOfSecurity",
    ttid: 12,
  },
  {
    component: ReasonOfWriteOff,
    path: "SystemAdmin/ReasonOfWriteOff",
    ttid: 12,
  },
  {
    component: RejectionReasons,
    path: "SystemAdmin/RejectionReasons",
    ttid: 12,
  },
  { component: NewRequestList, path: "SystemAdmin/NewRequestList", ttid: 12 },

  {
    component: IOCreditCardDisputes,
    path: "SystemAdmin/Reports/CreditCardDisputes",
    ttid: 1,
  },
  {
    component: IODebitCardDisputes,
    path: "SystemAdmin/Reports/DebitCardDisputes",
    ttid: 2,
  },
  {
    component: IOADCDisputes,
    path: "SystemAdmin/Reports/ADCDisputes",
    ttid: 3,
  },
  {
    component: IONONAPIDisputes,
    path: "SystemAdmin/Reports/NONAPIDisputes",
    ttid: 4,
  },
  {
    component: IOBBKonnectDisputes,
    path: "SystemAdmin/Reports/BBKonnectDisputes",
    ttid: 5,
  },
  {
    component: NDRrecord,
    path: "SystemAdmin/Reports/NegativeDataBase",
    ttid: 6,
  },

  { component: IOAGEINGMIS, path: "SystemAdmin/Reports/AgeingMIS", ttid: 12 },
  {
    component: IORegionWiseStaffList,
    path: "SystemAdmin/Reports/RegionWiseStaffList",
    ttid: 12,
  },
  { component: NotFound, path: "SystemAdmin/404", ttid: 12 },
  {
    component: ViewCustomerDetails,
    path: "SystemAdmin/ViewCustomerDetails",
    ttid: 1,
  },
  {
    component: ViewCustomerDetailsDC,
    path: "SystemAdmin/ViewCustomerDetailsDC",
    ttid: 2,
  },
  {
    component: ViewCustomerDetailsADC,
    path: "SystemAdmin/ViewCustomerDetailsADC",
    ttid: 3,
  },
  {
    component: ViewCustomerDetailsNONAPI,
    path: "SystemAdmin/ViewCustomerDetailsNonApi",
    ttid: 4,
  },
  {
    component: ViewCustomerDetailsBBK,
    path: "SystemAdmin/ViewCustomerDetailsBBK",
    ttid: 5,
  },
  { component: ViewNDB, path: "SystemAdmin/ViewCustomerDetailsND", ttid: 6 },
];

const InvestigationOfficerRouteData = [
  {
    component: AddEditCreditCardDispute,
    path: "CreditCardDispute/AddEdit",
    ttid: 1,
  },
  {
    component: CustomerDetailsCreditCardDispute,
    path: "CreditCardDispute/CustomerDetailsCreditCardDispute",
    ttid: 1,
  },
  {
    component: AddNewCustomerDetails,
    path: "CreditCardDispute/AddNewCustomerDetails",
    ttid: 1,
  },
  {
    component: ViewCustomerDetails,
    path: "CreditCardDispute/ViewCustomerDetails",
    ttid: 1,
  },
  {
    component: EditCreditCardDispute,
    path: "CreditCardDispute/EditCreditCardDispute",
    ttid: 1,
  },
  {
    component: SearchCreditCardDispute,
    path: "CreditCardDispute/Search",
    ttid: 1,
  },
  {
    component: AddEditDebitCardDispute,
    path: "DebitCardDisputes/AddEdit",
    ttid: 2,
  },
  {
    component: AddEditDCDispute,
    path: "DebitCardDisputes/AddEditCCD",
    ttid: 2,
  },
  {
    component: AddNewCustomerDetailsDC,
    path: "DebitCardDisputes/AddNewDispute",
    ttid: 2,
  },
  {
    component: CustomerDetailsDebitCardDisputeAccount,
    path: "DebitCardDisputes/CustomerDetailsForAccount",
    ttid: 2,
  },
  {
    component: ViewCustomerDetailsDC,
    path: "DebitCardDisputes/ViewCustomerDetails",
    ttid: 2,
  },
  {
    component: SearchDebitCardDispute,
    path: "DebitCardDisputes/Search",
    ttid: 2,
  },
  {
    component: CustomerDetailsDebitCardDispute,
    path: "DebitCardDisputes/CustomerDetailsDebitCardDispute",
    ttid: 2,
  },
  {
    component: EditDebitCardDispute,
    path: "DebitCardDisputes/EditDebitCardDispute",
    ttid: 2,
  },
  { component: AddEditADCD, path: "ADCD/AddEdit", ttid: 3 },
  { component: AddEditACDispute, path: "ADCD/AddEditADC", ttid: 3 },
  { component: SearchADCD, path: "ADCD/Search", ttid: 3 },
  {
    component: AddNewCustomerDetailsADC,
    path: "ADCD/AddNewCustomerDetailsADC",
    ttid: 3,
  },
  {
    component: CustomerDetailsADCAccount,
    path: "ADCD/CustomerDetailsADCAccount",
    ttid: 3,
  },
  { component: CustomerDetailsADCD, path: "ADCD/CustomerDetailsADCD", ttid: 3 },
  { component: EditADCDispute, path: "ADCD/EditADCDispute", ttid: 3 },
  {
    component: ViewCustomerDetailsADC,
    path: "ADCD/ViewCustomerDetailsADC",
    ttid: 3,
  },
  //NON API DISPUTES
  { component: AddEditNONAPIDispute, path: "NONAPIDisputes/AddEdit", ttid: 4 },
  {
    component: AddEditNONAPIDispute2,
    path: "NONAPIDisputes/AddEditNONAPI",
    ttid: 4,
  },
  {
    component: AddNewCustomerDetailsNONAPI,
    path: "NONAPIDisputes/AddNewDispute",
    ttid: 4,
  },
  {
    component: CustomerDetailsNONAPIDisputeAccount,
    path: "NONAPIDisputes/CustomerDetailsForAccount",
    ttid: 4,
  },
  {
    component: ViewCustomerDetailsNONAPI,
    path: "NONAPIDisputes/ViewCustomerDetailsNonApi",
    ttid: 4,
  },
  { component: SearchNONAPIDispute, path: "NONAPIDisputes/Search", ttid: 4 },
  {
    component: CustomerDetailsNONAPIDispute,
    path: "NONAPIDisputes/CustomerDetailsNONAPIDispute",
    ttid: 4,
  },
  {
    component: EditNONAPIDispute,
    path: "NONAPIDisputes/EditNONAPIDispute",
    ttid: 4,
  },
  //BBKONNECT
  { component: AddEditBBKDispute, path: "BBKonnect/AddEdit", ttid: 5 },
  { component: AddEditBBKDispute2, path: "BBKonnect/AddEditBBK", ttid: 5 },
  {
    component: AddNewCustomerDetailsBBK,
    path: "BBKonnect/AddNewDispute",
    ttid: 5,
  },
  {
    component: CustomerDetailsBBKDisputeAccount,
    path: "BBKonnect/CustomerDetailsForAccount",
    ttid: 5,
  },
  {
    component: CustomerDetailsBBKDisputeMobile,
    path: "BBKonnect/CustomerDetailsMobileBBKDispute",
    ttid: 5,
  },
  {
    component: ViewCustomerDetailsBBK,
    path: "BBKonnect/ViewCustomerDetailsBBK",
    ttid: 5,
  },
  { component: SearchBBKDispute, path: "BBKonnect/Search", ttid: 5 },
  {
    component: CustomerDetailsBBKDispute,
    path: "BBKonnect/CustomerDetailsBBKDispute",
    ttid: 5,
  },
  { component: EditBBKDispute, path: "BBKonnect/EditBBKDispute", ttid: 5 },
  //NegativeDatabase
  {
    component: AddEditNegativeDatabase,
    path: "NegativeDatabase/AddEdit",
    ttid: 6,
  },
  {
    component: AddNewCustomerDetailsND,
    path: "NegativeDatabase/AddNewCustomerDetailsND",
    ttid: 6,
  },
  {
    component: EditNegativeDataBase,
    path: "NegativeDatabase/EditNegativeDatabase",
    ttid: 6,
  },
  {
    component: ViewNDB,
    path: "NegativeDatabase/ViewNegativeDataBase",
    ttid: 6,
  },
  {
    component: SearchNegativeDatabase,
    path: "NegativeDatabase/Search",
    ttid: 6,
  },
  //SearchDisputeGlobalIO
  { component: SearchDisputeIO, path: "DisputeCases/Search", ttid: 12 },
  //Report IO
  {
    component: IOCreditCardDisputes,
    path: "Reports/CreditCardDisputes",
    ttid: 1,
  },
  {
    component: IODebitCardDisputes,
    path: "Reports/DebitCardDisputes",
    ttid: 2,
  },
  { component: IOADCDisputes, path: "Reports/ADCDisputes", ttid: 3 },
  { component: IONONAPIDisputes, path: "Reports/NONAPIDisputes", ttid: 4 },
  {
    component: IOBBKonnectDisputes,
    path: "Reports/BBKonnectDisputes",
    ttid: 5,
  },
  { component: NDRrecord, path: "Reports/NegativeDataBase", ttid: 6 },
  { component: IOAGEINGMIS, path: "Reports/AgeingMIS", ttid: 12 },
  {
    component: IORegionWiseStaffList,
    path: "Reports/RegionWiseStaffList",
    ttid: 12,
  },
];

const InvestigationManagerRouteData = [
  {
    component: PendingApprovals,
    path: "DisputeCases/PendingApprovals",
    ttid: 12,
  },
  {
    component: SearchDisputeIM,
    path: "DisputeCases/SearchDisputeCases",
    ttid: 12,
  },
  {
    component: IOCreditCardDisputes,
    path: "Reports/CreditCardDisputes",
    ttid: 1,
  },
  {
    component: IODebitCardDisputes,
    path: "Reports/DebitCardDisputes",
    ttid: 2,
  },
  { component: IOADCDisputes, path: "Reports/ADCDisputes", ttid: 3 },
  { component: IONONAPIDisputes, path: "Reports/NONAPIDisputes", ttid: 4 },
  {
    component: IOBBKonnectDisputes,
    path: "Reports/BBKonnectDisputes",
    ttid: 5,
  },
  { component: NDRrecord, path: "Reports/NegativeDataBase", ttid: 6 },
  { component: IOAGEINGMIS, path: "Reports/AgeingMIS", ttid: 12 },
  {
    component: IORegionWiseStaffList,
    path: "Reports/RegionWiseStaffList",
    ttid: 12,
  },
  {
    component: ViewCustomerDetails,
    path: "DisputeCases/ViewCustomerDetails",
    ttid: 1,
  },
  {
    component: ViewCustomerDetailsDC,
    path: "DisputeCases/ViewCustomerDetailsDC",
    ttid: 2,
  },
  {
    component: ViewCustomerDetailsADC,
    path: "DisputeCases/ViewCustomerDetailsADC",
    ttid: 3,
  },
  {
    component: ViewCustomerDetailsNONAPI,
    path: "DisputeCases/ViewCustomerDetailsNonApi",
    ttid: 4,
  },
  {
    component: ViewCustomerDetailsBBK,
    path: "DisputeCases/ViewCustomerDetailsBBK",
    ttid: 5,
  },
  { component: ViewNDB, path: "DisputeCases/ViewCustomerDetailsND", ttid: 6 },
];

const QAManagerRouteData = [
  {
    component: DeleteDisputeCases,
    path: "DisputeCases/DeleteDisputeCases",
    ttid: 12,
  },
  { component: ViewCustomerDetails, path: "QAM/ViewCustomerDetails", ttid: 1 },
  {
    component: ViewCustomerDetailsDC,
    path: "QAM/ViewCustomerDetailsDC",
    ttid: 2,
  },
  {
    component: ViewCustomerDetailsADC,
    path: "QAM/ViewCustomerDetailsADC",
    ttid: 3,
  },
  {
    component: ViewCustomerDetailsNONAPI,
    path: "QAM/ViewCustomerDetailsNonApi",
    ttid: 4,
  },
  {
    component: ViewCustomerDetailsBBK,
    path: "QAM/ViewCustomerDetailsBBK",
    ttid: 5,
  },
  { component: ViewNDB, path: "QAM/ViewCustomerDetailsND", ttid: 6 },
  {
    component: IOCreditCardDisputes,
    path: "Reports/CreditCardDisputes",
    ttid: 1,
  },
  {
    component: IODebitCardDisputes,
    path: "Reports/DebitCardDisputes",
    ttid: 2,
  },
  { component: IOADCDisputes, path: "Reports/ADCDisputes", ttid: 3 },
  { component: IONONAPIDisputes, path: "Reports/NONAPIDisputes", ttid: 4 },
  {
    component: IOBBKonnectDisputes,
    path: "Reports/BBKonnectDisputes",
    ttid: 5,
  },
  { component: NDRrecord, path: "Reports/NegativeDataBase", ttid: 6 },
  { component: IOAGEINGMIS, path: "Reports/AgeingMIS", ttid: 12 },
  {
    component: IORegionWiseStaffList,
    path: "Reports/RegionWiseStaffList",
    ttid: 12,
  },
  { component: AuditTrail, path: "QAM/AuditTrail", ttid: 12 },
];

const MISManagerRouteData = [
  {
    component: IOCreditCardDisputes,
    path: "Reports/CreditCardDisputes",
    ttid: 1,
  },
  {
    component: IODebitCardDisputes,
    path: "Reports/DebitCardDisputes",
    ttid: 2,
  },
  { component: IOADCDisputes, path: "Reports/ADCDisputes", ttid: 3 },
  { component: IONONAPIDisputes, path: "Reports/NONAPIDisputes", ttid: 4 },
  {
    component: IOBBKonnectDisputes,
    path: "Reports/BBKonnectDisputes",
    ttid: 5,
  },
  { component: NDRrecord, path: "Reports/NegativeDataBase", ttid: 6 },
  { component: IOAGEINGMIS, path: "Reports/AgeingMIS", ttid: 12 },
  {
    component: IORegionWiseStaffList,
    path: "Reports/RegionWiseStaffList",
    ttid: 12,
  },
  { component: AuditTrail, path: "MIS/AuditTrail", ttid: 12 },
];

const UserSelection = (token, role) => {
  let Title = "";
  let UserRoleId = "";
  let SidebarData = "";
  let MainMenu = "";
  let Notification = "";

  if (token && role === 2) {
    Title = "Fraud Digitization Portal";
    UserRoleId = role;
    SidebarData = SystemAdminLinks;
    MainMenu = SystemAdminRouteData;
    Notification = true;
  }
  if (token && role === 3) {
    Title = "Fraud Digitization Portal";
    UserRoleId = role;
    SidebarData = InvestigationOfficer;
    MainMenu = InvestigationOfficerRouteData;
  }

  if (token && role === 4) {
    Title = "Fraud Digitization Portal";
    UserRoleId = role;
    SidebarData = InvestigationManager;
    MainMenu = InvestigationManagerRouteData;
    Notification = false;
  }

  if (token && role === 5) {
    Title = "Fraud Digitization Portal";
    UserRoleId = role;
    SidebarData = QAManager;
    MainMenu = QAManagerRouteData;
    Notification = false;
  }

  if (token && role === 6) {
    Title = "Fraud Digitization Portal";
    UserRoleId = role;
    SidebarData = MISManager;
    MainMenu = MISManagerRouteData;
    Notification = false;
  }

  return {
    Title,
    UserRoleId,
    SidebarData,
    MainMenu,
    Notification,
  };
};

export { UserSelection };
