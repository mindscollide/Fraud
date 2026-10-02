import * as actions from "../action_types";
import axios from "axios";
import { refreshToken } from "../actions/auth-actions";
import {
  InvestigationOfficerAPI,
  InvestigationOfficerAPIDC,
  InvestigationOfficerAPIADC,
  InvestigationOfficerAPIBBK,
  InvestigationOfficerAPINONAPI,
  InvestigationOfficerAPINDB,
  InvestigationManagerAPI,
} from "../../Common/Api/apis-end-points";
import {
  searchIRISTransactionDetailsByAccountNumber,
  getTransactionDetailsByCnic,
  getTransactionDisputesByCnic,
  getIRISCustomerByCnicCC,
  searchCreditCardDispute,
  saveCreditCardDispute,
  getDisputeStatusCC,
  getDisputeStatusDC,
  getDisputeStatusADC,
  getDisputeStatusBBK,
  getDisputeStatusGlobal,
  getDisputeStatusSAPendingForDeletion,
  savenApprovedCreditCardDispute,
  getCreditCardDisputesForEditByCnicAndRefrenceNumber,
  updateCreditCardDetails,
  updateAndApproveDisputeDetails,
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
  SearchIRISTransactionDetailsByAccountNumber,
  getTransactionDetailsByCnicDebitCardADC,
  getAllAccountsByCnicADC,
  searchTransactionDetailsByAccountNumberADC,
  getIRISTransactionDetailsByTransactionIdADC,
  searchADCDisputes,
  saveADCDispute,
  saveAndApproveADCDispute,
  searchTransactionDetailsByCnicAndReferenceNumberADC,
  updateDisputeDetailsADC,
  updateAndApproveADCDisputeDetails,
  searchADCDisputesForEditByCnicAndReferenceNumber,
  //==BBKONNECT==\\
  getAllAccountsByCnicBBK,
  getAllAccountsByMobileNumberBBK,
  getTransactionDetailsByCNICBBKonnect,
  searchIRISTransactionDetailsByAccountNumberBBK,
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
  //==NONAPIS==\\
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
  globalSearchDisputes,
  // NEGATIVE DATA BASE
  getDisputeDetailsNDB,
  saveApiDisputeNDB,
  searchDisputeNDB,
  viewNDBByCnicAndReferenceNumber,
  editApiDisputeNDB,
  getDisputeStatusND,
  getTransactionDetailsByCnicAndAccountNumberDebitCard,
} from "../../Common/Api/apis-config";
import Helper from "../../Common/Functions/history_logout";
import { SomeThingWentWrong } from "./ui-actions";
import {
  GetAllCity,
  GetAllSourceOfIBChannelCreation,
  GetAllSource,
  GetAllFraudType,
  GetAllApprovalReasons,
  GetAllRejectionReasons,
  GetAllCaseDecision,
  GetAllTransactionCurrencyCode,
} from "./setup-forms-actions";

const HideNotification = () => {
  return {
    type: actions.HIDE,
  };
};

const ShowNotification = (message) => {
  return {
    type: actions.SHOW,
    message: message,
  };
};

const resetCustomerDetailsCreditCard = (response) => {
  return {
    type: actions.RESET_CREDITCARD_DISPUTE,
    response: response,
  };
};

const GetTransactionDetailsByCnicSuccess = (response) => {
  return {
    type: actions.GET_TRANSACTIONDETAILSBYCNIC_UNIT_SUCCESS,
    response: response,
  };
};

const GetTransactionDetailsByCnicFail = (response) => {
  return {
    type: actions.GET_TRANSACTIONDETAILSBYCNIC_UNIT_FAIL,
    response: response,
  };
};

const SearchCreditCardDisputeSuccess = (response) => {
  return {
    type: actions.SEARCH_CREDITCARDDISPUTE_UNIT_SUCCESS,
    response: response,
  };
};

const SearchCreditCardDisputeFail = (response) => {
  return {
    type: actions.SEARCH_CREDITCARDDISPUTE_UNIT_FAIL,
    response: response,
  };
};

const GetAllAccountsSuccess = (response) => {
  return {
    type: actions.GET_ACCOUNTS_UNIT_SUCCESS,
    response: response,
  };
};

const GetAllAccountsFail = (response) => {
  return {
    type: actions.GET_ACCOUNTS_UNIT_FAIL,
    response: response,
  };
};

const GetCreditCardDisputesByCnicInit = (response) => {
  return {
    type: actions.GET_CREDITCARDDISPUTE_BY_CNIC_UNIT_INIT,
    response: response,
  };
};

const GetCreditCardDisputesByCnicSuccess = (response) => {
  return {
    type: actions.GET_CREDITCARDDISPUTE_BY_CNIC_UNIT_SUCCESS,
    response: response,
  };
};

const GetCreditCardDisputesByCnicFail = (response) => {
  return {
    type: actions.GET_CREDITCARDDISPUTE_BY_CNIC_UNIT_FAIL,
    response: response,
  };
};

const GetCreditCardDisputesByCnicAndReferenceNumberForEditInit = (response) => {
  return {
    type: actions.GET_CREDITCARDDISPUTESFOREDITBYCNICANDREFERENCENUMBER_UNIT_INIT,
    response: response,
  };
};

const GetCreditCardDisputesByCnicAndReferenceNumberForEditSuccess = (
  response
) => {
  return {
    type: actions.GET_CREDITCARDDISPUTESFOREDITBYCNICANDREFERENCENUMBER_UNIT_SUCCESS,
    response: response,
  };
};

const GetCreditCardDisputesByCnicAndReferenceNumberForEditFail = (response) => {
  return {
    type: actions.GET_CREDITCARDDISPUTESFOREDITBYCNICANDREFERENCENUMBER_UNIT_FAIL,
    response: response,
  };
};

const UpdateCreditCardDisputeSuccess = (response) => {
  return {
    type: actions.UPDATE_CREDITCARDDISPUTE_UNIT_SUCCESS,
    response: response,
  };
};

const UpdateCreditCardDisputeFail = (response) => {
  return {
    type: actions.UPDATE_CREDITCARDDISPUTE_UNIT_FAIL,
    response: response,
  };
};

const UpdateAndApproveCreditCardDisputeSuccess = (response) => {
  return {
    type: actions.UPDATEANDAPPROVE_CREDITCARDDISPUTE_UNIT_SUCCESS,
    response: response,
  };
};

const UpdateAndApproveCreditCardDisputeFail = (response) => {
  return {
    type: actions.UPDATEANDAPPROVE_CREDITCARDDISPUTE_UNIT_FAIL,
    response: response,
  };
};

const investigationOfficerInit = () => {
  return {
    type: actions.GET_INVESTIGATION_OFFICER_INIT,
  };
};

const investigationOfficerFail = (response) => {
  return {
    type: actions.GET_INVESTIGATION_OFFICER_FAIL,
    response: response,
  };
};

const LOADERFALSE = () => {
  return {
    type: actions.GET_LOADER_FALSE,
  };
};

//Credit Card Actions

//Customer Not Found Modal
const customerFoundModal = (response) => {
  return {
    type: actions.SET_MODAL_FOR_CUSTOMERFOUNDMODAL_DISPUTE,
    response: response,
  };
};

//Customer Not Found Modal
const customerNotFoundModal = (response) => {
  return {
    type: actions.SET_MODAL_FOR_CUSTOMERNOTFOUNDMODAL_DISPUTE,
    response: response,
  };
};

//AccountNumberFoundModal
const accountNumberFoundModal = (response) => {
  return {
    type: actions.SET_MODAL_FOR_ACCOUNTNUMBERFOUNDMODAL_DISPUTE,
    response: response,
  };
};

//AccountNumberNotFoundModal
const accountNumberNotFoundModal = (response) => {
  return {
    type: actions.SET_MODAL_FOR_ACCOUNTNUMBERNOTFOUNDMODAL_DISPUTE,
    response: response,
  };
};

//AccountNumberFoundModal
const mobileNumberFoundModal = (response) => {
  return {
    type: actions.SET_MODAL_FOR_MOBILENUMBERFOUNDMODAL_DISPUTE,
    response: response,
  };
};

//AccountNumberNotFoundModal
const mobileNumberNotFoundModal = (response) => {
  return {
    type: actions.SET_MODAL_FOR_MOBILENUMBERNOTFOUNDMODAL_DISPUTE,
    response: response,
  };
};

//CreditCardDisputeModal
const creditCardDisputeModal = (response) => {
  return {
    type: actions.SET_MODAL_FOR_CREDITCARD_DISPUTE,
    response: response,
  };
};

//Global Search IO
const SearchGlobalDisputeCaseSuccess = (response) => {
  return {
    type: actions.SEARCH_GLOBALDISPUTES_UNIT_SUCCESS,
    response: response,
  };
};

const SearchGlobalDisputeCaseFail = (response) => {
  return {
    type: actions.SEARCH_GLOBALDISPUTES_UNIT_FAIL,
    response: response,
  };
};

//Search All Dispute Cases (VIEW)
const SearchGlobalDisputes = (object, State) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let UserID = JSON.parse(localStorage.getItem("UserDetails"));
  let userid = UserID.userID;
  let Data = {
    FK_GSSUserID: userid,
    TransactionTypeIDs: object.TransactionTypeIDs,
    ReferenceNumber: object.ReferenceNumber,
    CNIC: object.CNIC,
    from: State.from,
    to: State.to,
    AccountNumber: object.AccountNumber,
    CustomerName: object.CustomerName,
    TransactionId: object.TransactionId,
    TotalTransactionAmount: object.TotalTransactionAmount,
    fk_csid: parseInt(object.fk_csid),
    FK_CTID: parseInt(object.FK_CTID),
  };
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", globalSearchDisputes.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationManagerAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchGlobalDisputes(object, State));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              SearchGlobalDisputeCaseSuccess(response.data.responseResult)
            );
          } else {
            dispatch(SearchGlobalDisputeCaseFail(response.data.responseResult));
          }
        } else {
          dispatch(SearchGlobalDisputeCaseFail(response.data.responseResult));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//Get Transaction Details By CNIC (AddEditPage)
const GetTransactionDetailsByCnic = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let navigate = Helper.navigate;
  let Data = {
    CNIC: object,
  };
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", getTransactionDetailsByCnic.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetTransactionDetailsByCnic(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              GetTransactionDetailsByCnicSuccess(response.data.responseResult)
            );
            if (
              response.data.responseResult.responseMessage ===
              "No Records Found"
            ) {
              dispatch(customerFoundModal(true));
              localStorage.setItem("cnic", object);
            } else {
              localStorage.setItem("cnic", object);
              dispatch(customerFoundModal(false));
              await dispatch(GetAllCity());
              navigate(
                "/Fraud/CreditCardDispute/CustomerDetailsCreditCardDispute"
              );
              localStorage.setItem("CNICNumber", JSON.stringify(object));
            }
          } else {
            dispatch(
              GetTransactionDetailsByCnicFail(response.data.responseResult)
            );
          }
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

const GetIRISCustomerByCnicCCSuccess = (response) => {
  return {
    type: actions.GET_IRISTRANSACTIONDETAILSBYCNICCC_UNIT_SUCCESS,
    response: response,
  };
};

// GetTransactionDetailsByCnicDebitCardSuccess for FAil
const GetIRISCustomerByCnicCCFail = (response) => {
  return {
    type: actions.GET_IRISTRANSACTIONDETAILSBYCNICCC_UNIT_FAIL,
    response: response,
  };
};

