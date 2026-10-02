import * as actions from "../action_types";

const initialState = {
  completeReport: [],
  creditPoliocyReport: [],
  balanceSheetReport: [],
  isLoading: null,
  isSuccess: null,
  isFail: null,
  errorMessage: null,
  isRecordFound: false,
  uploadDocumentsList: [],
  recordMessage: "",
};

const reportsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.COMPLETE_REPORT_INIT:
      return { ...state, isLoading: true };
    case actions.COMPLETE_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isFail: false,
        completeReport: action.response.responseResult.allIndividualCases,
        isRecordFound: action.response.responseResult.recordFound,
        recordMessage: action.response.responseResult.recordMessage,
      };
    case actions.COMPLETE_REPORT_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isFail: true,
        completeReport: action.response.responseResult,
        isRecordFound: action.response.responseResult.recordFound,
        recordMessage: action.response.responseResult.recordMessagessage,
      };
    case actions.CREDIT_POLICY_REPORT_INIT:
      return {
        ...state,
        isLoading: true,
      };
    case actions.CREDIT_POLICY_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isFail: false,
        creditPoliocyReport: action.response.responseResult.companyWiseCases,
        isRecordFound: action.response.responseResult.recordFound,
        recordMessage: action.response.responseResult.recordMessagessage,
      };
    case actions.CREDIT_POLICY_REPORT_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isFail: true,
        isRecordFound: action.response.responseResult.recordFound,
        recordMessage: action.response.responseResult.recordMessagessage,
      };
    case actions.BALANCE_SHEET_REPORT_INIT:
      return { ...state, isLoading: true };
    case actions.BALANCE_SHEET_REPORT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        isFail: false,
        balanceSheetReport: action.response.responseResult.balanceSheetRecords,
        isRecordFound: action.response.responseResult.recordFound,
        recordMessage: action.response.responseResult.recordMessage,
      };
    case actions.BALANCE_SHEET_REPORT_FAIL:
      return {
        ...state,
        isLoading: false,
        isSuccess: false,
        isFail: true,
        balanceSheetReport: action.response,
      };
    case actions.UPLOAD_DOCUMNET_FILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
        uploadDocumentsList: action.response,
        isRecordFound: action.isExecuted,
        recordMessage: action.response.responseMessage,
      };
    case actions.RESET_ALL_STATE_REPORTS:
      return {
        ...state,
        isLoading: null,
        isSuccess: null,
        isFail: null,
        errorMessage: null,
        isRecordFound: false,
        uploadDocumentsList: [],
        recordMessage: "",
      };
    case actions.RESET_UPLOAD_FILES:
      return { ...state, uploadDocumentsList: action.response };
    case actions.DOWNLOAD_EXCEL_FILE_FAIL_INIT:
      return { ...state, isLoading: false };
    case actions.DOWNLOAD_EXCEL_FILE_INIT:
      return { ...state, isLoading: true };
    case actions.LOADER_REPORT:
      return { ...state, isLoading: false };
    default:
      return { ...state };
  }
};

export default reportsReducer;
