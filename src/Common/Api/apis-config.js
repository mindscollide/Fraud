import { EditCityAndRegionMapping } from "../../store/actions/setup-forms-actions";

const _token = localStorage.getItem("token");
// "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJVc2VyTmFtZSI6ImZhaXNhbC5zaGFoIiwiVXNlclR5cGUiOiJVIiwiQWNjZXNzRHR0bSI6NjM3NjM2OTc2MDUzMjAyOTYzLCJEZXZpY2UiOiJQT1NUTUFOIiwiQXBwbGljYXRpb25JRCI6IkVSTSJ9.F-CixTix2MERIqVsO1CLoVVJrET_bMaScZReJAwdnRM";
const authenticationRequestConfigs = {
  _token: null,
  RequestMethod: "ServiceManager.Login",
};
const requestList = {
  _token: null,
  RequestMethod: "ServiceManager.GetNewUserRequests",
};
const requestListCount = {
  _token: null,
  RequestMethod: "ServiceManager.GetNewUserRequestsCount",
};
// for requestListCount Investigation officer
const requestListCountIM = {
  _token: null,
  RequestMethod: "ServiceManager.CountAllPendigForApproval",
};
const saveuserrequest = {
  _token: null,
  RequestMethod: "ServiceManager.SaveUserRequest",
};
const validateemail = {
  _token: null,
  RequestMethod: "ServiceManager.ValidateEmailFromAD",
};
const validateemailandpassword = {
  _token: null,
  RequestMethod: "ServiceManager.ValidateEmailAndPasswordFromAD",
};
const signuprequest = {
  _token: null,
  RequestMethod: "ServiceManager.SignUp",
};
const authenticationRefreshToken = {
  _token: null,
  RequestMethod: "ServiceManager.RefreshToken",
};
const findCustomerFromMisysConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.FindCustomer",
};
const findCustomerAccountDetailsFromMisysConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.FindAccountDetails",
};
const addWriteOffConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.AddWriteOff",
};
const editWriteOffConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.EditWriteOff",
};
const deleteWriteOffConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.DeleteWriteOff",
};
const approvalsCountConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.FindApprovalCount",
};
const approvalsConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.FindApproval",
};
const viewApprovalHistoryConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.ViewApprovalHistory",
};
const saveApprovalsConfig = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveApproval",
};
const viewWriteOff = {
  _token: _token,
  RequestMethod: "ServiceManager.ViewWriteOff",
};
const listOffWriteOff = {
  _token: _token,
  ListWriteOff: "ServiceManager.ListWriteOff",
  FindMyCases: "ServiceManager.FindMyCases",
  ViewAllApprovedCases: "ServiceManager.ViewAllApprovedCases",
};

const completeReportConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.ShowCompleteReport",
};
const creditPolicyReportConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.ShowCreditPolicyReport",
};
const balanceSheetReportConfigs = {
  _token: _token,
  RequestMethod: "ServiceManager.ShowBalanceSheetReport",
};
const GetSetupFormConfigs = {
  _token: _token,
  GetBorrowerType: "ServiceManager.GetBorrowerType",
  GetAdvanceClassification: "ServiceManager.GetAdvanceClassification",
  GetManagementUnit: "ServiceManager.GetManagementUnit",
  GetNatureofCharge: "ServiceManager.GetNatureofCharge",
  GetNatureOfSecurity: "ServiceManager.GetNatureOfSecurity",
  GetWOFReason: "ServiceManager.GetWOFReason",
  GetApprovalReason: "ServiceManager.GetApprovalReason",
  GetRejectionReason: "ServiceManager.GetRejectionReason",
  GetApprovalFlow: "ServiceManager.GetApprovalFlow",
  GetApprovalFlowForEdit: "ServiceManager.GetApprovalFlowForEdit",
};
const PostSetupFormConfigs = {
  _token: _token,
  AddBorrowerType: "ServiceManager.AddBorrowerType",
  UpdateBorrowerType: "ServiceManager.UpdateBorrowerType",
  DeleteBorrowerType: "ServiceManager.DeleteBorrowerType",
  AddAdvanceClassification: "ServiceManager.AddAdvanceClassification",
  UpdateAdvanceClassification: "ServiceManager.UpdateAdvanceClassification",
  DeleteAdvanceClassification: "ServiceManager.DeleteAdvanceClassification",
  AddManagementUnit: "ServiceManager.AddManagementUnit",
  UpdateManagementUnit: "ServiceManager.UpdateManagementUnit",
  DeleteManagementUnit: "ServiceManager.DeleteManagementUnit",
  AddNatureofCharge: "ServiceManager.AddNatureofCharge",
  UpdateNatureofCharge: "ServiceManager.UpdateNatureofCharge",
  DeleteNatureofCharge: "ServiceManager.DeleteNatureofCharge",
  AddNatureOfSecurity: "ServiceManager.AddNatureOfSecurity",
  UpdateNatureOfSecurity: "ServiceManager.UpdateNatureOfSecurity",
  DeleteNatureOfSecurity: "ServiceManager.DeleteNatureOfSecurity",
  AddWOFReason: "ServiceManager.AddWOFReason",
  UpdateWOFReason: "ServiceManager.UpdateWOFReason",
  DeleteWOFReason: "ServiceManager.DeleteWOFReason",
  AddApprovalReason: "ServiceManager.AddApprovalReason",
  UpdateApprovalReason: "ServiceManager.UpdateApprovalReason",
  DeleteApprovalReason: "ServiceManager.DeleteApprovalReason",
  AddRejectionReason: "ServiceManager.AddRejectionReason",
  UpdateRejectionReason: "ServiceManager.UpdateRejectionReason",
  DeleteRejectionReason: "ServiceManager.DeleteRejectionReason",
  DeleteApprovalFlow: "ServiceManager.DeleteApprovalFlow",
  UpdateApprovalFlowForUser: "ServiceManager.UpdateApprovalFlowForUser",
  DeleteApprovalFlowForUser: "ServiceManager.DeleteApprovalFlowForUser",
};
const SearchSetupFormConfigs = {
  _token: _token,
  SearchBorrowerType: "ServiceManager.SearchBorrowerType",
  SearchAdvanceClassification: "ServiceManager.SearchAdvanceClassification",
  SearchManagementUnit: "ServiceManager.SearchManagementUnit",
  SearchWOFReason: "ServiceManager.SearchWOFReason",
  SearchNatureofCharge: "ServiceManager.SearchNatureofCharge",
  SearchNatureOfSecurity: "ServiceManager.SearchNatureOfSecurity",
  SearchApprovalReason: "ServiceManager.SearchApprovalReason",
  SearchRejectionReason: "ServiceManager.SearchRejectionReason",
  SearchApprovalFlow: "ServiceManager.SearchApprovalFlow",
};
const completeReportExcelConfigs = {
  _token: _token,
  RequestMethod: "CompleteReportExcel",
};
const creditReportExcelConfigs = {
  _token: _token,
  RequestMethod: "CreditReportExcel",
};
const balanceReportExcelConfigs = {
  _token: _token,
  RequestMethod: "BalanceSheetReportExcel",
};

