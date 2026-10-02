import * as actions from "../action_types";

const initialState = {
  AccountNumberFound: false,
  dispuetModal: false,
  Loading: false,
  Message: "",
  ResponseMessage: "",
  Success: false,
  Fail: false,
  ShowNotification: false,
  UploadList: [],
  routingData: [],
  GetApprovalStatusBBKData: [],
  GetTransactionDetailsByCNICData: [],
  GetCreditCardDisputesData: [],
  SearchCreditCardDisputeData: [],
  GetApprovalStatusCCData: [],
  GetTransactionDetailsByCnicData: [],
  CCDModal: false,
  GetCreditCardDisputesForEditByCnicAndRefrenceNumberData: [],
  GetIRISCustomerByCNICData: [],
  UpdateCreditCardDisputeData: [],
  UpdateAndApproveCreditCardDisputeData: [],
  SearchDebitCardDisputesData: [],
  GetApprovalStatusDCData: [],
  DCDModal: false,
  CustomerNotFoundModal: false,
  CustomerFoundModal: false,
  AccountNumberFoundModal: false,
  AccountNumberNotFoundModal: false,
  MobileNumberFoundModal: false,
  MobileNumberNotFoundModal: false,
  SearchCustomerData: [],
  AccountsData: [],
  GetTransactionDetailsByCnicDCexsitData: [],
  GetDebitCardDisputesData: [],
  GetDebitCardDisputesForEditByCnicAndRefrenceNumberData: [],
  UpdateDebitCardDisputeData: [],
  UpdateAndApproveDebitCardDisputeData: [],
  GetTransactionDetailsByAccountData: [],
  GetApprovalStatusADCData: [],
  SearchADCDisputesData: [],
  GetADCDisputesForEditData: [],
  //BB KONNECT\\
  AccountsDataBBK: [],
  GetTransactionDetailsByCnicBBKexsitData: [],
  GetTransactionDetailsByAccountNumberBBKexsitData: [],
  SearchBBKDisputeData: [],
  GetBBKDisputesData: [],
  GetBBKDisputesForEditByCnicAndRefrenceNumberData: [],
  UpdateBBKDisputeData: [],
  UpdateAndApproveBBKDisputeData: [],
  GetTransactionDetailsByAccountBBKData: [],
  GetTransactionDetailsByMobileBBKData: [],
  GetTransactionDetailsByMobileNumberBBKexistData: [],
  //NONAPI DISPUTES\\
  GetTransactionDetailsByCnicNONAPIexistData: [],
  GetTransactionDetailsByAccountNumberNONAPIexistData: [],
  AccountsDataNONAPI: [],
  SearchNonApiDisputesData: [],
  GetNonApiDisputesData: [],
  GetNonApiDisputesForEditByCnicAndRefrenceNumberData: [],
  UpdateNonApiDisputeData: [],
  UpdateAndApproveNonApiDisputeData: [],
  GetApprovalStatusNONAPIData: [],
  // AccountsDataNONAPI: [],
  // GetTransactionDetailsByCnicNONAPIexsitData: [],
  // GetTransactionDetailsByAccountNumberNONAPIexsitData: [],
  // SearchNONAPIDisputeData: [],
  // GetNONAPIDisputesData: [],
  // GetNONAPIDisputesForEditByCnicAndRefrenceNumberData: [],
  // UpdateNONAPIDisputeData: [],
  // UpdateAndApproveNONAPIDisputeData: [],
  // GetTransactionDetailsByAccountNONAPIData: [],
  setIRISModal: false,
  GlobalDisputeData: [],
  GetApprovalStatusSAPendingForDeletionData: [],
  GetApprovalStatusGlobalData: [],
  GetApprovalStatusNDData: [],
  SearchNDDisputeData: [],
  AccountsDataForMobileBBK: [],
};

const InvestigationOfficerReducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_INVESTIGATION_OFFICER_INIT:
      return { ...state, Loading: true };

    case actions.GET_INVESTIGATION_OFFICER_FAIL:
      return {
        ...state,
        Loading: false,
        Fail: true,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response.responseResult.responseMessage,
      };
    // FOR IRIS FAIL MODAL HANDLER
    case actions.GET_LOADER_FALSE:
      return { ...state, Loading: false };

    case actions.HIDE:
      return {
        ...state,
        ResponseMessage: "",
        Message: "",
        ShowNotification: false,
      };
    //
    case actions.SET_MODAL_HANDLER_FAIL:
      return { ...state, ShowNotification: false };
    // FOR DISPUTE MODAL
    case actions.SET_MODAL_FOR_DISPUTE:
      return { ...state, dispuetModal: action.response };

    case actions.SHOW:
      return { ...state, ShowNotification: true, Message: action.message };

    case actions.UPLOAD_LIST:
      return { ...state, UploadList: action.response };

    case actions.ROUTING_DATA:
      return {
        ...state,
        routingData: action,
      };

    case actions.GET_TRANSACTIONDETAILSBYCNIC_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_TRANSACTIONDETAILSBYCNIC_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetTransactionDetailsByCNICData: action.response,
      };

    case actions.GET_TRANSACTIONDETAILSBYCNIC_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetTransactionDetailsByCNICData: action.response.transactionDetails,
      };

    case actions.GET_CREDITCARDDISPUTE_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_CREDITCARDDISPUTE_UNIT_SUCCESS:
      let GetCreditCardDisputesArray = action.response.creditCardDisputes.map(
        (item, index) => {
          var i = index;
          i = index + 1;
          return { ...item, key: i + "" };
        }
      );
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetCreditCardDisputesData: GetCreditCardDisputesArray,
      };

    case actions.GET_CREDITCARDDISPUTE_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetCreditCardDisputesData: action.response.creditCardDisputes,
      };

    case actions.SEARCH_CREDITCARDDISPUTE_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.SEARCH_CREDITCARDDISPUTE_UNIT_SUCCESS:
      let SearchCreditCardDisputeArray = action.response.creditCardDisputes.map(
        (item, index) => {
          var i = index;
          i = index + 1;
          return { ...item, key: i + "" };
        }
      );
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        SearchCreditCardDisputeData: SearchCreditCardDisputeArray,
      };

    case actions.SEARCH_CREDITCARDDISPUTE_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        SearchCreditCardDisputeData: action.response.creditCardDisputes,
      };

    case actions.GET_TRANSACTIONDETAILSBYCNICCC_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_TRANSACTIONDETAILSBYCNICCC_UNIT_SUCCESS:
      let GetTransactionDetailsByCNICCCArray =
        action.response.customerDetails.map((item, index) => {
          var i = index;
          i = index + 1;
          return { ...item, key: i + "" };
        });
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetTransactionDetailsByCnicData: GetTransactionDetailsByCNICCCArray,
      };

    case actions.GET_TRANSACTIONDETAILSBYCNICCC_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetTransactionDetailsByCnicData: action.response.customerDetails,
      };

    case actions.SET_MODAL_FOR_CREDITCARD_DISPUTE:
      return { ...state, CCDModal: action.response };

    case actions.GET_CREDITCARDDISPUTE_BY_CNIC_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_CREDITCARDDISPUTE_BY_CNIC_UNIT_SUCCESS:
      return {
        ...state,
        SearchCreditCardDisputeData: [],
        GetCreditCardDisputesData: action.response,
        ResponseMessage: action.response.responseMessage,
        Loading: false,
      };

    case actions.GET_CREDITCARDDISPUTE_BY_CNIC_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetCreditCardDisputesData: action.response,
      };

    case actions.RESET_CREDITCARD_DISPUTE:
      localStorage.removeItem("inProgressOnly");
      return {
        ...state,
        Loading: false,
        Message: "",
        ResponseMessage: "",
        Success: false,
        Fail: false,
        ShowNotification: false,
        UploadList: [],
        routingData: [],
        GetTransactionDetailsByCNICData: [],
        GetCreditCardDisputesData: [],
        SearchCreditCardDisputeData: [],
        GetTransactionDetailsByCnicData: [],
        CCDModal: false,
        GetCreditCardDisputesForEditByCnicAndRefrenceNumberData: [],
        UpdateCreditCardDisputeData: [],
        UpdateAndApproveCreditCardDisputeData: [],
        SearchDebitCardDisputesData: [],
        DCDModal: false,
        CustomerNotFoundModal: false,
        CustomerFoundModal: false,
        AccountNumberFoundModal: false,
        AccountNumberNotFoundModal: false,
        MobileNumberFoundModal: false,
        MobileNumberNotFoundModal: false,
        SearchCustomerData: [],
        AccountsData: [],
        GetTransactionDetailsByCnicDCexsitData: [],
        GetDebitCardDisputesData: [],
        GetDebitCardDisputesForEditByCnicAndRefrenceNumberData: [],
        UpdateDebitCardDisputeData: [],
        UpdateAndApproveDebitCardDisputeData: [],
        GetTransactionDetailsByAccountData: [],
        SearchADCDisputesData: [],
        GetADCDisputesForEditData: [],
        GetADCDisputesForViewData: [],
        SearchBBKDisputeData: [],
      };

    case actions.RESET_DEBITCARD_DISPUTE:
      localStorage.removeItem("inProgressOnly");
      return {
        ...state,
        Loading: false,
        ResponseMessage: "",
        SearchDebitCardDisputesData: [],
      };

    case actions.GET_CREDITCARDDISPUTESFOREDITBYCNICANDREFERENCENUMBER_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_CREDITCARDDISPUTESFOREDITBYCNICANDREFERENCENUMBER_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetCreditCardDisputesForEditByCnicAndRefrenceNumberData:
          action.response,
      };

    case actions.GET_CREDITCARDDISPUTESFOREDITBYCNICANDREFERENCENUMBER_UNIT_FAIL:
      return {};

    case actions.GET_IRISTRANSACTIONDETAILSBYCNICCC_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetIRISCustomerByCNICData: action.response,
        ShowNotification: true,
      };

    case actions.GET_IRISTRANSACTIONDETAILSBYCNICCC_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        Message:
          action.response.responseResult.responseMessage !== undefined &&
          action.response.responseResult.responseMessage !== null
            ? action.response.responseResult.responseMessage
            : action.response.responseMessage,
        ShowNotification: true,
      };

    case actions.UPDATE_CREDITCARDDISPUTE_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.UPDATE_CREDITCARDDISPUTE_UNIT_SUCCESS:
      return {
        ...state,
        UpdateCreditCardDisputeData: action.response,
        ResponseMessage: action.response.responseMessage,
      };

    case actions.UPDATE_CREDITCARDDISPUTE_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        UpdateCreditCardDisputeData: action.response,
      };

    case actions.UPDATEANDAPPROVE_CREDITCARDDISPUTE_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.UPDATEANDAPPROVE_CREDITCARDDISPUTE_UNIT_SUCCESS:
      return {
        ...state,
        UpdateAndApproveCreditCardDisputeData: action.response,
        ResponseMessage: action.response.responseMessage,
      };

    case actions.UPDATEANDAPPROVE_CREDITCARDDISPUTE_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        UpdateAndApproveCreditCardDisputeData: action.response,
      };

    case actions.GET_DISPUTESTATUSCC_UNIT_SUCCESS:
      let newarray = [...action.response.disputeStatus];
      let newData = newarray.map((item, index) => ({
        ...item,
        key: index,
      }));
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetApprovalStatusCCData: newData,
        ShowNotification: true,
      };

    case actions.GET_DISPUTESTATUSCC_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response.responseMessage,
        GetApprovalStatusCCData: [],
        ShowNotification: true,
      };

    case actions.GET_DISPUTESTATUSDC_UNIT_SUCCESS:
      let newarrayDC = [...action.response.disputeStatus];
      let newDataDC = newarrayDC.map((item, index) => ({
        ...item,
        key: index,
      }));
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetApprovalStatusDCData: newDataDC,
        ShowNotification: true,
      };

    case actions.GET_DISPUTESTATUSDC_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response.responseMessage,
        GetApprovalStatusDCData: [],
        ShowNotification: true,
      };

    case actions.GET_DISPUTESTATUSADC_UNIT_SUCCESS:
      let newarrayADC = [...action.response.disputeStatus];
      let newDataADC = newarrayADC.map((item, index) => ({
        ...item,
        key: index,
      }));
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetApprovalStatusADCData: newDataADC,
        ShowNotification: true,
      };

    case actions.GET_DISPUTESTATUSADC_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response.responseMessage,
        GetApprovalStatusADCData: [],
        ShowNotification: true,
      };

    //Debit Card Reducers
    case actions.GET_ACCOUNTS_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_ACCOUNTS_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        AccountsData: action.response.accountNumbers,
      };

    case actions.GET_ACCOUNTS_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response,
      };

    case actions.SEARCH_DEBITCARDDISPUTE_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.SEARCH_DEBITCARDDISPUTE_UNIT_SUCCESS:
      let SearchDebitCardDisputeArray = action.response.debitCardDisputes.map(
        (item, index) => {
          var i = index;
          i = index + 1;
          return { ...item, key: i + "" };
        }
      );
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        SearchDebitCardDisputesData: SearchDebitCardDisputeArray,
      };

    case actions.SEARCH_DEBITCARDDISPUTE_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        SearchDebitCardDisputesData: action.response.debitCardDisputes,
      };

    case actions.SET_MODAL_FOR_DEBITCARD_DISPUTE:
      return { ...state, DCDModal: action.response };

    case actions.SET_MODAL_FOR_CUSTOMERFOUNDMODAL_DISPUTE:
      return { ...state, CustomerFoundModal: action.response };

    case actions.SET_MODAL_FOR_CUSTOMERNOTFOUNDMODAL_DISPUTE:
      return { ...state, CustomerNotFoundModal: action.response };

    case actions.SET_MODAL_FOR_ACCOUNTNUMBERFOUNDMODAL_DISPUTE:
      return { ...state, AccountNumberFoundModal: action.response };

    case actions.SET_MODAL_FOR_ACCOUNTNUMBERNOTFOUNDMODAL_DISPUTE:
      return { ...state, AccountNumberNotFoundModal: action.response };

    case actions.SET_MODAL_FOR_MOBILENUMBERFOUNDMODAL_DISPUTE:
      return { ...state, MobileNumberFoundModal: action.response };

    case actions.SET_MODAL_FOR_MOBILENUMBERNOTFOUNDMODAL_DISPUTE:
      return { ...state, MobileNumberNotFoundModal: action.response };

    case actions.GET_TRANSACTIONDETAILSBYCNICADC_INIT:
      return { ...state, Loading: true };

    case actions.GET_TRANSACTIONDETAILSBYCNICDEBIT_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetTransactionDetailsByCnicDCexsitData: action.response,
        ShowNotification: true,
      };

    case actions.GET_TRANSACTIONDETAILSBYCNICDEBIT_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        Message:
          action.response.responseResult.responseMessage !== undefined &&
          action.response.responseResult.responseMessage !== null
            ? action.response.responseResult.responseMessage
            : action.response.responseMessage,
        ShowNotification: true,
      };

    case actions.GET_TRANSACTIONDETAILSBYACCOUNTNUMBERDEBITIRIS_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetTransactionDetailsByCnicDCexsitData: action.response,
        ShowNotification: true,
      };

    case actions.GET_TRANSACTIONDETAILSBYACCOUNTNUMBERDEBITIRIS_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        AccountNumberFound: true,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response,
        ShowNotification: true,
      };

    case actions.GET_CUSTOMERBYCNIC_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_CUSTOMERBYCNIC_UNIT_SUCCESS:
      let SearchCustomerByCnicArray = action.response.customer;
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        SearchCustomerData: SearchCustomerByCnicArray,
      };

    case actions.GET_CUSTOMERBYCNIC_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
      };

    case actions.GET_DEBITCARDDISPUTE_BY_CNIC_INIT:
      return { ...state, Loading: true };

    case actions.GET_DEBITCARDDISPUTE_BY_CNIC_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetDebitCardDisputesData: action.response,
      };

    case actions.GET_DEBITCARDDISPUTE_BY_CNIC_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ShowNotification: false,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response,
        GetDebitCardDisputesData: [],
      };

    case actions.GET_DEBITCARDDISPUTESFOREDITBYCNICANDREFERENCENUMBER_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        SearchDebitCardDisputesData: [],
        ResponseMessage: action.response.responseMessage,
        GetDebitCardDisputesForEditByCnicAndRefrenceNumberData: action.response,
      };

    case actions.GET_DEBITCARDDISPUTESFOREDITBYCNICANDREFERENCENUMBER_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response,
        GetCreditCardDisputesForEditByCnicAndRefrenceNumberData: [],
      };

    case actions.UPDATE_DEBITCARDDISPUTE_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.UPDATE_DEBITCARDDISPUTE_UNIT_SUCCESS:
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        UpdateDebitCardDisputeData: action.response,
      };

    case actions.UPDATE_ADCDISPUTE_UNIT_SUCCESS:
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        UpdateDebitCardDisputeData: action.response,
      };

    case actions.UPDATEANDAPPROVE_ADCDISPUTE_UNIT_SUCCESS:
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        UpdateDebitCardDisputeData: action.response,
      };

    case actions.UPDATE_DEBITCARDDISPUTE_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response,
        UpdateDebitCardDisputeData: action.response,
      };

    case actions.UPDATEANDAPPROVE_DEBITCARDDISPUTE_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.UPDATEANDAPPROVE_DEBITCARDDISPUTE_UNIT_SUCCESS:
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        UpdateAndApproveDebitCardDisputeData: action.response,
      };

    case actions.UPDATEANDAPPROVE_DEBITCARDDISPUTE_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response,
        UpdateAndApproveDebitCardDisputeData: action.response,
      };

    case actions.GET_TRANSACTIONDETAILSBYACCOUNTNUMBERDEBIT_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetTransactionDetailsByAccountData: action.response,
        ShowNotification: true,
      };

    case actions.GET_TRANSACTIONDETAILSBYACCOUNTNUMBERDEBIT_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response,
        ShowNotification: true,
      };

    case actions.RESET_ALL_STATE:
      localStorage.removeItem("InProgressOnly");
      return {
        ...state,
        Loading: false,
        Message: "",
        ResponseMessage: "",
        Success: false,
        Fail: false,
        ShowNotification: false,
        UploadList: [],
        routingData: [],
        GetTransactionDetailsByCNICData: [],
        GetCreditCardDisputesData: [],
        SearchCreditCardDisputeData: [],
        GetTransactionDetailsByCnicData: [],
        CCDModal: false,
        GetCreditCardDisputesForEditByCnicAndRefrenceNumberData: [],
        UpdateCreditCardDisputeData: [],
        UpdateAndApproveCreditCardDisputeData: [],
        SearchDebitCardDisputesData: [],
        DCDModal: false,
        CustomerFoundModal: false,
        CustomerNotFoundModal: false,
        AccountNumberFoundModal: false,
        AccountNumberNotFoundModal: false,
        MobileNumberFoundModal: false,
        MobileNumberNotFoundModal: false,
        SearchCustomerData: [],
        AccountsData: [],
        GetTransactionDetailsByCnicDCexsitData: [],
        GetDebitCardDisputesData: [],
        GetDebitCardDisputesForEditByCnicAndRefrenceNumberData: [],
        UpdateDebitCardDisputeData: [],
        UpdateAndApproveDebitCardDisputeData: [],
        GetTransactionDetailsByAccountData: [],
        SearchADCDisputesData: [],
        GetADCDisputesForEditData: [],
        GetADCDisputesForViewData: [],
        AccountsDataBBK: [],
        GetTransactionDetailsByCnicBBKexsitData: [],
        GetTransactionDetailsByAccountNumberBBKexsitData: [],
        SearchBBKDisputeData: [],
        GetBBKDisputesData: [],
        GetBBKDisputesForEditByCnicAndRefrenceNumberData: [],
        UpdateBBKDisputeData: [],
        UpdateAndApproveBBKDisputeData: [],
        GetTransactionDetailsByAccountBBKData: [],
        GetTransactionDetailsByMobileBBKData: [],
        GetApprovalStatusBBKData: [],
        GetTransactionDetailsByCnicNONAPIexistData: [],
        AccountsDataForMobileBBK: [],
        AccountsDataNONAPI: [],
        SearchNonApiDisputesData: [],
        GetNonApiDisputesData: [],
        GetNonApiDisputesForEditByCnicAndRefrenceNumberData: [],
        UpdateNonApiDisputeData: [],
        UpdateAndApproveNonApiDisputeData: [],
        GetApprovalStatusNONAPIData: [],
        GetApprovalStatusNDData: [],
        SearchNDDisputeData: [],
      };

    case actions.SEARCH_ADCDISPUTE_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response,
        SearchADCDisputesData: action.response.adcDisputes,
      };

    case actions.RESET_ADC_DISPUTE:
      localStorage.removeItem("inProgressOnly");
      return {
        ...state,
        Loading: false,
        ResponseMessage: "",
        SearchADCDisputesData: [],
      };

    case actions.GET_ADCDISPUTESFOREDITBYCNICANDREFERENCENUMBER_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetADCDisputesForEditData: action.response,
        SearchADCDisputesData: [],
        GetADCDisputesForViewData: [],
      };

    case actions.GET_TRANSACTIONDETAILSBYCNICADC_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetTransactionDetailsByCnicDCexsitData: action.response,
        ShowNotification: true,
      };

    case actions.GET_TRANSACTIONDETAILSBYCNICADC_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        Message:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response,
        ShowNotification: true,
      };

    case actions.GET_ACCOUNTS_ADC_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        AccountsData: action.response.accountNumbers,
      };

    case actions.GET_ACCOUNTS_ADC_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response,
      };

    case actions.SEARCH_ADCDISPUTE_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.SEARCH_ADCDISPUTE_UNIT_SUCCESS:
      let SearchADCDisputesArray = action.response.adcDisputes.map(
        (item, index) => {
          var i = index;
          i = index + 1;
          return { ...item, key: i + "" };
        }
      );
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        SearchADCDisputesData: SearchADCDisputesArray,
        GetADCDisputesForEditData: [],
        GetADCDisputesForViewData: [],
      };

    case actions.GET_ADCDISPUTE_BY_CNIC_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_ADCDISPUTE_BY_CNIC_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetADCDisputesForViewData: action.response,
        SearchADCDisputesData: [],
        GetADCDisputesForEditData: [],
      };

    case actions.GET_ADCDISPUTE_BY_CNIC_UNIT_FAIL:
      return {
        ...state,
        GetADCDisputesForEditData: [],
        GetADCDisputesForViewData: [],
        Loading: false,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response,
      };

    case actions.GET_ADCDISPUTESFOREDITBYCNICANDREFERENCENUMBER_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_ADCDISPUTESFOREDITBYCNICANDREFERENCENUMBER_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response,
        GetADCDisputesForEditData: [],
      };
    case actions.GET_TRANSACTIONDETAILSBYACCOUNTNUMBERADC_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetTransactionDetailsByAccountADCData: action.response,
        ShowNotification: true,
      };

    case actions.GET_TRANSACTIONDETAILSBYACCOUNTNUMBERADC_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        AccountNumberFound: true,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response,
        ShowNotification: true,
      };

    //==BBKONNECT==\\

    //For Transaction Details By Cnic
    case actions.GET_TRANSACTIONDETAILSBYCNICBBK_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_TRANSACTIONDETAILSBYCNICBBK_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetTransactionDetailsByCnicBBKexsitData: action.response,
        ShowNotification: true,
      };

    case actions.GET_TRANSACTIONDETAILSBYCNICBBK_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        Message:
          action.response.responseResult.responseMessage !== undefined &&
          action.response.responseResult.responseMessage !== null
            ? action.response.responseMessage
            : action.response,
        ShowNotification: true,
      };

    //For All Accounts
    case actions.GET_ACCOUNTSBBK_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_ACCOUNTSBBK_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        AccountsDataBBK: action.response.accountNumbers,
      };

    case actions.GET_ACCOUNTSBBK_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response,
      };

    case actions.GET_ACCOUNTSBYMOBILENUMBERBBK_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        AccountsDataForMobileBBK: action.response.accountNumbers,
      };

    case actions.GET_ACCOUNTSBYMOBILENUMBERBBK_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response,
      };

    //For Iris Transaction Detail By Account Number
    case actions.GET_IRISTRANSACTIONDETAILSBYACCOUNTNUMBERBBK_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_IRISTRANSACTIONDETAILSBYACCOUNTNUMBERBBK_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetTransactionDetailsByAccountNumberBBKexsitData: action.response,
        ShowNotification: true,
      };

    case actions.GET_IRISTRANSACTIONDETAILSBYACCOUNTNUMBERBBK_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        AccountNumberFound: true,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response,
        ShowNotification: true,
      };

    case actions.GET_IRISTRANSACTIONDETAILSBYMOBILENUMBERBBK_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetTransactionDetailsByMobileNumberBBKexistData: action.response,
        ShowNotification: true,
      };

    case actions.GET_IRISTRANSACTIONDETAILSBYMOBILENUMBERBBK_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        AccountNumberFound: true,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response,
        ShowNotification: true,
      };

    //Search BBK Reducers
    case actions.SEARCH_BBKDISPUTE_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.SEARCH_BBKDISPUTE_UNIT_SUCCESS:
      let SearchBBKonnectDisputeArray = action.response.bbKonnectDisputes.map(
        (item, index) => {
          var i = index;
          i = index + 1;
          return { ...item, key: i + "" };
        }
      );
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        SearchBBKDisputeData: SearchBBKonnectDisputeArray,
      };

    case actions.SEARCH_BBKDISPUTE_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        SearchBBKDisputeData: action.response.bbKonnectDisputes,
        ShowNotification: true,
      };

    //Reset BBK Search
    case actions.RESET_BBK_DISPUTE:
      localStorage.removeItem("inProgressOnly");
      return {
        ...state,
        Loading: false,
        SearchBBKDisputeData: [],
        ShowNotification: false,
        ResponseMessage: "",
        Message: "",
      };

    case actions.GET_BBKDISPUTE_BY_CNIC_INIT:
      return { ...state, Loading: true };

    case actions.GET_BBKDISPUTE_BY_CNIC_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetBBKDisputesData: action.response,
      };

    case actions.GET_BBKDISPUTE_BY_CNIC_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ShowNotification: false,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response,
        GetBBKDisputesData: [],
      };

    case actions.GET_BBKDISPUTESFOREDITBYCNICANDREFERENCENUMBER_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_BBKDISPUTESFOREDITBYCNICANDREFERENCENUMBER_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetBBKDisputesForEditByCnicAndRefrenceNumberData: action.response,
      };

    case actions.GET_BBKDISPUTESFOREDITBYCNICANDREFERENCENUMBER_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response,
        GetBBKDisputesForEditByCnicAndRefrenceNumberData: [],
      };

    case actions.UPDATE_BBKDISPUTE_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        UpdateBBKDisputeData: action.response,
      };

    case actions.UPDATE_BBKDISPUTE_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response,
        UpdateBBKDisputeData: action.response,
      };

    case actions.UPDATEANDAPPROVE_BBKDISPUTE_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        UpdateAndApproveBBKDisputeData: action.response,
      };

    case actions.UPDATEANDAPPROVE_BBKDISPUTE_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response,
        UpdateAndApproveBBKDisputeData: action.response,
      };

    case actions.GET_TRANSACTIONDETAILSBYACCOUNTNUMBERBBK_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetTransactionDetailsByAccountBBKData: action.response,
        ShowNotification: true,
      };

    case actions.GET_TRANSACTIONDETAILSBYACCOUNTNUMBERBBK_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response,
        ShowNotification: true,
      };

    case actions.GET_TRANSACTIONDETAILSBYMOBILENUMBERBBK_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetTransactionDetailsByMobileBBKData: action.response,
        ShowNotification: true,
      };

    case actions.GET_TRANSACTIONDETAILSBYMOBILENUMBERBBK_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response,
        ShowNotification: true,
      };

    case actions.GET_DISPUTESTATUSBBK_UNIT_SUCCESS:
      let newarrayBBK = [...action.response.disputeStatus];
      let newDataBBK = newarrayBBK.map((item, index) => ({
        ...item,
        key: index,
      }));
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetApprovalStatusBBKData: newDataBBK,
        ShowNotification: true,
      };

    case actions.GET_DISPUTESTATUSBBK_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response.responseMessage,
        GetApprovalStatusBBKData: [],
        ShowNotification: true,
      };

    case actions.SEARCH_GLOBALDISPUTES_UNIT_SUCCESS:
      let GlobalDisputeArray = action.response.disputes.map((item, index) => {
        var i = index;
        i = index + 1;
        return { ...item, key: i + "" };
      });
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GlobalDisputeData: GlobalDisputeArray,
      };

    case actions.SEARCH_GLOBALDISPUTES_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GlobalDisputeData: action.response.disputes,
      };

    case actions.RESET_GLOBALDISPUTE_TABLE:
      localStorage.removeItem("inProgressOnly");
      return {
        ...state,
        Loading: false,
        ResponseMessage: "",
        GlobalDisputeData: [],
      };

    case actions.GET_DISPUTESTATUSGLOBAL_UNIT_SUCCESS:
      let newarrayGlobal = [...action.response.disputeStatus];
      let newDataGlobal = newarrayGlobal.map((item, index) => ({
        ...item,
        key: index,
      }));
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetApprovalStatusGlobalData: newDataGlobal,
        ShowNotification: true,
      };

    case actions.GET_DISPUTESTATUSGLOBAL_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response.responseMessage,
        GetApprovalStatusGlobalData: [],
        ShowNotification: true,
      };

    case actions.GET_DISPUTESTATUSSAPENDINGFORDELETION_UNIT_SUCCESS:
      let newarraySAPendingForDeletion = [...action.response.disputeStatus];
      let newDataSAPendingForDeletion = newarraySAPendingForDeletion.map(
        (item, index) => ({
          ...item,
          key: index,
        })
      );
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetApprovalStatusSAPendingForDeletionData: newDataSAPendingForDeletion,
        ShowNotification: true,
      };

    case actions.GET_DISPUTESTATUSSAPENDINGFORDELETION_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response.responseMessage,
        GetApprovalStatusSAPendingForDeletionData: [],
        ShowNotification: true,
      };

    // ====> NON API <==== \\
    case actions.GET_TRANSACTIONDETAILSBYCNICNONAPI_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetTransactionDetailsByCnicNONAPIexistData: action.response,
        ShowNotification: true,
      };

    case actions.GET_TRANSACTIONDETAILSBYCNICNONAPI_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        Message:
          action.response.responseResult.responseMessage !== undefined &&
          action.response.responseResult.responseMessage !== null
            ? action.response.responseResult.responseMessage
            : action.response.responseMessage,
        ShowNotification: true,
      };

    case actions.GET_ACCOUNTSNONAPI_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_ACCOUNTSNONAPI_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        AccountsDataNONAPI: action.response.accountNumbers,
      };

    case actions.GET_ACCOUNTSNONAPI_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response,
      };

    case actions.GET_TRANSACTIONDETAILSBYACCOUNTNUMBERNONAPIIRIS_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetTransactionDetailsByCnicNONAPIexistData: action.response,
        ShowNotification: true,
      };

    case actions.GET_TRANSACTIONDETAILSBYACCOUNTNUMBERNONAPIIRIS_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        AccountNumberFound: true,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response,
        ShowNotification: true,
      };

    case actions.RESET_NONAPI_DISPUTE:
      localStorage.removeItem("inProgressOnly");
      return {
        ...state,
        Loading: false,
        ResponseMessage: "",
        SearchNonApiDisputesData: [],
      };

    case actions.SEARCH_NONAPIDISPUTE_UNIT_SUCCESS:
      let SearchNonApiDisputeArray = action.response.npiDisputes.map(
        (item, index) => {
          var i = index;
          i = index + 1;
          return { ...item, key: i + "" };
        }
      );
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        SearchNonApiDisputesData: SearchNonApiDisputeArray,
      };

    case actions.SEARCH_NONAPIDISPUTE_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        SearchNonApiDisputesData: action.response.npiDisputes,
      };

    case actions.GET_NONAPIDISPUTE_BY_CNIC_INIT:
      return { ...state, Loading: true };

    case actions.GET_NONAPIDISPUTE_BY_CNIC_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetNonApiDisputesData: action.response,
      };

    case actions.GET_NONAPIDISPUTE_BY_CNIC_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ShowNotification: false,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response,
        GetNonApiDisputesData: [],
      };

    case actions.GET_NONAPIDISPUTESFOREDITBYCNICANDREFERENCENUMBER_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_NONAPIDISPUTESFOREDITBYCNICANDREFERENCENUMBER_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetNonApiDisputesForEditByCnicAndRefrenceNumberData: action.response,
      };

    case actions.GET_NONAPIDISPUTESFOREDITBYCNICANDREFERENCENUMBER_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response,
        GetNonApiDisputesForEditByCnicAndRefrenceNumberData: [],
      };

    case actions.UPDATE_NONAPIDISPUTE_UNIT_SUCCESS:
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        UpdateNonApiDisputeData: action.response,
      };

    case actions.UPDATEANDAPPROVE_NONAPIDISPUTE_UNIT_SUCCESS:
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        UpdateAndApproveNonApiDisputeData: action.response,
      };

    case actions.GET_DISPUTESTATUSNONAPI_UNIT_SUCCESS:
      let newarrayNONAPI = [...action.response.disputeStatus];
      let newDataNONAPI = newarrayNONAPI.map((item, index) => ({
        ...item,
        key: index,
      }));
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetApprovalStatusNONAPIData: newDataNONAPI,
        ShowNotification: true,
      };

    case actions.GET_DISPUTESTATUSNONAPI_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response.responseMessage,
        GetApprovalStatusNONAPIData: [],
        ShowNotification: true,
      };

    // search negative data base
    case actions.SEARCH_NDB_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response,
        ShowNotifiation: true,
      };

    case actions.SEARCH_NDB_UNIT_SUCCESS:
      let SearchNDBDisputeArray = action.response.negativeDispute.map(
        (item, index) => {
          var i = index;
          i = index + 1;
          return { ...item, key: i + "" };
        }
      );
      return {
        ...state,
        SearchNDDisputeData: SearchNDBDisputeArray,
        ResponseMessage: action.response.responseMessage,
        Loading: false,
        ShowNotifiation: true,
      };
    case actions.SEARCH_NDBISPUTE_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        SearchNDDisputeData: [],
        ShowNotification: true,
      };

    case actions.GET_DISPUTESTATUSND_UNIT_SUCCESS:
      let newarrayND = [...action.response.disputeStatus];
      let newDataND = newarrayND.map((item, index) => ({
        ...item,
        key: index,
      }));
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        GetApprovalStatusNDData: newDataND,
        ShowNotification: true,
      };

    case actions.GET_DISPUTESTATUSND_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response.responseMessage,
        GetApprovalStatusNDData: [],
        ShowNotification: true,
      };

    case actions.RESET_NEGATIVEDATABASE_DISPUTE:
      return {
        ...state,
        Loading: false,
        ResponseMessage: "",
        SearchNDDisputeData: [],
      };

    default:
      return { ...state };
  }
};

export default InvestigationOfficerReducers;
