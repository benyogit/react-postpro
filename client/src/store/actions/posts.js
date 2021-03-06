import * as actionTypes from "./actionTypes";
import axios from "../../axios-utils";
import axiosS3 from "axios";
const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

export const getPost = postId => async dispatch => {
  try {
    dispatch(fetchPostsStart());
    const res = await axios.get(`/api/posts/${postId}`);

    dispatch({
      type: actionTypes.GET_POST,
      post: res.data.post
    });
  } catch (err) {
    const msg = err.response ? err.response.msg : "Error in post/id";
    dispatch({
      type: actionTypes.POST_ERROR,
      msg: msg
    });
  }
};

export const addPost = (title, text, file) => async dispatch => {
  

  try {
    dispatch(fetchPostsStart());

    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      "token"
    );
    const signedKeyRes = await axios.get("/api/upload", config);
    await axiosS3.put(signedKeyRes.data.url, file, {headers:{'Content-Type': file.type}});
    const body = JSON.stringify({title, text, imageUrl: signedKeyRes.data.key});
    const res = await axios.post("/api/posts", body, config);

    dispatch({
      type: actionTypes.ADD_POST,
      post: res.data
    });
  } catch (err) {
    dispatch({
      type: actionTypes.POST_ERROR,
      msg: err
    });
  }
};
export const addComment = (postId, text) => async dispatch => {
  const body = JSON.stringify({ text });
  try {
    dispatch(fetchPostsStart());
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      "token"
    );
    const res = await axios.post(`/api/posts/comment/${postId}`, body, config);
    dispatch({
      type: actionTypes.ADD_COMMENT,
      postId,
      comments: res.data
    });
  } catch (err) {
    dispatch({
      type: actionTypes.POST_ERROR,
      msg: "err.response.msg"
    });
  }
};
export const deleteComment = (postId, commentId) => async dispatch => {
  
  
  try {
    dispatch(fetchPostsStart());
    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      "token"
    );
    const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: actionTypes.DELETE_COMMENT,
      comments:res.data
    });
  } catch (err) {
    dispatch({
      type: actionTypes.POST_ERROR,
      msg: "err.response.msg"
    });
  }
};
export const unLikePost = id => {
  return dispatch => {

    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      "token"
    );
    axios
      .put(`/api/posts/unlike/${id}`)
      .then(res => {
        
        dispatch({
          type: actionTypes.UPDATE_LIKES,
          id,
          likes: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: actionTypes.POST_ERROR,
          msg: error.response.statusText
        });
      });
  };
};

export const likePost = id => {
  return dispatch => {

    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      "token"
    );
    axios
      .put(`/api/posts/like/${id}`)
      .then(res => {
        dispatch({
          type: actionTypes.UPDATE_LIKES,
          id,
          likes: res.data
        });
      })
      .catch(error => {
        dispatch({
          type: actionTypes.POST_ERROR,
          msg: error.response.statusText
        });
      });
  };
};
export const deletePost = postId => {
  return dispatch => {

    axios.defaults.headers.common["x-auth-token"] = localStorage.getItem(
      "token"
    );
    axios
      .delete(`/api/posts/${postId}`, config)
      .then(res => {
        dispatch({
          type: actionTypes.DELETE_POST,
          id: postId
        });
      })
      .catch(error => {

        dispatch({
          type: actionTypes.POST_ERROR,
          msg: error.response.data.msg
        });
      });
  };
};

export const fetchPostsSuccess = posts => {
  return {
    type: actionTypes.FETCH_POSTS_SUCCESS,
    posts: posts
  };
};

export const fetchPostsFail = error => {
  return {
    type: actionTypes.FETCH_POSTS_FAIL,
    error: error
  };
};

export const fetchPostsStart = () => {
  return {
    type: actionTypes.FETCH_POSTS_START
  };
};

export const fetchPosts = () => {
  return dispatch => {
    dispatch(fetchPostsStart());
    axios
      .get("api/posts")
      .then(response => {
        const fetchPosts = [];
        
        for (let key in response.data.posts) {
          fetchPosts.push({
            ...response.data.posts[key],
            id: response.data.posts[key]._id
          });
        }

        dispatch(fetchPostsSuccess(fetchPosts));
      })
      .catch(err => {
        dispatch(fetchPostsFail(err));
      });
  };
};