// Upload Document
const UploadDocument = {
  RequestMethod: "ServiceManager.UploadDocument",
};

// All Fraud Type
const allFraudType = {
  _token: _token,
  RequestMethod: "ServiceManager.AllFraudType",
};

// Add Fraud Type
const addFraudType = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveFraudType",
};

// Delete Fraud Type
const deleteFraudType = {
  _token: _token,
  RequestMethod: "ServiceManager.DeleteFraudType",
};

// Edit Fraud Type
const editFraudType = {
  _token: _token,
  RequestMethod: "ServiceManager.UpdateFraudType",
};

//All Source
const allSource = {
  _token: _token,
  RequestMethod: "ServiceManager.AllSource",
};

//Add Source
const addSource = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveSource",
};

// Delete Source
const deleteSource = {
  _token: _token,
  RequestMethod: "ServiceManager.DeleteSource",
};

// Update Source
const updateSource = {
  _token: _token,
  RequestMethod: "ServiceManager.UpdateSource",
};

//All Individual Involved
const allIndividualInvolved = {
  _token: _token,
  RequestMethod: "ServiceManager.AllIndividualInvolved",
};

//Add Individual Involved
const addIndividualInvolved = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveIndividualInvolved",
};

//Delete Individual Involved
const deleteIndividualInvolved = {
  _token: _token,
  RequestMethod: "ServiceManager.DeleteIndividualInvolved",
};

//Update Individual Involved
const updateIndividualInvolved = {
  _token: _token,
  RequestMethod: "ServiceManager.UpdateIndividualInvolved",
};

//All CHannel
const allChannel = {
  _token: _token,
  RequestMethod: "ServiceManager.AllChannel",
};

//Add Channel
const addChannel = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveChannel",
};

//Delete Channel
const deleteChannel = {
  _token: _token,
  RequestMethod: "ServiceManager.DeleteChannel",
};

//Update Channel
const updateChannel = {
  _token: _token,
  RequestMethod: "ServiceManager.UpdateChannel",
};

//All Fraud Not A Fraud
const allFraudNotAFraud = {
  _token: _token,
  RequestMethod: "ServiceManager.AllFraudNOTFraud",
};

//Add Fraud Not A Fraud
const addFraudNotAFraud = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveFraudNOTFraud",
};

//Delete Fraud Not A Fraud
const deleteFraudNotAFraud = {
  _token: _token,
  RequestMethod: "ServiceManager.DeleteFraudNOTFraud",
};

//Update Fraud Not A Fraud
const updateFraudNotAFraud = {
  _token: _token,
  RequestMethod: "ServiceManager.UpdateFraudNOTFraud",
};

//All Company Segment
const allCompanySegment = {
  _token: _token,
  RequestMethod: "ServiceManager.AllCompanySegment",
};

//Add Company Segment
const addCompanySegment = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveCompanySegment",
};

//Delete Company Segment
const deleteCompanySegment = {
  _token: _token,
  RequestMethod: "ServiceManager.DeleteCompanySegment",
};

//Update Company Segment
const updateCompanySegment = {
  _token: _token,
  RequestMethod: "ServiceManager.UpdateCompanySegment",
};

//All Forged Documents
const allForgedDocuments = {
  _token: _token,
  RequestMethod: "ServiceManager.AllForgedDocuments",
};

//Add Forged Documents
const addForgedDocuments = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveForgedDocuments",
};

//Delete Forged Documents
const deleteForgedDocuments = {
  _token: _token,
  RequestMethod: "ServiceManager.DeleteForgedDocuments",
};

//Update Forged Documents
const updateForgedDocuments = {
  _token: _token,
  RequestMethod: "ServiceManager.UpdateForgedDocuments",
};

//All Source of IB Channel Creation
const allSourceOfIBChannelCreation = {
  _token: _token,
  RequestMethod: "ServiceManager.AllSourceOfIBChannelCreation",
};

//Add Source of IB Channel Creation
const addSourceOfIBChannelCreation = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveSourceOfIBChannelCreation",
};

//Delete Source of IB Channel Creation
const deleteSourceOfIBChannelCreation = {
  _token: _token,
  RequestMethod: "ServiceManager.DeleteSourceOfIBChannelCreation",
};

//Update Source of IB Channel Creation
const updateSourceOfIBChannelCreation = {
  _token: _token,
  RequestMethod: "ServiceManager.UpdateSourceOfIBChannelCreation",
};

