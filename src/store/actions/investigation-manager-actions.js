import * as actions from "../action_types";
import axios from "axios";
import { refreshToken } from "../actions/auth-actions";
import { InvestigationManagerAPI } from "../../Common/Api/apis-end-points";
import { SomeThingWentWrong } from "./ui-actions";
import {
  savePendingForApproval,
  saveRejection,
  getPendingForApproval,
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

//InvestigationManagerInit
const investigationManagerInit = () => {
  return {
    type: actions.GET_INVESTIGATION_MANAGER_INIT,
  };
};

//InvestigationManagerFail
const investigationManagerFail = () => {
  return {
    type: actions.GET_INVESTIGATION_MANAGER_FAIL,
  };
};

//PendingForApprovalSuccess
const GetPendingForApprovalSuccess = (response) => {
  return {
    type: actions.GET_PENDINGFORAPPROVAL_UNIT_SUCCESS,
    response: response,
  };
};

//PendingForApprovalSuccess
const GetPendingForApprovalFail = (response) => {
  return {
    type: actions.GET_PENDINGFORAPPROVAL_UNIT_FAIL,
    response: response,
  };
};

//SaveApprovalSuccess
const SaveApprovalSuccess = (response) => {
  return {
    type: actions.SAVE_APPROVAL_SUCCESS,
    response: response,
  };
};

//SaveApprovalFail
const SaveApprovalFail = (response) => {
  return {
    type: actions.SAVE_APPROVAL_FAIL,
    response: response,
  };
};

//SaveApprovalSuccess
const SaveRejectionSuccess = (response) => {
  return {
    type: actions.SAVE_REJECTION_SUCCESS,
    response: response,
  };
};

//SaveApprovalFail
const SaveRejectionFail = (response) => {
  return {
    type: actions.SAVE_REJECTION_FAIL,
    response: response,
  };
};

//Get All Pending For Approval By ID
const GetAllPendingForApprovalByID = (object, check) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    TransactionTypeUser: {
      FK_GSSUserID: parseInt(object),
    },
  };
  return (dispatch) => {
    dispatch(investigationManagerInit());
    let form = new FormData();
    form.append("RequestMethod", getPendingForApproval.RequestMethod);
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
          dispatch(GetAllPendingForApprovalByID(object, check));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (check !== undefined && check !== null && check === true) {
              dispatch(
                GetPendingForApprovalSuccess(response.data.responseResult)
              );
            } else {
              dispatch(
                GetPendingForApprovalSuccess(response.data.responseResult)
              );
              dispatch(LoaderFalse());
            }
          } else {
            dispatch(GetPendingForApprovalFail(response.data.responseResult));
          }
        } else {
          dispatch(GetPendingForApprovalFail(response.data));
        }
      })
      .catch((response) => {
        dispatch(investigationManagerFail());
        dispatch(SomeThingWentWrong(response));
      });
  };
};

//SaveApproval
const AddApprovalReason = (object, check) => {
  let UserID = JSON.parse(localStorage.getItem("UserDetails"));
  let userid = UserID.userID;
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let Data = {
      FK_TTID: object.FK_TTID,
      FK_DID: object.FK_DID,
      Comments: object.Comments,
      FK_AORID: object.FK_AORID,
    };
    dispatch(investigationManagerInit());
    let form = new FormData();
    form.append("RequestMethod", savePendingForApproval.RequestMethod);
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
          dispatch(AddApprovalReason(object, check));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(SaveApprovalSuccess(response.data.responseResult));
            if (check !== undefined && check !== null && check === true) {
              await dispatch(GetAllPendingForApprovalByID(userid, check));
            } else {
              await dispatch(GetAllPendingForApprovalByID(userid));
            }
          } else {
            dispatch(SaveApprovalFail(response.data.responseResult));
          }
        }
      })
      .catch((response) => {
        dispatch(investigationManagerFail());
        dispatch(SomeThingWentWrong(response));
      });
  };
};

//SaveRejection
const RejectReason = (object, check) => {
  let UserID = JSON.parse(localStorage.getItem("UserDetails"));
  let userid = UserID.userID;
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let Data = {
      FK_TTID: object.FK_TTID,
      FK_DID: object.FK_DID,
      Comments: object.Comments,
      FK_AORID: object.FK_AORID,
    };
    dispatch(investigationManagerInit());
    let form = new FormData();
    form.append("RequestMethod", saveRejection.RequestMethod);
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
          dispatch(RejectReason(object, check));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(SaveRejectionSuccess(response.data.responseResult));
            if (check !== undefined && check === true) {
              await dispatch(GetAllPendingForApprovalByID(userid, check));
            } else {
              await dispatch(GetAllPendingForApprovalByID(userid));
            }
          } else {
            dispatch(SaveRejectionFail(response.data.responseResult));
          }
        }
      })
      .catch((response) => {
        dispatch(investigationManagerFail());
        dispatch(SomeThingWentWrong(response));
      });
  };
};
//Save Delet Approval
const saveDeletionApprove = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let Data = {
      FK_TTID: object.FK_TTID,
      FK_DID: object.FK_DID,
      Comments: object.Comments,
      FK_AORID: object.FK_AORID,
    };
    dispatch(investigationManagerInit());
    let form = new FormData();
    form.append("RequestMethod", savePendingForApproval.RequestMethod2);
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
          dispatch(AddApprovalReason(object));
        } else if (response.data.responseCode === 200) {
          var userID = localStorage.getItem("UserID");
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(SaveApprovalSuccess(response.data.responseResult));

            await dispatch(GetAllPendingForApprovalByID(userID));
          } else {
            dispatch(SaveApprovalFail(response.data.responseResult));
          }
        } else {
          dispatch(SaveApprovalFail(response.data.responseResult));
        }
      })
      .catch((response) => {
        dispatch(investigationManagerFail());
        dispatch(SomeThingWentWrong(response));
      });
  };
};
//SaveRejection
const saveDeletionReject = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let Data = {
      FK_TTID: object.FK_TTID,
      FK_DID: object.FK_DID,
      Comments: object.Comments,
      FK_AORID: object.FK_AORID,
    };
    dispatch(investigationManagerInit());
    let form = new FormData();
    form.append("RequestMethod", saveRejection.RequestMethod2);
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
          dispatch(RejectReason());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(GetAllPendingForApprovalByID(0));
            dispatch(SaveRejectionSuccess(response.data.responseResult));
          } else {
            dispatch(SaveRejectionFail(response.data.responseResult));
          }
        } else {
          dispatch(SaveRejectionFail(response.data.responseResult));
        }
      })
      .catch((response) => {
        dispatch(investigationManagerFail());
        dispatch(SomeThingWentWrong(response));
      });
  };
};
export {
  setUploadList,
  HideNotification,
  ShowNotification,
  GetAllPendingForApprovalByID,
  AddApprovalReason,
  RejectReason,
  saveDeletionApprove,
  saveDeletionReject,
};
