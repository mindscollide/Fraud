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
  AllDisputesData: [],
  SaveDeletionApprovalData: [],
};

const QAManagerReducers = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_QA_MANAGER_INIT:
      return { ...state, Loading: true };

    case actions.GET_QA_MANAGER_FAIL:
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

    case actions.GET_PENDINGFORAPPROVALQA_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_PENDINGFORAPPROVALQA_UNIT_SUCCESS:
      let AllDisputesArray = action.response.allDisputes.map((item, index) => {
        return { ...item, key: index };
      });
      return {
        ...state,
        AllDisputesData: AllDisputesArray,
        ResponseMessage: action.response.responseMessage,
      };

    case actions.GET_PENDINGFORAPPROVALQA_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        AllDisputesData: action.response.allDisputes,
      };

    case actions.SAVE_PENDINGFORDELETION_SUCCESS:
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        SaveDeletionApprovalData: action.response,
      };

    case actions.SAVE_PENDINGFORDELETION_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        SaveDeletionApprovalData: action.response,
      };

    case actions.RESET_ALLDISPUTEDATA:
      return {
        ...state,
        Loading: false,
        ResponseMessage: "",
        AllDisputesData: [],
      };

    default:
      return { ...state };
  }
};

export default QAManagerReducers;