//All City
const allCity = {
  _token: _token,
  RequestMethod: "ServiceManager.AllCity",
};

//Add City
const addCity = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveCity",
};

//Delete City
const deleteCity = {
  _token: _token,
  RequestMethod: "ServiceManager.DeleteCity",
};

//Edit City
const updateCity = {
  _token: _token,
  RequestMethod: "ServiceManager.UpdateCity",
};

//All Region
const allRegion = {
  _token: _token,
  RequestMethod: "ServiceManager.AllRegion",
};

//Add Region
const addRegion = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveRegion",
};

//Delete Region
const deleteRegion = {
  _token: _token,
  RequestMethod: "ServiceManager.DeleteRegion",
};

//Edit Region
const updateRegion = {
  _token: _token,
  RequestMethod: "ServiceManager.UpdateRegion",
};

//All CityAndRegionMapping
const allCityAndRegionMapping = {
  _token: _token,
  RequestMethod: "ServiceManager.AllCityRegionMapping",
};

//Add CityAndRegionMapping
const addCityAndRegionMapping = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveCityRegionMapping",
};

//Delete CityAndRegionMapping
const deleteCityAndRegionMapping = {
  _token: _token,
  RequestMethod: "ServiceManager.DeleteCityRegionMapping",
};

//Edit CityAndRegionMapping
const updateCityAndRegionMapping = {
  _token: _token,
  RequestMethod: "ServiceManager.UpdateCityRegionMapping",
};

//All Roles
const allUserRoles = {
  _token: _token,
  RequestMethod: "ServiceManager.AllGSSUserRoles",
  RoleManager: "ServiceManager.RoleList",
};

//All EscalationMatrix
const allEscalationMatrix = {
  _token: _token,
  RequestMethod: "ServiceManager.AllEscalationMatrix",
};

//Add EscalationMatrix
const addEscalationMatrix = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveEscalationMatrix",
};

//Delete EscalationMatrix
const deleteEscalationMatrix = {
  _token: _token,
  RequestMethod: "ServiceManager.DeleteEscalationMatrix",
};

//Edit EscalationMatrix
const updateEscalationMatrix = {
  _token: _token,
  RequestMethod: "ServiceManager.UpdateEscalationMatrix",
};

//All ApprovalReasons
const allApprovalReasons = {
  _token: _token,
  RequestMethod: "ServiceManager.AllApprovalReasons",
};

//Add ApprovalReasons
const addApprovalReasons = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveApprovalReasons",
};

//Delete ApprovalReasons
const deleteApprovalReasons = {
  _token: _token,
  RequestMethod: "ServiceManager.DeleteApprovalReasons",
};

//Edit ApprovalReasons
const updateApprovalReasons = {
  _token: _token,
  RequestMethod: "ServiceManager.UpdateApprovalReasons",
};

//All RejectionReasons
const allRejectionReasons = {
  _token: _token,
  RequestMethod: "ServiceManager.AllRejectionReasons",
};

//Add RejectionReasons
const addRejectionReasons = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveRejectionReasons",
};

//Delete RejectionReasons
const deleteRejectionReasons = {
  _token: _token,
  RequestMethod: "ServiceManager.DeleteRejectionReasons",
};

//Edit RejectionReasons
const updateRejectionReasons = {
  _token: _token,
  RequestMethod: "ServiceManager.UpdateRejectionReasons",
};

//All GetTransactionDetailsByCnic
const getTransactionDetailsByCnic = {
  _token: _token,
  RequestMethod: "ServiceManager.GetTransactionDetailsByCnic",
};

//GetDisputeStatus
const getDisputeStatusCC = {
  _token: _token,
  RequestMethod: "ServiceManager.GetDisputeStatus",
};

//GetDisputeStatus
const getDisputeStatusDC = {
  _token: _token,
  RequestMethod: "ServiceManager.GetDisputeStatus",
};

//GetDisputeStatus
const getDisputeStatusADC = {
  _token: _token,
  RequestMethod: "ServiceManager.GetDisputeStatus",
};

//GetDisputeStatusNonApi
const getDisputeStatusNonApi = {
  _token: _token,
  RequestMethod: "ServiceManager.GetDisputeStatus",
};

//GetDisputeStatus
const getDisputeStatusBBK = {
  _token: _token,
  RequestMethod: "ServiceManager.GetDisputeStatus",
};

//GetDisputeStatus
const getDisputeStatusND = {
  _token: _token,
  RequestMethod: "ServiceManager.GetDisputeStatus",
};

//GetDisputeStatus
const getDisputeStatusGlobal = {
  _token: _token,
  RequestMethod: "ServiceManager.GetDisputeStatus",
};

//GetDisputeStatus
const getDisputeStatusSAPendingForDeletion = {
  _token: _token,
  RequestMethod: "ServiceManager.GetDisputeStatus",
};

//All getTransactionDisputesByCnic
const getTransactionDisputesByCnic = {
  _token: _token,
  RequestMethod: "ServiceManager.GetCreditCardDisputesByCnicAndRefrenceNumber",
};

//GetIRISCustomerByCnic
const getIRISCustomerByCnicCC = {
  _token: _token,
  RequestMethod: "ServiceManager.GetIRISCustomerByCnic",
};

//All CreditCardDisputes
const getCreditCardDisputes = {
  _token: _token,
  RequestMethod: "ServiceManager.GetCreditCardDisputes",
};

//Edit SearchCreditCardDispute
const searchCreditCardDispute = {
  _token: _token,
  RequestMethod: "ServiceManager.SearchCreditCardDispute",
};

//GetTransactionDetailsByCnicCreditCard
const getTransactionDetailsByCnicCC = {
  _token: _token,
  RequestMethod: "ServiceManager.GetTransactionDetailsByCnic",
};

