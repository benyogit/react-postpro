import { updateObject } from "../utility";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  profile: null,
  profiles: [],
  profileLoading: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PROFILE:
      return updateObject(state, {
        profile: action.profile,
        profileLoading: false
      });
    case actionTypes.GET_PROFILES:
      return updateObject(state, {
        message: action.message,
        profileLoading: false
      });
    case actionTypes.DELETE_PROFILE:
      return updateObject(state, { loading: false });

    case actionTypes.ADD_SKILL:
      return updateObject(state, { loading: false });
    case actionTypes.REMOVE_SKILL:
      return updateObject(state, { loading: false });

    case actionTypes.ADD_EXPERIENCE:
      return updateObject(state, { loading: false });
    case actionTypes.REMOVE_EXPERIENCE:
      return updateObject(state, { loading: false });
      
    case actionTypes.EDIT_PROFILE:
      return updateObject(state, action);
    case actionTypes.PROFILE_LOADING:
      return updateObject(state, { profileLoading: true });
    default:
      return state;
  }
};
export default reducer;
