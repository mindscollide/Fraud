import * as actions from "../action_types";
import axios from "axios";
import { authenticationApi } from "../../Common/Api/apis-end-points";
import {
  authenticationRequestConfigs,
  authenticationRefreshToken,
  validateemail,
  validateemailandpassword,
  signuprequest,
} from "../../Common/Api/apis-config";
import { SomeThingWentWrong } from "./ui-actions";
import { newRequestListCount } from "./request-actions";
import { LOADERFALSE } from "./investigation-officer-actions";

import Helper from "../../Common/Functions/history_logout";

// Login Validation
const signinInit = () => {
  return {
    type: actions.SIGN_IN_INIT,
  };
};
const signinSuccess = (response, message) => {
  return {
    type: actions.SIGN_IN_SUCCESS,
    response: response,
    message: message,
  };
};
const signinFail = (response, message) => {
  return {
    type: actions.SIGN_IN_FAIL,
    response: response,
    message: message,
  };
};

// Refresh Token
const refrshtokenFail = (response, message) => {
  return {
    type: actions.REFRESH_TOKEN_FAIL,
    response: response,
    message: message,
  };
};
const refrshtokenSuccess = (response, message) => {
  return {
    type: actions.REFRESH_TOKEN_SUCCESS,
    response: response,
    message: message,
  };
};

// Email Validdation for signup
const validateemailaddressInit = (response, message) => {
  return {
    type: actions.VALIDATE_EMAIL_ADDRESS_INIT,
    response: response,
    message: message,
  };
};
const validateEmailAddressSuccess = (response, message) => {
  return {
    type: actions.VALIDATE_EMAIL_ADDRESS_SUCCES,
    response: response,
    message: message,
  };
};
const validateEmailAddressFail = (response, message) => {
  return {
    type: actions.VALIDATE_EMAIL_ADDRESS_FAIL,
    response: response,
    message: message,
  };
};

//  Email & SignUp Validdation for signup
const validateemailandpasswordInit = (response, message) => {
  return {
    type: actions.VALIDATE_EMAIL_AND_PASSWORD_INIT,
    response: response,
    message: message,
  };
};
const validateEmailAndPasswordSuccess = (response, message) => {
  return {
    type: actions.VALIDATE_EMAIL_AND_PASSWORD_SUCCES,
    response: response,
    message: message,
  };
};
const validateEmailAndPasswordFail = (response, message) => {
  return {
    type: actions.VALIDATE_EMAIL_AND_PASSWORD_FAIL,
    message: response,
  };
};

const RESETRESPONSEMESSAGE = () => {
  return {
    type: actions.RESET_RESPONSEMESSAGE_STATE,
    response: [],
  };
};

// SignUp Request
const signupInit = (response, message) => {
  return {
    type: actions.SIGN_UP_INIT,
    response: response,
    message: message,
  };
};
const signupREsponseMessageCleare = () => {
  return {
    type: actions.SIGN_UP_RESPONCE_MES_CLEARE,
    response: "",
  };
};
const signUpSuccess = (response, message) => {
  return {
    type: actions.SIGN_UP_SUCCESS,
    response: response,
    message: message,
  };
};
const signUpFail = (response, message) => {
  return {
    type: actions.SIGN_UP_FAIL,
    response: response,
    message: response.responseMessage,
  };
};

