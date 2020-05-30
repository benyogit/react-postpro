import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
 
const CommentItem = props => {
  let btnDelete ;
  if (props.user === props.comment.user) {
    btnDelete = <button  onClick={props.deletion}><i className="far fa-trash-alt"></i></button>;
  } else {
    btnDelete =null;
  }

  return (
    <div className="card ">
      <div >
        <Link to={`/profile/`}>
          <img className="round-img" alt="" />
        </Link>
      </div>

      <div className="card-header">
        <p  style={{ float: "right" }}>
          Posted on  <Moment format="YYYY/MM/DD hh:mm">{props.comment.date}</Moment>
        </p>
        <Link to={`/profile/`}>
          <h4>{props.comment.name}</h4>
        </Link>
        
      </div>
      <div className="card-body">
        <p  >
          {props.comment.text}
        </p>
      </div>
      <div className="card-footer">
          {btnDelete}
      </div>
    </div>
  );
};

export default CommentItem;
