import * as actions from "../action_types";
import axios from "axios";
import { refreshToken } from "../actions/auth-actions";
import {
  SetupFormApi,
  authenticationApi,
  InvestigationManagerAPI,
} from "../../Common/Api/apis-end-points";
import {
  getAllPendingForDeletion,
  getForDeletion,
  savePendingForDeletionSystemAdmin,
  saveInProcess,
  getAllTransactionTypes,
  GetSetupFormConfigs,
  PostSetupFormConfigs,
  SearchSetupFormConfigs,
  addFraudType,
  allFraudType,
  deleteFraudType,
  editFraudType,
  allSource,
  addSource,
  deleteSource,
  updateSource,
  allIndividualInvolved,
  addIndividualInvolved,
  deleteIndividualInvolved,
  updateIndividualInvolved,
  allChannel,
  addChannel,
  deleteChannel,
  updateChannel,
  allFraudNotAFraud,
  addFraudNotAFraud,
  deleteFraudNotAFraud,
  updateFraudNotAFraud,
  allCompanySegment,
  addCompanySegment,
  deleteCompanySegment,
  updateCompanySegment,
  allForgedDocuments,
  addForgedDocuments,
  deleteForgedDocuments,
  updateForgedDocuments,
  allSourceOfIBChannelCreation,
  addSourceOfIBChannelCreation,
  deleteSourceOfIBChannelCreation,
  updateSourceOfIBChannelCreation,
  allCity,
  addCity,
  deleteCity,
  updateCity,
  allRegion,
  addRegion,
  deleteRegion,
  updateRegion,
  allCityAndRegionMapping,
  addCityAndRegionMapping,
  deleteCityAndRegionMapping,
  updateCityAndRegionMapping,
  allUserRoles,
  allEscalationMatrix,
  addEscalationMatrix,
  deleteEscalationMatrix,
  updateEscalationMatrix,
  allApprovalReasons,
  addApprovalReasons,
  deleteApprovalReasons,
  updateApprovalReasons,
  allRejectionReasons,
  addRejectionReasons,
  deleteRejectionReasons,
  updateRejectionReasons,
  searchDeleteDisputes,
  getAllStatus,
  getAllActions,
  // SetupFormApi,
  allHoliday,
  saveHoliday,
  deleteHoliday,
  updateHoliday,
  allCaseDecision,
  saveCaseDecision,
  deleteCaseDecision,
  updateCaseDecision,
  allTransactionCurrency,
} from "../../Common/Api/apis-config";
import { SomeThingWentWrong } from "./ui-actions";

const LOADERFALSE = () => {
  return {
    type: actions.GET_LOADER_FALSE,
  };
};

