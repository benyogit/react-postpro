import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { addPost } from "../../store/actions/index.js";
import { connect } from "react-redux";
import Spiner from "../UI/spiner.js";

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      text: "",
      isFull: false
    };
  }
  onChange = e => {
    e.preventDefault();

    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();

    if (this.state.text.length > 0 && this.state.title.length > 0) {
      this.props.onAddPost(this.state.title, this.state.text);
      this.setState({ ...this.state, isFull: true });
    }
  };
  render() {
    if (this.props.isLoading) {
      return <Spiner />;
    } else if (!this.state.isFull) {
      return (
        <div className="post-form">
          <div className="bg-primary p">
            <h3>Say Something...</h3>
          </div>
          <form className="form my-1" onSubmit={e => this.onSubmit(e)}>
            <input
              type="text"
              name="title"
              value={this.state.title}
              placeholder="Set Title"
              onChange={e => this.onChange(e)}
            />
            <textarea
              name="text"
              cols="30"
              rows="5"
              placeholder="Create a post"
              value={this.state.text}
              onChange={e => this.onChange(e)}
              required
            />
            <input type="submit" className="btn btn-dark my-1" value="Submit" />
          </form>
        </div>
      );
    } else{
        return <Redirect to="/posts"/>;
    }
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.authenticated,
    isLoading: state.posts.loading,
    errorMessage: state.auth.message
  };
};

const mapsDispatchToProps = dispatch => {
  return {
    onAddPost: (title, text) => dispatch(addPost(title, text))
  };
};

export default connect(
  mapStateToProps,
  mapsDispatchToProps
)(NewPost);
