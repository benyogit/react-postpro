import { GET_PROFILE, PROFILE_ERROR, PROFILE_LOADING, ADD_SKILL } from "./actionTypes";
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

export const addSkill = (skill) => async dispatch => {
  try {
    const body = JSON.stringify({ skill });

    dispatch({
      type: PROFILE_LOADING
    });

    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      "token"
    );
    const res = await axios.post(`/api/profile/self/skill`, body, config);

    dispatch({
        type: ADD_SKILL, 
        skills:res.data
    })

  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      msg: err.response.msg
    });
  }
};

export const removeSkill = (skill) => async dispatch => {
    try {
      const body = JSON.stringify({ skill });
  
      dispatch({
        type: PROFILE_LOADING
      });
  
      axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
        "token"
      );
      const res = await axios.post(`/api/profile/self`, body, config);
  
      
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        msg: err.response.msg
      });
    }
  };

  export const addExperience= (skill) => async dispatch => {
    try {
      const body = JSON.stringify({ skill });
  
      dispatch({
        type: PROFILE_LOADING
      });
  
      axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
        "token"
      );
      const res = await axios.post(`/api/profile/self`, body, config);
  
      
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        msg: err.response.msg
      });
    }
  };

  export const removeExperience= (skill) => async dispatch => {
    try {
      const body = JSON.stringify({ skill });
  
      dispatch({
        type: PROFILE_LOADING
      });
  
      axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
        "token"
      );
      const res = await axios.post(`/api/profile/self`, body, config);
  
      
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        msg: err.response.msg
      });
    }
  };