const HideNotification = () => {
  return {
    type: actions.HIDE,
  };
};
const ShowNotification = (message) => {
  return {
    type: actions.SHOW,
    message: message,
  };
};
const setupFormInit = () => {
  return {
    type: actions.GET_SETUP_FORM_INIT,
  };
};
const setupFormFail = () => {
  return {
    type: actions.GET_SETUP_FORM_FAIL,
  };
};
const BorrowerTypeSuccess = (response) => {
  return {
    type: actions.GET_BORROWER_TYPE_SUCCESS,
    response: response,
  };
};
const GetBorrowerType = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", GetSetupFormConfigs.GetBorrowerType);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetBorrowerType());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(BorrowerTypeSuccess(FinalArray));
          } else {
            dispatch(BorrowerTypeSuccess([]));
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        dispatch(SomeThingWentWrong(response));
      });
  };
};
const AddBorrowerType = (object, setIsModalVisible) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = { WOFStatus: object.WOFStatus, Title: `${object.Title}` };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.AddBorrowerType);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(AddBorrowerType(object, setIsModalVisible));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            setIsModalVisible(false);
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const EditBorrowerType = (
  borrowerType,
  setborrowerType,
  setAction,
  actions
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      ID: borrowerType.ID,
      WOFStatus: borrowerType.WOFStatus,
      Title: `${borrowerType.Title}`,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.UpdateBorrowerType);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            EditBorrowerType(borrowerType, setborrowerType, setAction, actions)
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            setborrowerType({
              ...borrowerType,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            setAction({
              ...actions,
              update: false,
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
          } else {
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const DeleteBorrowerType = (
  borrowerType,
  setborrowerType,
  setIsModalVisible
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = { ID: borrowerType.ID };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.DeleteBorrowerType);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            DeleteBorrowerType(borrowerType, setborrowerType, setIsModalVisible)
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            setborrowerType({
              ...borrowerType,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            setIsModalVisible(false);
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const AdvanceClassificationSuccess = (response) => {
  return {
    type: actions.GET_ADVANCE_CLASSIFICATION_SUCCESS,
    response: response,
  };
};
const GetAdvanceClassification = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", GetSetupFormConfigs.GetAdvanceClassification);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetAdvanceClassification());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(AdvanceClassificationSuccess(FinalArray));
          } else {
            dispatch(AdvanceClassificationSuccess([]));
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const AddAdvanceClassification = (
  classificationofAdvance,
  setIsModalVisible
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      WOFStatus: classificationofAdvance.WOFStatus,
      Title: `${classificationofAdvance.Title}`,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.AddAdvanceClassification);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            AddAdvanceClassification(classificationofAdvance, setIsModalVisible)
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            setIsModalVisible(false);
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const EditAdvanceClassification = (
  classificationofAdvance,
  setclassificationofAdvance,
  setAction,
  actions
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      ID: classificationofAdvance.ID,
      WOFStatus: classificationofAdvance.WOFStatus,
      Title: `${classificationofAdvance.Title}`,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      PostSetupFormConfigs.UpdateAdvanceClassification
    );
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            EditAdvanceClassification(
              classificationofAdvance,
              setclassificationofAdvance,
              setAction,
              actions
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            setclassificationofAdvance({
              ...classificationofAdvance,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            setAction({
              ...actions,
              update: false,
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
          } else {
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const DeleteAdvanceClassification = (
  classificationofAdvance,
  setclassificationofAdvance,
  setIsModalVisible
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = { ID: classificationofAdvance.ID };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      PostSetupFormConfigs.DeleteAdvanceClassification
    );
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            DeleteAdvanceClassification(
              classificationofAdvance,
              setclassificationofAdvance,
              setIsModalVisible
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            setclassificationofAdvance({
              ...classificationofAdvance,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            setIsModalVisible(false);
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const ManagementUnitSuccess = (response) => {
  return {
    type: actions.GET_MANAGEMENT_UNIT_SUCCESS,
    response: response,
  };
};
const FraudSuccess = (response) => {
  return {
    type: actions.GET_FRAUD_UNIT_SUCCESS,
    response: response,
  };
};
const FraudFail = (response) => {
  return {
    type: actions.GET_FRAUD_UNIT_FAIL,
    response: response,
  };
};
const SourceSuccess = (response) => {
  return {
    type: actions.GET_SOURCE_UNIT_SUCCESS,
    response: response,
  };
};
const SourceFail = (response) => {
  return {
    type: actions.GET_SOURCE_UNIT_FAIL,
    response: response,
  };
};
const IndividualInvolvedSuccess = (response) => {
  return {
    type: actions.GET_INDIVIDUALINVOLVED_UNIT_SUCCESS,
    response: response,
  };
};
const IndividualInvolvedFail = (response) => {
  return {
    type: actions.GET_INDIVIDUALINVOLVED_UNIT_FAIL,
    response: response,
  };
};
const ChannelSuccess = (response) => {
  return {
    type: actions.GET_CHANNEL_UNIT_SUCCESS,
    response: response,
  };
};
const ChannelFail = (response) => {
  return {
    type: actions.GET_CHANNEL_UNIT_FAIL,
    response: response,
  };
};
const FraudNotAFraudSuccess = (response) => {
  return {
    type: actions.GET_FRAUDNOTAFRAUD_UNIT_SUCCESS,
    response: response,
  };
};
const FraudNotAFraudFail = (response) => {
  return {
    type: actions.GET_FRAUDNOTAFRAUD_UNIT_FAIL,
    response: response,
  };
};
const CompanySegmentSuccess = (response) => {
  return {
    type: actions.GET_COMPANYSEGMENT_UNIT_SUCCESS,
    response: response,
  };
};
const CompanySegmentFail = (response) => {
  return {
    type: actions.GET_COMPANYSEGMENT_UNIT_FAIL,
    response: response,
  };
};
const ForgedDocumentsSuccess = (response) => {
  return {
    type: actions.GET_FORGEDDOCUMENTS_UNIT_SUCCESS,
    response: response,
  };
};
const ForgedDocumentsFail = (response) => {
  return {
    type: actions.GET_FORGEDDOCUMENTS_UNIT_FAIL,
    response: response,
  };
};
const SourceOfIBChannelCreationSuccess = (response) => {
  return {
    type: actions.GET_SOURCEOFIBCHANNELCREATION_UNIT_SUCCESS,
    response: response,
  };
};
const SourceOfIBChannelCreationFail = (response) => {
  return {
    type: actions.GET_SOURCEOFIBCHANNELCREATION_UNIT_FAIL,
    response: response,
  };
};
const CitySuccess = (response) => {
  return {
    type: actions.GET_CITY_UNIT_SUCCESS,
    response: response,
  };
};
const CityFail = (response) => {
  return {
    type: actions.GET_CITY_UNIT_FAIL,
    response: response,
  };
};
const RegionSuccess = (response) => {
  return {
    type: actions.GET_REGION_UNIT_SUCCESS,
    response: response,
  };
};
const RegionFail = (response) => {
  return {
    type: actions.GET_REGION_UNIT_FAIL,
    response: response,
  };
};
const CityAndRegionMappingSuccess = (response) => {
  return {
    type: actions.GET_CITYANDREGIONMAPPING_UNIT_SUCCESS,
    response: response,
  };
};
const CityAndRegionMappingFail = (response) => {
  return {
    type: actions.GET_CITYANDREGIONMAPPING_UNIT_FAIL,
    response: response,
  };
};
const UserRolesSuccess = (response) => {
  return {
    type: actions.GET_USERROLES_UNIT_SUCCESS,
    response: response,
  };
};
const UserRolesFail = (response) => {
  return {
    type: actions.GET_USERROLES_UNIT_FAIL,
    response: response,
  };
};
const EscalationMatrixSuccess = (response) => {
  return {
    type: actions.GET_ESCALATIONMATRIX_UNIT_SUCCESS,
    response: response,
  };
};
const EscalationMatrixFail = (response) => {
  return {
    type: actions.GET_ESCALATIONMATRIX_UNIT_FAIL,
    response: response,
  };
};
const ApprovalReasonsSuccess = (response) => {
  return {
    type: actions.GET_APPROVALREASONS_UNIT_SUCCESS,
    response: response,
  };
};
const ApprovalReasonsFail = (response) => {
  return {
    type: actions.GET_APPROVALREASONS_UNIT_FAIL,
    response: response,
  };
};
const RejectionReasonsSuccess = (response) => {
  return {
    type: actions.GET_REJECTIONREASONS_UNIT_SUCCESS,
    response: response,
  };
};
const RejectionReasonsFail = (response) => {
  return {
    type: actions.GET_REJECTIONREASONS_UNIT_FAIL,
    response: response,
  };
};
const GetManagementUnit = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", GetSetupFormConfigs.GetManagementUnit);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetManagementUnit());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(ManagementUnitSuccess(FinalArray));
          } else {
            dispatch(ManagementUnitSuccess([]));
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const AddManagementUnit = (managementUnit, setIsModalVisible) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      WOFStatus: managementUnit.WOFStatus,
      Title: `${managementUnit.Title}`,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.AddManagementUnit);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(AddManagementUnit(managementUnit, setIsModalVisible));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            setIsModalVisible(false);
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const EditManagementUnit = (
  managementUnit,
  setmanagementUnit,
  setAction,
  actions
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      ID: managementUnit.ID,
      WOFStatus: managementUnit.WOFStatus,
      Title: `${managementUnit.Title}`,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.UpdateManagementUnit);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            EditManagementUnit(
              managementUnit,
              setmanagementUnit,
              setAction,
              actions
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            setmanagementUnit({
              ...managementUnit,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            setAction({
              ...actions,
              update: false,
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
          } else {
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const DeleteManagementUnit = (
  managementUnit,
  setmanagementUnit,
  setIsModalVisible
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = { ID: managementUnit.ID };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.DeleteManagementUnit);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            DeleteManagementUnit(
              managementUnit,
              setmanagementUnit,
              setIsModalVisible
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            setmanagementUnit({
              ...managementUnit,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            setIsModalVisible(false);
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const NatureofChargeSuccess = (response) => {
  return {
    type: actions.GET_NATURE_OF_CHARGE_SUCCESS,
    response: response,
  };
};
const GetNatureofCharge = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", GetSetupFormConfigs.GetNatureofCharge);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetNatureofCharge());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(NatureofChargeSuccess(FinalArray));
          } else {
            dispatch(NatureofChargeSuccess([]));
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const AddNatureofCharge = (natureofCharge, setIsModalVisible) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      WOFStatus: natureofCharge.WOFStatus,
      Title: `${natureofCharge.Title}`,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.AddNatureofCharge);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(AddNatureofCharge(natureofCharge, setIsModalVisible));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            setIsModalVisible(false);
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const EditNatureofCharge = (
  natureofCharge,
  setnatureofCharge,
  setAction,
  actions
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      ID: natureofCharge.ID,
      WOFStatus: natureofCharge.WOFStatus,
      Title: `${natureofCharge.Title}`,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.UpdateNatureofCharge);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            EditNatureofCharge(
              natureofCharge,
              setnatureofCharge,
              setAction,
              actions
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            setnatureofCharge({
              ...natureofCharge,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            setAction({
              ...actions,
              update: false,
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
          } else {
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const DeleteNatureofCharge = (
  natureofCharge,
  setnatureofCharge,
  setIsModalVisible
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = { ID: natureofCharge.ID };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.DeleteNatureofCharge);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            DeleteNatureofCharge(
              natureofCharge,
              setnatureofCharge,
              setIsModalVisible
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            setnatureofCharge({
              ...natureofCharge,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            setIsModalVisible(false);
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const NatureOfSecuritySuccess = (response) => {
  return {
    type: actions.GET_NATURE_OF_SECURITY_SUCCESS,
    response: response,
  };
};
const GetNatureOfSecurity = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", GetSetupFormConfigs.GetNatureOfSecurity);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetNatureOfSecurity());
          dispatch(GetNatureOfSecurity());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(NatureOfSecuritySuccess(FinalArray));
          } else {
            dispatch(NatureOfSecuritySuccess([]));
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const AddNatureOfSecurity = (natureofSecurity, setIsModalVisible) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      WOFStatus: natureofSecurity.WOFStatus,
      Title: `${natureofSecurity.Title}`,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.AddNatureOfSecurity);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(AddNatureOfSecurity(natureofSecurity, setIsModalVisible));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            setIsModalVisible(false);
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const EditNatureOfSecurity = (
  natureofSecurity,
  setnatureofSecurity,
  setAction,
  actions
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      ID: natureofSecurity.ID,
      WOFStatus: natureofSecurity.WOFStatus,
      Title: `${natureofSecurity.Title}`,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.UpdateNatureOfSecurity);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());

          dispatch(
            EditNatureOfSecurity(
              natureofSecurity,
              setnatureofSecurity,
              setAction,
              actions
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            setnatureofSecurity({
              ...natureofSecurity,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            setAction({
              ...actions,
              update: false,
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
          } else {
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const DeleteNatureOfSecurity = (
  natureofSecurity,
  setnatureofSecurity,
  setIsModalVisible
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = { ID: natureofSecurity.ID };
    dispatch(setupFormInit());

    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.DeleteNatureOfSecurity);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());

          dispatch(
            DeleteNatureOfSecurity(
              natureofSecurity,
              setnatureofSecurity,
              setIsModalVisible
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            setnatureofSecurity({
              ...natureofSecurity,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            setIsModalVisible(false);
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const WOFReasonSuccess = (response) => {
  return {
    type: actions.GET_WRITEOFFREASON_SUCCESS,
    response: response,
  };
};
const GetWOFReason = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", GetSetupFormConfigs.GetWOFReason);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetWOFReason());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(WOFReasonSuccess(FinalArray));
          } else {
            dispatch(WOFReasonSuccess([]));
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const AddWOFReason = (reasonOfWriteOff, setIsModalVisible) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      WOFStatus: reasonOfWriteOff.WOFStatus,
      Title: `${reasonOfWriteOff.Title}`,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.AddWOFReason);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(AddWOFReason(reasonOfWriteOff, setIsModalVisible));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            setIsModalVisible(false);
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const EditWOFReason = (
  reasonOfWriteOff,
  setreasonOfWriteOff,
  setAction,
  actions
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      ID: reasonOfWriteOff.ID,
      WOFStatus: reasonOfWriteOff.WOFStatus,
      Title: `${reasonOfWriteOff.Title}`,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.UpdateWOFReason);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            EditWOFReason(
              reasonOfWriteOff,
              setreasonOfWriteOff,
              setAction,
              actions
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            setreasonOfWriteOff({
              ...reasonOfWriteOff,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            setAction({
              ...actions,
              update: false,
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
          } else {
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const DeleteWOFReason = (
  reasonOfWriteOff,
  setreasonOfWriteOff,
  setIsModalVisible
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = { ID: reasonOfWriteOff.ID };
    dispatch(setupFormInit());

    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.DeleteWOFReason);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            DeleteWOFReason(
              reasonOfWriteOff,
              setreasonOfWriteOff,
              setIsModalVisible
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            setreasonOfWriteOff({
              ...reasonOfWriteOff,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            setIsModalVisible(false);
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const ApprovalReasonSuccess = (response) => {
  return {
    type: actions.GET_APPROVAL_REASON_SUCCESS,
    response: response,
  };
};
const GetApprovalReason = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", GetSetupFormConfigs.GetApprovalReason);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetApprovalReason());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(ApprovalReasonSuccess(FinalArray));
          } else {
            dispatch(ApprovalReasonSuccess([]));
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const AddApprovalReason = (approvalReason, setIsModalVisible) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      WOFStatus: approvalReason.WOFStatus,
      Title: `${approvalReason.Title}`,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.AddApprovalReason);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(AddApprovalReason(approvalReason, setIsModalVisible));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            setIsModalVisible(false);
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const EditApprovalReason = (
  approvalReason,
  setapprovalReason,
  setAction,
  actions
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      ID: approvalReason.ID,
      WOFStatus: approvalReason.WOFStatus,
      Title: `${approvalReason.Title}`,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.UpdateApprovalReason);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            EditApprovalReason(
              approvalReason,
              setapprovalReason,
              setAction,
              actions
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            setapprovalReason({
              ...approvalReason,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            setAction({
              ...actions,
              update: false,
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
          } else {
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const DeleteApprovalReason = (
  approvalReason,
  setapprovalReason,
  setIsModalVisible
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = { ID: approvalReason.ID };
    dispatch(setupFormInit());

    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.DeleteApprovalReason);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            DeleteApprovalReason(
              approvalReason,
              setapprovalReason,
              setIsModalVisible
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            setapprovalReason({
              ...approvalReason,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            setIsModalVisible(false);
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const RejectionReasonSuccess = (response) => {
  return {
    type: actions.GET_REJECTION_REASON_SUCCESS,
    response: response,
  };
};
const GetRejectionReason = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", GetSetupFormConfigs.GetRejectionReason);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetRejectionReason());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(RejectionReasonSuccess(FinalArray));
          } else {
            dispatch(RejectionReasonSuccess([]));
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const AddRejectionReason = (rejectionReason, setIsModalVisible) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      WOFStatus: rejectionReason.WOFStatus,
      Title: `${rejectionReason.Title}`,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.AddRejectionReason);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(AddRejectionReason(rejectionReason, setIsModalVisible));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            setIsModalVisible(false);
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const EditRejectionReason = (
  rejectionReason,
  setrejectionReason,
  setAction,
  actions
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      ID: rejectionReason.ID,
      WOFStatus: rejectionReason.WOFStatus,
      Title: `${rejectionReason.Title}`,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.UpdateRejectionReason);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            EditRejectionReason(
              rejectionReason,
              setrejectionReason,
              setAction,
              actions
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            setrejectionReason({
              ...rejectionReason,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            setAction({
              ...actions,
              update: false,
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
          } else {
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const DeleteRejectionReason = (
  rejectionReason,
  setrejectionReason,
  setIsModalVisible
) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = { ID: rejectionReason.ID };
    dispatch(setupFormInit());

    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.DeleteRejectionReason);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(
            DeleteRejectionReason(
              rejectionReason,
              setrejectionReason,
              setIsModalVisible
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            setrejectionReason({
              ...rejectionReason,
              ID: null,
              WOFStatus: 4,
              Title: "",
            });
            dispatch(
              ShowNotification(response.data.responseResult.recordMessage)
            );
            setIsModalVisible(false);
          } else {
            setIsModalVisible(false);
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const SearchBorrowerType = (Title) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let PostData = { Title: `${Title}` };
    let form = new FormData();
    form.append("RequestMethod", SearchSetupFormConfigs.SearchBorrowerType);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchBorrowerType(Title));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(BorrowerTypeSuccess(FinalArray));
          } else {
            dispatch(BorrowerTypeSuccess([]));
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const SearchManagementUnit = (Title) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let PostData = { Title: `${Title}` };
    let form = new FormData();
    form.append("RequestMethod", SearchSetupFormConfigs.SearchManagementUnit);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchManagementUnit(Title));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(ManagementUnitSuccess(FinalArray));
          } else {
            dispatch(ManagementUnitSuccess([]));
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const SearchAddvanceClassification = (Title) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let PostData = { Title: `${Title}` };
    let form = new FormData();
    form.append(
      "RequestMethod",
      SearchSetupFormConfigs.SearchAdvanceClassification
    );
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchAddvanceClassification(Title));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(AdvanceClassificationSuccess(FinalArray));
          } else {
            dispatch(AdvanceClassificationSuccess([]));
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const SearchNatureOfCharge = (Title) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let PostData = { Title: `${Title}` };
    let form = new FormData();
    form.append("RequestMethod", SearchSetupFormConfigs.SearchNatureofCharge);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchNatureOfCharge(Title));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(NatureofChargeSuccess(FinalArray));
          } else {
            dispatch(NatureofChargeSuccess([]));
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const SearchNatureOfSecurity = (Title) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let PostData = { Title: `${Title}` };
    let form = new FormData();
    form.append("RequestMethod", SearchSetupFormConfigs.SearchNatureOfSecurity);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchNatureOfSecurity(Title));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(NatureOfSecuritySuccess(FinalArray));
          } else {
            dispatch(NatureOfSecuritySuccess([]));
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const SearchWOFReason = (Title) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let PostData = { Title: `${Title}` };
    let form = new FormData();
    form.append("RequestMethod", SearchSetupFormConfigs.SearchWOFReason);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchWOFReason(Title));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(WOFReasonSuccess(FinalArray));
          } else {
            dispatch(WOFReasonSuccess([]));
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const SearchApprovalReason = (Title) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let PostData = { Title: `${Title}` };
    let form = new FormData();
    form.append("RequestMethod", SearchSetupFormConfigs.SearchApprovalReason);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchApprovalReason(Title));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(ApprovalReasonSuccess(FinalArray));
          } else {
            dispatch(ApprovalReasonSuccess([]));
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const SearchRejectionReason = (Title) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let PostData = { Title: `${Title}` };
    let form = new FormData();
    form.append("RequestMethod", SearchSetupFormConfigs.SearchRejectionReason);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchRejectionReason(Title));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(RejectionReasonSuccess(FinalArray));
          } else {
            dispatch(RejectionReasonSuccess([]));
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const ApprovalFlowSuccess = (response) => {
  return {
    type: actions.GET_APPROVAL_FLOW_SUCCESS,
    response: response,
  };
};
const GetApprovalFlow = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", GetSetupFormConfigs.GetApprovalFlow);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetApprovalFlow());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(ApprovalFlowSuccess(FinalArray));
          } else {
            dispatch(ApprovalFlowSuccess([]));
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const DeleteApprovalFlow = (ID) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", PostSetupFormConfigs.DeleteApprovalFlow);
    form.append("RequestData", JSON.stringify({ ID: ID }));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(DeleteApprovalFlow(ID));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
          } else {
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const SearchApprovalFlow = (ApprovalFlowName, ApprovalFlowDescription) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let PostData = {
      ApprovalFlowName: `${ApprovalFlowName}`,
      ApprovalFlowDescription: `${ApprovalFlowDescription}`,
    };
    let form = new FormData();
    form.append("RequestMethod", SearchSetupFormConfigs.SearchApprovalFlow);
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let FinalArray = response.data.responseResult.list.map(
              (item, index) => {
                return { ...item, key: index };
              }
            );
            dispatch(ApprovalFlowSuccess(FinalArray));
          } else {
            dispatch(ApprovalFlowSuccess([]));
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const ApprovalFlowForEditSuccess = (
  ApprovalFlowsForEdit,
  ExistingUserList,
  RemainingUserList
) => {
  return {
    type: actions.GET_APPROVAL_FLOW_FOR_EDIT_SUCCESS,
    ApprovalFlowsForEdit: ApprovalFlowsForEdit,
    ExistingUserList: ExistingUserList,
    RemainingUserList: RemainingUserList,
  };
};
const GetApprovalFlowForEdit = (Id) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let form = new FormData();
    form.append("RequestMethod", GetSetupFormConfigs.GetApprovalFlowForEdit);
    form.append("RequestData", JSON.stringify({ ID: Id }));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetApprovalFlowForEdit(Id));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let RemaingUserList =
              response.data.responseResult.remainingUserList.map(
                (item, index) => {
                  return {
                    ...item,
                    key: index,
                    Fullname: item.firstName + " " + item.lastName,
                  };
                }
              );
            let ExistingUserList =
              response.data.responseResult.existingUserList.map(
                (item, index) => {
                  return {
                    ...item,
                    key: index,
                    Fullname: item.firstName + " " + item.lastName,
                  };
                }
              );
            dispatch(
              ApprovalFlowForEditSuccess(
                response.data.responseResult.approvalFlow,
                ExistingUserList,
                RemaingUserList
              )
            );
          } else {
            dispatch(ApprovalFlowForEditSuccess({}));
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const ApprovalFlowForEdit = (ExistingUserList, RemainingUserList) => {
  return {
    type: actions.ACTIONS_APPROVAL_FLOW_FOR_EDIT_SUCCESS,
    ExistingUserList: ExistingUserList,
    RemainingUserList: RemainingUserList,
  };
};

const UpdateApprovalFlowForEdit = (PostData) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let form = new FormData();
    form.append(
      "RequestMethod",
      PostSetupFormConfigs.UpdateApprovalFlowForUser
    );
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(UpdateApprovalFlowForEdit(PostData));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let RemaingUserList =
              response.data.responseResult.remainingUserList.map(
                (item, index) => {
                  return {
                    ...item,
                    key: index,
                    Fullname: item.firstName + " " + item.lastName,
                  };
                }
              );
            let ExistingUserList =
              response.data.responseResult.existingUserList.map(
                (item, index) => {
                  return {
                    ...item,
                    key: index,
                    Fullname: item.firstName + " " + item.lastName,
                  };
                }
              );

            dispatch(ApprovalFlowForEdit(ExistingUserList, RemaingUserList));
          } else {
            dispatch(ApprovalFlowForEdit({}, [], []));
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const DeleteApprovalFlowForEdit = (updateApprovalFlowForEdit) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let PostData = {
      ID: updateApprovalFlowForEdit.ID,
      UserID: updateApprovalFlowForEdit.UserID,
    };
    let form = new FormData();

    form.append(
      "RequestMethod",
      PostSetupFormConfigs.DeleteApprovalFlowForUser
    );
    form.append("RequestData", JSON.stringify(PostData));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(DeleteApprovalFlowForEdit(updateApprovalFlowForEdit));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.recordFound === true) {
            let RemaingUserList =
              response.data.responseResult.remainingUserList.map(
                (item, index) => {
                  return {
                    ...item,
                    key: index,
                    Fullname: item.firstName + " " + item.lastName,
                  };
                }
              );
            let ExistingUserList =
              response.data.responseResult.existingUserList.map(
                (item, index) => {
                  return {
                    ...item,
                    key: index,
                    Fullname: item.firstName + " " + item.lastName,
                  };
                }
              );

            dispatch(ApprovalFlowForEdit(ExistingUserList, RemaingUserList));
          } else {
            dispatch(ApprovalFlowForEdit({}, [], []));
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const setRoutingData = (data) => {
  return {
    type: actions.ROUTING_DATA,
    response: data,
  };
};

const SaveFraudType = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));

  let Data = {
    ObjFraudType: {
      Name: object.Name,
    },
  };
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", addFraudType.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addFraudType(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllFraudType());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const GetAllFraudType = (flag) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    // dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", allFraudType.RequestMethod);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(allFraudType());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(FraudSuccess(response.data.responseResult));
            if (flag === true) {
            } else {
            }
          } else {
            dispatch(FraudFail([response.data.responseResult]));
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(LOADERFALSE());
        }
        //
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const DeleteFraudType = (fraudType) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    ObjFraudType: {
      PK_FTID: fraudType.ID,
    },
  };
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", deleteFraudType.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(DeleteFraudType(fraudType));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllFraudType());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const EditFraudType = (fraudType) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let data = {
      ObjFraudType: {
        Name: fraudType.Name,
        PK_FTID: fraudType.ID,
      },
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", editFraudType.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addFraudType(fraudType));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllFraudType());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const GetAllSource = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", allSource.RequestMethod);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(allSource());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(SourceSuccess(response.data.responseResult));
            dispatch(LOADERFALSE());
          } else {
            dispatch(SourceFail([response.data.responseResult]));
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const SaveSource = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));

  let Data = {
    ObjSource: {
      Name: object.Name,
    },
  };
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", addSource.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addSource(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllSource());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const DeleteSource = (source) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    ObjSource: {
      PK_SID: source.ID,
    },
  };

  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", deleteSource.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(DeleteSource(source));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllSource());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const EditSource = (source) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let data = {
      ObjSource: {
        Name: source.Name,
        PK_SID: source.ID,
      },
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", updateSource.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addSource(source));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllSource());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const GetAllIndividualInvolved = (check) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    if (check) {
      dispatch(setupFormInit());
    }
    // dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", allIndividualInvolved.RequestMethod);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(allIndividualInvolved(check));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(IndividualInvolvedSuccess(response.data.responseResult));
            if (check) {
              dispatch(LOADERFALSE());
            }
          } else {
            dispatch(IndividualInvolvedFail([response.data.responseResult]));
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        dispatch(SomeThingWentWrong(response));
      });
  };
};

const SaveIndividualInvolved = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));

  let Data = {
    ObjIndividualInvolved: {
      Name: object.Name,
    },
  };

  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", addIndividualInvolved.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addIndividualInvolved(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllIndividualInvolved());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const DeleteIndividualInvolved = (individualInvolved) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    ObjIndividualInvolved: {
      PK_IIID: individualInvolved.ID,
    },
  };

  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", deleteIndividualInvolved.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(DeleteIndividualInvolved(individualInvolved));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllIndividualInvolved());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const EditIndividualInvolved = (individualInvolved) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let data = {
      ObjIndividualInvolved: {
        Name: individualInvolved.Name,
        PK_IIID: individualInvolved.ID,
      },
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", updateIndividualInvolved.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addIndividualInvolved(individualInvolved));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllIndividualInvolved());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const GetAllChannel = (check) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    if (check) {
      dispatch(setupFormInit());
    }
    let form = new FormData();
    form.append("RequestMethod", allChannel.RequestMethod);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(allChannel());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(ChannelSuccess(response.data.responseResult));
            if (check) {
              dispatch(LOADERFALSE());
            }
          } else {
            dispatch(ChannelFail([response.data.responseResult]));
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const SaveChannel = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));

  let Data = {
    ObjChannel: {
      Name: object.Name,
    },
  };

  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", addChannel.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addChannel(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllChannel());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const DeleteChannel = (channel) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    ObjChannel: {
      PK_CID: channel.ID,
    },
  };

  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", deleteChannel.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(DeleteChannel(channel));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllChannel());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const EditChannel = (channel) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let data = {
      ObjChannel: {
        Name: channel.Name,
        PK_CID: channel.ID,
      },
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", updateChannel.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addChannel(channel));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllChannel());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const GetAllFraudNotAFraud = (check) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    if (check) {
      dispatch(setupFormInit());
    }
    // dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", allFraudNotAFraud.RequestMethod);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(allFraudNotAFraud(check));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(FraudNotAFraudSuccess(response.data.responseResult));
            if (check) {
              dispatch(LOADERFALSE());
            }
          } else {
            dispatch(FraudNotAFraudFail([response.data.responseResult]));

            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const SaveFraudNotAFraud = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));

  let Data = {
    ObjFraudNOTFraud: {
      Name: object.Name,
    },
  };

  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", addFraudNotAFraud.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addFraudNotAFraud(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllFraudNotAFraud());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const DeleteFraudNotAFraud = (fraudNotAFraud) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    ObjFraudNOTFraud: {
      PK_FNFID: fraudNotAFraud.ID,
    },
  };

  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", deleteFraudNotAFraud.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(DeleteFraudNotAFraud(fraudNotAFraud));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllFraudNotAFraud());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const EditFraudNotAFraud = (fraudNotAFraud) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let data = {
      ObjFraudNOTFraud: {
        Name: fraudNotAFraud.Name,
        PK_FNFID: fraudNotAFraud.ID,
      },
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", updateFraudNotAFraud.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addFraudNotAFraud(fraudNotAFraud));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllFraudNotAFraud());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const GetAllCompanySegment = (check) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    if (check) {
      dispatch(setupFormInit());
    }
    let form = new FormData();
    form.append("RequestMethod", allCompanySegment.RequestMethod);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(allCompanySegment(check));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(CompanySegmentSuccess(response.data.responseResult));
            if (check) {
              dispatch(LOADERFALSE());
            }
          } else {
            dispatch(CompanySegmentFail([response.data.responseResult]));
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const SaveCompanySegment = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));

  let Data = {
    ObjCompanySegment: {
      Name: object.Name,
    },
  };

  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", addCompanySegment.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addCompanySegment(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllCompanySegment());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const DeleteCompanySegment = (companySegment) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    ObjCompanySegment: {
      PK_CSGID: companySegment.ID,
    },
  };

  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", deleteCompanySegment.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(DeleteCompanySegment(companySegment));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllCompanySegment());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const EditCompanySegment = (companySegment) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let data = {
      ObjCompanySegment: {
        Name: companySegment.Name,
        PK_CSGID: companySegment.ID,
      },
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", updateCompanySegment.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addCompanySegment(companySegment));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllCompanySegment());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const GetAllForgedDocuments = (check) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    // dispatch(setupFormInit());
    if (check) {
      dispatch(setupFormInit());
    }
    let form = new FormData();
    form.append("RequestMethod", allForgedDocuments.RequestMethod);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(allForgedDocuments(check));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(ForgedDocumentsSuccess(response.data.responseResult));
            if (check) {
              dispatch(LOADERFALSE());
            }
          } else {
            dispatch(ForgedDocumentsFail([response.data.responseResult]));
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const SaveForgedDocuments = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));

  let Data = {
    ObjForgedDocuments: {
      Name: object.Name,
    },
  };

  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", addForgedDocuments.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addForgedDocuments(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllForgedDocuments());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const DeleteForgedDocuments = (forgedDocuments) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    ObjForgedDocuments: {
      PK_FDID: forgedDocuments.ID,
    },
  };

  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", deleteForgedDocuments.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(DeleteForgedDocuments(forgedDocuments));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllForgedDocuments());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const EditForgedDocuments = (forgedDocuments) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let data = {
      ObjForgedDocuments: {
        Name: forgedDocuments.Name,
        PK_FDID: forgedDocuments.ID,
      },
    };

    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", updateForgedDocuments.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addForgedDocuments(forgedDocuments));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllForgedDocuments());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const GetAllSourceOfIBChannelCreation = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", allSourceOfIBChannelCreation.RequestMethod);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(allSourceOfIBChannelCreation());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              SourceOfIBChannelCreationSuccess(response.data.responseResult)
            );
          } else {
            dispatch(
              SourceOfIBChannelCreationFail([response.data.responseResult])
            );
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const SaveSourceOfIBChannelCreation = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));

  let Data = {
    ObjSourceOfIBChannelCreation: {
      Name: object.Name,
    },
  };

  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", addSourceOfIBChannelCreation.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addSourceOfIBChannelCreation(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllSourceOfIBChannelCreation());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const DeleteSourceOfIBChannelCreation = (sourceOfIBChannelCreation) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    ObjSourceOfIBChannelCreation: {
      PK_SIBCCID: sourceOfIBChannelCreation.ID,
    },
  };

  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", deleteSourceOfIBChannelCreation.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(DeleteSourceOfIBChannelCreation(sourceOfIBChannelCreation));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllSourceOfIBChannelCreation());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const EditSourceOfIBChannelCreation = (sourceOfIBChannelCreation) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let data = {
      ObjSourceOfIBChannelCreation: {
        Name: sourceOfIBChannelCreation.Name,
        PK_SIBCCID: sourceOfIBChannelCreation.ID,
      },
    };

    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", updateSourceOfIBChannelCreation.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addSourceOfIBChannelCreation(sourceOfIBChannelCreation));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllSourceOfIBChannelCreation());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const GetAllCity = (flag) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    // dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", allCity.RequestMethod);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(allCity());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(CitySuccess(response.data.responseResult));
            if (flag === true) {
            } else {
              // dispatch(LOADERFALSE());
            }
          } else {
            dispatch(CityFail(response.data.responseResult));
            dispatch(LOADERFALSE());
          }
        }
        // dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const SaveCity = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));

  let Data = {
    ObjCity: {
      Name: object.Name,
      Code: parseInt(object.Code),
    },
  };

  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", addCity.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addCity(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllCity());
          } else {
            dispatch(setupFormFail());
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(setupFormFail());
          dispatch(
            ShowNotification(response.data.responseResult.responseMessage)
          );
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const DeleteCity = (city) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    ObjCity: {
      PK_CTID: city.ID,
    },
  };

  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", deleteCity.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(DeleteCity(city));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllCity());
          } else {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );

            // dispatch(setupFormFail());
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const EditCity = (city) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let data = {
      ObjCity: {
        Code: parseInt(city.Code),
        Name: city.Name,
        PK_CTID: city.ID,
      },
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", updateCity.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addCity(city));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllCity());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const GetAllRegion = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", allRegion.RequestMethod);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(allRegion());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(RegionSuccess(response.data.responseResult));
          } else {
            dispatch(RegionFail(response.data.responseResult));
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const SaveRegion = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));

  let Data = {
    ObjRegion: {
      Name: object.Name,
      Code: parseInt(object.Code),
    },
  };
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", addRegion.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addRegion(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllRegion());
          } else {
            dispatch(LOADERFALSE());
            dispatch(setupFormFail());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const DeleteRegion = (region) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    ObjRegion: {
      PK_RID: region.ID,
    },
  };

  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", deleteRegion.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(DeleteRegion(region));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllRegion());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const EditRegion = (region) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let data = {
      ObjRegion: {
        Code: parseInt(region.Code),
        Name: region.Name,
        PK_RID: region.ID,
      },
    };

    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", updateRegion.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addRegion(region));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllRegion());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const GetAllCityAndRegionMapping = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", allCityAndRegionMapping.RequestMethod);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(allCityAndRegionMapping());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(CityAndRegionMappingSuccess(response.data.responseResult));
          } else {
            dispatch(CityAndRegionMappingFail(response.data.responseResult));
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const SaveCityAndRegionMapping = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));

  let Data = {
    ObjCRM: {
      Fk_CTID: parseInt(object.Fk_CTID),
      Fk_RID: parseInt(object.Fk_RID),
    },
  };
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", addCityAndRegionMapping.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addCityAndRegionMapping(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllCityAndRegionMapping());
          } else {
            dispatch(setupFormFail());
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const DeleteCityAndRegionMapping = (cityAndRegionMapping) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    ObjCRM: {
      PK_CRMID: cityAndRegionMapping,
    },
  };

  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", deleteCityAndRegionMapping.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(deleteCityAndRegionMapping(cityAndRegionMapping));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllCityAndRegionMapping());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const EditCityAndRegionMapping = (cityAndRegionMapping, CRMID) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let data = {
      ObjCRM: {
        PK_CRMID: parseInt(CRMID),
        Fk_CTID: parseInt(cityAndRegionMapping.Fk_CTID),
        Fk_RID: parseInt(cityAndRegionMapping.Fk_RID),
      },
    };

    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", updateCityAndRegionMapping.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addCityAndRegionMapping(cityAndRegionMapping));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllCityAndRegionMapping());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const GetAllUserRoles = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", allUserRoles.RequestMethod);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(allUserRoles());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(UserRolesSuccess(response.data.responseResult));
          } else {
            dispatch(UserRolesFail(response.data.responseResult));
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const GetAllRoles = () => {
  // let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", allUserRoles.RoleManager);
    axios({
      method: "post",
      url: authenticationApi,
      data: form,
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetAllRoles());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(UserRolesSuccess(response.data.responseResult));
          } else {
            dispatch(UserRolesFail(response.data.responseResult));
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const GetAllEscalationMatrix = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", allEscalationMatrix.RequestMethod);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(allEscalationMatrix());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(EscalationMatrixSuccess(response.data.responseResult));
          } else {
            dispatch(EscalationMatrixFail(response.data.responseResult));
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const SaveEscalationMatrix = (object, object1) => {
  let token = JSON.parse(localStorage.getItem("token"));

  let Data = {
    Days: parseInt(object.Days),
    UserRoleIDs: object1,
  };
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", addEscalationMatrix.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addEscalationMatrix(object, object1));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllEscalationMatrix());
          } else {
            dispatch(setupFormFail());
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const DeleteEscalationMatrix = (escalationMatrix) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    ObjEMD: {
      PK_EMID: escalationMatrix,
    },
  };

  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", deleteEscalationMatrix.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(deleteEscalationMatrix(escalationMatrix));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllEscalationMatrix());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const EditEscalationMatrix = (PK_EMID, escalationMatrix, userRoles) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let data = {
      PK_EMID: parseInt(userRoles),
      Days: parseInt(PK_EMID.Days),
      UserRoleIDs: escalationMatrix,
    };

    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", updateEscalationMatrix.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addEscalationMatrix(escalationMatrix, userRoles));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllEscalationMatrix());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const GetAllApprovalReasons = (check) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    if (check) {
      dispatch(setupFormInit());
    }
    let form = new FormData();
    form.append("RequestMethod", allApprovalReasons.RequestMethod);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(allApprovalReasons(check));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (check) {
              dispatch(ApprovalReasonsSuccess(response.data.responseResult));
            } else {
              dispatch(ApprovalReasonsSuccess(response.data.responseResult));
            }
          } else {
            dispatch(ApprovalReasonsFail([response.data.responseResult]));
            dispatch(LOADERFALSE());
          }
        } else {
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const SaveApprovalReasons = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));

  let Data = {
    ObjAR: {
      Reason: object.Reason,
    },
  };

  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", addApprovalReasons.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addApprovalReasons(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllApprovalReasons());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const DeleteApprovalReasons = (approvalReasons) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    ObjAR: {
      PK_ARID: approvalReasons.ID,
    },
  };

  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", deleteApprovalReasons.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(DeleteApprovalReasons(approvalReasons));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllApprovalReasons());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const EditApprovalReasons = (approvalReasons) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let data = {
      ObjAR: {
        Reason: approvalReasons.Reason,
        PK_ARID: approvalReasons.ID,
      },
    };

    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", updateApprovalReasons.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addApprovalReasons(approvalReasons));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllApprovalReasons());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const GetAllRejectionReasons = (check) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    if (check) {
      dispatch(setupFormInit());
    }
    let form = new FormData();
    form.append("RequestMethod", allRejectionReasons.RequestMethod);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(allRejectionReasons(check));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (check) {
              dispatch(RejectionReasonsSuccess(response.data.responseResult));
            } else {
              dispatch(RejectionReasonsSuccess(response.data.responseResult));
            }
          } else {
            dispatch(RejectionReasonsFail([response.data.responseResult]));
            dispatch(LOADERFALSE());
          }
        } else {
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const SaveRejectionReasons = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));

  let Data = {
    ObjRR: {
      Reason: object.Reason,
    },
  };

  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", addRejectionReasons.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addRejectionReasons(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllRejectionReasons());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const DeleteRejectionReasons = (rejectionReasons) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    ObjRR: {
      PK_RRID: rejectionReasons.ID,
    },
  };

  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", deleteRejectionReasons.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(DeleteRejectionReasons(rejectionReasons));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllRejectionReasons());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const EditRejectionReasons = (rejectionReasons) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let data = {
      ObjRR: {
        Reason: rejectionReasons.Reason,
        PK_RRID: rejectionReasons.ID,
      },
    };

    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", updateRejectionReasons.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(addRejectionReasons(rejectionReasons));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllRejectionReasons());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};
