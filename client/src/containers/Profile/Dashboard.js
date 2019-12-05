import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

//import axios from '../../axios-utils';
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/spiner";
import Skills from "../../components/Dashboard/Skills/Skills";

class Dashboard extends Component {
  componentDidMount() {
    this.props.onGetProfile();
  }
  render() {
    if (!this.props.loading && this.props.curProfile) {
        
      return (
        <div>
          <h1>Wellcome {this.props.curProfile.name} !</h1>
          <Skills skills={this.props.curProfile.skills}></Skills>
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
