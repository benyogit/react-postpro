import { updateObject } from "../utility";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  authenticated: false,
  token: null,
  userId: null,
  message: "",
  loading: false
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    userId: action.userId,
    authenticated: true,
    message: "",
    loading: false
  });
};
const logOut = (state, action) => {
  console.log("loginOut");
  return updateObject(state, {
    token: null,
    userId: null,
    authenticated: false,
    message: "",
    loading: false
  });
};

const reducer = (state = initialState, action) => {


  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAILED:
      return updateObject(state, { message: action.message });
    case actionTypes.AUTH_START:
      return updateObject(state, { loading: true });
    case actionTypes.AUTH_LOGOUT:
      return logOut(state, action);
    default:
      return state;
  }
};

export default reducer;