const TransactionTypesSuccess = (response) => {
  return {
    type: actions.GET_TRANSACTIONTYPES_UNIT_SUCCESS,
    response: response,
  };
};

const TransactionTypesFail = (response) => {
  return {
    type: actions.GET_TRANSACTIONTYPES_UNIT_FAIL,
    response: response,
  };
};

const GetAllTransactionTypes = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));

  let uid;
  if (object !== undefined && object !== null) {
    uid = object;
  } else {
    uid = 0;
  }
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", getAllTransactionTypes.RequestMethod);
    form.append("RequestData", uid);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(getAllTransactionTypes());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(TransactionTypesSuccess(response.data.responseResult));
          } else {
            dispatch(TransactionTypesFail(response.data.responseResult));
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

//Dispute Cases System Admin
//PendingForApprovalSuccess
const GetPendingForDeletionSuccess = (response) => {
  return {
    type: actions.GET_PENDINGFORDELETIONSA_UNIT_SUCCESS,
    response: response,
  };
};
//PendingForApprovalSuccess
const GetPendingForDeletionFail = (response) => {
  return {
    type: actions.GET_PENDINGFORDELETIONSA_UNIT_FAIL,
    response: response,
  };
};

//SaveApprovalSuccess
const SavePendingForDeletionSuccess = (response) => {
  return {
    type: actions.SAVE_PENDINGFORDELETIONSA_SUCCESS,
    response: response,
  };
};

//SaveApprovalFail
const SavePendingForDeletionFail = (response) => {
  return {
    type: actions.SAVE_PENDINGFORDELETIONSA_FAIL,
    response: response,
  };
};

//SaveApprovalSuccess
const SaveInProcessSuccess = (response) => {
  return {
    type: actions.SAVE_INPROCESSSA_SUCCESS,
    response: response,
  };
};

//SaveApprovalFail
const SaveInProcessFail = (response) => {
  return {
    type: actions.SAVE_INPROCESSSA_FAIL,
    response: response,
  };
};

//Get All Pending For Approval By ID
const GetAllPendingForDeletionByID = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    TransactionTypeUser: {
      FK_GSSUserID: 4,
    },
  };
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", getForDeletion.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetAllPendingForDeletionByID(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              GetPendingForDeletionSuccess(response.data.responseResult)
            );
          } else {
            dispatch(GetPendingForDeletionFail(response.data.responseResult));
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(GetPendingForDeletionFail(response.data));
          dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        dispatch(SomeThingWentWrong(response));
      });
  };
};

