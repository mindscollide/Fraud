import * as actions from "../action_types";
import axios from "axios";
import { refreshToken } from "../actions/auth-actions";
import { InvestigationManagerAPI } from "../../Common/Api/apis-end-points";
import { SomeThingWentWrong } from "./ui-actions";
import {
  getAllDisputesQM,
  savePendingForDeletion,
} from "../../Common/Api/apis-config";

//Stop Loader
const LoaderFalse = () => {
  return {
    type: actions.GET_LOADER_FALSE,
  };
};

//Upload List
const setUploadList = (response) => {
  return {
    type: actions.UPLOAD_LIST,
    response: response,
  };
};

//Hide Notification
const HideNotification = () => {
  return {
    type: actions.HIDE,
  };
};

//Show Notification
const ShowNotification = (message) => {
  return {
    type: actions.SHOW,
    message: message,
  };
};

//QAManagerInit
const QAManagerInit = () => {
  return {
    type: actions.GET_QA_MANAGER_INIT,
  };
};

//QAManagerFail
const QAManagerFail = () => {
  return {
    type: actions.GET_QA_MANAGER_FAIL,
  };
};

//PendingForApprovalSuccess
const GetPendingForApprovalSuccessQA = (response) => {
  return {
    type: actions.GET_PENDINGFORAPPROVALQA_UNIT_SUCCESS,
    response: response,
  };
};

//PendingForApprovalSuccess
const GetPendingForApprovalFailQA = (response) => {
  return {
    type: actions.GET_PENDINGFORAPPROVALQA_UNIT_FAIL,
    response: response,
  };
};

//Get All Pending For Approval By ID
const GetAllDisputesQM = (object, State, check) => {
  var userID = localStorage.getItem("UserID");
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    TransactionTypeUser: {
      FK_GSSUserID: parseInt(userID),
    },
    AllDisputes: {
      AccountNumber: object.AccountNumber,
      TransactionId: object.TransactionId,
      TransactionType: object.TransactionTypeIDs,
      RefrenceNumber: object.RefrenceNumber,
      CustomerName: object.CustomerName,
      CMCity: object.CMCity,
      CNIC: object.CNIC,
      fk_csid: parseInt(object.fk_csid),
      FK_CTID: parseInt(object.FK_CTID),
      TransactionAmount: object.TransactionAmount,
      FromDate: State.FromDate,
      ToDate: State.ToDate,
    },
  };

  return (dispatch) => {
    dispatch(QAManagerInit());
    let form = new FormData();
    form.append("RequestMethod", getAllDisputesQM.RequestMethod);
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
          dispatch(GetAllDisputesQM(object, State, check));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (check !== undefined && check === true) {
              dispatch(
                GetPendingForApprovalSuccessQA(response.data.responseResult)
              );
            } else {
              dispatch(
                GetPendingForApprovalSuccessQA(response.data.responseResult)
              );
              dispatch(LoaderFalse());
            }
          } else {
            dispatch(GetPendingForApprovalFailQA(response.data.responseResult));
          }
        } else {
          dispatch(GetPendingForApprovalFailQA(response.data));
        }
      })
      .catch((response) => {
        dispatch(QAManagerFail());
        dispatch(SomeThingWentWrong(response));
      });
  };
};

//SaveApprovalSuccess
const SavePendingForDeletionSuccess = (response) => {
  return {
    type: actions.SAVE_PENDINGFORDELETION_SUCCESS,
    response: response,
  };
};

//SaveApprovalFail
const SavePendingForDeletionFail = (response) => {
  return {
    type: actions.SAVE_PENDINGFORDELETION_FAIL,
    response: response,
  };
};

//Pending For Deletion
const SendPendingForDeletion = (object, sData, dData) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let Data = {
      FK_TTID: object.FK_TTID,
      FK_DID: object.FK_DID,
      Comments: object.Comments,
    };
    dispatch(QAManagerInit());
    let form = new FormData();
    form.append("RequestMethod", savePendingForDeletion.RequestMethod);
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
          dispatch(SendPendingForDeletion(object, sData, dData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              SavePendingForDeletionSuccess(response.data.responseResult)
            );
            await dispatch(GetAllDisputesQM(sData, dData));
          } else {
            dispatch(SavePendingForDeletionFail(response.data.responseResult));
          }
        }
      })
      .catch((response) => {
        dispatch(LoaderFalse());
        dispatch(QAManagerFail());
        dispatch(SomeThingWentWrong(response));
      });
  };
};

const ResetAllDisputesData = (response) => {
  return {
    type: actions.RESET_ALLDISPUTEDATA,
    response: response,
  };
};

export {
  setUploadList,
  HideNotification,
  ShowNotification,
  QAManagerInit,
  QAManagerFail,
  GetAllDisputesQM,
  SendPendingForDeletion,
  ResetAllDisputesData,
};
