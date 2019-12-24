import React,{Fragment} from "react";
import Moment from "react-moment";
import moment from 'moment';

const EducationList = (props) => {
    console.log(props);
  const educations = props.education.map(edu => (
    <tr key={edu._id}>
      <td>{edu.institute}</td>
      <td className="hide-sm">{edu.description}</td>
      <td>
        <Moment format="MM/YY">{moment.utc(edu.from)}</Moment> -{" "}
        {edu.to === null ? (
          " Now"
        ) : (
          <Moment format="MM/YY">{moment.utc(edu.to)}</Moment>
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
            <th>Institute</th>
            <th className="hide-sm">Degree Or Certificate</th>
            <th className="hide-sm">Years</th>
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

export default EducationList;
