import * as actions from "../action_types";

const initialState = {
  userRequestCount: null,
  UserRequestDetails: null,
  isLoggedIn: false,
  Loading: false,
  ResponseMessage: "",
  isSignUp: false,
  saveMessage: "",
  activateTabs: 0,
};

const requestReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOADER_REQUEST:
      return { ...state, isLoading: false };

    case actions.REQUEST_LIST_SUCCESS:
      return {
        ...state,
        UserRequestDetails: action.response.userRequestList,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.response.recordMessage,
      };
    case actions.REQUEST_LIST_COUNT_SUCCESS:
      return {
        ...state,
        userRequestCount:
          action.response.userRequestCount !== undefined &&
          action.response.userRequestCount !== null
            ? action.response.userRequestCount
            : action.response.notificationCount,
        ResponseMessage: action.response.recordMessage,
      };
    case actions.REQUEST_LIST_FAIL:
      return {
        ...state,
        UserRequestDetails: [],
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.response.recordMessage,
      };
    case actions.REQUEST_LIST_COUNT_FAIL:
      return {
        ...state,
        UserDetails: action.response,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };
    case actions.SAVE_USER_REQUEST_SUCCESS:
      return {
        ...state,
        UserDetails: action.response,
        ResponseMessage: action.message,
      };
    case actions.SAVE_USER_REQUEST_FAIL:
      return {
        ...state,
        UserDetails: action.response,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };
    case actions.REQUEST_LIST_INIT:
      return { ...state, Loading: true };
    case actions.SAVE_USER_REQUEST_INIT:
      return { ...state, Loading: true };
    case actions.MAKE_TAB_ACTIVE_INIT:
      return { ...state, activateTabs: 15 };
    // for all user role data
    case actions.GET_ALL_USER_DATA_INIT:
      return { ...state, Loading: true };
    case actions.GET_ALL_USER_DATA_SUCCESS:
      return {
        ...state,
        UserDetails: action.response.allUsers,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
      };
    case actions.GET_ALL_USER_DATA_FAIL:
      return {
        ...state,
        UserDetails: action.response,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };
    // for edit user
    case actions.EDIT_USER_INIT:
      return { ...state, Loading: true };
    case actions.EDIT_USER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };
    case actions.EDIT_USER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };
    default:
      return { ...state };
  }
};

export default requestReducer;
