import React,{Fragment} from "react";
import Moment from "react-moment";
import moment from 'moment';

const EducationList = (props) => {
  const educations = props.education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.institute}</td>
      <td className="hide-sm">{edu.description}</td>
      <td>
        <Moment format="MMM YYYY">{moment.utc(edu.from)}</Moment> -{" "}
        {edu.to === null ? (
          " Now"
        ) : (
          <Moment format="MMM YYYY">{moment.utc(edu.to)}</Moment>
        )}
      </td>
      <td>
        <button
          onClick={ () => props.delete(edu._id) }
          className="btn btn-danger"
        >
          X
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="my-2">Your Listed Education</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="hide-sm">Institute</th>
            <th className="hide-sm">Degree Or Certificate</th>
            <th className="hide-sm">Years</th>
            <th  className="hide-sm"> Delete? </th >
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

export default EducationList;
