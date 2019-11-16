import { updateObject } from "../utility";
import * as actionTypes from "../actions/actionTypes";


const initialState = {
    profile: null,
    profiles: [],
    loading: false
  };


  
const reducer = (state = initialState, action) => {
    switch (action.type) {
      case actionTypes.GET_PROFILE:
        return authSuccess(state, action);
      case actionTypes.GET_PROFILES:
        return updateObject(state, { message: action.message });
      case actionTypes.DELETE_PROFILE:
        return updateObject(state, { loading: true });
      case actionTypes.EDIT_PROFILE:
        return logOut(state, action);
      default:
        return state;
    }
  };