//Get Transaction Details By CNIC (AddEditPage)
const GetIRISCustomerByCnicCC = (object) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", getIRISCustomerByCnicCC.RequestMethod);
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetIRISCustomerByCnicCC(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "No Records Found"
            ) {
              dispatch(customerNotFoundModal(true));
            } else {
              localStorage.setItem("cnicNumber", object.CNIC);
              dispatch(
                GetIRISCustomerByCnicCCSuccess(response.data.responseResult)
              );
              navigate("/Fraud/CreditCardDispute/AddNewCustomerDetails");
            }
          } else {
            dispatch(customerNotFoundModal(true));
            dispatch(GetIRISCustomerByCnicCCFail(response.data));
          }
        } else {
          dispatch(GetIRISCustomerByCnicCCFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//RESET Button on CC Search
const ResetCreditCardDisputeSuccess = (response) => {
  return {
    type: actions.RESET_CREDITCARDDISPUTE_UNIT_SUCCESS,
    response: response,
  };
};

//Search Credit Card Disputes
const SearchCreditCardDisputes = (object, State) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    RecordsPerPage: 5,
    CreditCardDisputes: {
      RefrenceNumber: object.RefrenceNumber,
      CardNumber: object.CardNumber,
      CustomerName: object.CustomerName,
      Fraudtype: object.Fraudtype,
      TransactionId: object.TransactionId,
      FromDate: State.FromDate,
      ToDate: State.ToDate,
      TransactionAmount: parseFloat(object.TransactionAmount),
      FK_CTID: parseInt(object.FK_CTID),
      CNICNumber: object.CNICNumber,
      fk_csid: parseInt(object.fk_csid),
    },
  };
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", searchCreditCardDispute.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchCreditCardDisputes(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              SearchCreditCardDisputeSuccess(response.data.responseResult)
            );
          } else {
            dispatch(SearchCreditCardDisputeFail(response.data.responseResult));
          }
        } else {
          dispatch(SearchCreditCardDisputeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//Save Credit Card Disputes
const SaveCreditCardDisputes = (object, seacrchData1, seacrchDate2) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  localStorage.removeItem("inProgressOnly");
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", saveCreditCardDispute.RequestMethod);
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SaveCreditCardDisputes(object, seacrchData1, seacrchDate2));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );

            await localStorage.setItem("CaseStatus", seacrchData1.fk_csid);
            await localStorage.setItem("parent", "sub1");
            await localStorage.setItem("child", "3");
            await dispatch(
              SearchCreditCardDisputes(seacrchData1, seacrchDate2)
            );
            navigate("/Fraud/CreditCardDispute/Search");
          } else {
            localStorage.setItem("child", "3");
            localStorage.setItem("parent", "sub1");
            dispatch(investigationOfficerFail(response.data.responseResult));
          }
        } else {
          dispatch(investigationOfficerFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//Save And Approve Credit Card Disputes
const SaveAndApprovedCreditCardDisputes = (
  object,
  seacrchData1,
  seacrchDate2
) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", savenApprovedCreditCardDispute.RequestMethod);
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            SaveAndApprovedCreditCardDisputes(
              object,
              seacrchData1,
              seacrchDate2
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await localStorage.setItem("CaseStatus", seacrchData1.fk_csid);
            await localStorage.setItem("parent", "sub1");
            await localStorage.setItem("child", "3");
            await dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            await dispatch(
              SearchCreditCardDisputes(seacrchData1, seacrchDate2)
            );
            navigate("/Fraud/CreditCardDispute/Search");
          } else {
            localStorage.setItem("child", "3");
            localStorage.setItem("parent", "sub1");
            dispatch(investigationOfficerFail(response.data.responseResult));
          }
        } else {
          dispatch(investigationOfficerFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//Get Disputes By CNIC View API
const GetCreditCardDisputesByCnic = (object, TTID) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(GetCreditCardDisputesByCnicInit());
    let form = new FormData();
    form.append("RequestMethod", getTransactionDisputesByCnic.RequestMethod);
    form.append("RequestData", JSON.stringify(object, TTID));
    axios({
      method: "post",
      url: InvestigationOfficerAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetCreditCardDisputesByCnic(object, TTID));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            localStorage.setItem("CNICNumber", object.CNICNumber);
            dispatch(
              GetCreditCardDisputesByCnicSuccess(response.data.responseResult)
            );
            if (!TTID) {
              localStorage.removeItem("FK_TTID");
              navigate("/Fraud/CreditCardDispute/ViewCustomerDetails");
            }
            await dispatch(GetAllFraudType());
            await dispatch(GetAllCity());
            await dispatch(GetAllApprovalReasons());
            await dispatch(GetAllRejectionReasons());
          } else {
            dispatch(
              GetCreditCardDisputesByCnicFail(
                response.data.responseResult.responseMessage
              )
            );
          }
        } else {
          dispatch(GetCreditCardDisputesByCnicFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//Get Disputes by Cnic so that we can edit
const GetCreditCardDisputesForEditByCnicAndRefrenceNumber = (object) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(GetCreditCardDisputesByCnicAndReferenceNumberForEditInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      getCreditCardDisputesForEditByCnicAndRefrenceNumber.RequestMethod
    );
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetCreditCardDisputesForEditByCnicAndRefrenceNumber(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              GetCreditCardDisputesByCnicAndReferenceNumberForEditSuccess(
                response.data.responseResult
              )
            );
            await dispatch(GetAllCaseDecision());
            await dispatch(GetAllFraudType());
            await dispatch(GetAllCity());
            navigate("/Fraud/CreditCardDispute/EditCreditCardDispute");
            if (
              response.data.responseResult.responseMessage ===
              "No Records Found"
            ) {
            } else {
            }
          } else {
            dispatch(
              GetCreditCardDisputesByCnicAndReferenceNumberForEditFail(
                response.data.responseResult
              )
            );
          }
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//Update Dispute CC
const UpdateCreditCardDisputeDetails = (object) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  localStorage.removeItem("inProgressOnly");
  let flagForGlobalDispute = localStorage.getItem("FlagForGlobalDispute");
  let UserID = JSON.parse(localStorage.getItem("UserDetails"));
  let userid = UserID.userID;
  let Data = {
    RefrenceNumber: "",
    CNICNumber: "",
    CardNumber: "",
    CustomerName: "",
    FK_CTID: 0,
    Fraudtype: "",
    TransactionId: "",
    TransactionAmount: -99999999999999999999,
    fk_csid: 1,
  };
  let date = {
    FromDate: "",
    ToDate: "",
  };
  let DataForGlobal = {
    FK_GSSUserID: userid,
    TransactionTypeIDs: [],
    ReferenceNumber: "",
    CNIC: "",
    AccountNumber: "",
    CustomerName: "",
    TransactionId: "",
    TotalTransactionAmount: -100000000000000000000,
    fk_csid: 1,
  };
  let DataForGlobalDate = {
    from: "",
    to: "",
  };
  return (dispatch) => {
    dispatch(GetCreditCardDisputesByCnicAndReferenceNumberForEditInit());
    let form = new FormData();
    form.append("RequestMethod", updateCreditCardDetails.RequestMethod);
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(UpdateCreditCardDisputeDetails(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              UpdateCreditCardDisputeSuccess(response.data.responseResult)
            );
            if (flagForGlobalDispute === "true") {
              await localStorage.setItem("CaseStatus", Data.fk_csid);
              await localStorage.setItem("parent", "sub1");
              await localStorage.setItem("child", "1");
              await dispatch(
                ShowNotification(response.data.responseResult.responseMessage)
              );
              await dispatch(
                SearchGlobalDisputes(DataForGlobal, DataForGlobalDate)
              );
              localStorage.removeItem("FlagForGlobalDispute");
              navigate("/Fraud/DisputeCases/Search");
            } else if (flagForGlobalDispute === "false") {
              await localStorage.setItem("CaseStatus", Data.fk_csid);
              await localStorage.setItem("parent", "sub1");
              await localStorage.setItem("child", "3");
              await dispatch(
                ShowNotification(response.data.responseResult.responseMessage)
              );
              await dispatch(GetAllFraudType());
              await dispatch(SearchCreditCardDisputes(Data, date));
              localStorage.removeItem("FlagForGlobalDispute");
              navigate("/Fraud/CreditCardDispute/Search");
            } else {
            }
          } else {
            dispatch(UpdateCreditCardDisputeFail(response.data.responseResult));
            localStorage.setItem("child", "3");
            localStorage.setItem("parent", "sub1");
          }
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//GetDisputeStatusCCSuccess
const GetDisputeStatusCCSuccess = (response) => {
  return {
    type: actions.GET_DISPUTESTATUSCC_UNIT_SUCCESS,
    response: response,
  };
};

//GetDisputeStatusCCFail
const GetDisputeStatusCCFail = (response) => {
  return {
    type: actions.GET_DISPUTESTATUSCC_UNIT_FAIL,
    response: response,
  };
};

//GetDisputeStatusCC
const GetDisputeStatusCC = (object, showModal, setAction, actions) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    FK_DID: object,
  };
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", getDisputeStatusCC.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetDisputeStatusCC(object, showModal, setAction, actions));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(GetDisputeStatusCCSuccess(response.data.responseResult));
            showModal();
            setAction({
              ...actions,
              viewApprovalHistory: true,
            });
          } else {
          }
        } else {
          dispatch(GetDisputeStatusCCFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//GetDisputeStatusDCSuccess
const GetDisputeStatusDCSuccess = (response) => {
  return {
    type: actions.GET_DISPUTESTATUSDC_UNIT_SUCCESS,
    response: response,
  };
};

//GetDisputeStatusDCFail
const GetDisputeStatusDCFail = (response) => {
  return {
    type: actions.GET_DISPUTESTATUSDC_UNIT_FAIL,
    response: response,
  };
};

//GetDisputeStatusDC
const GetDisputeStatusDC = (object, showModal, setAction, actions) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    FK_DID: object,
  };
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", getDisputeStatusDC.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPIDC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetDisputeStatusDC(object, showModal, setAction, actions));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(GetDisputeStatusDCSuccess(response.data.responseResult));
            showModal();
            setAction({
              ...actions,
              viewApprovalHistory: true,
            });
          } else {
          }
        } else {
          dispatch(GetDisputeStatusDCFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//GetDisputeStatusADCSuccess
const GetDisputeStatusADCSuccess = (response) => {
  return {
    type: actions.GET_DISPUTESTATUSADC_UNIT_SUCCESS,
    response: response,
  };
};

//GetDisputeStatusADCFail
const GetDisputeStatusADCFail = (response) => {
  return {
    type: actions.GET_DISPUTESTATUSADC_UNIT_FAIL,
    response: response,
  };
};

//GetDisputeStatusADC
const GetDisputeStatusADC = (object, showModal, setAction, actions) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    FK_DID: object,
  };
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", getDisputeStatusADC.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPIADC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetDisputeStatusADC(object, showModal, setAction, actions));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(GetDisputeStatusADCSuccess(response.data.responseResult));
            showModal();
            setAction({
              ...actions,
              viewApprovalHistory: true,
            });
          } else {
          }
        } else {
          dispatch(GetDisputeStatusADCFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//GetDisputeStatusADCSuccess
const GetDisputeStatusBBKSuccess = (response) => {
  return {
    type: actions.GET_DISPUTESTATUSBBK_UNIT_SUCCESS,
    response: response,
  };
};

//GetDisputeStatusADCFail
const GetDisputeStatusBBKFail = (response) => {
  return {
    type: actions.GET_DISPUTESTATUSBBK_UNIT_FAIL,
    response: response,
  };
};

//Approval History BBK
const GetDisputeStatusBBK = (object, showModal, setAction, actions) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    FK_DID: object,
  };
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", getDisputeStatusBBK.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPIBBK,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetDisputeStatusBBK(object, showModal, setAction, actions));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(GetDisputeStatusBBKSuccess(response.data.responseResult));
            showModal();
            setAction({
              ...actions,
              viewApprovalHistory: true,
            });
          } else {
          }
        } else {
          dispatch(GetDisputeStatusBBKFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//Update and Approve CC Dispute
const UpdateAndApproveCreditCardDisputeDetails = (object) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  localStorage.removeItem("inProgressOnly");
  let flagForGlobalDispute = localStorage.getItem("FlagForGlobalDispute");
  let UserID = JSON.parse(localStorage.getItem("UserDetails"));
  let userid = UserID.userID;
  let Data = {
    RefrenceNumber: "",
    CNICNumber: "",
    CardNumber: "",
    CustomerName: "",
    FK_CTID: 0,
    Fraudtype: "",
    TransactionId: "",
    TransactionAmount: -99999999999999999999,
    fk_csid: 2,
  };
  let date = {
    FromDate: "",
    ToDate: "",
  };
  let DataForGlobal = {
    FK_GSSUserID: userid,
    TransactionTypeIDs: [],
    ReferenceNumber: "",
    CNIC: "",
    AccountNumber: "",
    CustomerName: "",
    TransactionId: "",
    TotalTransactionAmount: -100000000000000000000,
    fk_csid: 2,
  };
  let DataForGlobalDate = {
    from: "",
    to: "",
  };
  return (dispatch) => {
    dispatch(GetCreditCardDisputesByCnicAndReferenceNumberForEditInit());
    let form = new FormData();
    form.append("RequestMethod", updateAndApproveDisputeDetails.RequestMethod);
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(UpdateAndApproveCreditCardDisputeDetails(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              UpdateAndApproveCreditCardDisputeSuccess(
                response.data.responseResult
              )
            );
            if (flagForGlobalDispute === "true") {
              await localStorage.setItem("CaseStatus", Data.fk_csid);
              await localStorage.setItem("parent", "sub1");
              await localStorage.setItem("child", "1");
              await dispatch(
                ShowNotification(response.data.responseResult.responseMessage)
              );
              await dispatch(
                SearchGlobalDisputes(DataForGlobal, DataForGlobalDate)
              );
              localStorage.removeItem("FlagForGlobalDispute");
              navigate("/Fraud/DisputeCases/Search");
            } else if (flagForGlobalDispute === "false") {
              await localStorage.setItem("CaseStatus", Data.fk_csid);
              await localStorage.setItem("parent", "sub1");
              await localStorage.setItem("child", "3");
              await dispatch(
                ShowNotification(response.data.responseResult.responseMessage)
              );
              await dispatch(GetAllFraudType());
              await dispatch(SearchCreditCardDisputes(Data, date));
              localStorage.removeItem("FlagForGlobalDispute");
              navigate("/Fraud/CreditCardDispute/Search");
            }
            if (
              response.data.responseResult.responseMessage ===
              "No Records Found"
            ) {
            } else {
            }
          } else {
            dispatch(
              UpdateAndApproveCreditCardDisputeFail(
                response.data.responseResult
              )
            );
            localStorage.setItem("child", "3");
            localStorage.setItem("parent", "sub1");
          }
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//Debit Card Actions
const GetDebitCardDisputesByCnicInit = (response) => {
  return {
    type: actions.GET_DEBITCARDDISPUTE_BY_CNIC_INIT,
    response: response,
  };
};

const GetDebitCardDisputesByCnicSuccess = (response) => {
  return {
    type: actions.GET_DEBITCARDDISPUTE_BY_CNIC_UNIT_SUCCESS,
    response: response,
  };
};

const GetDebitCardDisputesByCnicFail = (response) => {
  return {
    type: actions.GET_DEBITCARDDISPUTE_BY_CNIC_UNIT_FAIL,
    response: response,
  };
};

const GetDebitCardDisputesByCnicAndReferenceNumberForEditSuccess = (
  response
) => {
  return {
    type: actions.GET_DEBITCARDDISPUTESFOREDITBYCNICANDREFERENCENUMBER_UNIT_SUCCESS,
    response: response,
  };
};

const GetDebitCardDisputesByCnicAndReferenceNumberForEditFail = (response) => {
  return {
    type: actions.GET_DEBITCARDDISPUTESFOREDITBYCNICANDREFERENCENUMBER_UNIT_FAIL,
    response: response,
  };
};

const resetCustomerDetailsDebitCard = (response) => {
  return {
    type: actions.RESET_DEBITCARD_DISPUTE,
    response: response,
  };
};

const SearchDebitCardDisputeSuccess = (response) => {
  return {
    type: actions.SEARCH_DEBITCARDDISPUTE_UNIT_SUCCESS,
    response: response,
  };
};

const SearchDebitCardDisputeFail = (response) => {
  return {
    type: actions.SEARCH_DEBITCARDDISPUTE_UNIT_FAIL,
    response: response,
  };
};

const SearchCustomerByCnicSuccess = (response) => {
  return {
    type: actions.GET_CUSTOMERBYCNIC_UNIT_SUCCESS,
    response: response,
  };
};

const SearchCustomerByCnicFail = (response) => {
  return {
    type: actions.GET_CUSTOMERBYCNIC_UNIT_FAIL,
    response: response,
  };
};

// GetTransactionDetailsByCnicDebitCardSuccess for sucess
const GetTransactionDetailsByCnicDebitCardSuccess = (response) => {
  return {
    type: actions.GET_TRANSACTIONDETAILSBYCNICDEBIT_UNIT_SUCCESS,
    response: response,
  };
};

// GetTransactionDetailsByCnicDebitCardSuccess for FAil
const GetTransactionDetailsByCnicDebitFail = (response) => {
  return {
    type: actions.GET_TRANSACTIONDETAILSBYCNICDEBIT_UNIT_FAIL,
    response: response,
  };
};

// GetTransactionDetailsByCnicDebitCardSuccess for sucess
const GetTransactionDetailsByCnicDebitCardIRISSuccess = (response) => {
  return {
    type: actions.GET_TRANSACTIONDETAILSBYACCOUNTNUMBERDEBITIRIS_UNIT_SUCCESS,
    response: response,
  };
};

// GetTransactionDetailsByCnicDebitCardSuccess for FAil
const GetTransactionDetailsByCnicDebitCardIRISFail = (response) => {
  return {
    type: actions.GET_TRANSACTIONDETAILSBYACCOUNTNUMBERDEBITIRIS_UNIT_FAIL,
    response: response,
  };
};

const GetTransactionDetailsByCnicDC = (object) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    CNIC: object,
  };
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      getTransactionDetailsByCnicDebitCard.RequestMethod
    );
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPIDC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetTransactionDetailsByCnicDC(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage === "Record Found"
            ) {
              dispatch(
                GetTransactionDetailsByCnicDebitCardSuccess(
                  response.data.responseResult
                )
              );
              localStorage.setItem("CNICNumber", object);
              navigate(
                "/Fraud/DebitCardDisputes/CustomerDetailsDebitCardDispute"
              );
            }
          } else {
            localStorage.setItem("CNICNumber", object);
            dispatch(customerFoundModal(true));
            dispatch(GetTransactionDetailsByCnicDebitFail(response.data));
          }
        } else {
          dispatch(GetTransactionDetailsByCnicDebitFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};
const GetTransactionDetailsByAccountAndCnicDC = (object) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  // let Data = {
  //   CNIC: object,
  // };
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      getTransactionDetailsByCnicDebitCard.RequestMethod
    );
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPIDC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetTransactionDetailsByAccountAndCnicDC(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage === "Record Found"
            ) {
              dispatch(
                GetTransactionDetailsByCnicDebitCardSuccess(
                  response.data.responseResult
                )
              );
              localStorage.setItem("CNICNumber", object.CNIC);
              navigate(
                "/Fraud/DebitCardDisputes/CustomerDetailsDebitCardDispute"
              );
            }
          } else {
            localStorage.setItem("CNICNumber", object.CNIC);
            dispatch(customerFoundModal(true));
            dispatch(GetTransactionDetailsByCnicDebitFail(response.data));
          }
        } else {
          dispatch(GetTransactionDetailsByCnicDebitFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

const SaveDebitCardDisputes = (object, searchData, searchDataofdate) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", saveDebitCardDispute.RequestMethod);
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPIDC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SaveDebitCardDisputes(object, searchData, searchDataofdate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            await localStorage.setItem("CaseStatus", searchData.fk_csid);
            await localStorage.setItem("parent", "sub2");
            await localStorage.setItem("child", "5");
            await dispatch(
              SearchDebitCardDisputes(searchData, searchDataofdate)
            );
            navigate("/Fraud/DebitCardDisputes/Search");
          } else {
            dispatch(investigationOfficerFail(response.data.responseResult));
            localStorage.setItem("child", "5");
            localStorage.setItem("parent", "sub2");
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(investigationOfficerFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

const SaveAndApprovedDebitCardDisputes = (
  object,
  searchData,
  searchDataofdate
) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", saveDebitCardDisputeForApproval.RequestMethod);
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPIDC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            SaveAndApprovedDebitCardDisputes(
              object,
              searchData,
              searchDataofdate
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await localStorage.setItem("CaseStatus", searchData.fk_csid);
            await localStorage.setItem("parent", "sub2");
            await localStorage.setItem("child", "5");
            if (searchData && searchDataofdate) {
              await dispatch(
                ShowNotification(response.data.responseResult.responseMessage)
              );
              await dispatch(
                SearchDebitCardDisputes(searchData, searchDataofdate)
              );
            }

            navigate("/Fraud/DebitCardDisputes/Search");
          } else {
            await dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            await dispatch(LOADERFALSE());
          }
        } else {
          await dispatch(
            ShowNotification(response.data.responseResult.responseMessage)
          );
          await dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

const SearchDebitCardDisputes = (object, State) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    RecordsPerPage: 5,
    DebitCardDisputes: {
      RefrenceNumber: object.RefrenceNumber,
      CustomerName: object.CustomerName,
      CMCity: object.CMCity,
      CNIC: object.CNIC,
      AccountNumber: object.AccountNumber,
      Fraudtype: object.Fraudtype,
      TransactionId: object.TransactionId,
      TransactionAmount: parseFloat(object.TransactionAmount),
      ApprovalCode: object.ApprovalCode,
      FromDate: State.FromDate,
      ToDate: State.ToDate,
      fk_csid: parseInt(object.fk_csid),
      FK_CTID: parseInt(object.FK_CTID),
    },
  };
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", searchDebitCardDisputes.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPIDC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchDebitCardDisputes(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              SearchDebitCardDisputeSuccess(response.data.responseResult)
            );
          } else {
            dispatch(SearchDebitCardDisputeFail(response.data.responseResult));
          }
        } else {
          dispatch(SearchDebitCardDisputeFail(response.data.responseResult));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

const SearchCustomerByCnic = (object) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    CNIC: object,
  };
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", searchCustomerByCnic.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPIDC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(searchCustomerByCnic(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(SearchCustomerByCnicSuccess(response.data.responseResult));
            if (
              response.data.responseResult.responseMessage ===
              "The Customer Exists in the Fraud database"
            ) {
              localStorage.setItem("CNICNumber", object);
              navigate(
                "/Fraud/DebitCardDisputes/CustomerDetailsDebitCardDispute"
              );
            }
          } else {
            dispatch(SearchCustomerByCnicFail(response.data.responseResult));
          }
        } else {
          dispatch(SearchCustomerByCnicFail(response.data.responseResult));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

const GetAllAccountsByCnic = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    CNIC: object,
  };
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", getAllAccountsByCnic.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPIDC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetAllAccountsByCnic(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(GetAllAccountsSuccess(response.data.responseResult));
          } else {
            dispatch(customerNotFoundModal(true));
            dispatch(
              GetAllAccountsFail(response.data.responseResult.responseMessage)
            );
          }
        } else {
          dispatch(GetAllAccountsFail(response.data.responseMessage));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

const GetIRISTransactionDetailsByTransactionId = (
  object,
  setTrsDetails,
  setTransactionIDError,
  setTIDErrMsg,
  setSourceType,
  setTransactionCurrencyCodeValue
) => {
  let token = JSON.parse(localStorage.getItem("token"));

  var accountNumber = localStorage.getItem("accountNumber");
  let Data = {
    AccountNumber: accountNumber,
    TransactionId: object,
  };

  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      getIRISTransactionDetailsByTransactionId.RequestMethod
    );
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPIDC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            GetIRISTransactionDetailsByTransactionId(
              object,
              setTrsDetails,
              setTransactionIDError,
              setTIDErrMsg,
              setSourceType,
              setTransactionCurrencyCodeValue
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            setTransactionIDError(false);
            setTIDErrMsg("");
            let ar = response.data.responseResult.transactionDetails;
            setTrsDetails({
              HBLAccountNumber: accountNumber,
              TransactionID: ar.transactionID,
              OtherBankAccountNumber: ar.otherBankAccountNumber,
              OtherBankBranchCode: ar.otherBankBranchCode,
              OtherBankBranchName: ar.otherBankBranchName,
              TransactionAmount: ar.transactionAmount,
              TransactionAmountOtherCurrency: ar.transactionAmountOtherCurrency,
              PotentialSave: ar.potentialSave,
              DisputeAmount: ar.disputeAmount,
              TransactionCurrencyCode: ar.transactionCurrencyCode,
              ApprovalCode: ar.approvalCode,
              Response: ar.response,
              POSMode: ar.posMode,
              MerchantName: ar.merchantName,
              MerchantID: ar.merchantID,
              MerchantCity: ar.merchantCity,
              ON_OFF_US: ar.oN_OFF_US,
              CategoryCodeMCC: ar.categoryCodeMCC,
              AcquirerInstitution: ar.acquirerInstitution,
              AcquirerTerminalID: ar.acquirerTerminalID,
              AcquirerID: ar.acquirerID,
              ARN: ar.arn,
              FK_SID: ar.fK_SID,
              TransactionDate: ar.transactionDate,
              TransactionTime: ar.transactionTime,
              PreIdentifiedDataType: 3,
            });
            dispatch(LOADERFALSE());
          } else {
            setTransactionIDError(true);
            setTIDErrMsg(response.data.responseResult.responseMessage);
            setTrsDetails({
              HBLAccountNumber: accountNumber,
              TransactionID: "",
              OtherBankAccountNumber: "",
              OtherBankBranchCode: "",
              OtherBankBranchName: "",
              TransactionAmount: -99999999999999999999,
              TransactionAmountOtherCurrency: -99999999999999999999,
              PotentialSave: -99999999999999999999,
              DisputeAmount: -99999999999999999999,
              TransactionCurrencyCode: "",
              ApprovalCode: "",
              Response: "",
              POSMode: "",
              MerchantName: "",
              MerchantID: "",
              MerchantCity: "",
              ON_OFF_US: false,
              CategoryCodeMCC: "",
              AcquirerInstitution: "",
              AcquirerTerminalID: "",
              AcquirerID: "",
              ARN: "",
              FK_SID: 0,
              TransactionDate: "",
              TransactionTime: "",
              PreIdentifiedDataType: 3,
            });
            setSourceType("");
            setTransactionCurrencyCodeValue("");
            dispatch(investigationOfficerFail(response.data));

            // setTransactionIDError(response.data.responseResult.responseMessage)
            // dispatch(creditCardDisputeModal(true));
            // dispatch(
            //   GetTransactionDetailsByCnicDebitFail(response.data.responseResult)
            // );
          }
        } else {
          setTransactionIDError(true);
          setTIDErrMsg(response.data.responseResult.responseMessage);
          setTrsDetails({
            HBLAccountNumber: "",
            TransactionID: "",
            OtherBankAccountNumber: "",
            OtherBankBranchCode: "",
            OtherBankBranchName: "",
            TransactionAmount: -99999999999999999999,
            PotentialSave: -99999999999999999999,
            DisputeAmount: -99999999999999999999,
            TransactionCurrencyCode: "",
            ApprovalCode: "",
            Response: "",
            POSMode: "",
            MerchantName: "",
            MerchantID: "",
            MerchantCity: "",
            ON_OFF_US: false,
            CategoryCodeMCC: "",
            AcquirerInstitution: "",
            AcquirerTerminalID: "",
            AcquirerID: "",
            ARN: "",
            FK_SID: 0,
            TransactionDate: "",
            TransactionTime: "",
            PreIdentifiedDataType: 0,
          });
          setSourceType("");
          setTransactionCurrencyCodeValue("");
          dispatch(investigationOfficerFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

const SearchTransactionDetailsByAccountNumber = (object) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      searchTransactionDetailsByAccountNumber.RequestMethod
    );
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPIDC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchTransactionDetailsByAccountNumber(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              GetTransactionDetailsByCnicDebitCardSuccess(
                response.data.responseResult
              )
            );
            localStorage.setItem("cnic", object.CNIC);
            localStorage.setItem("accountNumber", object.AccountNumber);
            navigate("/Fraud/DebitCardDisputes/AddNewDispute");
            if (
              response.data.responseResult.responseMessage ===
              "No Records Found"
            ) {
              dispatch(creditCardDisputeModal(true));
              localStorage.setItem("cnic", object.CNIC);
              localStorage.setItem("accountNumber", object.AccountNumber);
            }
          } else {
            dispatch(GetTransactionDetailsByCnicDebitFail(response.data));
          }
        } else {
          dispatch(GetTransactionDetailsByCnicDebitFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

const SearchDebitCardDisputesByCnicAndReferenceNumber = (object, TTID) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));

  return (dispatch) => {
    dispatch(GetDebitCardDisputesByCnicInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      searchDisputesByCnicAndReferenceNumber.RequestMethod
    );
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPIDC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            SearchDebitCardDisputesByCnicAndReferenceNumber(object, TTID)
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              GetDebitCardDisputesByCnicSuccess(response.data.responseResult)
            );
            await dispatch(GetAllFraudType());
            await dispatch(GetAllSource());
            await dispatch(GetAllCaseDecision());
            await dispatch(GetAllCity());
            await dispatch(GetAllApprovalReasons());
            await dispatch(GetAllRejectionReasons());
            localStorage.setItem("CNICNumber", object.CNICNumber);
            if (!TTID) {
              localStorage.removeItem("FK_TTID");
              navigate("/Fraud/DebitCardDisputes/ViewCustomerDetails");
            }
          } else {
            dispatch(
              GetDebitCardDisputesByCnicFail(
                response.data.responseResult.responseMessage
              )
            );
          }
        } else {
          dispatch(GetDebitCardDisputesByCnicFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

const GetDebitCardDisputesForEditByCnicAndRefrenceNumber = (object) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));

  return (dispatch) => {
    dispatch(GetCreditCardDisputesByCnicAndReferenceNumberForEditInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      searchDisputesForEditByCnicAndReferenceNumber.RequestMethod
    );
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPIDC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetDebitCardDisputesForEditByCnicAndRefrenceNumber(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              GetDebitCardDisputesByCnicAndReferenceNumberForEditSuccess(
                response.data.responseResult
              )
            );
            navigate("/Fraud/DebitCardDisputes/EditDebitCardDispute");
            await dispatch(GetAllFraudType());
            await dispatch(GetAllSource());
            await dispatch(GetAllCaseDecision());
            await dispatch(GetAllCity());
            await dispatch(GetAllTransactionCurrencyCode());
          } else {
            dispatch(
              GetDebitCardDisputesByCnicAndReferenceNumberForEditFail(
                response.data.responseResult
              )
            );
          }
        } else {
          dispatch(
            GetDebitCardDisputesByCnicAndReferenceNumberForEditFail(
              response.data.responseResult
            )
          );
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

// Seacr in iris from account number in debit card
const SearchTransactionDetailsByAccountNumberInIRIS = (object) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));

  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      SearchIRISTransactionDetailsByAccountNumber.RequestMethod
    );
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPIDC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchTransactionDetailsByAccountNumberInIRIS(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "No Records Found"
            ) {
              dispatch(accountNumberNotFoundModal(true));
            } else {
              localStorage.setItem("accountNumber", object.AccountNumber);
              dispatch(
                GetTransactionDetailsByCnicDebitCardIRISSuccess(
                  response.data.responseResult
                )
              );
              navigate("/Fraud/DebitCardDisputes/AddNewDispute");
            }
          } else {
            dispatch(accountNumberNotFoundModal(true));
            dispatch(
              GetTransactionDetailsByCnicDebitCardIRISFail(
                response.data.responseResult
              )
            );
            // setIRISFailmodal(true);
          }
        } else {
          dispatch(GetTransactionDetailsByCnicDebitCardIRISFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//Update APIs Debit Card
const UpdateDebitCardDisputeSuccess = (response) => {
  return {
    type: actions.UPDATE_DEBITCARDDISPUTE_UNIT_SUCCESS,
    response: response,
  };
};

const UpdateAndApproveDebitCardDisputeSuccess = (response) => {
  return {
    type: actions.UPDATEANDAPPROVE_DEBITCARDDISPUTE_UNIT_SUCCESS,
    response: response,
  };
};

const UpdateDebitCardDisputeDetails = (
  object,
  searchData,
  searchDataofdate,
  DataForGlobal,
  DataForGlobalDate
) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  let flagForGlobalDispute = localStorage.getItem("FlagForGlobalDispute");

  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", updateDisputeDetails.RequestMethod);
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPIDC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            UpdateDebitCardDisputeDetails(object, searchData, searchDataofdate)
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              UpdateDebitCardDisputeSuccess(response.data.responseResult)
            );
            if (flagForGlobalDispute === "true") {
              await localStorage.setItem("CaseStatus", DataForGlobal.fk_csid);
              await localStorage.setItem("parent", "sub1");
              await localStorage.setItem("child", "1");
              await dispatch(
                ShowNotification(response.data.responseResult.responseMessage)
              );
              await dispatch(
                SearchGlobalDisputes(DataForGlobal, DataForGlobalDate)
              );
              localStorage.removeItem("FlagForGlobalDispute");
              navigate("/Fraud/DisputeCases/Search");
            } else if (flagForGlobalDispute === "false") {
              await localStorage.setItem("CaseStatus", searchData.fk_csid);
              await localStorage.setItem("parent", "sub2");
              await localStorage.setItem("child", "5");
              await dispatch(
                ShowNotification(response.data.responseResult.responseMessage)
              );
              await dispatch(GetAllFraudType());
              await dispatch(
                SearchDebitCardDisputes(searchData, searchDataofdate)
              );
              localStorage.removeItem("FlagForGlobalDispute");
              navigate("/Fraud/DebitCardDisputes/Search");
            }
            if (
              response.data.responseResult.responseMessage ===
              "No Records Found"
            ) {
            } else {
            }
          } else {
            dispatch(investigationOfficerFail(response.data.responseResult));
            localStorage.setItem("child", "5");
            localStorage.setItem("parent", "sub2");
          }
        } else {
          dispatch(investigationOfficerFail(response.data.responseResult));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

const UpdateAndApproveDebitCardDisputeDetails = (
  object,
  searchData,
  searchDataofdate,
  DataForGlobal,
  DataForGlobalDate
) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  let flagForGlobalDispute = localStorage.getItem("FlagForGlobalDispute");

  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      updateAndApproveDebitDisputeDetails.RequestMethod
    );
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPIDC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            UpdateAndApproveDebitCardDisputeDetails(
              object,
              searchData,
              searchDataofdate
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              UpdateAndApproveDebitCardDisputeSuccess(
                response.data.responseResult
              )
            );
            if (flagForGlobalDispute === "true") {
              await localStorage.setItem("CaseStatus", DataForGlobal.fk_csid);
              await localStorage.setItem("parent", "sub1");
              await localStorage.setItem("child", "1");
              await dispatch(
                ShowNotification(response.data.responseResult.responseMessage)
              );
              await dispatch(
                SearchGlobalDisputes(DataForGlobal, DataForGlobalDate)
              );
              localStorage.removeItem("FlagForGlobalDispute");
              navigate("/Fraud/DisputeCases/Search");
            } else if (flagForGlobalDispute === "false") {
              await localStorage.setItem("CaseStatus", searchData.fk_csid);
              await localStorage.setItem("parent", "sub2");
              await localStorage.setItem("child", "5");
              await dispatch(
                ShowNotification(response.data.responseResult.responseMessage)
              );
              await dispatch(GetAllFraudType());
              await dispatch(
                SearchDebitCardDisputes(searchData, searchDataofdate)
              );
              localStorage.removeItem("FlagForGlobalDispute");
              navigate("/Fraud/DebitCardDisputes/Search");
            } else {
            }
            // await localStorage.setItem("CaseStatus", searchData.fk_csid);
            // await localStorage.setItem("parent", "sub2");
            // await localStorage.setItem("child", "5");
            // await dispatch(
            //   SearchDebitCardDisputes(searchData, searchDataofdate)
            // );
            // navigate("/Fraud/DebitCardDisputes/Search");

            if (
              response.data.responseResult.responseMessage ===
              "No Records Found"
            ) {
            } else {
            }
          } else {
            dispatch(investigationOfficerFail(response.data.responseResult));
            localStorage.setItem("child", "5");
            localStorage.setItem("parent", "sub2");
          }
        } else {
          dispatch(investigationOfficerFail(response.data.responseResult));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

// GetTransactionDetailsByAccountNumberDebitSuccess for sucess
const GetTransactionDetailsByAccountNumberDebitSuccess = (response) => {
  return {
    type: actions.GET_TRANSACTIONDETAILSBYACCOUNTNUMBERDEBIT_UNIT_SUCCESS,
    response: response,
  };
};

// GetTransactionDetailsByAccountNumberDebitFail for FAil
const GetTransactionDetailsByAccountNumberDebitFail = (response) => {
  return {
    type: actions.GET_TRANSACTIONDETAILSBYACCOUNTNUMBERDEBIT_UNIT_FAIL,
    response: response,
  };
};

//Dispute Debit Modal
const debitCardDisputeModal = (response) => {
  return {
    type: actions.SET_MODAL_FOR_DEBITCARD_DISPUTE,
    response: response,
  };
};

const GetTransactionDetailsByAccountNumber = (object) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    AccountNumber: object,
  };

  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      getTransactionDetailsByAccountNumber.RequestMethod
    );
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPIDC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetTransactionDetailsByAccountNumber(object));
        } else if (response.data.responseCode === 200) {
          await dispatch(RESETALLSTATE());
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "No Records Found"
            ) {
              dispatch(accountNumberFoundModal(true));
              localStorage.setItem("AccountNumber", object);
            } else {
              dispatch(accountNumberFoundModal(false));
              localStorage.setItem("AccountNumber", object);
              dispatch(
                GetTransactionDetailsByAccountNumberDebitSuccess(
                  response.data.responseResult
                )
              );
              navigate(
                "/Fraud/DebitCardDisputes/CustomerDetailsForAccount"
              );
            }
          } else {
            dispatch(accountNumberFoundModal(true));
            dispatch(
              GetTransactionDetailsByAccountNumberDebitFail(
                response.data.responseResult.responseMessage
              )
            );
          }
        } else {
          dispatch(RESETALLSTATE());
          dispatch(
            GetTransactionDetailsByAccountNumberDebitFail(
              response.data.responseResult.responseMessage
            )
          );
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

const RESETALLSTATE = () => {
  return {
    type: actions.RESET_ALL_STATE,
    response: [],
  };
};

//ADC APIs
// for ADC Dispute
const GetTransactionDetailsByADCSuccess = (response) => {
  return {
    type: actions.GET_TRANSACTIONDETAILSBYCNICADC_UNIT_SUCCESS,
    response: response,
  };
};

// GetTransactionDetailsByADCSuccess for FAil
const GetTransactionDetailsByADCFail = (response) => {
  return {
    type: actions.GET_TRANSACTIONDETAILSBYCNICADC_UNIT_FAIL,
    response: response,
  };
};
// For adc dispute search of ADC
const GetTransactionDetailsByCnicADC = (object) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  // let Data = {
  //   CNIC: object,
  // };
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      getTransactionDetailsByCnicDebitCardADC.RequestMethod
    );
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPIADC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetTransactionDetailsByCnicADC(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage === "Record Found"
            ) {
              await localStorage.setItem("CNICNumber", object.CNIC);
              dispatch(
                GetTransactionDetailsByADCSuccess(response.data.responseResult)
              );
              localStorage.setItem("CNICNumber", object.CNIC);
              navigate("/Fraud/ADCD/CustomerDetailsADCD");
            }
          } else {
            localStorage.setItem("CNICNumber", object);
            dispatch(customerFoundModal(true));
            dispatch(
              GetTransactionDetailsByADCFail(
                response.data.responseResult.responseMessage
              )
            );
          }
          // dispatch(RESETALLSTATE());
        } else {
          // dispatch(RESETALLSTATE());
          dispatch(
            GetTransactionDetailsByADCFail(response.data.responseMessage)
          );
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

// for GetAllAccountsADCSuccess of ADC
const GetAllAccountsADCSuccess = (response) => {
  return {
    type: actions.GET_ACCOUNTS_ADC_UNIT_SUCCESS,
    response: response,
  };
};
// for GetAllAccountsADCFail of ADC
const GetAllAccountsADCFail = (response) => {
  return {
    type: actions.GET_ACCOUNTS_ADC_UNIT_FAIL,
    response: response,
  };
};
// for account search if dispute not found
const GetAllAccountsByCnicADC = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    CNIC: object,
  };
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", getAllAccountsByCnicADC.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPIADC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetAllAccountsByCnicADC());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              GetAllAccountsADCSuccess(response.data.responseResult)
            );
          } else {
            dispatch(customerNotFoundModal(true));
            dispatch(
              GetAllAccountsADCFail(
                response.data.responseResult.responseMessage
              )
            );
          }
          dispatch(GetAllAccountsADCFail(response.data.responseMessage));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

