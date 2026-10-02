import * as actions from "../action_types";

const initialState = {
  Loading: false,
  Message: "",
  Success: false,
  Fail: false,
  ShowNotification: false,
  BorrowerTypes: [],
  ClassificationOfAdvances: [],
  ManagementUnits: [],
  NatureofCharges: [],
  NatureOfSecuritys: [],
  WOFReasons: [],
  ApprovalReasons: [],
  RejectionReasons: [],
  ApprovalFlows: [],
  ApprovalFlowsForEdit: {},
  StatusData: [],
  ExistingUserList: [],
  RemainingUserList: [],
  UploadList: [],
  routingData: [],
  FraudTypeData: [],
  SourceData: [],
  IndividualInvolvedData: [],
  ChannelData: [],
  FraudNotAFraudData: [],
  CompanySegmentData: [],
  ForgedDocumentsData: [],
  SourceOfIBChannelCreationData: [],
  CityData: [],
  RegionData: [],
  CityAndRegionMappingData: [],
  EscalationMatrixData: [],
  UserRolesData: [],
  ApprovalReasonsData: [],
  RejectionReasonsData: [],
  TransactionTypesData: [],
  PendingForDeletionSystemAdminData: [],
  SavePendingForDeletionSystemAdmin: [],
  SaveInProcessSystemAdminData: [],
  ViewDeleteDisputeCasesData: [],
  ActionData: [],
  HolidayData: [],
  CaseDecisionData: [],
  TransactionCurrencyCodeData: [],
};

const SetupFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_LOADER_FALSE:
      return { ...state, Loading: false };
    case actions.GET_SETUP_FORM_INIT:
      return { ...state, Loading: true };
    case actions.GET_SETUP_FORM_FAIL:
      return { ...state, Loading: false, Fail: true };
    case actions.GET_BORROWER_TYPE_SUCCESS:
      return {
        ...state,
        Loading: false,
        Success: true,
        BorrowerTypes: action.response,
      };
    case actions.ACTIONS_APPROVAL_FLOW_FOR_EDIT_SUCCESS:
      return {
        ...state,
        ExistingUserList: action.ExistingUserList,
        RemainingUserList: action.RemainingUserList,
      };
    case actions.GET_ADVANCE_CLASSIFICATION_SUCCESS:
      return {
        ...state,
        Loading: false,
        Success: true,
        ClassificationOfAdvances: action.response,
      };
    case actions.GET_MANAGEMENT_UNIT_SUCCESS:
      return {
        ...state,
        Loading: false,
        Success: true,
        ManagementUnits: action.response,
      };
    case actions.GET_NATURE_OF_CHARGE_SUCCESS:
      return {
        ...state,
        Loading: false,
        Success: true,
        NatureofCharges: action.response,
      };
    case actions.GET_NATURE_OF_SECURITY_SUCCESS:
      return {
        ...state,
        Loading: false,
        Success: true,
        NatureOfSecuritys: action.response,
      };
    case actions.GET_APPROVAL_REASON_SUCCESS:
      return {
        ...state,
        Loading: false,
        Success: true,
        ApprovalReasons: action.response,
      };
    case actions.GET_REJECTION_REASON_SUCCESS:
      return {
        ...state,
        Loading: false,
        Success: true,
        RejectionReasons: action.response,
      };
    case actions.GET_APPROVAL_FLOW_SUCCESS:
      return {
        ...state,
        Loading: false,
        Success: true,
        ApprovalFlows: action.response,
      };
    case actions.GET_APPROVAL_FLOW_FOR_EDIT_SUCCESS:
      return {
        ...state,
        ApprovalFlowsForEdit: action.ApprovalFlowsForEdit,
        ExistingUserList: action.ExistingUserList,
        RemainingUserList: action.RemainingUserList,
      };
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
    case actions.GET_FRAUD_UNIT_INIT:
      return { ...state, Loading: true };
    case actions.GET_FRAUD_UNIT_SUCCESS:
      let FraudArray = action.response.fraudTypes.map((item, index) => {
        return { ...item, key: index };
      });
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        FraudTypeData: FraudArray,
      };
    case actions.GET_FRAUD_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        FraudTypeData: [],
      };

    case actions.GET_SOURCE_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_SOURCE_UNIT_SUCCESS:
      let SourceArray = action.response.source.map((item, index) => {
        return { ...item, key: index };
      });
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        SourceData: SourceArray,
      };

    case actions.GET_SOURCE_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        SourceData: [],
      };

    case actions.GET_INDIVIDUALINVOLVED_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_INDIVIDUALINVOLVED_UNIT_SUCCESS:
      let IndividualInvolvedArray = action.response.individualInvolved.map(
        (item, index) => {
          return { ...item, key: index };
        }
      );
      return {
        ...state,
        // Loading: false,
        ResponseMessage: action.response.responseMessage,
        IndividualInvolvedData: IndividualInvolvedArray,
      };

    case actions.GET_INDIVIDUALINVOLVED_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        IndividualInvolvedData: action.response.individualInvolved,
      };

    case actions.GET_CHANNEL_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_CHANNEL_UNIT_SUCCESS:
      let ChannelArray = action.response.channel.map((item, index) => {
        return { ...item, key: index };
      });
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        ChannelData: ChannelArray,
      };

    case actions.GET_CHANNEL_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        ChannelData: action.response.channel,
      };

    case actions.GET_FRAUDNOTAFRAUD_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_FRAUDNOTAFRAUD_UNIT_SUCCESS:
      let FraudNotAFraudArray = action.response.fraudNOTFraud.map(
        (item, index) => {
          return { ...item, key: index };
        }
      );
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        FraudNotAFraudData: FraudNotAFraudArray,
      };

    case actions.GET_FRAUDNOTAFRAUD_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        FraudNotAFraudData: action.response.fraudNOTFraud,
      };

    case actions.GET_COMPANYSEGMENT_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_COMPANYSEGMENT_UNIT_SUCCESS:
      let CompanySegmentArray = action.response.companySegment.map(
        (item, index) => {
          return { ...item, key: index };
        }
      );
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        CompanySegmentData: CompanySegmentArray,
      };

    case actions.GET_COMPANYSEGMENT_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        CompanySegmentData: action.response.companySegment,
      };

    case actions.GET_FORGEDDOCUMENTS_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_FORGEDDOCUMENTS_UNIT_SUCCESS:
      let ForgedDocumentsArray = action.response.forgedDocuments.map(
        (item, index) => {
          return { ...item, key: index };
        }
      );
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        ForgedDocumentsData: ForgedDocumentsArray,
      };

    case actions.GET_FORGEDDOCUMENTS_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        ForgedDocumentsData: action.response.forgedDocuments,
      };

    case actions.GET_SOURCEOFIBCHANNELCREATION_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_SOURCEOFIBCHANNELCREATION_UNIT_SUCCESS:
      let SourceOfIBChannelCreationArray =
        action.response.sourceOfIBChannelCreation.map((item, index) => {
          return { ...item, key: index };
        });
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        SourceOfIBChannelCreationData: SourceOfIBChannelCreationArray,
      };

    case actions.GET_SOURCEOFIBCHANNELCREATION_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        SourceOfIBChannelCreationData:
          action.response.sourceOfIBChannelCreation,
      };

    case actions.GET_CITY_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_CITY_UNIT_SUCCESS:
      let CityArray = action.response.city.map((item, index) => {
        return { ...item, key: index };
      });
      return {
        ...state,
        // Loading: false,
        ResponseMessage: action.response.responseMessage,
        CityData: CityArray,
      };

    case actions.GET_CITY_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        CityData: action.response.city,
      };

    case actions.GET_REGION_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_REGION_UNIT_SUCCESS:
      let RegionArray = action.response.region.map((item, index) => {
        return { ...item, key: index };
      });
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        RegionData: RegionArray,
      };

    case actions.GET_REGION_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        RegionData: action.response.region,
      };

    case actions.GET_CITYANDREGIONMAPPING_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_CITYANDREGIONMAPPING_UNIT_SUCCESS:
      let CityAndRegionMappingArray = action.response.cityRegionMappings.map(
        (item, index) => {
          return { ...item, key: index };
        }
      );
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        CityAndRegionMappingData: CityAndRegionMappingArray,
      };

    case actions.GET_CITYANDREGIONMAPPING_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        CityAndRegionMappingData: action.response.cityRegionMappings,
      };

    case actions.GET_USERROLES_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_USERROLES_UNIT_SUCCESS:
      let roleID;
      if (
        action.response.gssUserRoles !== undefined &&
        action.response.gssUserRoles !== null
      ) {
        roleID = action.response.gssUserRoles;
      } else {
        roleID = action.response.roles;
      }
      let UserRolesArray = roleID.map((item, index) => {
        return { ...item, key: index };
      });
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        UserRolesData: UserRolesArray,
      };

    case actions.GET_USERROLES_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        UserRolesData: action.response.gssUserRoles,
      };

    case actions.GET_ESCALATIONMATRIX_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_ESCALATIONMATRIX_UNIT_SUCCESS:
      let EscalationMatrixArray = action.response.escalationMatrixs.map(
        (item, index) => {
          return { ...item, key: index };
        }
      );
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        EscalationMatrixData: EscalationMatrixArray,
      };

    case actions.GET_ESCALATIONMATRIX_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        EscalationMatrixData: action.response.escalationMatrixs,
      };

    case actions.GET_APPROVALREASONS_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_APPROVALREASONS_UNIT_SUCCESS:
      let ApprovalReasonsArray = action.response.approvalReasons.map(
        (item, index) => {
          return { ...item, key: index };
        }
      );
      return {
        ...state,
        // Loading: false,
        ResponseMessage: action.response.responseMessage,
        ApprovalReasonsData: ApprovalReasonsArray,
      };

    case actions.GET_APPROVALREASONS_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        ApprovalReasonsData: action.response.approvalReasons,
      };

    case actions.GET_REJECTIONREASONS_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_REJECTIONREASONS_UNIT_SUCCESS:
      let RejectionReasonsArray = action.response.rejectionReasons.map(
        (item, index) => {
          return { ...item, key: index };
        }
      );
      return {
        ...state,
        // Loading: false,
        ResponseMessage: action.response.responseMessage,
        RejectionReasonsData: RejectionReasonsArray,
      };

    case actions.GET_REJECTIONREASONS_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        RejectionReasonsData: action.response.rejectionReasons,
      };
    case actions.GET_TRANSACTIONTYPES_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_TRANSACTIONTYPES_UNIT_SUCCESS:
      let TransactionTypesArray = action.response.transactionTypes.map(
        (item, index) => {
          return { ...item, key: index };
        }
      );
      return {
        ...state,
        // Loading: false,
        ResponseMessage: action.response.responseMessage,
        TransactionTypesData: TransactionTypesArray,
      };

    case actions.GET_TRANSACTIONTYPES_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        TransactionTypesData: action.response.transactionTypes,
      };

    case actions.GET_PENDINGFORDELETIONSA_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.GET_PENDINGFORDELETIONSA_UNIT_SUCCESS:
      let PendingForApprovalArray = action.response.pendingForApprovalCases.map(
        (item, index) => {
          return { ...item, key: index };
        }
      );

      return {
        ...state,
        // Loading: false,
        ResponseMessage: action.response.responseMessage,
        PendingForDeletionSystemAdminData: PendingForApprovalArray,
        ShowNotification: true,
      };

    case actions.GET_PENDINGFORDELETIONSA_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage:
          action.response.responseMessage !== undefined &&
          action.response.responseMessage !== null
            ? action.response.responseMessage
            : action.response.responseMessage,
        PendingForDeletionSystemAdminData:
          action.response.pendingForApprovalCases,
        ShowNotification: true,
      };

    case actions.SAVE_PENDINGFORDELETIONSA_SUCCESS:
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        SavePendingForDeletionSystemAdmin: action.response,
      };

    case actions.SAVE_PENDINGFORDELETIONSA_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        SavePendingForDeletionSystemAdmin: action.response,
      };

    case actions.SAVE_INPROCESSSA_SUCCESS:
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        SaveInProcessSystemAdminData: action.response,
      };

    case actions.SAVE_INPROCESSSA_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        SaveInProcessSystemAdminData: action.response,
      };

    case actions.SEARCH_DELETEDISPUTECASES_UNIT_INIT:
      return { ...state, Loading: true };

    case actions.SEARCH_DELETEDISPUTECASES_UNIT_SUCCESS:
      let ViewDeleteDisputeCasesArray = action.response.disputes.map(
        (item, index) => {
          var i = index;
          i = index + 1;
          return { ...item, key: i + "" };
        }
      );
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        ViewDeleteDisputeCasesData: ViewDeleteDisputeCasesArray,
      };

    case actions.SEARCH_DELETEDISPUTECASES_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        ViewDeleteDisputeCasesData: action.response.disputes,
      };

    case actions.RESET_SYSTEMADMINVIEW_DISPUTE:
      localStorage.removeItem("inProgressOnly");
      return {
        ...state,
        Loading: false,
        ResponseMessage: "",
        ViewDeleteDisputeCasesData: [],
      };

    case actions.GET_STATUS_UNIT_SUCCESS:
      let StatusArray = action.response.caseStatus.map((item, index) => {
        return { ...item, key: index };
      });
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        StatusData: StatusArray,
      };

    case actions.GET_STATUS_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        StatusData: [],
      };

    case actions.GET_ACTION_UNIT_SUCCESS:
      let ActionArray = action.response.auditTrailAction.map((item, index) => {
        return { ...item, key: index };
      });
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        ActionData: ActionArray,
      };

    case actions.GET_ACTION_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        ActionData: [],
      };

    case actions.GET_HOLIDAY_UNIT_SUCCESS:
      let HolidayArray = action.response.officialHoliday.map((item, index) => {
        return { ...item, key: index };
      });
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        HolidayData: HolidayArray,
      };

    case actions.GET_HOLIDAY_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        HolidayData: [],
      };

    case actions.GET_CASEDECISION_UNIT_SUCCESS:
      let CaseDecisionArray = action.response.caseDecision.map(
        (item, index) => {
          return { ...item, key: index };
        }
      );
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        CaseDecisionData: CaseDecisionArray,
      };

    case actions.GET_CASEDECISION_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        CaseDecisionData: [],
      };

    case actions.GET_TRANSACTIONCURRENCYCODE_UNIT_SUCCESS:
      let TransactionCurrencyCodeArray =
        action.response.transactionCurrency.map((item, index) => {
          return { ...item, key: index };
        });
      return {
        ...state,
        ResponseMessage: action.response.responseMessage,
        TransactionCurrencyCodeData: TransactionCurrencyCodeArray,
      };

    case actions.GET_TRANSACTIONCURRENCYCODE_UNIT_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response.responseMessage,
        TransactionCurrencyCodeData: [],
      };

    default:
      return { ...state };
  }
};

export default SetupFormReducer;