//SaveApproval
const SavePendingForDeletion = (object) => {
  let UserID = JSON.parse(localStorage.getItem("UserDetails"));
  let userid = UserID.userID;
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let Data = {
      IsApproved: false,
      FK_TTID: object.FK_TTID,
      FK_DID: object.FK_DID,
      Comments: object.Comments,
      FK_AORID: object.FK_AORID,
    };
    dispatch(setupFormInit());
    let form = new FormData();
    form.append(
      "RequestMethod",
      savePendingForDeletionSystemAdmin.RequestMethod
    );
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SavePendingForDeletion(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              SavePendingForDeletionSuccess(response.data.responseResult)
            );
            await dispatch(GetAllPendingForDeletionSystemAdmin(userid));
          } else {
            dispatch(SavePendingForDeletionFail(response.data.responseResult));
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(SavePendingForDeletionFail(response.data));
          dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        dispatch(SomeThingWentWrong(response));
      });
  };
};

//SaveRejection
const SaveInProcess = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let UserID = JSON.parse(localStorage.getItem("UserDetails"));
  let userid = UserID.userID;
  return (dispatch) => {
    let Data = {
      IsApproved: false,
      FK_TTID: object.FK_TTID,
      FK_DID: object.FK_DID,
      Comments: object.Comments,
      FK_AORID: object.FK_AORID,
    };

    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", saveInProcess.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SaveInProcess(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(SaveInProcessSuccess(response.data.responseResult));
            await dispatch(GetAllPendingForDeletionSystemAdmin(userid));
          } else {
            dispatch(SaveInProcessFail(response.data.responseResult));
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(SaveInProcessFail(response.data));
          dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const SearchDeleteDisputeCaseSuccess = (response) => {
  return {
    type: actions.SEARCH_DELETEDISPUTECASES_UNIT_SUCCESS,
    response: response,
  };
};

const SearchDeleteDisputeCaseFail = (response) => {
  return {
    type: actions.SEARCH_DELETEDISPUTECASES_UNIT_FAIL,
    response: response,
  };
};

//Search All Dispute Cases (VIEW)
const SearchDeleteCases = (object, State) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    TransactionTypeIDs: object.TransactionTypeIDs,
    ReferenceNumber: object.ReferenceNumber,
    CNIC: object.CNIC,
    from: State.from,
    to: State.to,
  };
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", searchDeleteDisputes.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(SearchDeleteCases(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            await dispatch(
              SearchDeleteDisputeCaseSuccess(response.data.responseResult)
            );
          } else {
            dispatch(SearchDeleteDisputeCaseFail(response.data.responseResult));
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(SearchDeleteDisputeCaseFail(response.data.responseResult));
          dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

//Reset Table View Cases
const resetDisputeTable = (response) => {
  return {
    type: actions.RESET_SYSTEMADMINVIEW_DISPUTE,
    response: response,
  };
};
//  pending for deletion for qm
const GetAllPendingForDeletionSystemAdmin = (object, check) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    TransactionTypeUser: {
      FK_GSSUserID: object,
    },
  };
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", getAllPendingForDeletion.RequestMethod);
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
          dispatch(GetAllPendingForDeletionSystemAdmin(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (check !== undefined && check === true) {
              dispatch(
                GetPendingForDeletionSuccess(response.data.responseResult)
              );
            } else {
              dispatch(
                GetPendingForDeletionSuccess(response.data.responseResult)
              );
              dispatch(LOADERFALSE());
            }
          } else {
            dispatch(GetPendingForDeletionFail(response.data.responseResult));
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(GetPendingForDeletionFail(response.data));
          dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

//Status Successors
const StatusSuccess = (response) => {
  return {
    type: actions.GET_STATUS_UNIT_SUCCESS,
    response: response,
  };
};

const StatusFail = (response) => {
  return {
    type: actions.GET_STATUS_UNIT_FAIL,
    response: response,
  };
};

//Get All Status
const GetAllStatus = (data, flag) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", getAllStatus.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetAllStatus(data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(StatusSuccess(response.data.responseResult));
            if (flag === true) {
            } else {
              dispatch(LOADERFALSE());
            }
          } else {
            dispatch(StatusFail([response.data.responseResult]));
            dispatch(LOADERFALSE());
          }
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

//Actions Successors
const ActionSuccess = (response) => {
  return {
    type: actions.GET_ACTION_UNIT_SUCCESS,
    response: response,
  };
};

const ActionFail = (response) => {
  return {
    type: actions.GET_ACTION_UNIT_FAIL,
    response: response,
  };
};

//Get All Actions
const GetAllActions = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", getAllActions.RequestMethod);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(GetAllActions());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(ActionSuccess(response.data.responseResult));
          } else {
            dispatch(ActionFail(response.data.responseResult));
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

//Holiday Setup Form
const HolidaySuccess = (response) => {
  return {
    type: actions.GET_HOLIDAY_UNIT_SUCCESS,
    response: response,
  };
};

const HolidayFail = (response) => {
  return {
    type: actions.GET_HOLIDAY_UNIT_FAIL,
    response: response,
  };
};

const GetAllHoliday = (check) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    if (check) {
      dispatch(setupFormInit());
    }
    // dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", allHoliday.RequestMethod);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(allHoliday(check));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(HolidaySuccess(response.data.responseResult));
            if (check) {
              dispatch(LOADERFALSE());
            }
          } else {
            dispatch(HolidayFail([response.data.responseResult]));
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const SaveHoliday = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));

  let Data = {
    ObjOfficialHoliday: {
      HolidayName: object.HolidayName,
      DateOfHoliday: object.DateOfHoliday,
    },
  };

  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", saveHoliday.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(saveHoliday(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllHoliday());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const DeleteHoliday = (holiday) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    ObjOfficialHoliday: {
      PK_OHID: holiday.PK_OHID,
    },
  };

  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", deleteHoliday.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(DeleteHoliday(holiday));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllHoliday());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const EditHoliday = (holiday) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let data = {
      ObjOfficialHoliday: {
        HolidayName: holiday.HolidayName,
        DateOfHoliday: holiday.DateOfHoliday,
        PK_OHID: holiday.PK_OHID,
      },
    };

    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", updateHoliday.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(saveHoliday(holiday));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllHoliday());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