//Save Credit Card Dispute
const saveCreditCardDispute = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveCreditCardDisputes",
};
//Save And ApprovedCredit Card Dispute
const savenApprovedCreditCardDispute = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveAndApproveCreditCardDisputes",
};
//GetCreditCardDisputesForEditByCnicAndRefrenceNumber
const getCreditCardDisputesForEditByCnicAndRefrenceNumber = {
  _token: _token,
  RequestMethod:
    "ServiceManager.GetCreditCardDisputesForEditByCnicAndRefrenceNumber",
};

//UpdateCreditCardDisputeDetails
const updateCreditCardDetails = {
  _token: _token,
  RequestMethod: "ServiceManager.UpdateDisputeDetails",
};

//UpdateAndApproveCreditCardDisputeDetails
const updateAndApproveDisputeDetails = {
  _token: _token,
  RequestMethod: "ServiceManager.UpdateAndApproveDisputeDetails",
};

//SaveDebitCard
const saveDebitCardDispute = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveDispute",
};

//SaveDebitCardForApproval
const saveDebitCardDisputeForApproval = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveDisputeForApproval",
};

//SearchDebitCardDisputes
const searchDebitCardDisputes = {
  _token: _token,
  RequestMethod: "ServiceManager.SearchDebitCardDisputes",
};

//GetTransactionDetailsByCnicDebitCard
const getTransactionDetailsByCnicDebitCard = {
  _token: _token,
  RequestMethod: "ServiceManager.GetTransactionDetailsByCnicDebitCard",
};
//GetTransactionDetailsByCnicAndAccountNumberDebitCard
const getTransactionDetailsByCnicAndAccountNumberDebitCard = {
  _token: _token,
  RequestMethod:
    "ServiceManager.GetTransactionDetailsByCnicAndAccountNumberDebitCard",
};
//SearchCustomerByCnic
const searchCustomerByCnic = {
  _token: _token,
  RequestMethod: "ServiceManager.SearchCustomerByCnic",
};

//GetAllAccountsbyCnic
const getAllAccountsByCnic = {
  _token: _token,
  RequestMethod: "ServiceManager.GetAllAccountsByCnic",
};

//GetIRISTransactionDetailsByTransactionId
const getIRISTransactionDetailsByTransactionId = {
  _token: _token,
  RequestMethod: "ServiceManager.GetIRISTransactionDetailsByTransactionId",
};

// for add new record SearchTransactionDetailsByAccountNumber
const searchTransactionDetailsByAccountNumber = {
  _token: _token,
  RequestMethod: "ServiceManager.SearchTransactionDetailsByAccountNumber",
};
const SearchIRISTransactionDetailsByAccountNumber = {
  _token: _token,
  RequestMethod: "ServiceManager.SearchIRISTransactionDetailsByAccountNumber",
};
//Get Debit Card Dispute By CNIC And Reference Number
const searchDisputesByCnicAndReferenceNumber = {
  _token: _token,
  RequestMethod: "ServiceManager.SearchDisputesByCnicAndReferenceNumber",
};

//Edit Api for Debit Card CNIC
const searchDisputesForEditByCnicAndReferenceNumber = {
  _token: _token,
  RequestMethod: "ServiceManager.SearchDisputesForEditByCnicAndReferenceNumber",
};

//Update Dispute Details Debit
const updateDisputeDetails = {
  _token: _token,
  RequestMethod: "ServiceManager.UpdateDisputeDetails",
};

//Update And Approve Dispute Details Debit
const updateAndApproveDebitDisputeDetails = {
  _token: _token,
  RequestMethod: "ServiceManager.UpdateAndApproveDisputeDetails",
};

//GetTransactionDetailsByAccountNumber
// const getTransactionDetailsByAccountNumber = {
//   _token: _token,
//   RequestMethod: "ServiceManager.GetTransactionDetailsByAccountNumber",
// }

// //GetAllAccountsbyCnic for ADC
// const getAllAccountsByCnicADC = {
//   _token: _token,
//   RequestMethod: "ServiceManager.GetAllAccountsByCnic",
// }

//GetIRISTransactionDetailsByTransactionId
// const getIRISTransactionDetailsByTransactionIdADC = {
//   _token: _token,
//   RequestMethod: "ServiceManager.GetIRISTransactionDetailsByTransactionId",
// }

//GetTransactionDetailsByCnicDebitCard FOR ADC
// const getTransactionDetailsByCnicDebitCardADC = {
//   _token: _token,
//   RequestMethod: "ServiceManager.GetTransactionDetailsByCNICADC",
// }

//SearchADCDisputes
// const searchADCDisputes = {
//   _token: _token,
//   RequestMethod: "ServiceManager.SearchADCDiputes",
// }

// for add new record SearchTransactionDetailsByAccountNumber for ADC
// const searchTransactionDetailsByAccountNumberADC = {
//   _token: _token,
//   RequestMethod: "ServiceManager.SearchTransactionDetailsByAccountNumber",
// }

//Save ADC DisputesaveAndApproveADCDispute
// const saveADCDispute = {
//   _token: _token,
//   RequestMethod: "ServiceManager.SaveADCDispute",
// }

//Save and Approve ADC Disputes
// const saveAndApproveADCDispute = {
//   _token: _token,
//   RequestMethod: "ServiceManager.SaveADCDisputeForApproval",
// }

//Search Transaction Details By CNIC and Reference Number
// const searchTransactionDetailsByCnicAndReferenceNumberADC = {
//   _token: _token,
//   RequestMethod: "ServiceManager.SearchADCDisputesByCnicAndReferenceNumber",
// }

// //Update Dispute Details ADC
// const updateDisputeDetailsADC = {
//   _token: _token,
//   RequestMethod: "ServiceManager.UpdateDisputeDetails",
// }

