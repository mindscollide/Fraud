// Dropdown master data (cities, fraud types, statuses, ...) is fetched once and
// kept in the setupForms store, instead of every page re-fetching it on mount.
//
//   dispatch(ensureLookup("city"))   -> Promise<CityData>
//
// It only hits the API when the store doesn't have that list yet, shares one
// request between callers that ask at the same time, and runs silently (no
// loader, no ResponseMessage change) so it never fights a page's own loader.
// signIn calls preloadLookups() so most lists are already there by the time a
// page asks; after a browser reload the first page that needs a list loads it.
//
// System Admin setup pages (City, Fraud Type, ...) still call GetAllX directly
// for their own list, and their add/edit/delete refetches keep the store fresh.
import axios from "axios";
import * as actions from "../action_types";
import { SetupFormApi } from "../../Common/Api/apis-end-points";
import {
  allCity,
  allRegion,
  allFraudType,
  allSource,
  allCaseDecision,
  allTransactionCurrency,
  allSourceOfIBChannelCreation,
  allChannel,
  allIndividualInvolved,
  allFraudNotAFraud,
  allForgedDocuments,
  allCompanySegment,
  allApprovalReasons,
  allRejectionReasons,
  getAllStatus,
  getAllTransactionTypes,
} from "../../Common/Api/apis-config";
import { refreshToken } from "./auth-actions";

// name -> RequestMethod, success action type, setupForms slot it fills.
// `body` is only for lookups that take a parameter; those share one slot
// between variants, so they're cached per parameter (see ensureLookup).
const LOOKUPS = {
  city: { api: allCity, type: actions.GET_CITY_UNIT_SUCCESS, slot: "CityData" },
  region: { api: allRegion, type: actions.GET_REGION_UNIT_SUCCESS, slot: "RegionData" },
  fraudType: { api: allFraudType, type: actions.GET_FRAUD_UNIT_SUCCESS, slot: "FraudTypeData" },
  source: { api: allSource, type: actions.GET_SOURCE_UNIT_SUCCESS, slot: "SourceData" },
  caseDecision: { api: allCaseDecision, type: actions.GET_CASEDECISION_UNIT_SUCCESS, slot: "CaseDecisionData" },
  transactionCurrency: {
    api: allTransactionCurrency,
    type: actions.GET_TRANSACTIONCURRENCYCODE_UNIT_SUCCESS,
    slot: "TransactionCurrencyCodeData",
  },
  sourceOfIB: {
    api: allSourceOfIBChannelCreation,
    type: actions.GET_SOURCEOFIBCHANNELCREATION_UNIT_SUCCESS,
    slot: "SourceOfIBChannelCreationData",
  },
  channel: { api: allChannel, type: actions.GET_CHANNEL_UNIT_SUCCESS, slot: "ChannelData" },
  individualInvolved: {
    api: allIndividualInvolved,
    type: actions.GET_INDIVIDUALINVOLVED_UNIT_SUCCESS,
    slot: "IndividualInvolvedData",
  },
  fraudNotAFraud: {
    api: allFraudNotAFraud,
    type: actions.GET_FRAUDNOTAFRAUD_UNIT_SUCCESS,
    slot: "FraudNotAFraudData",
  },
  forgedDocuments: {
    api: allForgedDocuments,
    type: actions.GET_FORGEDDOCUMENTS_UNIT_SUCCESS,
    slot: "ForgedDocumentsData",
  },
  companySegment: {
    api: allCompanySegment,
    type: actions.GET_COMPANYSEGMENT_UNIT_SUCCESS,
    slot: "CompanySegmentData",
  },
  approvalReasons: {
    api: allApprovalReasons,
    type: actions.GET_APPROVALREASONS_UNIT_SUCCESS,
    slot: "ApprovalReasonsData",
  },
  rejectionReasons: {
    api: allRejectionReasons,
    type: actions.GET_REJECTIONREASONS_UNIT_SUCCESS,
    slot: "RejectionReasonsData",
  },
  // param: { IsNegativeDatabase: true | false }
  status: {
    api: getAllStatus,
    type: actions.GET_STATUS_UNIT_SUCCESS,
    slot: "StatusData",
    body: (param) => JSON.stringify(param),
  },
  // param: userID (0 = every transaction type)
  transactionTypes: {
    api: getAllTransactionTypes,
    type: actions.GET_TRANSACTIONTYPES_UNIT_SUCCESS,
    slot: "TransactionTypesData",
    body: (param) => (param !== undefined && param !== null ? param : 0),
  },
};