// Sign In
const signIn = (UserData) => {
  let navigate = Helper.navigate;
  var min = 10000;
  var max = 90000;
  var id = min + Math.random() * (max - min);
  let Data = {
    Password: UserData.Password,
    UserName: UserData.UserName,
    DeviceID: id.toString(),
    Device: "browser",
  };
  return (dispatch) => {
    dispatch(signinInit());
    let form = new FormData();
    form.append("RequestMethod", authenticationRequestConfigs.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: authenticationApi,
      data: form,
    })
      .then(async (response) => {
        if (response.data.responseResult.isExecuted === true) {
          await localStorage.setItem(
            "allowedTransactionTypes",
            JSON.stringify(response.data.responseResult.allowedTransactionTypes)
          );
          let currentUser = response.data.responseResult.roleID;
          localStorage.setItem("CurrentUserID", currentUser);
          let currentLoggedInUser = response.data.responseResult.userID;
          localStorage.setItem("CurrentLoggedInUser", currentLoggedInUser);
          if (
            response.data.responseResult.roleID === 2 ||
            response.data.responseResult.roleID === 3 ||
            response.data.responseResult.roleID === 4 ||
            response.data.responseResult.roleID === 5 ||
            response.data.responseResult.roleID === 6
          ) {
            // For System admin
            if (response.data.responseResult.roleID === 2) {
              let userId = response.data.responseResult.userID;
              localStorage.setItem("UserID", userId);
              localStorage.setItem("roleID", 2);
              localStorage.setItem("parent", "sub1");
              localStorage.setItem("child", "24");
              await dispatch(newRequestListCount(userId));
              await dispatch(
                signinSuccess(
                  response.data.responseResult,
                  response.data.responseResult
                )
              );
              navigate("/Fraud/SystemAdmin/PendingDeletionApprovals");
            }

            //For Investigation Officer
            if (response.data.responseResult.roleID === 3) {
              localStorage.setItem("parent", "sub1");
              localStorage.setItem("child", "1");
              await dispatch(
                signinSuccess(
                  response.data.responseResult,
                  response.data.responseResult
                )
              );
              await dispatch(LOADERFALSE());
              navigate("/Fraud/DisputeCases/Search");
            }
            //For Investigation Manager
            if (response.data.responseResult.roleID === 4) {
              await localStorage.setItem("roleID", 4);
              let userId = response.data.responseResult.userID;
              await localStorage.setItem("UserID", userId);
              await localStorage.setItem("parent", "sub1");
              await localStorage.setItem("child", "1");
              dispatch(
                signinSuccess(
                  response.data.responseResult,
                  response.data.responseResult
                )
              );
              navigate("/Fraud/DisputeCases/PendingApprovals");
            }
            if (response.data.responseResult.roleID === 5) {
              let userId = response.data.responseResult.userID;
              await localStorage.setItem("UserID", userId);
              await localStorage.setItem("parent", "sub1");
              await localStorage.setItem("child", "1");
              await dispatch(
                signinSuccess(
                  response.data.responseResult,
                  response.data.responseResult
                )
              );
              navigate("/Fraud/DisputeCases/DeleteDisputeCases");
            }
            if (response.data.responseResult.roleID === 6) {
              localStorage.setItem("parent", "sub1");
              localStorage.setItem("child", "1");
              dispatch(
                signinSuccess(
                  response.data.responseResult,
                  response.data.responseResult
                )
              );
              navigate("/Fraud/MIS/AuditTrail");
            }
          } else {
            dispatch(
              signinFail(
                response.data.responseResult,
                "Not allowed to login with Current Role"
              )
            );
          }
        } else {
          dispatch(
            signinFail(
              response.data.responseResult,
              response.data.responseResult.responseMessage
            )
          );
        }
      })
      .catch((response) => {
        dispatch(
          signinFail(
            "Unable  to connect to server please check your connection or contact support",
            "Unable  to connect to server please check your connection or contact support"
          )
        );
        dispatch(SomeThingWentWrong(response));
      });
  };
};

// Sign Out
const signOut = (message) => {
  Helper.navigate("/");
  localStorage.clear();

  if (message !== "") {
    return {
      type: actions.SIGN_OUT,
      message: message,
    };
  } else {
    return {
      type: actions.SIGN_OUT,
    };
  }
};

// For Clear State
const clearestate = () => {
  Helper.navigate("/");
  return {
    type: actions.CLEARE_STATE_INIT,
  };
};

// Clearing states on click of Button
const clearestateBackbutton = () => {
  return {
    type: actions.CLEARE_STATE_BACKBUTTON_INIT,
  };
};

