import * as actions from "../action_types";

const initialState = {
  UserDetails: null,
  isLoggedIn: false,
  Loading: false,
  ResponseMessage: "",
  signUpResponseMessage: "",
  LoginResponseMessage: "",
  SessionExpeireResponseMessage: "",
  isSignUp: false,
  departments: null,
  roles: null,
  // change
  responseData: "",
  isError: true,
  isFail: true,
  isErrorPas: true,
  pendingError: false,
  Token: "",
  Refresh: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGN_IN_INIT:
      return { ...state, Loading: true };
    case actions.SIGN_IN_SUCCESS:
      localStorage.setItem("token", JSON.stringify(action.response.token));
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(action.response.refreshToken)
      );
      localStorage.setItem("role", JSON.stringify(action.response.roleID));
      localStorage.setItem("UserDetails", JSON.stringify(action.response));
      return {
        ...state,
        UserDetails: action.response,
        isLoggedIn: true,
        ResponseMessage: action.message,
        Token: action.response.token,
        Refresh: action.response.refreshToken,
      };
    case actions.REFRESH_TOKEN_SUCCESS:
      localStorage.setItem("token", JSON.stringify(action.response.token));
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(action.response.refreshToken)
      );
      return {
        ...state,
        ResponseMessage: action.message,
        Token: action.response.token,
        Refresh: action.response.refreshToken,
      };
    case actions.REFRESH_TOKEN_FAIL:
      return {
        ...state,
        UserDetails: action.response,
        isLoggedIn: false,
        Loading: false,
        SessionExpeireResponseMessage: action.message,
        Token: "",
        Refresh: "",
      };
    case actions.SIGN_IN_FAIL:
      return {
        ...state,
        UserDetails: null,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
        Token: "",
        Refresh: "",
      };
    case actions.SIGN_UP_INIT:
      return { ...state, Loading: true };
    case actions.SIGN_UP_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        Loading: false,
        pendingError: false,
        signUpResponseMessage: action.message,
        ResponseMessage: "",
      };
    case actions.SIGN_UP_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        Loading: false,
        pendingError: true,
        signUpResponseMessage: "",
        ResponseMessage: action.response.responseMessage,
      };
    case actions.SIGN_OUT:
      localStorage.clear();
      return {
        ...state,
        UserDetails: null,
        isLoggedIn: false,
        Loading: false,
        Token: "",
        Refresh: "",
        SessionExpeireResponseMessage: action.message,
      };
    case actions.CLEARE_STATE_INIT:
      localStorage.clear();
      return {
        ...state,
        UserDetails: null,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: "",
        LoginResponseMessage: "",
        signUpResponseMessage: "",
        pendingError: false,
        isSignUp: false,
        departments: null,
        roles: null,
        responseData: "",
        isError: true,
        isFail: true,
        isErrorPas: true,
        Token: "",
        Refresh: "",
      };
    case actions.CLEARE_STATE_BACKBUTTON_INIT:
      localStorage.clear();
      return {
        ...state,
        UserDetails: null,
        isLoggedIn: false,
        Loading: false,
        isSignUp: false,
        departments: null,
        roles: null,
        ResponseMessage: "",
        pendingError: false,
        responseData: "",
        isError: true,
        isFail: true,
        isErrorPas: true,
        Token: "",
        Refresh: "",
      };
    case actions.VALIDATE_EMAIL_ADDRESS_SUCCES:
      return {
        ...state,
        isError: false,
        isFail: false,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };
    case actions.VALIDATE_EMAIL_ADDRESS_FAIL:
      return {
        ...state,
        isError: true,
        isFail: true,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.response.recordMessage,
      };
    case actions.VALIDATE_EMAIL_AND_PASSWORD_SUCCES:
      return {
        ...state,
        responseData: action.response,
        isLoggedIn: false,
        Loading: false,
        isErrorPas: false,
        isError: false,
        signUpResponseMessage: "",
        ResponseMessage: action.message,
      };
    case actions.SIGN_UP_RESPONCE_MES_CLEARE:
      return {
        ...state,
        signUpResponseMessage: action.response,
      };
    case actions.VALIDATE_EMAIL_AND_PASSWORD_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        Loading: false,
        isErrorPas: true,
        ResponseMessage: action.message,
      };
    case actions.VALIDATE_EMAIL_ADDRESS_INIT:
      return { ...state, Loading: true };
    case actions.VALIDATE_EMAIL_AND_PASSWORD_INIT:
      return { ...state, Loading: true, ResponseMessage: "" };
    default:
      return { ...state };
  }
};

export default reducer;
