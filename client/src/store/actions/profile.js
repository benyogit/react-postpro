import {
  GET_PROFILE,
  PROFILE_ERROR,
  PROFILE_LOADING,
  ADD_SKILL,
  DELETE_EDUCATION,
  ADD_EDUCATION,
  ADD_EXPERIENCE
} from "./actionTypes";
import axios from "../../axios-utils";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

export const getProfile = () => async dispatch => {
  try {
    console.log("in get profile");
    dispatch({
      type: PROFILE_LOADING
    });

    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      "token"
    );
    const res = await axios.get(`/api/profile/self`);
    console.log(res.data.profile);
    dispatch({
      type: GET_PROFILE,
      profile: res.data.profile
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      msg: err.response.msg
    });
  }
};

export const deleteEducation = eduId => async dispatch => {
  try {


    dispatch({
      type: PROFILE_LOADING
    });

    const body = JSON.stringify({ id:eduId });
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      "token"
    );

    const res = await axios.put(`/api/profile/self/education/delete`,body, config);
    console.log(res);
    dispatch({
      type: DELETE_EDUCATION,
      education: res.data.education
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PROFILE_ERROR,
      msg: "error in Server"
    });
  }
};

export const addEducation = form => async dispatch => {
  const body = JSON.stringify( {...form} );
  console.log(form);
  try {
    dispatch({
      type: PROFILE_LOADING
    });

    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      "token"
    );
    const res = await axios.put(`/api/profile/self/education`, body, config);
    console.log(res);
    dispatch({
      type: ADD_EDUCATION,
      education: res.data.education
    });
  } catch (err) {
    console.log(err);
    dispatch({
      
      type: PROFILE_ERROR,
      msg: "Server error"
    });
  }
};

export const addExperience = form => async dispatch => {
  try {
    const body = JSON.stringify({...form });

    dispatch({
      type: PROFILE_LOADING
    });

    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      "token"
    );
    const res = await axios.put(`/api/profile/self/experience`, body, config);
    dispatch({
      type: ADD_EXPERIENCE,
      experience: res.data.experience
    });


  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      msg: err.response.msg
    });
  }
};

export const deleteExperience = (id) => async dispatch => {
  try {
    const body = JSON.stringify({ id });

    dispatch({
      type: PROFILE_LOADING
    });

    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      "token"
    );
    const res = await axios.put(`/api/profile/self/experience/delete`, body, config);
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      msg: err.response.msg
    });
  }
};