// The disputes channel/fraud dropdown group most search & add pages use together.
const DISPUTE_LOOKUPS = [
  "channel",
  "individualInvolved",
  "fraudNotAFraud",
  "forgedDocuments",
  "companySegment",
];

let inFlight = {}; // key -> Promise, shared by callers asking at the same time
let responses = {}; // key -> responseResult, for parameterised lookups
let shown = {}; // slot -> { key, data } the parameterised variant now in the store

const keyOf = (name, param) =>
  LOOKUPS[name].body ? `${name}:${JSON.stringify(param ?? null)}` : name;

const request = (def, param, dispatch, retried) => {
  const form = new FormData();
  form.append("RequestMethod", def.api.RequestMethod);
  if (def.body) form.append("RequestData", def.body(param));
  return axios({
    method: "post",
    url: SetupFormApi,
    data: form,
    headers: { _token: JSON.parse(localStorage.getItem("token")) },
  }).then(async (response) => {
    if (response.data.responseCode === 417 && !retried) {
      await dispatch(refreshToken());
      return request(def, param, dispatch, true);
    }
    const result = response.data.responseResult;
    return response.data.responseCode === 200 && result && result.isExecuted === true
      ? result
      : null;
  });
};

// Puts a response into the store without touching Loading or ResponseMessage
// (some pages show a notification whenever ResponseMessage changes).
const apply = (def, key, result, dispatch, getState) => {
  dispatch({
    type: def.type,
    silent: true,
    response: { ...result, responseMessage: getState().setupForms.ResponseMessage },
  });
  const data = getState().setupForms[def.slot];
  if (def.body) shown[def.slot] = { key, data };
  return data;
};

const ensureLookup = (name, param) => (dispatch, getState) => {
  const def = LOOKUPS[name];
  const key = keyOf(name, param);
  const current = getState().setupForms[def.slot];

  if (def.body) {
    // Same slot, different variants: only reuse it if it still holds ours.
    const s = shown[def.slot];
    if (s && s.key === key && s.data === current) return Promise.resolve(current);
    if (responses[key]) return Promise.resolve(apply(def, key, responses[key], dispatch, getState));
  } else if (Array.isArray(current) && current.length > 0) {
    return Promise.resolve(current);
  }

  if (!inFlight[key]) {
    inFlight[key] = request(def, param, dispatch)
      .then((result) => {
        if (!result) return getState().setupForms[def.slot];
        if (def.body) responses[key] = result;
        return apply(def, key, result, dispatch, getState);
      })
      // A failed lookup leaves the dropdown empty; the next ensureLookup retries.
      .catch(() => getState().setupForms[def.slot])
      .finally(() => {
        delete inFlight[key];
      });
  }
  return inFlight[key];
};

// Fired (not awaited) right after login with the lists that role's pages use.
const preloadLookups = (roleID) => (dispatch) => {
  let userID = 0;
  try {
    userID = JSON.parse(localStorage.getItem("UserDetails")).userID;
  } catch (e) {}

  let names = [];
  let extra = [];
  switch (Number(roleID)) {
    case 2: // System Admin
      names = [...DISPUTE_LOOKUPS, "approvalReasons", "rejectionReasons", "region"];
      extra = [["transactionTypes", userID]];
      break;
    case 3: // Investigation Officer
      names = [
        ...DISPUTE_LOOKUPS,
        "city",
        "region",
        "fraudType",
        "source",
        "caseDecision",
        "transactionCurrency",
        "sourceOfIB",
        "approvalReasons",
        "rejectionReasons",
      ];
      extra = [
        ["transactionTypes", userID],
        ["status", { IsNegativeDatabase: false }],
      ];
      break;
    case 4: // Investigation Manager
      names = [...DISPUTE_LOOKUPS, "approvalReasons", "rejectionReasons"];
      extra = [
        ["transactionTypes", userID],
        ["status", { IsNegativeDatabase: false }],
      ];
      break;
    case 5: // QA Manager
      names = [...DISPUTE_LOOKUPS, "city"];
      extra = [
        ["transactionTypes", userID],
        ["status", { IsNegativeDatabase: false }],
      ];
      break;
    default:
      break;
  }
  return Promise.allSettled([
    ...names.map((name) => dispatch(ensureLookup(name))),
    ...extra.map(([name, param]) => dispatch(ensureLookup(name, param))),
  ]);
};

// Called on sign out so the next user starts clean (the store itself is reset by SIGN_OUT).
const clearLookupCache = () => {
  inFlight = {};
  responses = {};
  shown = {};
};

export { ensureLookup, preloadLookups, clearLookupCache, DISPUTE_LOOKUPS };
