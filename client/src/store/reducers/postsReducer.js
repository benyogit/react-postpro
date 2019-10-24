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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_POSTS_SUCCESS:
      return fetchPostsSuccess(state, action);
    case actionTypes.FETCH_POSTS_START:
      return fetchPostsStart(state, action);
    case actionTypes.FETCH_POSTS_FAIL:
      return fetchPostsFail(state, action);
    case actionTypes.UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === action.id ? { ...post, likes: action.likes } : post
        ),
        loading: false
      };
    case actionTypes.POST_ERROR:
       return updateObject(state, { error: action.msg} );

    default:
      return state;
  }
};

export default reducer;
