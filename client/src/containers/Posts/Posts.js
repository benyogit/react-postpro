import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

//import axios from '../../axios-utils';
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/spiner";
import PostItem from "../../components/Post/PostItem";

class Posts extends Component {
  componentDidMount() {

    
    this.props.onFetchPosts();
  }

  render() {
    console.log("Rendering in Post.js");
    return this.props.loading ? (
      <Spinner></Spinner>
    ) : (
      <Fragment>
        <h1 className="large text-primary">Posts</h1>
        <div className="posts">
          {this.props.posts.map(post => (
            <PostItem
              key={post._id}
              post={post}
              liked={() => this.props.onLikePost(post._id)}
              deleted={() => this.props.onDeletePost(post._id)}
              unLiked={() => this.props.onUnLikePost(post._id)}
              onGetPost={() => this.props.onGetPost(post._id)}
              curUser={this.props.currentUser}
            />
          ))}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.posts.posts,
    loading: state.posts.loading,
    currentUser: state.auth.userId
  };
};

const mapsDispatchToProps = dispatch => {
  return {
    onFetchPosts: () => dispatch(actions.fetchPosts()),
    onDeletePost: postId => dispatch(actions.deletePost(postId)),
    onLikePost: postId => dispatch(actions.likePost(postId)),
    onUnLikePost: postId => dispatch(actions.unLikePost(postId)),
    onGetPost: postId => dispatch(actions.getPost(postId))
  };
};
export default connect(
  mapStateToProps,
  mapsDispatchToProps
)(Posts);
