import React, { Component, Fragment } from "react";
import Spiner from "../../UI/spiner";
import { Editor, EditorState , convertFromRaw } from "draft-js";
import {  } from "draft-js-export-html";

import styles from './FullPost.css';
import { connect } from "react-redux";
import { getPost, addComment, deleteComment } from "../../../store/actions";
import CommentSection from "./CommentSection/CommentSection";

class FullPost extends Component {


  constructor(props){
    super(props);
    this.state = {editorState: EditorState.createEmpty(),title: null};
    

  }
  componentDidUpdate(prevProps) {

    if(this.props.post !== prevProps.post){ 
      const text= JSON.parse(this.props.post.text);
      this.setState({ editorState: EditorState.createWithContent(convertFromRaw(text)), 
        title:this.props.post.title});
    }
  }
  componentDidMount(){
    this.props.onGetPost(this.props.match.params.id);
  }

  render() {



    if (this.props.isLoading || this.props.post===null ) {
      return <Spiner />;
    } else {
      
      return (
        <Fragment  className="mt-10">
          <h1 className="headline large">{this.state.title}</h1>
          
          <img className="center img-thumbnail rounded float-center" alt="Responsive image" src={`https://postpro-images.s3.eu-central-1.amazonaws.com/${this.props.post.imageUrl}`}/>
          <Editor editorState={this.state.editorState}>
          </Editor>
          {!this.props.isLoading && this.props.post ?<CommentSection post={this.props.post} 
          user={this.props.user} 
          
          commentAddition={this.props.onAddComment}
          commentDeletion={this.props.onDeleteComment}
          >
          </CommentSection>:<Spiner />
          }

        </Fragment>
      );
    }
    
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.authenticated,
    user: state.auth.userId,
    isLoading: state.posts.loading,
    post: state.posts.post
  };
};

const mapsDispatchToProps = dispatch => {
  return {
    onAddComment: (postId, text ) => dispatch(addComment(postId, text)),
    onGetPost: (postId) => dispatch(getPost(postId)),
    onDeleteComment: (postId, commentId) => dispatch(deleteComment(postId, commentId))
  };
};

export default connect(
  mapStateToProps,
  mapsDispatchToProps
)(FullPost);
