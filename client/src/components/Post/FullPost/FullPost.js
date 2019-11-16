import React, { Component } from "react";
import Spiner from "../../UI/spiner";
import { Editor, EditorState , convertFromRaw } from "draft-js";
import {  } from "draft-js-export-html";
import { connect } from "react-redux";

class FullPost extends Component {


  constructor(props){
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    

  }
  componentDidUpdate(prevProps){

    console.log("componentDIDupdate: ");
    if(this.props.post !== prevProps.post){
      console.log("componentDIDupdate: "+ this.props.post.text);
      const text= JSON.parse(this.props.post.text);
      this.setState({ editorState: EditorState.createWithContent(convertFromRaw(text))});
    }
  }
  componentDidMount(){

    console.log("componentDidMount: "+ this.props.post);

  }

  render() {
    if (this.props.isLoading) {
      return <Spiner />;
    } else {
      
      return (
        <div>
          
          <Editor editorState={this.state.editorState}>

          </Editor>
        </div>
      );
    }
    
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.authenticated,
    isLoading: state.posts.loading,
    post: state.posts.post
  };
};

const mapsDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapsDispatchToProps
)(FullPost);
