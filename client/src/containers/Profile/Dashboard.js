import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
//import axios from '../../axios-utils';
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/spiner";
import Overview from "../../components/Dashboard/Overview/Overview";
import Profile from "../../components/Dashboard/Profile/Profile";
import Education from "../../components/Dashboard/Education/Education";
import Experience from "../../components/Dashboard/Experience/Experience";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { tab: "profile-overview" };
  }

  onClick = opt => {
    this.setState({ tab: opt });
  };
  componentDidMount() {
    this.props.onGetProfile();
  }

  render() {
    if (!this.props.loading && this.props.curProfile) {
      console.log(this.props);
      let choosenComponent;
      if (this.state.tab === "profile-overview") {
        choosenComponent = <Overview ></Overview>;
      } else if (this.state.tab === "edit-profile") {
        choosenComponent = <Profile></Profile>;
      } else if (this.state.tab === "edit-education") {
        console.log("in Eductaion");
        choosenComponent = <Education education={this.props.curProfile.education}></Education>;
      } else {
        choosenComponent = <Experience experience={this.props.curProfile.experience}></Experience>;
      }
      return (
        <div>
          <h1 className="large text-primary">Dashboard</h1>
          <p className="lead">
            <i className="fas fa-user" /> Welcome {this.props.curProfile.name}
          </p>
         
          <div className="dash-buttons">
            <button
              onClick={() => this.onClick("profile-overview")}
              className="btn btn-light"
            >
              <i className="fas fa-chart-line text-primary"></i> Profile
              Overview
            </button>
            <button
              onClick={() => this.onClick("edit-profile")}
              className="btn btn-light"
            >
              <i className="fas fa-user-circle text-primary" /> Edit Profile
            </button>
            <button
              onClick={() => this.onClick("edit-experience")}
              className="btn btn-light"
              
            >
              <i className="fab fa-black-tie text-primary" /> Edit Experience
            </button>
            <button
              onClick={() => this.onClick("edit-education")}
              className="btn btn-light"
            >
              <i className="fas fa-graduation-cap text-primary" /> Edit
              Education
            </button>

            {choosenComponent}
          </div>
        </div>
      );
    } else {
      return <Spinner />;
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
    onGetProfile: () => dispatch(actions.getProfile())
  };
};
export default connect(
  mapStateToProps,
  mapsDispatchToProps
)(Dashboard);
