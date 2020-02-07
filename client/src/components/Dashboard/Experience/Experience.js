import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { addEducation, deleteEducation, addExperience, deleteExperience } from "../../../store/actions";
import ExperienceList from "./ExperienceList";


class Experience extends Component {
  constructor(props) {
    super(props);
    this.state = { company: null,title:null , role: null, to: null, from: null };
  }
  onChange = event => {
    event.preventDefault();
    this.setState({ ...this.state, [event.target.name]: event.target.value });
  };
  onSubmit = event => {
    event.preventDefault();

    this.props.onAddExperience(this.state);
  };
  render() {
    if(!this.props.loading ){
      return (
        <Fragment >

          <div className="m-2"> 
          { 
            this.props.experience?
                  <ExperienceList 
                    delete={this.props.onDeleteExperience} 
                    experience={this.props.experience}
                    />:null
          
          }
          

          <h3>Add Some More Jobs</h3>
          <form onSubmit={this.onSubmit} className="form">
            <div className="form-group">
              <input
                type="text"
                placeholder="The Company you worked or work for"
                name="company"
                onChange={this.onChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Degree or Course"
                name="title"
                onChange={this.onChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Degree or Course"
                name="role"
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
          </div>
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
    onAddExperience: form => dispatch(addExperience(form)),
    onDeleteExperience: id => dispatch(deleteExperience(id))
  };
};
export default connect(
  mapStateToProps,
  mapsDispatchToProps
)(Experience);