// //Update And Approve Dispute Details ADC
// const updateAndApproveADCDisputeDetails = {
//   _token: _token,
//   RequestMethod: "ServiceManager.UpdateAndApproveDisputeDetails",
// }

// // search account number in iris adc
// const searchIRISTransactionDetailsByAccountNumber = {
//   _token: _token,
//   RequestMethod: "ServiceManager.SearchIRISTransactionDetailsByAccountNumber",
// }

// //Edit API ADC
// const searchADCDisputesForEditByCnicAndReferenceNumber = {
//   _token: _token,
//   RequestMethod: "ServiceManager.SearchADCDisputesForEditByCnicAndReferenceNumber",
// }
//GetAllPendingForApproval Investigation Manager
const getAllPendingForApproval = {
  _token: _token,
  RequestMethod: "ServiceManager.GetAllPendingForApproval",
};

//ApprovePendingForApproval Investigation Manager
const savePendingForApproval = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveApproval",
  RequestMethod2: "ServiceManager.SaveDeletionApprove",
};

//GetPendingForApproval
const getPendingForApproval = {
  _token: _token,
  RequestMethod: "ServiceManager.GetPendingForApproval",
};

//RejectPendingForApproval
const saveRejection = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveRejection",
  RequestMethod2: "ServiceManager.SaveDeletionReject",
};

//GetAllDisputesQAManager
const getAllDisputesQM = {
  _token: _token,
  RequestMethod: "ServiceManager.GetAllDisputesQM",
};

//GetAllTransactionTypes
const getAllTransactionTypes = {
  _token: _token,
  RequestMethod: "ServiceManager.AllTransactionTypes",
};

//SavePendingForDeletion
const savePendingForDeletion = {
  _token: _token,
  RequestMethod: "ServiceManager.SavePendingForDeletion",
};
// for adc
//GetTransactionDetailsByAccountNumber
const getTransactionDetailsByAccountNumber = {
  _token: _token,
  RequestMethod: "ServiceManager.GetTransactionDetailsByAccountNumber",
};

//GetAllAccountsbyCnic for ADC
const getAllAccountsByCnicADC = {
  _token: _token,
  RequestMethod: "ServiceManager.GetAllAccountsByCnic",
};

//GetIRISTransactionDetailsByTransactionId
const getIRISTransactionDetailsByTransactionIdADC = {
  _token: _token,
  RequestMethod: "ServiceManager.GetIRISTransactionDetailsByTransactionId",
};

//GetTransactionDetailsByCnicDebitCard FOR ADC
const getTransactionDetailsByCnicDebitCardADC = {
  _token: _token,
  RequestMethod: "ServiceManager.GetTransactionDetailsByCNICADC",
};

//SearchADCDisputes
const searchADCDisputes = {
  _token: _token,
  RequestMethod: "ServiceManager.SearchADCDiputes",
};

// for add new record SearchTransactionDetailsByAccountNumber for ADC
const searchTransactionDetailsByAccountNumberADC = {
  _token: _token,
  RequestMethod: "ServiceManager.SearchTransactionDetailsByAccountNumber",
};

//Save ADC DisputesaveAndApproveADCDispute
const saveADCDispute = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveADCDispute",
};

//Save and Approve ADC Disputes
const saveAndApproveADCDispute = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveADCDisputeForApproval",
};

//Search Transaction Details By CNIC and Reference Number
const searchTransactionDetailsByCnicAndReferenceNumberADC = {
  _token: _token,
  RequestMethod: "ServiceManager.SearchADCDisputesByCnicAndReferenceNumber",
};

//Update Dispute Details ADC
const updateDisputeDetailsADC = {
  _token: _token,
  RequestMethod: "ServiceManager.UpdateDisputeDetails",
};

//Update And Approve Dispute Details ADC
const updateAndApproveADCDisputeDetails = {
  _token: _token,
  RequestMethod: "ServiceManager.UpdateAndApproveDisputeDetails",
};

// search account number in iris adc
const searchIRISTransactionDetailsByAccountNumber = {
  _token: _token,
  RequestMethod: "ServiceManager.SearchIRISTransactionDetailsByAccountNumber",
};

//Edit API ADC
const searchADCDisputesForEditByCnicAndReferenceNumber = {
  _token: _token,
  RequestMethod:
    "ServiceManager.SearchADCDisputesForEditByCnicAndReferenceNumber",
};

//== BBKONNECT===\\
//getAllAccountsByCnicBBK
const getAllAccountsByCnicBBK = {
  _token: _token,
  RequestMethod: "ServiceManager.GetAllAccountsByCnic",
};

//getAllAccountsByMobileNumberBBK
const getAllAccountsByMobileNumberBBK = {
  _token: _token,
  RequestMethod: "ServiceManager.GetAllAccountsByMobileNumber",
};

//getTransactionDetailsByCNICBBKonnect
const getTransactionDetailsByCNICBBKonnect = {
  _token: _token,
  RequestMethod: "ServiceManager.GetTransactionDetailsByCNICBBKonnect",
};

//searchIRISTransactionDetailsByAccountNumberBBK
const searchIRISTransactionDetailsByAccountNumberBBK = {
  _token: _token,
  RequestMethod: "ServiceManager.SearchIRISTransactionDetailsByAccountNumber",
};

//searchIRISTransactionDetailsByAccountNumberBBK
const searchIRISTransactionDetailsByMobileNumberBBK = {
  _token: _token,
  RequestMethod: "ServiceManager.SearchIRISTransactionDetailsByMobileNumber",
};

//getIRISTransactionDetailsByTransactionIdBBK
const getIRISTransactionDetailsByTransactionIdBBK = {
  _token: _token,
  RequestMethod: "ServiceManager.GetIRISTransactionDetailsByTransactionId",
};

//getIRISTransactionDetailsByTransactionIdBBK
const saveBBKDispute = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveDispute",
};

