import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";


const initialState = {
  posts: [],
  loading: false,
  error: null
};

const fetchPostsStart = (state, action) => {
  return updateObject(state, { loading: true });
};

const fetchPostsFail = (state, action) => {
  return updateObject(state, { loading: false });
};

const fetchPostsSuccess = (state, action) => {
  return updateObject(state, { posts: action.posts, loading: false });
};

const addPost = (state, action) => {

  
  let updatedPosts= state.posts.concat(action.post);
  console.log("adding post to to state.posts");
  console.log(updatedPosts);
  return updateObject(state, {posts:updatedPosts ,loading: false});
};

const deletePost = (state, action) => {
  let updatedPosts = state.posts.filter(post => post.id !== action.id);
  return updateObject(state, { posts: updatedPosts });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_POSTS_SUCCESS:
      return fetchPostsSuccess(state, action);
    case actionTypes.FETCH_POSTS_START:
      return fetchPostsStart(state, action);
    case actionTypes.FETCH_POSTS_FAIL:
      return fetchPostsFail(state, action);
    case actionTypes.DELETE_POST:
      return deletePost(state, action);
    case actionTypes.ADD_POST:
      return addPost(state, action);
    case actionTypes.UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.id ? { ...post, likes: action.likes } : post
        ),
        loading: false
      };
    case actionTypes.POST_ERROR:
      return updateObject(state, { error: action.msg });

    default:
      return state;
  }
};

export default reducer;
