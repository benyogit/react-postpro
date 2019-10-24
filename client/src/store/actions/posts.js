import * as actionTypes from './actionTypes';
import axios from '../../axios-utils';






export const getPost = ( postId ) => {
  
    
};

export const unLikePost = ( postId ) => {
  

};
export const likePost = id => async dispatch => {
    try {
      const res = await axios.put(`/api/posts/like/${id}`);
  
      dispatch({
        type: actionTypes.UPDATE_LIKES,
         id, 
         likes: res.data 
      });
    } catch (err) {
      dispatch({
        type: actionTypes.POST_ERROR,
        msg: err.response.statusText, 
        
      });
    }
  };
export const deletePost = ( postId ) => {
  

};

export const fetchPostsSuccess = ( posts ) => {
    return {
        type: actionTypes.FETCH_POSTS_SUCCESS,
        posts: posts
    }
};

export const fetchPostsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_POSTS_FAIL,
        error: error
    };
};

export const fetchPostsStart = () => {
    return {
        type: actionTypes.FETCH_POSTS_START
    }
};

export const fetchPosts = () => {
    return dispatch => {

        dispatch( fetchPostsStart() );

        
        
        axios.get('api/posts') 
        .then( response => {
            const fetchPosts = [];
            for(let key in response.data.posts){
                
                fetchPosts.push({
                    ...response.data.posts[key],
                    id: response.data.posts[key]._id
                });
            }

            dispatch( fetchPostsSuccess( fetchPosts ) );

        }).catch(err => {
            dispatch( fetchPostsFail( err ) );
        });
    }
    
}