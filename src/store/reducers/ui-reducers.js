import * as actions from "../action_types";

const initialState = {
  isGoBack: false,
  activeEdit: false,
  SomeThingWentWrong: false,
  activeTab: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.UI_GO_BACK_ENABLE:
      return { ...state, isGoBack: true };
    case actions.UI_GO_BACK_DISABLE:
      return { ...state, isGoBack: false };
    case actions.ACTIVE_EDIT:
      return { ...state, activeEdit: true };
    case actions.SOMETHINGWENTWRONG:
      return { ...state, SomeThingWentWrong: true };
    case actions.SOMETHINGWENTWRONGREMOVE:
      return { ...state, SomeThingWentWrong: false };
    case actions.ACTIVE_TAB:
      return { ...state, activeTab: true };
    case actions.CLOSED_TAB:
      return { ...state, activeTab: false };
    default:
      return { ...state };
  }
};

export default reducer;