// Refresh token
const refreshToken = (props) => {
  let Token = JSON.parse(localStorage.getItem("token"));
  let RefreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  let Data = {
    Token: Token,
    RefreshToken: RefreshToken,
  };
  return async (dispatch) => {
    let form = new FormData();
    form.append("RequestMethod", authenticationRefreshToken.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    await axios({
      method: "post",
      url: authenticationApi,
      data: form,
    })
      .then(async (response) => {
        if (response.data.responseCode === 200) {
          await dispatch(
            refrshtokenSuccess(
              response.data.responseResult,
              "Refresh Token Update Successfully"
            )
          );
        } else {
          let message2 = "Your Session has expired. Please login again";
          dispatch(signOut(message2));
          await dispatch(
            refrshtokenFail(
              response.data.responseResult,
              "Your Session has expired. Please login again."
            )
          );
        }
      })
      .catch((response) => {
        dispatch(SomeThingWentWrong(response));
      });
  };
};

// Email Validdation for signup
const validateEmailAddress = (UserData) => {
  let data = {
    UserName: UserData,
  };
  return async (dispatch) => {
    dispatch(validateemailaddressInit());
    let form = new FormData();
    form.append("RequestMethod", validateemail.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "post",
      url: authenticationApi,
      data: form,
    })
      .then((response) => {
        if (response.data.responseResult.isExecuted === true) {
          dispatch(
            validateEmailAddressSuccess(
              response.data.responseResult,
              "validate Email Successfully"
            )
          );
        } else {
          dispatch(
            validateEmailAddressFail(
              response.data.responseResult,
              "User could not be verified"
            )
          );
        }
      })
      .catch((response) => {
        dispatch(
          validateEmailAddressFail(
            "Unable to connect to server please check your connection or contact support",
            "Unable to connect to server please check your connection or contact support"
          )
        );
        dispatch(SomeThingWentWrong(response));
      });
  };
};

//  Email & SignUp Validdation for signup
const validateEmailAndPassword = (email, password) => {
  let Data = {
    UserName: email,
    Password: password,
  };
  return async (dispatch) => {
    dispatch(validateemailandpasswordInit());
    let form = new FormData();
    form.append("RequestMethod", validateemailandpassword.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    await axios({
      method: "post",
      url: authenticationApi,
      data: form,
    })
      .then((response) => {
        if (response.data.responseResult.isExecuted === true) {
          dispatch(
            validateEmailAndPasswordSuccess(
              response.data.responseResult,
              response.data.responseResult.responseMessage
            )
          );
        } else {
          dispatch(
            validateEmailAndPasswordFail(
              response.data.responseResult.responseMessage
            )
          );
        }
      })
      .catch((response) => {
        dispatch(validateEmailAndPasswordFail());
        dispatch(SomeThingWentWrong(response));
      });
  };
};

// SignUp Request
const signUp = (UserData) => {
  let Data = {
    FirstName: UserData.firstName.content,
    LastName: UserData.lastName.content,
    LoginID:
      UserData.email.content === null ||
      UserData.email.content === "" ||
      UserData.email.content === undefined
        ? null
        : UserData.email.content.search("@") !== -1
        ? UserData.email.content.split("@")[0]
        : UserData.email.content,
    Email: UserData.email.content,
    RoleID: UserData.FK_GSSUserRoleID,
    FK_RID: UserData.FK_RID,
    TransactionTypeIDs: UserData.transactionType,
    UserID: 0,
  };
  return (dispatch) => {
    dispatch(signupInit());
    let form = new FormData();
    form.append("RequestMethod", signuprequest.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: authenticationApi,
      data: form,
    })
      .then(async (response) => {
        if (response.data.responseResult.isExecuted === true) {
          await dispatch(
            signUpSuccess(
              response.data.responseResult,
              response.data.responseResult.responseMessage
            )
          );
          dispatch(clearestateBackbutton);
          Helper.navigate("/");
        } else {
          await dispatch(signUpFail(response.data.responseResult));
          await dispatch(RESETRESPONSEMESSAGE());
        }
      })
      .catch((response) => {});
  };
};

export {
  signIn,
  signOut,
  refreshToken,
  validateEmailAddress,
  validateEmailAndPassword,
  signUp,
  clearestate,
  clearestateBackbutton,
  signupREsponseMessageCleare,
};