//getIRISTransactionDetailsByTransactionIdBBK
const saveAndApproveBBKDispute = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveAndApproveDispute",
};

//searchBBKDispute
const searchBBKDispute = {
  _token: _token,
  RequestMethod: "ServiceManager.SearchBBKonnectDiputes",
};

//SearchBBKonnectDisputesByCnicAndReferenceNumber
const searchBBKonnectDisputesByCnicAndReferenceNumber = {
  _token: _token,
  RequestMethod:
    "ServiceManager.SearchBBKonnectDisputesByCnicAndReferenceNumber",
};

//SearchBBKonnectDisputesForEditByCnicAndReferenceNumber
const searchBBKonnectDisputesForEditByCnicAndReferenceNumber = {
  _token: _token,
  RequestMethod:
    "ServiceManager.SearchBBKonnectDisputesForEditByCnicAndReferenceNumber",
};

//UpdateDisputeDetails
const updateBBKDispute = {
  _token: _token,
  RequestMethod: "ServiceManager.UpdateDisputeDetails",
};

//UpdateAndApproveDisputeDetails
const updateAndApproveBBKDispute = {
  _token: _token,
  RequestMethod: "ServiceManager.UpdateAndApproveDisputeDetails",
};

//GetTransactionDetailsByAccountNumberBBKonnect
const getTransactionDetailsByAccountNumberBBKonnect = {
  _token: _token,
  RequestMethod: "ServiceManager.GetTransactionDetailsByAccountNumberBBKonnect",
};

//GetTransactionDetailsByMobileNumberBBKonnect
const getTransactionDetailsByMobileNumberBBKonnect = {
  _token: _token,
  RequestMethod: "ServiceManager.GetTransactionDetailsByMobileNumberBBKonnect",
};

// for all user role data
const getalluserdataforadmin = {
  _token: null,
  RequestMethod: "ServiceManager.GetAllUsersList",
};

// for edit user
const editUserDataForAdmin = {
  _token: null,
  RequestMethod: "ServiceManager.EditUser",
  RequestMethod2: "ServiceManager.EditSystemUser",
};

//== NONAPI===\\

//GetPendingForApproval
const getForDeletion = {
  _token: _token,
  RequestMethod: "ServiceManager.GetForDeletion",
};

//System Admin Pending Deletion
const savePendingForDeletionSystemAdmin = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveDeletion",
};

//RejectPendingForApproval
const saveInProcess = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveInProcess",
};

//searchDeleteDisputes
const searchDeleteDisputes = {
  _token: _token,
  RequestMethod: "ServiceManager.SearchDisputes",
};

//globalSearchDisputes
const globalSearchDisputes = {
  _token: _token,
  RequestMethod: "ServiceManager.GlobalSearchDisputes",
};

//GetPendingForApproval
const getAllPendingForDeletion = {
  _token: _token,
  RequestMethod: "ServiceManager.GetPendingForDeletion",
};

//GetPendingForApproval
// const savePendingForDeletion = {
//   _token: _token,
//   RequestMethod: "ServiceManager.SavePendingForDeletion",
// }

// ====>> NON API CONFIGS <<==== \\
//GetTransactionDetailsByCnicDebitCard
const getTransactionDetailsByCnicNonApi = {
  _token: _token,
  RequestMethod: "ServiceManager.GetTransactionDetailsByCnicNPI",
};

//GetAllAccountsbyCnicNONAPI
const getAllAccountsByCnicNonApi = {
  _token: _token,
  RequestMethod: "ServiceManager.GetAllAccountsByCnic",
};

//Add Edit 3rd Api Account Select One
const searchIRISTransactionDetailsByAccountNumberNonApi = {
  _token: _token,
  RequestMethod: "ServiceManager.SearchIRISTransactionDetailsByAccountNumber",
};

//Get Details by Account Number NON API
const getTransactionDetailsByAccountNumberNonApi = {
  _token: _token,
  RequestMethod: "ServiceManager.GetTransactionDetailsByAccountNumber",
};

//GetIRISTransactionDetailsNonApiByTransactionId
const getIRISTransactionDetailsByTransactionIdNonApi = {
  _token: _token,
  RequestMethod: "ServiceManager.GetIRISTransactionDetailsByTransactionId",
};

//SaveNonApiDispute
const saveNonApiDispute = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveDispute",
};

//SaveNonApiDisputeForApproval
const saveNonApiDisputeForApproval = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveDisputeForApproval",
};

//SearchNonApiDisputes
const searchNonApiDisputes = {
  _token: _token,
  RequestMethod: "ServiceManager.SearchNPIDisputes",
};

//Get NON API Dispute By CNIC And Reference Number
const searchDisputesByCnicAndReferenceNumberNonApi = {
  _token: _token,
  RequestMethod: "ServiceManager.SearchDisputesByCnicAndReferenceNumber",
};

//Edit Api for NON API
const searchDisputesForEditByCnicAndReferenceNumberNonApi = {
  _token: _token,
  RequestMethod: "ServiceManager.SearchDisputesForEditByCnicAndReferenceNumber",
};

//Update Dispute Details Non Api
const updateDisputeDetailsNonApi = {
  _token: _token,
  RequestMethod: "ServiceManager.UpdateDisputeDetails",
};

//Update And Approve Dispute Details Debit
const updateAndApproveNonApiDisputeDetails = {
  _token: _token,
  RequestMethod: "ServiceManager.UpdateAndApproveDisputeDetails",
};

//All GetTransactionDetailsByCnic
const getDisputeDetailsNDB = {
  RequestMethod: "ServiceManager.GetDisputeBYCNIC",
};
//NegativeDatabase
const getTransactionDetailsByCnicNDB = {
  _token: _token,
  RequestMethod: "ServiceManager.GetDisputeBYCNIC",
};

