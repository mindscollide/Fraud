import * as actions from "../action_types";

const initialState = {
  Loading: false,
  Message: "",
  ResponseMessage: "",
  Success: false,
  Fail: false,
  ShowNotification: false,
  UploadList: [],
  routingData: [],
  PendingForApprovalData: [],
  SaveApprovalData: [],
  SaveRejectionData: [],
};

const IMManagerReducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_INVESTIGATION_MANAGER_INIT:
      return { ...state, Loading: true };

    case actions.GET_INVESTIGATION_MANAGER_FAIL:
      return { ...state, Loading: false, Fail: true };

    case actions.GET_LOADER_FALSE:
      return { ...state, Loading: false };

    case actions.HIDE:
      return { ...state, ShowNotification: false };

    case actions.SHOW:
      return { ...state, ShowNotification: true, Message: action.message };

    case actions.UPLOAD_LIST:
      return { ...state, UploadList: action.response };

    case actions.ROUTING_DATA:
      return {
        ...state,
        routingData: action,
      };

    case actions.GET_PENDINGFORAPPROVAL_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_PENDINGFORAPPROVAL_UNIT_SUCCESS:
      let PendingForApprovalArray = action.response.pendingForApprovalCases.map(
        (item, index) => {
          return { ...item, key: index };
        }
      );

      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        PendingForApprovalData: PendingForApprovalArray,
        ShowNotification: true,
      };

    case actions.GET_PENDINGFORAPPROVAL_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response.responseMessage,
        PendingForApprovalData: action.response.pendingForApprovalCases,
        ShowNotification: true,
      };

    case actions.SAVE_APPROVAL_SUCCESS:
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        SaveApprovalData: action.response,
      };

    case actions.SAVE_APPROVAL_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        SaveApprovalData: action.response,
      };

    case actions.SAVE_REJECTION_SUCCESS:
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        SaveRejectionData: action.response,
      };

    case actions.SAVE_REJECTION_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        SaveRejectionData: action.response,
      };

    default:
      return { ...state };
  }
};

export default IMManagerReducers;
