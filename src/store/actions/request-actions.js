import * as actions from "../action_types";
import axios from "axios";
import {
  authenticationApi,
  InvestigationManagerAPI,
} from "../../Common/Api/apis-end-points";
import {
  requestListCount,
  requestList,
  saveuserrequest,
  getalluserdataforadmin,
  editUserDataForAdmin,
  requestListCountIM,
} from "../../Common/Api/apis-config";
import { SomeThingWentWrong } from "./ui-actions";
// import Helper from "../../Common/Functions/history_logout";
import { refreshToken } from "../actions/auth-actions";

// Request List
const newRequestListInit = (response, message) => {
  return {
    type: actions.REQUEST_LIST_INIT,
    response: response,
    message: message,
  };
};
const newRequestListSuccess = (response, message) => {
  return {
    type: actions.REQUEST_LIST_SUCCESS,
    response: response,
    message: message,
  };
};
const newRequestListFail = (response, message) => {
  return {
    type: actions.REQUEST_LIST_FAIL,
    response: response,
    message: message,
  };
};
// Request List count
const newRequestListCountSuccess = (response, message) => {
  return {
    type: actions.REQUEST_LIST_COUNT_SUCCESS,
    response: response,
    message: message,
  };
};
const newRequestListCountFail = (response, message) => {
  return {
    type: actions.REQUEST_LIST_COUNT_FAIL,
    response: response,
    message: message,
  };
};
// Approve user Request
const saveUserRequestInit = (response, message) => {
  return {
    type: actions.SAVE_USER_REQUEST_INIT,
    response: response,
    message: message,
  };
};
const saveUserRequestSuccess = (response, message) => {
  return {
    type: actions.SAVE_USER_REQUEST_SUCCESS,
    response: response,
    message: message,
  };
};
const saveUserRequestFail = (response, message) => {
  return {
    type: actions.SAVE_USER_REQUEST_FAIL,
    response: response,
    message: message,
  };
};