//Save NegativeDatabase
const saveApiDisputeNDB = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveDispute",
};
//search NegativeDatabase
const searchDisputeNDB = {
  _token: _token,
  RequestMethod: "ServiceManager.SearchDispute",
};
//view NegativeDatabase
const viewNDBByCnicAndReferenceNumber = {
  _token: _token,
  RequestMethod: "ServiceManager.SearchDisputesByCnic",
};
//Save NegativeDatabase
const editApiDisputeNDB = {
  RequestMethod: "ServiceManager.UpdateDisputeDetails",
};
// Download Credit Card Dispute
const creditCardReportExcel = {
  _token: _token,
  RequestMethod: "CreditCardReportExcel",
};
// Download debit Card Dispute
const debitCardReportExcel = {
  _token: _token,
  RequestMethod: "DebitCardReportExcel",
  RequestMethod1: "FileDownload",
};
// Download ADC Dispute
const adcReportExcel = {
  _token: _token,
  RequestMethod: "ADCReportExcel",
};

// Download BB konnect Dispute
const BBKReportExcel = {
  _token: _token,
  RequestMethod: "BBKonnectReportExcel",
};
// Download non api Dispute
const nonAPIReportExcel = {
  _token: _token,
  RequestMethod: "NONAPIReportExcel",
};
// Download non api Dispute
const ndReportExcel = {
  _token: _token,
  RequestMethod: "NDReportExcel",
};
// Download Ageing report excel
const ageingReportExcel = {
  _token: _token,
  RequestMethod: "AgeingReportExcel",
};
// Download Region Wise Staff
const regionwiseReportExcel = {
  _token: _token,
  RequestMethod: "RegionWiseStaffReportExcel",
};

//AuditTrail Report Download
const auditTrailReportExcel = {
  _token: _token,
  RequestMethod: "UserAuditActivityReportExcel",
};

// Get All Status
const getAllStatus = {
  _token: _token,
  RequestMethod: "ServiceManager.AllCaseStatus",
};

// Get All Status
const getAllActions = {
  _token: _token,
  RequestMethod: "ServiceManager.GetAllAuditTrailAction",
};

//allHoliday
const allHoliday = {
  _token: _token,
  RequestMethod: "ServiceManager.AllOfficialHoliday",
};

//saveHoliday
const saveHoliday = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveOfficialHoliday",
};

// deleteHoliday
const deleteHoliday = {
  _token: _token,
  RequestMethod: "ServiceManager.DeleteOfficialHoliday",
};

// Update Holiday
const updateHoliday = {
  _token: _token,
  RequestMethod: "ServiceManager.UpdateOfficialHoliday",
};

//allHoliday
const allCaseDecision = {
  _token: _token,
  RequestMethod: "ServiceManager.AllCaseDecision",
};

//saveHoliday
const saveCaseDecision = {
  _token: _token,
  RequestMethod: "ServiceManager.SaveCaseDecision",
};

// deleteHoliday
const deleteCaseDecision = {
  _token: _token,
  RequestMethod: "ServiceManager.DeleteCaseDecision",
};

// Get All Status
const updateCaseDecision = {
  _token: _token,
  RequestMethod: "ServiceManager.UpdateCaseDecision",
};

//AllTransactionCurrency
const allTransactionCurrency = {
  _token: _token,
  RequestMethod: "ServiceManager.AllTransactionCurrency",
};