//Case Decision Form
const CaseDecisionSuccess = (response) => {
  return {
    type: actions.GET_CASEDECISION_UNIT_SUCCESS,
    response: response,
  };
};

const CaseDecisionFail = (response) => {
  return {
    type: actions.GET_CASEDECISION_UNIT_FAIL,
    response: response,
  };
};

const GetAllCaseDecision = () => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    // dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", allCaseDecision.RequestMethod);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(allCaseDecision());
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(CaseDecisionSuccess(response.data.responseResult));
          } else {
            dispatch(CaseDecisionFail(response.data.responseResult));
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const SaveCaseDecision = (object) => {
  let token = JSON.parse(localStorage.getItem("token"));

  let Data = {
    ObjCaseDecision: {
      Name: object.Name,
    },
  };

  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", saveCaseDecision.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(saveCaseDecision(object));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllCaseDecision());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const DeleteCaseDecision = (caseDecision) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let Data = {
    ObjCaseDecision: {
      PK_CDEID: caseDecision.PK_CDEID,
    },
  };
  return (dispatch) => {
    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", deleteCaseDecision.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(DeleteCaseDecision(caseDecision));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllCaseDecision());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

const EditCaseDecision = (caseDecision) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    let data = {
      ObjCaseDecision: {
        PK_CDEID: caseDecision.PK_CDEID,
        Name: caseDecision.Name,
      },
    };

    dispatch(setupFormInit());
    let form = new FormData();
    form.append("RequestMethod", updateCaseDecision.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(saveCaseDecision(caseDecision));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              ShowNotification(response.data.responseResult.responseMessage)
            );
            dispatch(GetAllCaseDecision());
          } else {
            dispatch(LOADERFALSE());
          }
        }
        dispatch(LOADERFALSE());
      })
      .catch((response) => {
        dispatch(setupFormFail());

        dispatch(SomeThingWentWrong(response));
      });
  };
};

