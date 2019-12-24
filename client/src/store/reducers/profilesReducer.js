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

    case actionTypes.ADD_EDUCATION:
      const addeducation = { ...state.profile, education: action.education };

      return updateObject(state, {
        profile: addeducation,
        profileLoading: false
      });

    case actionTypes.DELETE_EDUCATION:
      const educationDeleted = {
        ...state.profile,
        education: action.education
      };
      console.log(action.education);
      return updateObject(state, {
        profile: educationDeleted,
        profileLoading: false
      });

    case actionTypes.ADD_EXPERIENCE:
      const addedExp = { ...state.profile, experience: action.experience };
      return updateObject(state, { profile: addedExp, profileLoading: false });

    case actionTypes.DELETE_EXPERIENCE:
      const deletedExp = { ...state.profile, experience: action.experience };
      return updateObject(state, { profile:deletedExp, profileLoading: false });

    case actionTypes.EDIT_PROFILE:
      return updateObject(state, action);
    case actionTypes.PROFILE_LOADING:
      return updateObject(state, { profileLoading: true });
    default:
      return state;
  }
};
export default reducer;