export {
  getAllPendingForDeletion,
  searchIRISTransactionDetailsByAccountNumber,
  SearchIRISTransactionDetailsByAccountNumber,
  authenticationRequestConfigs,
  authenticationRefreshToken,
  requestList,
  requestListCount,
  validateemail,
  validateemailandpassword,
  signuprequest,
  saveuserrequest,
  findCustomerFromMisysConfigs,
  findCustomerAccountDetailsFromMisysConfigs,
  addWriteOffConfigs,
  approvalsCountConfigs,
  approvalsConfigs,
  saveApprovalsConfig,
  viewWriteOff,
  listOffWriteOff,
  viewApprovalHistoryConfigs,
  completeReportConfigs,
  creditPolicyReportConfigs,
  editWriteOffConfigs,
  balanceSheetReportConfigs,
  deleteWriteOffConfigs,
  GetSetupFormConfigs,
  PostSetupFormConfigs,
  SearchSetupFormConfigs,
  completeReportExcelConfigs,
  creditReportExcelConfigs,
  balanceReportExcelConfigs,
  addFraudType,
  allFraudType,
  deleteFraudType,
  editFraudType,
  allSource,
  addSource,
  deleteSource,
  updateSource,
  allIndividualInvolved,
  addIndividualInvolved,
  deleteIndividualInvolved,
  updateIndividualInvolved,
  allChannel,
  addChannel,
  deleteChannel,
  updateChannel,
  allFraudNotAFraud,
  addFraudNotAFraud,
  deleteFraudNotAFraud,
  updateFraudNotAFraud,
  allCompanySegment,
  addCompanySegment,
  deleteCompanySegment,
  updateCompanySegment,
  allForgedDocuments,
  addForgedDocuments,
  deleteForgedDocuments,
  updateForgedDocuments,
  allSourceOfIBChannelCreation,
  addSourceOfIBChannelCreation,
  deleteSourceOfIBChannelCreation,
  updateSourceOfIBChannelCreation,
  allCity,
  addCity,
  deleteCity,
  updateCity,
  allRegion,
  addRegion,
  deleteRegion,
  updateRegion,
  allCityAndRegionMapping,
  addCityAndRegionMapping,
  deleteCityAndRegionMapping,
  updateCityAndRegionMapping,
  allUserRoles,
  allEscalationMatrix,
  addEscalationMatrix,
  deleteEscalationMatrix,
  updateEscalationMatrix,
  allApprovalReasons,
  addApprovalReasons,
  deleteApprovalReasons,
  updateApprovalReasons,
  allRejectionReasons,
  addRejectionReasons,
  deleteRejectionReasons,
  updateRejectionReasons,
  //Credit Card APIS
  getTransactionDetailsByCnic,
  getIRISCustomerByCnicCC,
  getCreditCardDisputes,
  searchCreditCardDispute,
  getTransactionDetailsByCnicCC,
  saveCreditCardDispute,
  savenApprovedCreditCardDispute,
  getTransactionDisputesByCnic,
  getCreditCardDisputesForEditByCnicAndRefrenceNumber,
  updateCreditCardDetails,
  updateAndApproveDisputeDetails,
  UploadDocument,
  getDisputeStatusCC,
  getDisputeStatusDC,
  getDisputeStatusADC,
  //Debit Card APIS
  saveDebitCardDispute,
  saveDebitCardDisputeForApproval,
  searchDebitCardDisputes,
  getTransactionDetailsByCnicDebitCard,
  searchCustomerByCnic,
  getAllAccountsByCnic,
  getIRISTransactionDetailsByTransactionId,
  searchTransactionDetailsByAccountNumber,
  searchDisputesByCnicAndReferenceNumber,
  searchDisputesForEditByCnicAndReferenceNumber,
  updateDisputeDetails,
  updateAndApproveDebitDisputeDetails,
  getTransactionDetailsByAccountNumber,
  //ADC APIS
  getAllAccountsByCnicADC,
  getIRISTransactionDetailsByTransactionIdADC,
  getTransactionDetailsByCnicDebitCardADC,
  searchADCDisputes,
  searchTransactionDetailsByAccountNumberADC,
  saveADCDispute,
  saveAndApproveADCDispute,
  searchTransactionDetailsByCnicAndReferenceNumberADC,
  updateDisputeDetailsADC,
  updateAndApproveADCDisputeDetails,
  searchADCDisputesForEditByCnicAndReferenceNumber,
  getAllTransactionTypes,
  // im
  getAllPendingForApproval,
  savePendingForApproval,
  getPendingForApproval,
  saveRejection,
  //QA Manager
  getAllDisputesQM,
  savePendingForDeletion,
  //==BBKONNECT==\\
  getAllAccountsByCnicBBK,
  getAllAccountsByMobileNumberBBK,
  getTransactionDetailsByCNICBBKonnect,
  searchIRISTransactionDetailsByAccountNumberBBK,
  searchIRISTransactionDetailsByMobileNumberBBK,
  getIRISTransactionDetailsByTransactionIdBBK,
  saveBBKDispute,
  saveAndApproveBBKDispute,
  searchBBKDispute,
  searchBBKonnectDisputesByCnicAndReferenceNumber,
  searchBBKonnectDisputesForEditByCnicAndReferenceNumber,
  updateBBKDispute,
  updateAndApproveBBKDispute,
  getTransactionDetailsByAccountNumberBBKonnect,
  getTransactionDetailsByMobileNumberBBKonnect,
  // for all user role data
  getalluserdataforadmin,
  // for edit user
  editUserDataForAdmin,
  //==NONAPIS==\\
  // getAllAccountsByCnicNONAPI,
  // getTransactionDetailsByCNICNONAPI,
  // searchIRISTransactionDetailsByAccountNumberNONAPI,
  // getIRISTransactionDetailsByTransactionIdNONAPI,
  // saveNONAPIDispute,
  // saveAndApproveNONAPIDispute,
  // searchNONAPIDispute,
  // searchNONAPIDisputesByCnicAndReferenceNumber,
  // searchNONAPIDisputesForEditByCnicAndReferenceNumber,
  // updateNONAPIDispute,
  // updateAndApproveNONAPIDispute,
  // getTransactionDetailsByAccountNumberNONAPI,
  getForDeletion,
  savePendingForDeletionSystemAdmin,
  saveInProcess,
  searchDeleteDisputes,
  requestListCountIM,
  globalSearchDisputes,
  getDisputeStatusBBK,
  getDisputeStatusGlobal,
  getDisputeStatusSAPendingForDeletion,
  //NON API EXPORTS
  getTransactionDetailsByCnicNonApi,
  getAllAccountsByCnicNonApi,
  searchIRISTransactionDetailsByAccountNumberNonApi,
  getTransactionDetailsByAccountNumberNonApi,
  getIRISTransactionDetailsByTransactionIdNonApi,
  saveNonApiDispute,
  saveNonApiDisputeForApproval,
  searchNonApiDisputes,
  searchDisputesByCnicAndReferenceNumberNonApi,
  searchDisputesForEditByCnicAndReferenceNumberNonApi,
  updateDisputeDetailsNonApi,
  updateAndApproveNonApiDisputeDetails,
  getDisputeStatusNonApi,
  // NEGATIVE DATA BASE
  getDisputeDetailsNDB,
  getTransactionDetailsByCnicNDB,
  saveApiDisputeNDB,
  searchDisputeNDB,
  viewNDBByCnicAndReferenceNumber,
  editApiDisputeNDB,
  getDisputeStatusND,
  // reports
  creditCardReportExcel,
  debitCardReportExcel,
  adcReportExcel,
  BBKReportExcel,
  nonAPIReportExcel,
  ageingReportExcel,
  regionwiseReportExcel,
  ndReportExcel,
  getAllStatus,
  auditTrailReportExcel,
  getAllActions,
  allHoliday,
  saveHoliday,
  deleteHoliday,
  updateHoliday,
  allCaseDecision,
  saveCaseDecision,
  deleteCaseDecision,
  updateCaseDecision,
  allTransactionCurrency,
  getTransactionDetailsByCnicAndAccountNumberDebitCard,
};