//Transaction Currency Code
const TransactionCurrencyCodeSuccess = (response) => {
  return {
    type: actions.GET_TRANSACTIONCURRENCYCODE_UNIT_SUCCESS,
    response: response,
  };
};

const TransactionCurrencyCodeFail = (response) => {
  return {
    type: actions.GET_TRANSACTIONCURRENCYCODE_UNIT_FAIL,
    response: response,
  };
};

const GetAllTransactionCurrencyCode = (check) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    if (check) {
      dispatch(setupFormInit());
    }
    let form = new FormData();
    form.append("RequestMethod", allTransactionCurrency.RequestMethod);
    axios({
      method: "post",
      url: SetupFormApi,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(refreshToken());
          dispatch(allTransactionCurrency(check));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            dispatch(
              TransactionCurrencyCodeSuccess(response.data.responseResult)
            );
            if (check) {
              dispatch(LOADERFALSE());
            }
          } else {
            dispatch(TransactionCurrencyCodeFail(response.data.responseResult));
            dispatch(LOADERFALSE());
          }
        } else {
          dispatch(LOADERFALSE());
        }
      })
      .catch((response) => {
        dispatch(setupFormFail());
        dispatch(SomeThingWentWrong(response));
      });
  };
};

export {
  GetAllHoliday,
  SaveHoliday,
  DeleteHoliday,
  EditHoliday,
  GetAllCaseDecision,
  SaveCaseDecision,
  DeleteCaseDecision,
  EditCaseDecision,
  GetBorrowerType,
  AddBorrowerType,
  EditBorrowerType,
  DeleteBorrowerType,
  GetAdvanceClassification,
  AddAdvanceClassification,
  EditAdvanceClassification,
  DeleteAdvanceClassification,
  GetManagementUnit,
  AddManagementUnit,
  EditManagementUnit,
  DeleteManagementUnit,
  GetNatureofCharge,
  AddNatureofCharge,
  EditNatureofCharge,
  DeleteNatureofCharge,
  GetNatureOfSecurity,
  AddNatureOfSecurity,
  EditNatureOfSecurity,
  DeleteNatureOfSecurity,
  GetWOFReason,
  AddWOFReason,
  EditWOFReason,
  DeleteWOFReason,
  GetApprovalReason,
  AddApprovalReason,
  EditApprovalReason,
  DeleteApprovalReason,
  GetRejectionReason,
  AddRejectionReason,
  EditRejectionReason,
  DeleteRejectionReason,
  SearchBorrowerType,
  SearchManagementUnit,
  SearchAddvanceClassification,
  SearchNatureOfCharge,
  SearchNatureOfSecurity,
  SearchWOFReason,
  SearchApprovalReason,
  SearchRejectionReason,
  GetApprovalFlow,
  DeleteApprovalFlow,
  SearchApprovalFlow,
  GetApprovalFlowForEdit,
  UpdateApprovalFlowForEdit,
  DeleteApprovalFlowForEdit,
  HideNotification,
  ShowNotification,
  setRoutingData,
  SaveFraudType,
  GetAllFraudType,
  DeleteFraudType,
  EditFraudType,
  GetAllSource,
  SaveSource,
  DeleteSource,
  EditSource,
  GetAllIndividualInvolved,
  SaveIndividualInvolved,
  DeleteIndividualInvolved,
  EditIndividualInvolved,
  GetAllChannel,
  SaveChannel,
  DeleteChannel,
  EditChannel,
  GetAllFraudNotAFraud,
  SaveFraudNotAFraud,
  DeleteFraudNotAFraud,
  EditFraudNotAFraud,
  GetAllCompanySegment,
  SaveCompanySegment,
  DeleteCompanySegment,
  EditCompanySegment,
  GetAllForgedDocuments,
  SaveForgedDocuments,
  DeleteForgedDocuments,
  EditForgedDocuments,
  GetAllSourceOfIBChannelCreation,
  SaveSourceOfIBChannelCreation,
  DeleteSourceOfIBChannelCreation,
  EditSourceOfIBChannelCreation,
  GetAllCity,
  SaveCity,
  DeleteCity,
  EditCity,
  GetAllRegion,
  SaveRegion,
  DeleteRegion,
  EditRegion,
  GetAllCityAndRegionMapping,
  SaveCityAndRegionMapping,
  DeleteCityAndRegionMapping,
  EditCityAndRegionMapping,
  GetAllUserRoles,
  GetAllEscalationMatrix,
  SaveEscalationMatrix,
  DeleteEscalationMatrix,
  EditEscalationMatrix,
  GetAllApprovalReasons,
  SaveApprovalReasons,
  DeleteApprovalReasons,
  EditApprovalReasons,
  GetAllRejectionReasons,
  SaveRejectionReasons,
  DeleteRejectionReasons,
  EditRejectionReasons,
  GetAllTransactionTypes,
  GetAllPendingForDeletionByID,
  SavePendingForDeletion,
  SaveInProcess,
  SearchDeleteCases,
  resetDisputeTable,
  GetAllRoles,
  GetAllPendingForDeletionSystemAdmin,
  GetAllStatus,
  GetAllActions,
  GetAllTransactionCurrencyCode,
};