// for Add NEW disute for ADC
const SearchTransactionDetailsByAccountNumberADC = (object) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      searchTransactionDetailsByAccountNumberADC.RequestMethod
    );
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPIADC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchTransactionDetailsByAccountNumberADC(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              GetTransactionDetailsByCnicADCSuccess(
                response.data.responseResult
              )
            );
            localStorage.setItem("cnic", object.CNIC);
            localStorage.setItem("accountNumber", object.AccountNumber);
            navigate("/Fraud/ADCD/AddNewCustomerDetailsADC");

            if (
              response.data.responseResult.responseMessage ===
              "No Records Found"
            ) {
              dispatch(creditCardDisputeModal(true));
              localStorage.setItem("cnic", object.CNIC);
              localStorage.setItem("accountNumber", object.AccountNumber);
            }
          } else {
            dispatch(
              GetTransactionDetailsByCnicADCFail(response.data.responseResult)
            );
          }
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

// FOR search by transection id for ADC
const GetIRISTransactionDetailsByTransactionIdADC = (
  object,
  setTrsDetails,
  setTransactionIDError,
  setTIDErrMsg,
  setSourceType
) => {
  let token = JSON.parse(localStorage.getItem("token"));

  var accountNumber = localStorage.getItem("accountNumber");
  let Data = {
    AccountNumber: accountNumber,
    TransactionId: object,
  };
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      getIRISTransactionDetailsByTransactionIdADC.RequestMethod
    );
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPIADC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            GetIRISTransactionDetailsByTransactionId(
              object,
              setTrsDetails,
              setTransactionIDError,
              setTIDErrMsg
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            setTransactionIDError(false);
            setTIDErrMsg("");
            let ar = response.data.responseResult.transactionDetails;
            setTrsDetails({
              TransactionID: ar.transactionID,
              BeneficiaryAccountNumber: ar.beneficiaryAccountNumber,
              BeneficiaryBankName: ar.beneficiaryBankName,
              HBLAccountNumber: accountNumber,
              TransactionAmount: ar.transactionAmount,
              DisputeAmount: ar.disputeAmount,
              ApprovalCode: ar.approvalCode,
              POSMode: ar.posMode,
              MerchantID: ar.merchantID,
              MerchantCity: ar.merchantCity,
              ON_OFF_US: ar.oN_OFF_US,
              MerchantCategoryCodeMCC: ar.merchantCategoryCodeMCC,
              MobileNumber: ar.merchantCategoryCodeMCC,
              IMEINumber: ar.imeiNumber,
              URL: ar.url,
              IPAddress: ar.ipAddress,
              FK_SID: ar.fK_SID,
              TransactionDate: ar.transactionDate,
              TransactionTime: ar.transactionTime,
              FK_ADCID: ar.fK_ADCID,
              BranchCode: ar.branchCode,
              BranchName: ar.branchName,
              PreIdentifiedDataType: 3,
            });
            dispatch(LOADERFALSE());
          } else {
            setTransactionIDError(true);
            setTIDErrMsg(response.data.responseResult.responseMessage);
            setTrsDetails({
              TransactionID: "",
              BeneficiaryAccountNumber: 0,
              BeneficiaryBankName: "",
              HBLAccountNumber: accountNumber,
              TransactionAmount: -99999999999999999999,
              DisputeAmount: -99999999999999999999,
              ApprovalCode: "",
              POSMode: "",
              MerchantID: 0,
              MerchantCity: "",
              ON_OFF_US: false,
              MerchantCategoryCodeMCC: 0,
              MobileNumber: 0,
              IMEINumber: 0,
              URL: "",
              IPAddress: "",
              FK_SID: 0,
              TransactionDate: "",
              TransactionTime: "",
              FK_ADCID: 0,
              BranchCode: 0,
              BranchName: "",
              PreIdentifiedDataType: 3,
            });
            setSourceType("");
            dispatch(investigationOfficerFail(response.data));
          }
        } else {
          setTransactionIDError(true);
          setTIDErrMsg(response.data.responseResult.responseMessage);
          setTrsDetails({
            TransactionID: "",
            BeneficiaryAccountNumber: 0,
            BeneficiaryBankName: "",
            HBLAccountNumber: accountNumber,
            TransactionAmount: -99999999999999999999,
            DisputeAmount: -99999999999999999999,
            ApprovalCode: "",
            POSMode: "",
            MerchantID: 0,
            MerchantCity: "",
            ON_OFF_US: false,
            MerchantCategoryCodeMCC: 0,
            MobileNumber: 0,
            IMEINumber: 0,
            URL: "",
            IPAddress: "",
            FK_SID: 0,
            TransactionDate: "",
            TransactionTime: "",
            FK_ADCID: 0,
            BranchCode: 0,
            BranchName: "",
            PreIdentifiedDataType: 0,
          });
          setSourceType("");
          dispatch(investigationOfficerFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//Search ADC Disputes

const SearchADCDisputeSuccess = (response) => {
  return {
    type: actions.SEARCH_ADCDISPUTE_UNIT_SUCCESS,
    response: response,
  };
};

const SearchADCDisputeFail = (response) => {
  return {
    type: actions.SEARCH_ADCDISPUTE_UNIT_FAIL,
    response: response,
  };
};

const resetCustomerDetailsADC = (response) => {
  return {
    type: actions.RESET_ADC_DISPUTE,
    response: response,
  };
};

const SearchADCDisputes = (object, State) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    RecordsPerPage: 5,
    ADCDisputes: {
      ApprovalCode: object.ApprovalCode,
      RefrenceNumber: object.RefrenceNumber,
      CustomerName: object.CustomerName,
      CMCity: object.CMCity,
      CNIC: object.CNIC,
      AccountNumber: object.AccountNumber,
      TransactionID: object.TransactionID,
      TransactionAmount: parseFloat(object.TransactionAmount),
      // InProgressOnly: object.InProgressOnly,
      FromDate: State.FromDate,
      ToDate: State.ToDate,
      fk_csid: parseInt(object.fk_csid),
      FK_CTID: parseInt(object.FK_CTID),
    },
  };
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", searchADCDisputes.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPIADC,
      data: form,
      headers: {
        _token: token,
        // 'Access-Control-Allow-Origin': '*',
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchADCDisputes(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              SearchADCDisputeSuccess(response.data.responseResult)
            );
          } else {
            dispatch(SearchADCDisputeFail(response.data.responseResult));
          }
        } else {
          dispatch(SearchADCDisputeFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//SaveADCDispute

const SaveADCDisputes = (object, searchData, searchDataofdate) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", saveADCDispute.RequestMethod);
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPIADC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SaveADCDisputes(object, searchData, searchDataofdate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await localStorage.setItem("parent", "sub2");
            await localStorage.setItem("child", "7");
            await localStorage.setItem("CaseStatus", searchData.fk_csid);
            await dispatch(SearchADCDisputes(searchData, searchDataofdate));
            navigate("/Fraud/ADCD/Search");
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
          } else {
            dispatch(investigationOfficerFail(response.data.responseResult));
            localStorage.setItem("child", "7");
            localStorage.setItem("parent", "sub2");
          }
        } else {
          dispatch(investigationOfficerFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

const SaveAndApprovedADCDisputes = (object, searchData, searchDataofdate) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", saveAndApproveADCDispute.RequestMethod);
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPIADC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            SaveAndApprovedADCDisputes(object, searchData, searchDataofdate)
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await localStorage.setItem("CaseStatus", searchData.fk_csid);
            await dispatch(SearchADCDisputes(searchData, searchDataofdate));
            navigate("/Fraud/ADCD/Search");
            localStorage.setItem("parent", "sub2");
            localStorage.setItem("child", "7");
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
          } else {
            dispatch(investigationOfficerFail(response.data.responseResult));
            localStorage.setItem("child", "7");
            localStorage.setItem("parent", "sub2");
          }
        } else {
          dispatch(investigationOfficerFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

// GetTransactionDetailsByCnicDebitCardSuccess for sucess ADC
const GetTransactionDetailsByCnicADCSuccess = (response) => {
  return {
    type: actions.GET_TRANSACTIONDETAILSBYCNICADC_UNIT_SUCCESS,
    response: response,
  };
};

// GetTransactionDetailsByCnicDebitCardSuccess for FAil ADC
const GetTransactionDetailsByCnicADCFail = (response) => {
  return {
    type: actions.GET_TRANSACTIONDETAILSBYCNICADC_UNIT_FAIL,
    response: response,
  };
};

const GetADCDisputesByCnicInit = (response) => {
  return {
    type: actions.GET_ADCDISPUTE_BY_CNIC_UNIT_INIT,
    response: response,
  };
};

const GetADCDisputesByCnicSuccess = (response) => {
  return {
    type: actions.GET_ADCDISPUTE_BY_CNIC_UNIT_SUCCESS,
    response: response,
  };
};

const GetADCDisputesByCnicFail = (response) => {
  return {
    type: actions.GET_ADCDISPUTE_BY_CNIC_UNIT_FAIL,
    response: response,
  };
};

//Search Transaction Details ADC by Cnic and Reference Number
const SearchTransactionDetailsADCByCNICAndReferenceNumber = (object, TTID) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));

  return (dispatch) => {
    dispatch(GetADCDisputesByCnicInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      searchTransactionDetailsByCnicAndReferenceNumberADC.RequestMethod
    );
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPIADC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            SearchTransactionDetailsADCByCNICAndReferenceNumber(object, TTID)
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              GetADCDisputesByCnicSuccess(response.data.responseResult)
            );
            await dispatch(GetAllSourceOfIBChannelCreation());
            await dispatch(GetAllFraudType());
            await dispatch(GetAllSource());
            await dispatch(GetAllCity());
            localStorage.setItem("CNICNumber", object.CNICNumber);
            if (!TTID) {
              localStorage.removeItem("FK_TTID");
              navigate("/Fraud/ADCD/ViewCustomerDetailsADC");
            }
          } else {
            dispatch(GetADCDisputesByCnicFail(response.data.responseResult));
          }
        } else {
          dispatch(GetADCDisputesByCnicFail(response.data.responseResult));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//Update APIs Debit Card
const UpdateADCDisputeSuccess = (response) => {
  return {
    type: actions.UPDATE_ADCDISPUTE_UNIT_SUCCESS,
    response: response,
  };
};

const UpdateAndApproveADCDisputeSuccess = (response) => {
  return {
    type: actions.UPDATEANDAPPROVE_ADCDISPUTE_UNIT_SUCCESS,
    response: response,
  };
};

const UpdateADCDisputeDetails = (
  object,
  searchData,
  searchDataofdate,
  DataForGlobal,
  DataForGlobalDate
) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  let flagForGlobalDispute = localStorage.getItem("FlagForGlobalDispute");

  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", updateDisputeDetailsADC.RequestMethod);
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPIADC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SaveADCDisputes(object, searchData, searchDataofdate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              UpdateADCDisputeSuccess(response.data.responseResult)
            );
            if (flagForGlobalDispute === "true") {
              await localStorage.setItem("CaseStatus", DataForGlobal.fk_csid);
              await localStorage.setItem("parent", "sub1");
              await localStorage.setItem("child", "1");
              await dispatch(
                ShowNotification(response.data.responseResult.responseMessage)
              );
              await dispatch(
                SearchGlobalDisputes(DataForGlobal, DataForGlobalDate)
              );
              localStorage.removeItem("FlagForGlobalDispute");
              navigate("/Fraud/DisputeCases/Search");
            } else if (flagForGlobalDispute === "false") {
              await localStorage.setItem("CaseStatus", searchData.fk_csid);
              await localStorage.setItem("parent", "sub2");
              await localStorage.setItem("child", "7");
              await dispatch(
                ShowNotification(response.data.responseResult.responseMessage)
              );
              await dispatch(SearchADCDisputes(searchData, searchDataofdate));
              localStorage.removeItem("FlagForGlobalDispute");
              navigate("/Fraud/ADCD/Search");
            }
          } else {
            await dispatch(
              investigationOfficerFail(response.data.responseResult)
            );
            localStorage.setItem("child", "7");
            localStorage.setItem("parent", "sub2");
          }
        } else {
          dispatch(investigationOfficerFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

const UpdateAndApproveADCDisputeDetails = (
  object,
  searchData,
  searchDataofdate,
  DataForGlobal,
  DataForGlobalDate
) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  let flagForGlobalDispute = localStorage.getItem("FlagForGlobalDispute");
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      updateAndApproveADCDisputeDetails.RequestMethod
    );
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPIADC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SaveADCDisputes(object, searchData, searchDataofdate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              UpdateAndApproveADCDisputeSuccess(response.data.responseResult)
            );
            if (flagForGlobalDispute === "true") {
              await localStorage.setItem("CaseStatus", DataForGlobal.fk_csid);
              await localStorage.setItem("parent", "sub1");
              await localStorage.setItem("child", "1");
              await dispatch(
                ShowNotification(response.data.responseResult.responseMessage)
              );
              await dispatch(
                SearchGlobalDisputes(DataForGlobal, DataForGlobalDate)
              );
              localStorage.removeItem("FlagForGlobalDispute");
              navigate("/Fraud/DisputeCases/Search");
            } else if (flagForGlobalDispute === "false") {
              await localStorage.setItem("CaseStatus", searchData.fk_csid);
              await localStorage.setItem("parent", "sub2");
              await localStorage.setItem("child", "7");
              await dispatch(
                ShowNotification(response.data.responseResult.responseMessage)
              );
              await dispatch(SearchADCDisputes(searchData, searchDataofdate));
              localStorage.removeItem("FlagForGlobalDispute");
              navigate("/Fraud/ADCD/Search");
            }
          } else {
            dispatch(investigationOfficerFail(response.data.responseResult));
            localStorage.setItem("child", "7");
            localStorage.setItem("parent", "sub2");
          }
        } else {
          dispatch(investigationOfficerFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};
// Seacr in iris from account number in ADC
const SearchTransactionDetailsByAccountNumberInIRISADC = (object) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));

  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      searchIRISTransactionDetailsByAccountNumber.RequestMethod
    );
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPIADC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchTransactionDetailsByAccountNumberInIRISADC(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "No Records Found"
            ) {
              dispatch(RESETALLSTATE());
              dispatch(accountNumberNotFoundModal(true));
            } else {
              localStorage.setItem("accountNumber", object.AccountNumber);
              dispatch(RESETALLSTATE());
              dispatch(
                GetTransactionDetailsByAccountNumberADCSuccess(
                  response.data.responseResult
                )
              );
              navigate("/Fraud/ADCD/AddNewCustomerDetailsADC");
            }
          } else {
            dispatch(RESETALLSTATE());
            dispatch(accountNumberNotFoundModal(true));
            dispatch(
              GetTransactionDetailsByAccountNumberADCFail(
                response.data.responseResult
              )
            );
          }
        } else {
          dispatch(GetTransactionDetailsByAccountNumberADCFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

const GetADCDisputesByCnicAndReferenceNumberForEditInit = (response) => {
  return {
    type: actions.GET_ADCDISPUTESFOREDITBYCNICANDREFERENCENUMBER_UNIT_INIT,
    response: response,
  };
};

const GetADCDisputesByCnicAndReferenceNumberForEditSuccess = (response) => {
  return {
    type: actions.GET_ADCDISPUTESFOREDITBYCNICANDREFERENCENUMBER_UNIT_SUCCESS,
    response: response,
  };
};

const GetADCDisputesByCnicAndReferenceNumberForEditFail = (response) => {
  return {
    type: actions.GET_ADCDISPUTESFOREDITBYCNICANDREFERENCENUMBER_UNIT_FAIL,
    response: response,
  };
};

//Edit API For ADC
const SearchADCDisputesForEditByCnicAndReferenceNumber = (object) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));

  return (dispatch) => {
    dispatch(GetADCDisputesByCnicAndReferenceNumberForEditInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      searchADCDisputesForEditByCnicAndReferenceNumber.RequestMethod
    );
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPIADC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchADCDisputesForEditByCnicAndReferenceNumber(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              GetADCDisputesByCnicAndReferenceNumberForEditSuccess(
                response.data.responseResult
              )
            );
            await dispatch(GetAllSourceOfIBChannelCreation());
            await dispatch(GetAllCaseDecision());
            await dispatch(GetAllCity());
            navigate("/Fraud/ADCD/EditADCDispute");
          } else {
            dispatch(
              GetADCDisputesByCnicAndReferenceNumberForEditFail(
                response.data.responseResult
              )
            );
          }
        } else {
          dispatch(
            GetADCDisputesByCnicAndReferenceNumberForEditFail(response.data)
          );
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

// GetTransactionDetailsByAccountNumberDebitSuccess for sucess
const GetTransactionDetailsByAccountNumberADCSuccess = (response) => {
  return {
    type: actions.GET_TRANSACTIONDETAILSBYACCOUNTNUMBERADC_UNIT_SUCCESS,
    response: response,
  };
};

// GetTransactionDetailsByAccountNumberDebitFail for FAil
const GetTransactionDetailsByAccountNumberADCFail = (response) => {
  return {
    type: actions.GET_TRANSACTIONDETAILSBYACCOUNTNUMBERADC_UNIT_FAIL,
    response: response,
  };
};

//For Dispute through account
const GetTransactionDetailsByAccountNumberADC = (object) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    AccountNumber: object,
  };

  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      getTransactionDetailsByAccountNumber.RequestMethod
    );
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPIADC,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetTransactionDetailsByAccountNumberADC(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(RESETALLSTATE());
            // dispatch(GetTransactionDetailsByAccountNumberDebitSuccess(response.data.responseResult));
            if (
              response.data.responseResult.responseMessage ===
              "No Records Found"
            ) {
              dispatch(accountNumberFoundModal(true));
              localStorage.setItem("AccountNumber", object);
            } else {
              dispatch(accountNumberFoundModal(false));
              localStorage.setItem("AccountNumber", object);
              dispatch(
                GetTransactionDetailsByAccountNumberADCSuccess(
                  response.data.responseResult
                )
              );
              navigate("/Fraud/ADCD/CustomerDetailsADCAccount");
            }
          } else {
            dispatch(accountNumberFoundModal(true));
            dispatch(
              GetTransactionDetailsByAccountNumberADCFail(
                response.data.responseResult.responseMessage
              )
            );
          }
        } else {
          dispatch(
            GetTransactionDetailsByAccountNumberADCFail(
              response.data.responseResult.responseMessage
            )
          );
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//==BBKONNECT==\\
//Successors and Failures
const GetAllAccountsBBKSuccess = (response) => {
  return {
    type: actions.GET_ACCOUNTSBBK_UNIT_SUCCESS,
    response: response,
  };
};

const GetAllAccountsBBKFail = (response) => {
  return {
    type: actions.GET_ACCOUNTSBBK_UNIT_FAIL,
    response: response,
  };
};

const GetAllAccountsByMobileNumberBBKSuccess = (response) => {
  return {
    type: actions.GET_ACCOUNTSBYMOBILENUMBERBBK_UNIT_SUCCESS,
    response: response,
  };
};

const GetAllAccountsByMobileNumberBBKFail = (response) => {
  return {
    type: actions.GET_ACCOUNTSBYMOBILENUMBERBBK_UNIT_FAIL,
    response: response,
  };
};

// GetTransactionDetailsByCnicBBKSuccess for sucess
const GetTransactionDetailsByCnicBBKSuccess = (response) => {
  return {
    type: actions.GET_TRANSACTIONDETAILSBYCNICBBK_UNIT_SUCCESS,
    response: response,
  };
};

// GetTransactionDetailsByCnicBBKFail for FAil
const GetTransactionDetailsByCnicBBKFail = (response) => {
  return {
    type: actions.GET_TRANSACTIONDETAILSBYCNICBBK_UNIT_FAIL,
    response: response,
  };
};

// GetTransactionDetailsByCnicDebitCardSuccess for sucess
const GetIrisTransactionDetailsByAccountNumberBBKSuccess = (response) => {
  return {
    type: actions.GET_IRISTRANSACTIONDETAILSBYACCOUNTNUMBERBBK_UNIT_SUCCESS,
    response: response,
  };
};

// GetTransactionDetailsByCnicDebitCardSuccess for FAil
const GetIrisTransactionDetailsByAccountNumberBBKFail = (response) => {
  return {
    // type: actions.GET_TRANSACTIONDETAILSBYCNICDEBIT_UNIT_FAIL,
    type: actions.GET_IRISTRANSACTIONDETAILSBYACCOUNTNUMBERBBK_UNIT_FAIL,
    response: response,
  };
};

// GetTransactionDetailsByCnicDebitCardSuccess for sucess
const GetIrisTransactionDetailsByMobileNumberBBKSuccess = (response) => {
  return {
    type: actions.GET_IRISTRANSACTIONDETAILSBYMOBILENUMBERBBK_UNIT_SUCCESS,
    response: response,
  };
};

// GetTransactionDetailsByCnicDebitCardSuccess for FAil
const GetIrisTransactionDetailsByMobileNumberBBKFail = (response) => {
  return {
    // type: actions.GET_TRANSACTIONDETAILSBYCNICDEBIT_UNIT_FAIL,
    type: actions.GET_IRISTRANSACTIONDETAILSBYMOBILENUMBERBBK_UNIT_FAIL,
    response: response,
  };
};

//Search Success
const SearchBBKDisputeSuccess = (response) => {
  return {
    type: actions.SEARCH_BBKDISPUTE_UNIT_SUCCESS,
    response: response,
  };
};

//Search Fail
const SearchBBKDisputeFail = (response) => {
  return {
    type: actions.SEARCH_BBKDISPUTE_UNIT_FAIL,
    response: response,
  };
};

// GetTransactionDetailsByAccountNumberBBKSuccess for sucess
const GetTransactionDetailsByAccountNumberBBKSuccess = (response) => {
  return {
    type: actions.GET_TRANSACTIONDETAILSBYACCOUNTNUMBERBBK_UNIT_SUCCESS,
    response: response,
  };
};

// GetTransactionDetailsByAccountNumberBBKFail for FAil
const GetTransactionDetailsByAccountNumberBBKFail = (response) => {
  return {
    type: actions.GET_TRANSACTIONDETAILSBYACCOUNTNUMBERBBK_UNIT_FAIL,
    response: response,
  };
};

// GetTransactionDetailsByMobileNumberBBKSuccess for sucess
const GetTransactionDetailsByMobileNumberBBKSuccess = (response) => {
  return {
    type: actions.GET_TRANSACTIONDETAILSBYMOBILENUMBERBBK_UNIT_SUCCESS,
    response: response,
  };
};

// GetTransactionDetailsByMobileNumberBBKFail for FAil
const GetTransactionDetailsByMobileNumberBBKFail = (response) => {
  return {
    type: actions.GET_TRANSACTIONDETAILSBYMOBILENUMBERBBK_UNIT_FAIL,
    response: response,
  };
};

//Update Success
//Update APIs BBK
const UpdateBBKDisputeSuccess = (response) => {
  return {
    type: actions.UPDATE_BBKDISPUTE_UNIT_SUCCESS,
    response: response,
  };
};

const UpdateAndApproveBBKDisputeSuccess = (response) => {
  return {
    type: actions.UPDATEANDAPPROVE_BBKDISPUTE_UNIT_SUCCESS,
    response: response,
  };
};

//Reset Search Filter
const resetBBKSearchFilter = (response) => {
  return {
    type: actions.RESET_BBK_DISPUTE,
    response: response,
  };
};

//View API Loader
const GetBBKDisputesByCnicInit = (response) => {
  return {
    type: actions.GET_BBKDISPUTE_BY_CNIC_INIT,
    response: response,
  };
};

//View api successor
const GetBBKDisputesByCnicSuccess = (response) => {
  return {
    type: actions.GET_BBKDISPUTE_BY_CNIC_UNIT_SUCCESS,
    response: response,
  };
};

//View api fail
const GetBBKDisputesByCnicFail = (response) => {
  return {
    type: actions.GET_BBKDISPUTE_BY_CNIC_UNIT_FAIL,
    response: response,
  };
};

//For Edit Loader
const GetBBKDisputesByCnicAndReferenceNumberForEditInit = (response) => {
  return {
    type: actions.GET_BBKDISPUTESFOREDITBYCNICANDREFERENCENUMBER_UNIT_INIT,
    response: response,
  };
};

//For Edit Successor
const GetBBKDisputesByCnicAndReferenceNumberForEditSuccess = (response) => {
  return {
    type: actions.GET_BBKDISPUTESFOREDITBYCNICANDREFERENCENUMBER_UNIT_SUCCESS,
    response: response,
  };
};

//For Edit Failure
const GetBBKDisputesByCnicAndReferenceNumberForEditFail = (response) => {
  return {
    type: actions.GET_BBKDISPUTESFOREDITBYCNICANDREFERENCENUMBER_UNIT_FAIL,
    response: response,
  };
};

//APIS
//GetAllAccountsByCnicBBK
const GetAllAccountsByCnicBBK = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    CNIC: object,
  };
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", getAllAccountsByCnicBBK.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPIBBK,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetAllAccountsByCnicBBK(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(GetAllAccountsBBKSuccess(response.data.responseResult));
          } else {
            dispatch(customerNotFoundModal(true));
            dispatch(
              GetAllAccountsFail(response.data.responseResult.responseMessage)
            );
          }
        } else {
          dispatch(GetAllAccountsBBKFail(response.data.responseMessage));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

const GetAllAccountsByMobileNumberBBK = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    MobileNumber: object,
  };
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", getAllAccountsByMobileNumberBBK.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPIBBK,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetAllAccountsByMobileNumberBBK(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              GetAllAccountsByMobileNumberBBKSuccess(
                response.data.responseResult
              )
            );
          } else {
            dispatch(mobileNumberNotFoundModal(true));
            dispatch(
              GetAllAccountsByMobileNumberBBKFail(
                response.data.responseResult.responseMessage
              )
            );
          }
        } else {
          dispatch(
            GetAllAccountsByMobileNumberBBKFail(response.data.responseMessage)
          );
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//GetTransactionDetailsByCnic
const GetTransactionDetailsByCnicBBK = (object) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  // let Data = {
  //   CNIC: object,
  // };
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      getTransactionDetailsByCNICBBKonnect.RequestMethod
    );
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPIBBK,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetTransactionDetailsByCnicBBK(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage === "Record Found"
            ) {
              dispatch(
                GetTransactionDetailsByCnicBBKSuccess(
                  response.data.responseResult
                )
              );
              await localStorage.setItem("CNICNumber", object.CNIC);
              navigate("/Fraud/BBKonnect/CustomerDetailsBBKDispute");
            }
          } else {
            dispatch(customerFoundModal(true));
            dispatch(GetTransactionDetailsByCnicBBKFail(response.data));
          }
        } else {
          // dispatch(RESETALLSTATE());
          dispatch(GetTransactionDetailsByCnicBBKFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

// Seacr in iris from account number in BBKonnect
const SearchTransactionDetailsByAccountNumberInIRISBBK = (object) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));

  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      searchIRISTransactionDetailsByAccountNumberBBK.RequestMethod
    );
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPIBBK,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchTransactionDetailsByAccountNumberInIRISBBK(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "No Records Found"
            ) {
              dispatch(accountNumberNotFoundModal(true));
            } else {
              localStorage.setItem("accountNumber", object.AccountNumber);
              dispatch(
                GetIrisTransactionDetailsByAccountNumberBBKSuccess(
                  response.data.responseResult
                )
              );
              navigate("/Fraud/BBKonnect/AddNewDispute");
            }
          } else {
            dispatch(accountNumberNotFoundModal(true));
            dispatch(
              GetIrisTransactionDetailsByAccountNumberBBKFail(
                response.data.responseResult
              )
            );
            // setIRISFailmodal(true);
          }
        } else {
          dispatch(
            GetIrisTransactionDetailsByAccountNumberBBKFail(response.data)
          );
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

// Seacr in iris from account number in BBKonnect
const SearchTransactionDetailsByMobileNumberInIRISBBK = (object) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));

  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      SearchTransactionDetailsByMobileNumberInIRISBBK.RequestMethod
    );
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPIBBK,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchTransactionDetailsByMobileNumberInIRISBBK(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "No Records Found"
            ) {
              dispatch(mobileNumberNotFoundModal(true));
            } else {
              localStorage.setItem("accountNumber", object.AccountNumber);
              dispatch(
                GetIrisTransactionDetailsByMobileNumberBBKSuccess(
                  response.data.responseResult
                )
              );
              navigate("/Fraud/BBKonnect/AddNewDispute");
            }
          } else {
            dispatch(mobileNumberNotFoundModal(true));
            dispatch(
              GetIrisTransactionDetailsByMobileNumberBBKFail(
                response.data.responseResult
              )
            );
            // setIRISFailmodal(true);
          }
        } else {
          dispatch(
            GetIrisTransactionDetailsByMobileNumberBBKFail(response.data)
          );
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//GetIRISTransactionDetailsByTransactionIDBBK
const GetIRISTransactionDetailsByTransactionIdBBK = (
  object,
  setTrsDetails,
  setTransactionIDError,
  setTIDErrMsg,
  setSourceType,
  setTransactionCurrencyCodeValue
) => {
  let token = JSON.parse(localStorage.getItem("token"));

  var accountNumber = localStorage.getItem("accountNumber");
  let Data = {
    AccountNumber: accountNumber,
    TransactionId: object,
  };

  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      getIRISTransactionDetailsByTransactionIdBBK.RequestMethod
    );
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPIBBK,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            GetIRISTransactionDetailsByTransactionIdBBK(
              object,
              setTrsDetails,
              setTransactionIDError,
              setTIDErrMsg,
              setSourceType,
              setTransactionCurrencyCodeValue
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            setTransactionIDError(false);
            setTIDErrMsg("");
            let ar = response.data.responseResult.transactionDetails;
            setTrsDetails({
              TransactionID: ar.transactionID,
              OtherBankAccountNumber: ar.otherBankAccountNumber,
              HBLAccountNumber: accountNumber,
              MobileNumber: ar.mobileNumber,
              TransactionDate: ar.transactionDate,
              TransactionTime: ar.transactionTime,
              TransactionPostingDate: ar.transactionPostingDate,
              Month: ar.month,
              Year: ar.year,
              PotentialSave: ar.potentialSave,
              TransactionAmount: ar.transactionAmount,
              DisputeAmount: ar.disputeAmount,
              TransactionCurrencyCode: ar.transactionCurrencyCode,
              Response: ar.response,
              TransactionMode: ar.transactionMode,
              ApprovalCode: ar.approvalCode,
              TransactionCity: ar.transactionCity,
              FK_SID: ar.fK_SID,
              PreIdentifiedDataType: 3,
            });
            dispatch(LOADERFALSE());
          } else {
            setTransactionIDError(true);
            setTIDErrMsg(response.data.responseResult.responseMessage);
            setTrsDetails({
              TransactionID: "",
              OtherBankAccountNumber: "",
              HBLAccountNumber: accountNumber,
              MobileNumber: "",
              TransactionDate: "",
              TransactionTime: "",
              TransactionPostingDate: "",
              Month: "",
              Year: "",
              PotentialSave: 0,
              TransactionAmount: 0,
              DisputeAmount: 0,
              TransactionCurrencyCode: "",
              Response: "",
              TransactionMode: "",
              ApprovalCode: "",
              TransactionCity: "",
              FK_SID: 0,
              PreIdentifiedDataType: 3,
            });
            setSourceType("");
            setTransactionCurrencyCodeValue("");
            dispatch(investigationOfficerFail(response.data));
          }
        } else {
          setTransactionIDError(true);
          setTIDErrMsg(response.data.responseResult.responseMessage);
          setTrsDetails({
            TransactionID: "",
            OtherBankAccountNumber: "",
            HBLAccountNumber: "",
            MobileNumber: "",
            TransactionDate: "",
            TransactionTime: "",
            TransactionPostingDate: "",
            Month: "",
            Year: "",
            PotentialSave: -99999999999999999999,
            TransactionAmount: -99999999999999999999,
            DisputeAmount: -99999999999999999999,
            TransactionCurrencyCode: "",
            Response: "",
            TransactionMode: "",
            ApprovalCode: "",
            TransactionCity: "",
            FK_SID: 0,
            PreIdentifiedDataType: 0,
          });
          setSourceType("");
          setTransactionCurrencyCodeValue("");
          dispatch(investigationOfficerFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//SaveBBKDisputes
const SaveBBKDisputes = (object, searchData, searchDataofdate) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", saveBBKDispute.RequestMethod);
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPIBBK,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SaveBBKDisputes(object, searchData, searchDataofdate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            await localStorage.setItem("CaseStatus", searchData.fk_csid);
            await localStorage.setItem("parent", "sub2");
            await localStorage.setItem("child", "11");
            await dispatch(SearchBBKDisputes(searchData, searchDataofdate));
            navigate("/Fraud/BBKonnect/Search");
            dispatch(LOADERFALSE());
          } else {
            dispatch(investigationOfficerFail(response.data.responseResult));
            localStorage.setItem("child", "11");
            localStorage.setItem("parent", "sub2");
          }
        } else {
          dispatch(investigationOfficerFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//SaveAndApproveBBKDispute
const SaveAndApprovedBBKDisputes = (object, searchData, searchDataofdate) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", saveAndApproveBBKDispute.RequestMethod);
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPIBBK,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            SaveAndApprovedBBKDisputes(object, searchData, searchDataofdate)
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await localStorage.setItem("CaseStatus", searchData.fk_csid);
            await localStorage.setItem("parent", "sub2");
            await localStorage.setItem("child", "11");
            if (searchData && searchDataofdate) {
              await dispatch(
                ShowNotification(response.data.responseResult.responseMessage)
              );
              await dispatch(SearchBBKDisputes(searchData, searchDataofdate));
            }
            navigate("/Fraud/BBKonnect/Search");
          } else {
            await dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            await dispatch(LOADERFALSE());
          }
        } else {
          await dispatch(
            ShowNotification(response.data.responseResult.responseMessage)
          );
          await dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//SearchBBKDisputes
const SearchBBKDisputes = (object, State) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    NumberOfPages: 5,
    BBKonnectDisputes: {
      ReferenceNumber: object.ReferenceNumber,
      CustomerName: object.CustomerName,
      // CMCity: object.CMCity,
      FK_CTID: parseInt(object.FK_CTID),
      CNICNumber: object.CNICNumber,
      AccountNumber: object.AccountNumber,
      Fraudtype: object.Fraudtype,
      TransactionID: object.TransactionID,
      TotalTransactionAmount: parseFloat(object.TotalTransactionAmount),
      // InProgressOnly: object.InProgressOnly,
      ApprovalCode: object.ApprovalCode,
      FromDate: State.FromDate,
      ToDate: State.ToDate,
      fk_csid: parseInt(object.fk_csid),
      MobileNumber: object.MobileNumber,
    },
  };

  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", searchBBKDispute.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPIBBK,
      data: form,
      headers: {
        _token: token,
        // 'Access-Control-Allow-Origin': '*',
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchBBKDisputes(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              SearchBBKDisputeSuccess(response.data.responseResult)
            );
          } else {
            dispatch(SearchBBKDisputeFail(response.data.responseResult));
          }
        } else {
          dispatch(SearchBBKDisputeFail(response.data.responseResult));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//View Api For BBK Dispute
const SearchBBKDisputesByCnicAndReferenceNumber = (object, TTID) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));

  return (dispatch) => {
    dispatch(GetBBKDisputesByCnicInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      searchBBKonnectDisputesByCnicAndReferenceNumber.RequestMethod
    );
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPIBBK,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchBBKDisputesByCnicAndReferenceNumber(object, TTID));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              GetBBKDisputesByCnicSuccess(response.data.responseResult)
            );
            await dispatch(GetAllFraudType());
            await dispatch(GetAllSource());
            await dispatch(GetAllApprovalReasons());
            await dispatch(GetAllRejectionReasons());
            await dispatch(GetAllCity());
            localStorage.setItem("CNICNumber", object.CNICNumber);
            if (!TTID) {
              localStorage.removeItem("FK_TTID");
              navigate("/Fraud/BBKonnect/ViewCustomerDetailsBBK");
            }
          } else {
            dispatch(
              GetBBKDisputesByCnicFail(
                response.data.responseResult.responseMessage
              )
            );
          }
        } else {
          dispatch(GetBBKDisputesByCnicFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//Edit API For BBK Dispute
const GetBBKDisputesForEditByCnicAndReferenceNumber = (object) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));

  return (dispatch) => {
    dispatch(GetBBKDisputesByCnicAndReferenceNumberForEditInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      searchBBKonnectDisputesForEditByCnicAndReferenceNumber.RequestMethod
    );
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPIBBK,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetBBKDisputesForEditByCnicAndReferenceNumber(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              GetBBKDisputesByCnicAndReferenceNumberForEditSuccess(
                response.data.responseResult
              )
            );
            navigate("/Fraud/BBKonnect/EditBBKDispute");
          } else {
            dispatch(
              GetBBKDisputesByCnicAndReferenceNumberForEditFail(
                response.data.responseResult
              )
            );
          }
        } else {
          dispatch(
            GetBBKDisputesByCnicAndReferenceNumberForEditFail(
              response.data.responseResult
            )
          );
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//UpdateBBKDisputeDetail
const UpdateBBKDisputeDetails = (
  object,
  searchData,
  searchDataofdate,
  DataForGlobal,
  DataForGlobalDate
) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  let flagForGlobalDispute = localStorage.getItem("FlagForGlobalDispute");
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", updateBBKDispute.RequestMethod);
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPIBBK,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            UpdateBBKDisputeDetails(object, searchData, searchDataofdate)
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              UpdateBBKDisputeSuccess(response.data.responseResult)
            );
            if (flagForGlobalDispute === "true") {
              await localStorage.setItem("CaseStatus", DataForGlobal.fk_csid);
              await localStorage.setItem("parent", "sub1");
              await localStorage.setItem("child", "1");
              await dispatch(
                ShowNotification(response.data.responseResult.responseMessage)
              );
              await dispatch(
                SearchGlobalDisputes(DataForGlobal, DataForGlobalDate)
              );
              localStorage.removeItem("FlagForGlobalDispute");
              navigate("/Fraud/DisputeCases/Search");
            } else if (flagForGlobalDispute === "false") {
              await localStorage.setItem("CaseStatus", searchData.fk_csid);
              await localStorage.setItem("parent", "sub2");
              await localStorage.setItem("child", "11");
              await dispatch(
                ShowNotification(response.data.responseResult.responseMessage)
              );
              await dispatch(SearchBBKDisputes(searchData, searchDataofdate));
              localStorage.removeItem("FlagForGlobalDispute");
              navigate("/Fraud/BBKonnect/Search");
            }
            if (
              response.data.responseResult.responseMessage ===
              "No Records Found"
            ) {
            } else {
            }
          } else {
            dispatch(investigationOfficerFail(response.data.responseResult));
            localStorage.setItem("child", "11");
            localStorage.setItem("parent", "sub2");
          }
        } else {
          dispatch(investigationOfficerFail(response.data.responseResult));
        }
      })
      .catch((response) => {
        dispatch(investigationOfficerFail(response.data));
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//UpdateAndApproveBBKDisputeDetail
const UpdateAndApproveBBKDisputeDetails = (
  object,
  searchData,
  searchDataofdate,
  DataForGlobal,
  DataForGlobalDate
) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  let flagForGlobalDispute = localStorage.getItem("FlagForGlobalDispute");
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", updateAndApproveBBKDispute.RequestMethod);
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPIBBK,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            UpdateAndApproveBBKDisputeDetails(
              object,
              searchData,
              searchDataofdate
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              UpdateAndApproveBBKDisputeSuccess(response.data.responseResult)
            );
            if (flagForGlobalDispute === "true") {
              await localStorage.setItem("CaseStatus", DataForGlobal.fk_csid);
              await localStorage.setItem("parent", "sub1");
              await localStorage.setItem("child", "1");
              await dispatch(
                ShowNotification(response.data.responseResult.responseMessage)
              );
              await dispatch(
                SearchGlobalDisputes(DataForGlobal, DataForGlobalDate)
              );
              localStorage.removeItem("FlagForGlobalDispute");
              navigate("/Fraud/DisputeCases/Search");
            } else if (flagForGlobalDispute === "false") {
              await localStorage.setItem("CaseStatus", searchData.fk_csid);
              await localStorage.setItem("parent", "sub2");
              await localStorage.setItem("child", "11");
              await dispatch(
                ShowNotification(response.data.responseResult.responseMessage)
              );
              await dispatch(SearchBBKDisputes(searchData, searchDataofdate));
              localStorage.removeItem("FlagForGlobalDispute");
              navigate("/Fraud/BBKonnect/Search");
            }
          } else {
            dispatch(investigationOfficerFail(response.data.responseResult));
            localStorage.setItem("child", "11");
            localStorage.setItem("parent", "sub2");
          }
        } else {
          dispatch(investigationOfficerFail(response.data.responseResult));
        }
      })
      .catch((response) => {
        dispatch(investigationOfficerFail(response.data));
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//Search Transaction Details by AccountNumber
const GetTransactionDetailsByAccountNumberBBK = (object) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    AccountNumber: object,
  };

  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      getTransactionDetailsByAccountNumberBBKonnect.RequestMethod
    );
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPIBBK,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetTransactionDetailsByAccountNumberBBK(object));
        } else if (response.data.responseCode === 200) {
          await dispatch(RESETALLSTATE());
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "No Records Found"
            ) {
              dispatch(accountNumberFoundModal(true));
              localStorage.setItem("AccountNumber", object);
            } else {
              // localStorage.setItem("AccountNumber", object);
              dispatch(accountNumberFoundModal(false));
              localStorage.setItem("AccountNumber", object);
              dispatch(
                GetTransactionDetailsByAccountNumberBBKSuccess(
                  response.data.responseResult
                )
              );
              navigate("/Fraud/BBKonnect/CustomerDetailsForAccount");
            }
          } else {
            dispatch(accountNumberFoundModal(true));
            dispatch(
              GetTransactionDetailsByAccountNumberBBKFail(
                response.data.responseResult.responseMessage
              )
            );
          }
        } else {
          dispatch(RESETALLSTATE());
          dispatch(
            GetTransactionDetailsByAccountNumberBBKFail(
              response.data.responseResult.responseMessage
            )
          );
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//Search Transaction Details by MobileNumber
const GetTransactionDetailsByMobileNumberBBK = (object) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    MobileNumber: object,
  };
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      getTransactionDetailsByMobileNumberBBKonnect.RequestMethod
    );
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPIBBK,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetTransactionDetailsByMobileNumberBBK(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage === "Record Found"
            ) {
              dispatch(
                GetTransactionDetailsByMobileNumberBBKSuccess(
                  response.data.responseResult
                )
              );
              await localStorage.setItem("MobileNumber", object);
              navigate("/Fraud/BBKonnect/CustomerDetailsMobileBBKDispute");
            }
          } else {
            dispatch(mobileNumberFoundModal(true));
            dispatch(GetTransactionDetailsByMobileNumberBBKFail(response.data));
          }
        } else {
          // dispatch(RESETALLSTATE());
          dispatch(GetTransactionDetailsByMobileNumberBBKFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

// modal handler for iris fail
const setIRISFailmodal = (response) => {
  return {
    type: actions.SET_MODAL_HANDLER_FAIL,
    response: response,
  };
};
const setDisputemodal = (response) => {
  return {
    type: actions.SET_MODAL_FOR_DISPUTE,
    response: response,
  };
};

//Reset Table View Cases
const resetGlobalDisputeTable = (response) => {
  return {
    type: actions.RESET_GLOBALDISPUTE_TABLE,
    response: response,
  };
};

//Success Approval History
const GetDisputeStatusGlobalSuccess = (response) => {
  return {
    type: actions.GET_DISPUTESTATUSGLOBAL_UNIT_SUCCESS,
    response: response,
  };
};

//Fail Approval History
const GetDisputeStatusGlobalFail = (response) => {
  return {
    type: actions.GET_DISPUTESTATUSGLOBAL_UNIT_FAIL,
    response: response,
  };
};

//Approval History Global
const GetDisputeStatusGlobal = (
  object,
  setIsModalVisible2,
  setAction,
  actions
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    FK_DID: object.DID,
    FK_TTID: object.TTID,
  };
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", getDisputeStatusGlobal.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationManagerAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            GetDisputeStatusGlobal(
              object,
              setIsModalVisible2,
              setAction,
              actions
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              GetDisputeStatusGlobalSuccess(response.data.responseResult)
            );
            setIsModalVisible2(true);
            setAction({
              ...actions,
              viewApprovalHistory: true,
            });
          } else {
          }
        } else {
          dispatch(GetDisputeStatusGlobalFail(response.data));
          // dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//Success Approval History
const GetDisputeStatusSAPendingForDeletionSuccess = (response) => {
  return {
    type: actions.GET_DISPUTESTATUSSAPENDINGFORDELETION_UNIT_SUCCESS,
    response: response,
  };
};

//Fail Approval History
const GetDisputeStatusSAPendingForDeletionFail = (response) => {
  return {
    type: actions.GET_DISPUTESTATUSSAPENDINGFORDELETION_UNIT_FAIL,
    response: response,
  };
};

//Approval History Global
const GetDisputeStatusSAPendingForDeletion = (
  object,
  setIsModalVisible2,
  setAction,
  actions
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    FK_DID: object.DID,
    FK_TTID: object.TTID,
  };
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      getDisputeStatusSAPendingForDeletion.RequestMethod
    );
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationManagerAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            GetDisputeStatusSAPendingForDeletion(
              object,
              setIsModalVisible2,
              setAction,
              actions
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              GetDisputeStatusSAPendingForDeletionSuccess(
                response.data.responseResult
              )
            );
            setIsModalVisible2(true);
            setAction({
              ...actions,
              viewApprovalHistory: true,
            });
          }
        } else {
          dispatch(GetDisputeStatusSAPendingForDeletionFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

// ====>> NON API SUCCESSOR & FAILURES <<==== \\
// GetTransactionDetailsByCnicNONAPISuccess for sucess
const GetTransactionDetailsByCnicNonApiSuccess = (response) => {
  return {
    type: actions.GET_TRANSACTIONDETAILSBYCNICNONAPI_UNIT_SUCCESS,
    response: response,
  };
};

// GetTransactionDetailsByCnicNONAPIFail for FAil
const GetTransactionDetailsByCnicNonApiFail = (response) => {
  return {
    type: actions.GET_TRANSACTIONDETAILSBYCNICNONAPI_UNIT_FAIL,
    response: response,
  };
};

//All Accounts NON API Success
const GetAllAccountsNonApiSuccess = (response) => {
  return {
    type: actions.GET_ACCOUNTSNONAPI_UNIT_SUCCESS,
    response: response,
  };
};

//All Accounts NON API Failure
const GetAllAccountsNonApiFail = (response) => {
  return {
    type: actions.GET_ACCOUNTSNONAPI_UNIT_FAIL,
    response: response,
  };
};

// GetTransactionDetailsByAccountNumberNonApiIRISSuccess for sucess
const GetTransactionDetailsByAccountNumberNonApiIRISSuccess = (response) => {
  return {
    type: actions.GET_TRANSACTIONDETAILSBYACCOUNTNUMBERNONAPIIRIS_UNIT_SUCCESS,
    response: response,
  };
};

// GetTransactionDetailsByAccountNumberNonApiIRISFail for FAil
const GetTransactionDetailsByAccountNumberNonApiIRISFail = (response) => {
  return {
    type: actions.GET_TRANSACTIONDETAILSBYACCOUNTNUMBERNONAPIIRIS_UNIT_FAIL,
    response: response,
  };
};

const resetCustomerDetailsNonApi = (response) => {
  return {
    type: actions.RESET_NONAPI_DISPUTE,
    response: response,
  };
};

const SearchNonApiDisputeSuccess = (response) => {
  return {
    type: actions.SEARCH_NONAPIDISPUTE_UNIT_SUCCESS,
    response: response,
  };
};

const SearchNonApiDisputeFail = (response) => {
  return {
    type: actions.SEARCH_NONAPIDISPUTE_UNIT_FAIL,
    response: response,
  };
};

const GetNonApiDisputesByCnicViewInit = (response) => {
  return {
    type: actions.GET_NONAPIDISPUTE_BY_CNIC_INIT,
    response: response,
  };
};

const GetNonApiDisputesByCnicViewSuccess = (response) => {
  return {
    type: actions.GET_NONAPIDISPUTE_BY_CNIC_UNIT_SUCCESS,
    response: response,
  };
};

const GetNonApiDisputesByCnicViewFail = (response) => {
  return {
    type: actions.GET_NONAPIDISPUTE_BY_CNIC_UNIT_FAIL,
    response: response,
  };
};

const GetNonApiDisputesByCnicAndReferenceNumberForEditSuccess = (response) => {
  return {
    type: actions.GET_NONAPIDISPUTESFOREDITBYCNICANDREFERENCENUMBER_UNIT_SUCCESS,
    response: response,
  };
};

const GetNonApiDisputesByCnicAndReferenceNumberForEditFail = (response) => {
  return {
    type: actions.GET_NONAPIDISPUTESFOREDITBYCNICANDREFERENCENUMBER_UNIT_FAIL,
    response: response,
  };
};

const UpdateNonApiDisputeSuccess = (response) => {
  return {
    type: actions.UPDATE_NONAPIDISPUTE_UNIT_SUCCESS,
    response: response,
  };
};

const UpdateAndApproveNonApiDisputeSuccess = (response) => {
  return {
    type: actions.UPDATEANDAPPROVE_NONAPIDISPUTE_UNIT_SUCCESS,
    response: response,
  };
};

//GetDisputeStatusNonApiSuccess
const GetDisputeStatusNonApiSuccess = (response) => {
  return {
    type: actions.GET_DISPUTESTATUSNONAPI_UNIT_SUCCESS,
    response: response,
  };
};

//GetDisputeStatusNonApiFail
const GetDisputeStatusNonApiFail = (response) => {
  return {
    type: actions.GET_DISPUTESTATUSNONAPI_UNIT_FAIL,
    response: response,
  };
};

// ====>> NON APIS APIS<<==== \\
//Get Transactions By CNIC (ADD EDIT PAGE 1st API)
const GetTransactionDetailsByCnicNONAPI = (object) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  // let Data = {
  //   CNIC: object,
  // };
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      getTransactionDetailsByCnicNonApi.RequestMethod
    );
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPINONAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetTransactionDetailsByCnicNONAPI(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage === "Record Found"
            ) {
              dispatch(
                GetTransactionDetailsByCnicNonApiSuccess(
                  response.data.responseResult
                )
              );
              localStorage.setItem("CNICNumber", object.CNIC);
              navigate(
                "/Fraud/NONAPIDisputes/CustomerDetailsNONAPIDispute"
              );
            }
          } else {
            localStorage.setItem("CNICNumber", object.CNIC);
            dispatch(customerFoundModal(true));
            dispatch(GetTransactionDetailsByCnicNonApiFail(response.data));
            // dispatch(RESETALLSTATE());
          }
        } else {
          // dispatch(RESETALLSTATE());
          dispatch(GetTransactionDetailsByCnicNonApiFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//GET ALL ACCOUNTS BY CNIC
const GetAllAccountsByCnicNonAPI = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    CNIC: object,
  };
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", getAllAccountsByCnicNonApi.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPINONAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetAllAccountsByCnic(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(GetAllAccountsNonApiSuccess(response.data.responseResult));
          } else {
            dispatch(customerNotFoundModal(true));
            dispatch(
              GetAllAccountsNonApiFail(
                response.data.responseResult.responseMessage
              )
            );
          }
        } else {
          dispatch(GetAllAccountsNonApiFail(response.data.responseMessage));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

// Seacr in iris from account number in NON API
const SearchTransactionDetailsByAccountNumberInIRISNONAPI = (object) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));

  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      searchIRISTransactionDetailsByAccountNumberNonApi.RequestMethod
    );
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPINONAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchTransactionDetailsByAccountNumberInIRISNONAPI(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "No Records Found"
            ) {
              dispatch(accountNumberNotFoundModal(true));
            } else {
              localStorage.setItem("accountNumber", object.AccountNumber);
              dispatch(
                GetTransactionDetailsByAccountNumberNonApiIRISSuccess(
                  response.data.responseResult
                )
              );
              navigate("/Fraud/NONAPIDisputes/AddNewDispute");
            }
          } else {
            dispatch(accountNumberNotFoundModal(true));
            dispatch(
              GetTransactionDetailsByAccountNumberNonApiIRISFail(
                response.data.responseResult
              )
            );
            // setIRISFailmodal(true);
          }
        } else {
          dispatch(
            GetTransactionDetailsByAccountNumberNonApiIRISFail(response.data)
          );
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//Get Transaction Details By Account Number NON API
const GetTransactionDetailsByAccountNumberNonApi = (object) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    AccountNumber: object,
  };

  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      getTransactionDetailsByAccountNumberNonApi.RequestMethod
    );
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPINONAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetTransactionDetailsByAccountNumberNonApi(object));
        } else if (response.data.responseCode === 200) {
          await dispatch(RESETALLSTATE());
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage ===
              "No Records Found"
            ) {
              dispatch(accountNumberFoundModal(true));
              localStorage.setItem("AccountNumber", object);
            } else {
              dispatch(accountNumberFoundModal(false));
              localStorage.setItem("AccountNumber", object);
              dispatch(
                GetTransactionDetailsByAccountNumberNonApiIRISSuccess(
                  response.data.responseResult
                )
              );
              navigate("/Fraud/NONAPIDisputes/CustomerDetailsForAccount");
            }
          } else {
            dispatch(accountNumberFoundModal(true));
            dispatch(
              GetTransactionDetailsByAccountNumberNonApiIRISFail(
                response.data.responseResult.responseMessage
              )
            );
          }
        } else {
          dispatch(RESETALLSTATE());
          dispatch(
            GetTransactionDetailsByAccountNumberNonApiIRISFail(
              response.data.responseResult.responseMessage
            )
          );
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

const GetIRISTransactionDetailsByTransactionIdNonApi = (
  object,
  setTrsDetails,
  setTransactionIDError,
  setTIDErrMsg,
  setSourceType,
  setTransactionCurrencyCodeValue
) => {
  let token = JSON.parse(localStorage.getItem("token"));

  var accountNumber = localStorage.getItem("accountNumber");
  let Data = {
    AccountNumber: accountNumber,
    TransactionId: object,
  };

  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      getIRISTransactionDetailsByTransactionIdNonApi.RequestMethod
    );
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPINONAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            GetIRISTransactionDetailsByTransactionIdNonApi(
              object,
              setTrsDetails,
              setTransactionIDError,
              setTIDErrMsg,
              setSourceType,
              setTransactionCurrencyCodeValue
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            setTransactionIDError(false);
            setTIDErrMsg("");
            let ar = response.data.responseResult.transactionDetails;
            setTrsDetails({
              HBLAccountNumber: accountNumber,
              TransactionID: ar.transactionID,
              OtherBankAccountNumber: ar.otherBankAccountNumber,
              OtherBankBranchCode: ar.otherBankBranchCode,
              OtherBankBranchName: ar.otherBankBranchName,
              TransactionAmount: ar.transactionAmount,
              // TransactionAmountOtherCurrency: ar.transactionAmountOtherCurrency,
              PotentialSave: ar.potentialSave,
              DisputeAmount: ar.disputeAmount,
              TransactionCurrencyCode: ar.transactionCurrencyCode,
              ApprovalCode: ar.approvalCode,
              Response: ar.response,
              POSMode: ar.posMode,
              MerchantName: ar.merchantName,
              MerchantID: ar.merchantID,
              MerchantCity: ar.merchantCity,
              ON_OFF_US: ar.oN_OFF_US,
              CategoryCodeMCC: ar.categoryCodeMCC,
              AcquirerInstitution: ar.acquirerInstitution,
              AcquirerTerminalID: ar.acquirerTerminalID,
              AcquirerID: ar.acquirerID,
              ARN: ar.arn,
              FK_SID: ar.fK_SID,
              TransactionDate: ar.transactionDate,
              TransactionTime: ar.transactionTime,
              PreIdentifiedDataType: 3,
            });
            dispatch(LOADERFALSE());
          } else {
            setTransactionIDError(true);
            setTIDErrMsg(response.data.responseResult.responseMessage);
            setTrsDetails({
              HBLAccountNumber: accountNumber,
              TransactionID: "",
              OtherBankAccountNumber: "",
              OtherBankBranchCode: "",
              OtherBankBranchName: "",
              TransactionAmount: -99999999999999999999,
              // TransactionAmountOtherCurrency: -99999999999999999999,
              PotentialSave: -99999999999999999999,
              DisputeAmount: -99999999999999999999,
              TransactionCurrencyCode: "",
              ApprovalCode: "",
              Response: "",
              POSMode: "",
              MerchantName: "",
              MerchantID: "",
              MerchantCity: "",
              ON_OFF_US: false,
              CategoryCodeMCC: "",
              AcquirerInstitution: "",
              AcquirerTerminalID: "",
              AcquirerID: "",
              ARN: "",
              FK_SID: 0,
              TransactionDate: "",
              TransactionTime: "",
              PreIdentifiedDataType: 3,
            });
            setSourceType("");
            setTransactionCurrencyCodeValue("");
            dispatch(investigationOfficerFail(response.data));
          }
        } else {
          setTransactionIDError(true);
          setTIDErrMsg(response.data.responseResult.responseMessage);
          setTrsDetails({
            HBLAccountNumber: "",
            TransactionID: "",
            OtherBankAccountNumber: "",
            OtherBankBranchCode: "",
            OtherBankBranchName: "",
            TransactionAmount: -99999999999999999999,
            PotentialSave: -99999999999999999999,
            DisputeAmount: -99999999999999999999,
            TransactionCurrencyCode: "",
            ApprovalCode: "",
            Response: "",
            POSMode: "",
            MerchantName: "",
            MerchantID: "",
            MerchantCity: "",
            ON_OFF_US: false,
            CategoryCodeMCC: "",
            AcquirerInstitution: "",
            AcquirerTerminalID: "",
            AcquirerID: "",
            ARN: "",
            FK_SID: 0,
            TransactionDate: "",
            TransactionTime: "",
            PreIdentifiedDataType: 0,
          });
          setSourceType("");
          setTransactionCurrencyCodeValue("");
          dispatch(investigationOfficerFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

const SaveNonApiDisputes = (object, searchData, searchDataofdate) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", saveNonApiDispute.RequestMethod);
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPINONAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SaveNonApiDisputes(object, searchData, searchDataofdate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            await localStorage.setItem("CaseStatus", searchData.fk_csid);
            await localStorage.setItem("parent", "sub2");
            await localStorage.setItem("child", "9");
            await dispatch(SearchNonApiDisputes(searchData, searchDataofdate));
            navigate("/Fraud/NONAPIDisputes/Search");
          } else {
            dispatch(investigationOfficerFail(response.data.responseResult));
            localStorage.setItem("child", "9");
            localStorage.setItem("parent", "sub2");
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(investigationOfficerFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//SAVE AND APPROVE NON API
const SaveAndApproveNonApiDisputes = (object, searchData, searchDataofdate) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", saveNonApiDisputeForApproval.RequestMethod);
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPINONAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            SaveAndApproveNonApiDisputes(object, searchData, searchDataofdate)
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await localStorage.setItem("CaseStatus", searchData.fk_csid);
            await localStorage.setItem("parent", "sub2");
            await localStorage.setItem("child", "9");
            if (searchData && searchDataofdate) {
              await dispatch(
                ShowNotification(response.data.responseResult.responseMessage)
              );
              await dispatch(
                SearchNonApiDisputes(searchData, searchDataofdate)
              );
            }

            navigate("/Fraud/NONAPIDisputes/Search");
          } else {
            await dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            await dispatch(LOADERFALSE());
          }
        } else {
          await dispatch(
            ShowNotification(response.data.responseResult.responseMessage)
          );
          await dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//Search NON API Dispute
const SearchNonApiDisputes = (object, State) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    RecordsPerPage: 5,
    NPIDisputes: {
      RefrenceNumber: object.RefrenceNumber,
      CustomerName: object.CustomerName,
      CMCity: object.CMCity,
      CNIC: object.CNIC,
      AccountNumber: object.AccountNumber,
      Fraudtype: object.Fraudtype,
      TransactionId: object.TransactionId,
      TransactionAmount: parseFloat(object.TransactionAmount),
      // InProgressOnly: object.InProgressOnly,
      ApprovalCode: object.ApprovalCode,
      FromDate: State.FromDate,
      ToDate: State.ToDate,
      fk_csid: parseInt(object.fk_csid),
      FK_CTID: parseInt(object.FK_CTID),
    },
  };

  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", searchNonApiDisputes.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPINONAPI,
      data: form,
      headers: {
        _token: token,
        // 'Access-Control-Allow-Origin': '*',
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchNonApiDisputes(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              SearchNonApiDisputeSuccess(response.data.responseResult)
            );
          } else {
            dispatch(SearchNonApiDisputeFail(response.data.responseResult));
          }
        } else {
          dispatch(SearchNonApiDisputeFail(response.data.responseResult));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//View APi NOn APi
const SearchNonApiDisputesByCnicAndReferenceNumber = (object, TTID) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));

  return (dispatch) => {
    dispatch(GetNonApiDisputesByCnicViewInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      searchDisputesByCnicAndReferenceNumberNonApi.RequestMethod
    );
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPINONAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchNonApiDisputesByCnicAndReferenceNumber(object, TTID));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              GetNonApiDisputesByCnicViewSuccess(response.data.responseResult)
            );
            await dispatch(GetAllFraudType());
            await dispatch(GetAllSource());
            await dispatch(GetAllApprovalReasons());
            await dispatch(GetAllRejectionReasons());
            await dispatch(GetAllCity());
            localStorage.setItem("CNICNumber", object.CNICNumber);
            if (!TTID) {
              localStorage.removeItem("FK_TTID");
              navigate("/Fraud/NONAPIDisputes/ViewCustomerDetailsNonApi");
            }
          } else {
            dispatch(
              GetNonApiDisputesByCnicViewFail(
                response.data.responseResult.responseMessage
              )
            );
          }
        } else {
          dispatch(GetNonApiDisputesByCnicViewFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//Edit API For Non Api
const GetNonApiDisputesForEditByCnicAndReferenceNumber = (object) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));

  return (dispatch) => {
    dispatch(GetCreditCardDisputesByCnicAndReferenceNumberForEditInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      searchDisputesForEditByCnicAndReferenceNumberNonApi.RequestMethod
    );
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPINONAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetNonApiDisputesForEditByCnicAndReferenceNumber(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              GetNonApiDisputesByCnicAndReferenceNumberForEditSuccess(
                response.data.responseResult
              )
            );
            navigate("/Fraud/NONAPIDisputes/EditNONAPIDispute");
          } else {
            dispatch(
              GetNonApiDisputesByCnicAndReferenceNumberForEditFail(
                response.data.responseResult
              )
            );
          }
        } else {
          dispatch(
            GetNonApiDisputesByCnicAndReferenceNumberForEditFail(
              response.data.responseResult
            )
          );
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

const UpdateNonApiDisputeDetails = (
  object,
  searchData,
  searchDataofdate,
  DataForGlobal,
  DataForGlobalDate
) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  let flagForGlobalDispute = localStorage.getItem("FlagForGlobalDispute");
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", updateDisputeDetailsNonApi.RequestMethod);
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPINONAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            UpdateNonApiDisputeDetails(object, searchData, searchDataofdate)
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              UpdateNonApiDisputeSuccess(response.data.responseResult)
            );
            if (flagForGlobalDispute === "true") {
              await localStorage.setItem("CaseStatus", DataForGlobal.fk_csid);
              await localStorage.setItem("parent", "sub1");
              await localStorage.setItem("child", "1");
              await dispatch(
                ShowNotification(response.data.responseResult.responseMessage)
              );
              await dispatch(
                SearchGlobalDisputes(DataForGlobal, DataForGlobalDate)
              );
              localStorage.removeItem("FlagForGlobalDispute");
              navigate("/Fraud/DisputeCases/Search");
            } else if (flagForGlobalDispute === "false") {
              await localStorage.setItem("CaseStatus", searchData.fk_csid);
              await localStorage.setItem("parent", "sub2");
              await localStorage.setItem("child", "9");
              await dispatch(
                ShowNotification(response.data.responseResult.responseMessage)
              );
              await dispatch(
                SearchNonApiDisputes(searchData, searchDataofdate)
              );
              localStorage.removeItem("FlagForGlobalDispute");
              navigate("/Fraud/NONAPIDisputes/Search");
            }
            if (
              response.data.responseResult.responseMessage ===
              "No Records Found"
            ) {
            } else {
            }
          } else {
            dispatch(investigationOfficerFail(response.data.responseResult));
            localStorage.setItem("child", "9");
            localStorage.setItem("parent", "sub2");
          }
        } else {
          dispatch(investigationOfficerFail(response.data.responseResult));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

const UpdateAndApproveNonApiDisputeDetails = (
  object,
  searchData,
  searchDataofdate,
  DataForGlobal,
  DataForGlobalDate
) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  let flagForGlobalDispute = localStorage.getItem("FlagForGlobalDispute");
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      updateAndApproveNonApiDisputeDetails.RequestMethod
    );
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPINONAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            UpdateAndApproveNonApiDisputeDetails(
              object,
              searchData,
              searchDataofdate
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              UpdateAndApproveNonApiDisputeSuccess(response.data.responseResult)
            );
            if (flagForGlobalDispute === "true") {
              await localStorage.setItem("CaseStatus", DataForGlobal.fk_csid);
              await localStorage.setItem("parent", "sub1");
              await localStorage.setItem("child", "1");
              await dispatch(
                ShowNotification(response.data.responseResult.responseMessage)
              );
              await dispatch(
                SearchGlobalDisputes(DataForGlobal, DataForGlobalDate)
              );
              localStorage.removeItem("FlagForGlobalDispute");
              navigate("/Fraud/DisputeCases/Search");
            } else if (flagForGlobalDispute === "false") {
              await localStorage.setItem("CaseStatus", searchData.fk_csid);
              await localStorage.setItem("parent", "sub2");
              await localStorage.setItem("child", "9");
              await dispatch(
                ShowNotification(response.data.responseResult.responseMessage)
              );
              await dispatch(
                SearchNonApiDisputes(searchData, searchDataofdate)
              );
              localStorage.removeItem("FlagForGlobalDispute");
              navigate("/Fraud/NONAPIDisputes/Search");
            }
            if (
              response.data.responseResult.responseMessage ===
              "No Records Found"
            ) {
            } else {
            }
          } else {
            dispatch(investigationOfficerFail(response.data.responseResult));
            localStorage.setItem("child", "9");
            localStorage.setItem("parent", "sub2");
          }
        } else {
          dispatch(investigationOfficerFail(response.data.responseResult));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//GetDisputeStatusNONAPI
const GetDisputeStatusNONAPI = (object, showModal, setAction, actions) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    FK_DID: object,
  };
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", getDisputeStatusNonApi.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPINONAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            GetDisputeStatusNONAPI(object, showModal, setAction, actions)
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              GetDisputeStatusNonApiSuccess(response.data.responseResult)
            );
            showModal();
            setAction({
              ...actions,
              viewApprovalHistory: true,
            });
          }
        } else {
          dispatch(GetDisputeStatusNonApiFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

// ====>> NEGATIVE DATA BASE APIS<<==== \\
// NegativeDatabaseDisputeModal

const negativeDatabaseModal = (response) => {
  return {
    type: actions.SET_MODAL_FOR_NEGATIVEDATABASE,
    response: response,
  };
};

//Get Transaction Details By CNIC (AddEditPage)
const GetDisputesByCnicNDB = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    CNICNumber: object,
  };
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", getDisputeDetailsNDB.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPINDB,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetDisputesByCnicNDB(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(LOADERFALSE());
            dispatch(customerFoundModal(true));
          } else {
            if (
              response.data.responseResult.responseMessage ===
              "No Records Found"
            ) {
              localStorage.setItem("cnic", object);
              await dispatch(setDisputemodal(true));
            } else {
              await dispatch(customerNotFoundModal(true));
            }

            dispatch(
              GetTransactionDetailsByCnicFail(response.data.responseResult)
            );
          }
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//Get Transaction Details By CNIC (AddEditPage)
const GetTransactionDetailsByCnicNDB = (object) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    CNICNumber: object,
  };
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", getDisputeDetailsNDB.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPINDB,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetTransactionDetailsByCnicNDB(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              GetTransactionDetailsByCnicSuccess(response.data.responseResult)
            );
          } else {
            if (
              response.data.responseResult.responseMessage ===
              "No Records Found"
            ) {
              dispatch(customerFoundModal(true));
              localStorage.setItem("cnic", object);
            } else {
              localStorage.setItem("cnic", object);
              dispatch(customerFoundModal(false));
              navigate("/Fraud/NegativeDatabase/AddNewCustomerDetailsND");
              localStorage.setItem("CNICNumber", JSON.stringify(object));
            }
            dispatch(
              GetTransactionDetailsByCnicFail(response.data.responseResult)
            );
          }
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};
//Search Fail
const SearchNDBDisputeFail = (response) => {
  return {
    type: actions.SEARCH_NDB_UNIT_FAIL,
    response: response,
  };
};
//Search Success
const SearchNDBDisputeSuccess = (response) => {
  return {
    type: actions.SEARCH_NDB_UNIT_SUCCESS,
    response: response,
  };
};
const SearchNDBisputeFail = (response) => {
  return {
    type: actions.SEARCH_NDBISPUTE_UNIT_FAIL,
    response: response,
  };
};
//Search Negative database Disputes
const SearchNDBDisputes = (search) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    RecordsPerPage: 5,
    NegativeDispute: {
      CNICNumber: search.CNIC,
      CustomerName: search.CustomerName,
      MobileNumber: search.MobileNo,
      CMCity: search.City,
      ReferenceNumber: search.ReferenceNumber,
      CompanyName: search.CompanyName,
      fk_csid: parseInt(search.fk_csid),
      FK_CTID: parseInt(search.FK_CTID),
    },
  };

  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", searchDisputeNDB.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPINDB,
      data: form,
      headers: {
        _token: token,
        // 'Access-Control-Allow-Origin': '*',
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchNDBDisputes(search));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              SearchNDBDisputeSuccess(response.data.responseResult)
            );
          } else {
            dispatch(SearchNDBisputeFail(response.data.responseResult));
          }
        } else {
          dispatch(SearchNDBDisputeFail(response.data.responseMessage));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//save Negative database Disputes
const SaveDisputeNegativeDB = (object, searchData) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", saveApiDisputeNDB.RequestMethod);
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPINDB,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SaveDisputeNegativeDB(object, searchData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            await localStorage.setItem("CaseStatus", searchData.fk_csid);
            await localStorage.setItem("parent", "sub2");
            await localStorage.setItem("child", "11");
            await dispatch(SearchNDBDisputes(searchData));
            navigate("/Fraud/NegativeDatabase/Search");
            // dispatch(LOADERFALSE());
          } else {
            dispatch(investigationOfficerFail(response.data.responseResult));
          }
        } else {
          dispatch(investigationOfficerFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};
//edit Negative database Disputes
const EditDisputeNegativeDB = (
  object,
  searchData,
  DataForGlobal,
  DataForGlobalDate
) => {
  let navigate = Helper.navigate;
  let token = JSON.parse(localStorage.getItem("token"));
  let flagForGlobalDispute = localStorage.getItem("FlagForGlobalDispute");
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", editApiDisputeNDB.RequestMethod);
    form.append("RequestData", JSON.stringify(object));
    axios({
      method: "post",
      url: InvestigationOfficerAPINDB,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(EditDisputeNegativeDB(object, searchData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (flagForGlobalDispute === "true") {
              await localStorage.setItem("CaseStatus", DataForGlobal.fk_csid);
              await localStorage.setItem("parent", "sub1");
              await localStorage.setItem("child", "1");
              await dispatch(
                ShowNotification(response.data.responseResult.responseMessage)
              );
              await dispatch(
                SearchGlobalDisputes(DataForGlobal, DataForGlobalDate)
              );
              localStorage.removeItem("FlagForGlobalDispute");
              navigate("/Fraud/DisputeCases/Search");
            } else if (flagForGlobalDispute === "false") {
              await localStorage.setItem("CaseStatus", searchData.fk_csid);
              await localStorage.setItem("parent", "sub2");
              await localStorage.setItem("child", "13");
              await dispatch(
                ShowNotification(response.data.responseResult.responseMessage)
              );
              await dispatch(SearchNDBDisputes(searchData));
              localStorage.removeItem("FlagForGlobalDispute");
              navigate("/Fraud/NegativeDatabase/Search");
            }
          } else {
            dispatch(investigationOfficerFail(response.data.responseResult));
          }
        } else {
          dispatch(investigationOfficerFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};
//Get Disputes By CNIC View API
const GetNegativeDBViewByCnic = (object, ttid) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(GetCreditCardDisputesByCnicInit());
    let form = new FormData();
    form.append("RequestMethod", viewNDBByCnicAndReferenceNumber.RequestMethod);
    form.append("RequestData", JSON.stringify(object, ttid));
    axios({
      method: "post",
      url: InvestigationOfficerAPINDB,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetNegativeDBViewByCnic(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            localStorage.setItem("CNICNumber", object.CNICNumber);
            await dispatch(
              GetCreditCardDisputesByCnicSuccess(response.data.responseResult)
            );

            if (
              response.data.responseResult.responseMessage ===
              "No Records Found"
            ) {
            }
          } else {
            dispatch(
              GetCreditCardDisputesByCnicFail(response.data.responseResult)
            );
          }
        } else {
          dispatch(GetCreditCardDisputesByCnicFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

//ResetTableSearch
const resetNegativeDatabase = (response) => {
  return {
    type: actions.RESET_NEGATIVEDATABASE_DISPUTE,
    response: response,
  };
};

//Successors For View Status History
//GetDisputeStatusDCSuccess
const GetDisputeStatusNDSuccess = (response) => {
  return {
    type: actions.GET_DISPUTESTATUSND_UNIT_SUCCESS,
    response: response,
  };
};

//GetDisputeStatusDCFail
const GetDisputeStatusNDFail = (response) => {
  return {
    type: actions.GET_DISPUTESTATUSND_UNIT_FAIL,
    response: response,
  };
};
//ViewApprovalHistory
const GetDisputeStatusND = (object, showModal, setAction, actions) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    FK_DID: object,
  };
  return (dispatch) => {
    dispatch(investigationOfficerInit());
    let form = new FormData();
    form.append("RequestMethod", getDisputeStatusND.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: InvestigationOfficerAPINDB,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetDisputeStatusND(object, showModal, setAction, actions));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(GetDisputeStatusNDSuccess(response.data.responseResult));
            showModal();
            setAction({
              ...actions,
              viewApprovalHistory: true,
            });
          } else {
          }
        } else {
          dispatch(GetDisputeStatusNDFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
        dispatch(LOADERFALSE());
      });
  };
};

export {
  // adc
  GetAllAccountsByCnicADC,
  GetIRISTransactionDetailsByTransactionIdADC,
  GetTransactionDetailsByCnicADC,
  SearchADCDisputes,
  SearchTransactionDetailsByAccountNumberADC,
  resetCustomerDetailsADC,
  SaveADCDisputes,
  SaveAndApprovedADCDisputes,
  SearchTransactionDetailsADCByCNICAndReferenceNumber,
  SearchADCDisputesForEditByCnicAndReferenceNumber,
  UpdateADCDisputeDetails,
  UpdateAndApproveADCDisputeDetails,
  GetTransactionDetailsByAccountNumberADC,
  SearchTransactionDetailsByAccountNumberInIRISADC,
  SearchTransactionDetailsByAccountNumberInIRIS,
  RESETALLSTATE,
  HideNotification,
  GetTransactionDetailsByCnic,
  GetDisputeStatusDC,
  GetDisputeStatusADC,
  SearchCreditCardDisputes,
  ResetCreditCardDisputeSuccess,
  SaveCreditCardDisputes,
  GetDisputeStatusCC,
  creditCardDisputeModal,
  GetCreditCardDisputesByCnic,
  resetCustomerDetailsCreditCard,
  GetIRISCustomerByCnicCC,
  GetCreditCardDisputesForEditByCnicAndRefrenceNumber,
  SaveAndApprovedCreditCardDisputes,
  UpdateCreditCardDisputeDetails,
  UpdateAndApproveCreditCardDisputeDetails,
  SaveDebitCardDisputes,
  SaveAndApprovedDebitCardDisputes,
  SearchDebitCardDisputes,
  resetCustomerDetailsDebitCard,
  debitCardDisputeModal,
  SearchCustomerByCnic,
  GetAllAccountsByCnic,
  GetIRISTransactionDetailsByTransactionId,
  SearchTransactionDetailsByAccountNumber,
  SearchDebitCardDisputesByCnicAndReferenceNumber,
  GetDebitCardDisputesForEditByCnicAndRefrenceNumber,
  GetTransactionDetailsByCnicDC,
  UpdateDebitCardDisputeDetails,
  UpdateAndApproveDebitCardDisputeDetails,
  GetTransactionDetailsByAccountNumber,
  //==BBKONNECT==\\
  GetTransactionDetailsByMobileNumberBBK,
  GetAllAccountsByCnicBBK,
  GetAllAccountsByMobileNumberBBK,
  GetTransactionDetailsByCnicBBK,
  SearchTransactionDetailsByAccountNumberInIRISBBK,
  GetIRISTransactionDetailsByTransactionIdBBK,
  SaveBBKDisputes,
  SaveAndApprovedBBKDisputes,
  SearchBBKDisputes,
  resetBBKSearchFilter,
  SearchBBKDisputesByCnicAndReferenceNumber,
  GetBBKDisputesForEditByCnicAndReferenceNumber,
  UpdateBBKDisputeDetails,
  UpdateAndApproveBBKDisputeDetails,
  GetTransactionDetailsByAccountNumberBBK,
  GetDisputeStatusBBK,
  SearchTransactionDetailsByMobileNumberInIRISBBK,
  //==NONAPI==\\
  // GetAllAccountsByCnicNONAPI,
  // GetTransactionDetailsByCnicNONAPI,
  // SearchTransactionDetailsByAccountNumberInIRISNONAPI,
  // GetIRISTransactionDetailsByTransactionIdNONAPI,
  // SaveNONAPIDisputes,
  // SaveAndApprovedNONAPIDisputes,
  // SearchNONAPIDisputes,
  // resetNONAPISearchFilter,
  // SearchNONAPIDisputesByCnicAndReferenceNumber,
  // GetNONAPIDisputesForEditByCnicAndReferenceNumber,
  // UpdateNONAPIDisputeDetails,
  // UpdateAndApproveNONAPIDisputeDetails,
  // GetTransactionDetailsByAccountNumberNONAPI,
  // modal handler for iris fail
  setIRISFailmodal,
  resetGlobalDisputeTable,
  SearchGlobalDisputes,
  customerFoundModal,
  customerNotFoundModal,
  accountNumberFoundModal,
  accountNumberNotFoundModal,
  mobileNumberFoundModal,
  mobileNumberNotFoundModal,
  GetDisputeStatusGlobal,
  GetDisputeStatusSAPendingForDeletion,
  //NON API EXPORTS
  GetTransactionDetailsByCnicNONAPI,
  GetAllAccountsByCnicNonAPI,
  SearchTransactionDetailsByAccountNumberInIRISNONAPI,
  GetTransactionDetailsByAccountNumberNonApi,
  GetIRISTransactionDetailsByTransactionIdNonApi,
  SaveNonApiDisputes,
  SaveAndApproveNonApiDisputes,
  SearchNonApiDisputes,
  resetCustomerDetailsNonApi,
  SearchNonApiDisputesByCnicAndReferenceNumber,
  GetNonApiDisputesForEditByCnicAndReferenceNumber,
  UpdateNonApiDisputeDetails,
  UpdateAndApproveNonApiDisputeDetails,
  GetDisputeStatusNONAPI,
  // MODALS
  setDisputemodal,
  // NEGATIVE DATABASE
  GetDisputesByCnicNDB,
  GetTransactionDetailsByCnicNDB,
  negativeDatabaseModal,
  SaveDisputeNegativeDB,
  SearchNDBDisputes,
  GetNegativeDBViewByCnic,
  EditDisputeNegativeDB,
  GetDisputeStatusND,
  resetNegativeDatabase,
  // loader false
  LOADERFALSE,
  GetTransactionDetailsByAccountAndCnicDC,
};
