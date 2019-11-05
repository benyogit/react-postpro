import axios from "../../axios-utils";
import * as actionTypes from "./actionTypes";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

export const signUp = (
  email,
  password,
  passwordConfirm,
  name
) => async dispatch => {
  const body = JSON.stringify({ name, email, password, passwordConfirm });

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch(authSuccess(res.data.token, res.data.userId, res.data.expiresIn));

    dispatch(checkAuthTimeOut(res.data.expiresIn));
  } catch (err) {
    console.log(err.response.data.msg);
    dispatch(authFailed(err.response.data.msg));
  }
};

export const authSuccess = (token, userId, expiresIn) => {
  localStorage.setItem("token", token);
  localStorage.setItem("userId", userId);
  localStorage.setItem(
    "expiresIn",
    new Date(new Date().getTime() + expiresIn*1000 )
  );
  

  return { type: actionTypes.AUTH_SUCCESS, token, userId };
};

export const checkAuthTimeOut = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      console.log("logingOut");
      dispatch(logOut());
    }, expirationTime * 1000);
  };
};

export const logOut = () => {
  return dispatch => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("expiresIn");
      localStorage.removeItem("userId");

      dispatch({
        type: actionTypes.AUTH_LOGOUT,
        token: null
      });
    } catch (err) {
      console.log(err.response.data.msg);
      dispatch(authFailed(err.response.data.msg));
    }
  };
};

export const loadUser = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logOut());
    } else {
      const expirationDate = new Date(localStorage.getItem("expiresIn"));

      if (expirationDate > new Date()) {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId, (expirationDate.getTime() - new Date().getTime()) / 1000));
        dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000));
      } else {
        dispatch(logOut());
      }
    }
  };
};

export const authFailed = message => {
  return {
    type: actionTypes.AUTH_FAILED,
    message: message
  };
};
export const signIn = (email, password) => async dispatch => {
  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch(authSuccess(res.data.token, res.data.userId, res.data.expiresIn));

    dispatch(checkAuthTimeOut(res.data.expiresIn));
  } catch (err) {
    console.log(err.response.data.msg);
    dispatch(authFailed(err.response.data.msg));
  }
};