// for get all user data
const getalluserdataInit = (response, message) => {
  return {
    type: actions.GET_ALL_USER_DATA_INIT,
    response: response,
    message: message,
  };
};
const getalluserdataSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_USER_DATA_SUCCESS,
    response: response,
    message: message,
  };
};
const getalluserdataFail = (response, message) => {
  return {
    type: actions.GET_ALL_USER_DATA_FAIL,
    response: response,
    message: message,
  };
};
// Request List for Sysytem Admin
const newRequestList = (UserData) => {
  let Data = {
    UserID: UserData,
  };
  return async (dispatch) => {
    dispatch(newRequestListInit());
    let token = JSON.parse(localStorage.getItem("token"));
    let form = new FormData();
    form.append("RequestMethod", requestList.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    await axios({
      method: "post",
      url: authenticationApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(newRequestList(UserData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(newRequestListSuccess(response.data.responseResult));
          } else {
            await dispatch(newRequestListFail(response.data.responseResult));
          }
        } else {
          dispatch(newRequestListFail(response.data.responseResult));
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};
// Request List count (Notification) for Sysytem Admin
const newRequestListCount = (UserData) => {
  let Data = {
    UserID: UserData,
  };
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("token"));
    let form = new FormData();
    form.append("RequestMethod", requestListCount.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: authenticationApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(newRequestListCount(UserData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              newRequestListCountSuccess(
                response.data.responseResult,
                "Login Successfully"
              )
            );
          } else {
            dispatch(
              newRequestListCountFail(
                response.data.responseResult,
                "You are Not Authorized"
              )
            );
          }
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};
// Request List count (Notification) for investigation manager
const newRequestListCountIM = (UserData) => {
  let Data = { TransactionTypeUser: { FK_GSSUserID: UserData } };
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("token"));
    let form = new FormData();
    form.append("RequestMethod", requestListCountIM.RequestMethod);
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

          dispatch(newRequestListCount(UserData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              newRequestListCountSuccess(
                response.data.responseResult,
                "Login Successfully"
              )
            );
          } else {
            dispatch(
              newRequestListCountFail(
                response.data.responseResult,
                "You are Not Authorized"
              )
            );
          }
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};
// Get all user for edit api
const getAllUserData = (UserData) => {
  let Data = {
    FirstName: UserData.FirstName,
    Email: UserData.Email,
    LastName: UserData.LastName,
    UserLDAPAccount: UserData.LoginID,
    UserRoleID: UserData.UserRole,
    UserStatusID: UserData.UserStatus,
  };
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("token"));
    dispatch(getalluserdataInit());
    let form = new FormData();
    form.append("RequestMethod", getalluserdataforadmin.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: authenticationApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(getalluserdataSuccess(response.data.responseResult));
          } else {
            dispatch(
              getalluserdataFail(
                response.data.responseResult,
                "No Record Found"
              )
            );
          }
        } else {
          dispatch(
            getalluserdataFail(response.data.responseResult, "No Record Found")
          );
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};
// Approve user Request for Sysytem Admin
const saveUserRequest = (UserData, Status, comment, UserID) => {
  let Data = {
    UserID: UserID,
    UserRegistrationRequestID: UserData.userRegistrationRequestID,
    Status: Status,
    Comments: comment,
  };
  return (dispatch) => {
    dispatch(saveUserRequestInit());
    let token = JSON.parse(localStorage.getItem("token"));
    let form = new FormData();
    form.append("RequestMethod", saveuserrequest.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: authenticationApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(saveUserRequest(UserData, Status, comment, UserID));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              saveUserRequestSuccess(
                response.data.responseResult,
                "Save Successfully"
              )
            );
            dispatch(newRequestList(UserID));
            dispatch(newRequestListCount(UserID));
          } else {
            dispatch(
              saveUserRequestFail(
                response.data.responseResult,
                "Data is not save"
              )
            );
          }
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};
// for activate tabs
const makeTabActive = () => {
  return {
    type: actions.MAKE_TAB_ACTIVE_INIT,
  };
};
// Edit user data

// for Edit user Data
const editUserInit = (response, message) => {
  return {
    type: actions.EDIT_USER_INIT,
    response: response,
    message: message,
  };
};
const editUserSuccess = (response, message) => {
  return {
    type: actions.EDIT_USER_SUCCESS,
    response: response,
    message: message,
  };
};
const editUserFail = (response, message) => {
  return {
    type: actions.EDIT_USER_FAIL,
    response: response,
    message: message,
  };
};
const editUser = (UserData, resetSearchData) => {
  let Data = {
    UserIdToEdit: UserData.LoginID,
    UserRoleID: UserData.SelectRole,
    UserStatusID: UserData.SelectStaus,
  };
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("token"));
    dispatch(editUserInit());
    let form = new FormData();
    form.append("RequestMethod", editUserDataForAdmin.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: authenticationApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(getAllUserData(UserData, resetSearchData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              editUserSuccess(response.data.responseResult, "Record Found")
            );
            dispatch(
              getAllUserData(
                resetSearchData,
                response.data.responseResult.recordMessage
              )
            );
          } else {
            dispatch(
              editUserFail(response.data.responseResult, "No Record Found")
            );
            dispatch(
              getAllUserData(
                resetSearchData,
                response.data.responseResult.recordMessage
              )
            );
          }
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const editSystemUser = (UserData, resetSearchData) => {
  let Data = {
    TransactionTypeIDs: UserData.TransactionType,
    RegionID: UserData.RegionID,
    UserIdToEdit: UserData.UserIdToEdit,
  };
  return (dispatch) => {
    let token = JSON.parse(localStorage.getItem("token"));
    dispatch(editUserInit());
    let form = new FormData();
    form.append("RequestMethod", editUserDataForAdmin.RequestMethod2);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: authenticationApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(editSystemUser(UserData, resetSearchData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              editUserSuccess(response.data.responseResult, "Record Found")
            );
            dispatch(
              getAllUserData(
                resetSearchData,
                response.data.responseResult.recordMessage
              )
            );
          } else {
            dispatch(
              editUserFail(response.data.responseResult, "No Record Found")
            );
            dispatch(
              getAllUserData(
                resetSearchData,
                response.data.responseResult.recordMessage
              )
            );
          }
        } else {
          dispatch(
            editUserFail(
              response.data.responseMessage,
              response.data.responseMessage
            )
          );
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};
export {
  newRequestList,
  newRequestListCount,
  saveUserRequest,
  makeTabActive,
  getAllUserData,
  editUser,
  newRequestListCountIM,
  editSystemUser,
};
