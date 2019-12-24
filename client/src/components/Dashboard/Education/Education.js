import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addEducation, deleteEducation } from "../../../store/actions";
import EducationList from "./EducationList";
import Spiner from "../../UI/spiner";

class Education extends Component {
  constructor(props) {
    super(props);
    this.state = { institute: null, description: null, to: null, from: null };
  }
  onChange = event => {
    event.preventDefault();
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };
  onSubmit = event => {
    event.preventDefault();

    this.props.onAddEducation(this.state);
  };
  render() {
    if(!this.props.loading && this.props.education){
      return (
        <Fragment>
          <EducationList
            delete={this.props.onDeleteEducation}
            education={this.props.education}
          />
          <form onSubmit={this.onSubmit} className="form">
            <div className="form-group">
              <input
                type="text"
                placeholder="The Institution where did You study"
                name="institute"
                onChange={this.onChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Degree or Course"
                name="description"
                onChange={this.onChange}
                required
              />
            </div>
            <div className="form-group">
              <h4>From Date</h4>
              <input type="date" name="from" onChange={this.onChange} required />
            </div>
            <div className="form-group">
              <h4>To Date</h4>
              <input type="date" name="to" onChange={this.onChange} />
            </div>
            <input
              type="submit"
              value="Add Education"
              className="btn btn-primary my-1"
            />
          </form>
        </Fragment>
      );
    }else{
      return <h1>Loading... a bit Patiance</h1>;
    }
    
  }
}

const mapStateToProps = state => {
  return {
    curProfile: state.profiles.profile,
    loading: state.profiles.profileLoading,
    currentUser: state.auth.userId
  };
};

const mapsDispatchToProps = dispatch => {
  return {
    onAddEducation: form => dispatch(addEducation(form)),
    onDeleteEducation: id => dispatch(deleteEducation(id))
  };
};
export default connect(
  mapStateToProps,
  mapsDispatchToProps
)(Education);
