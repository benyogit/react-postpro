import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
 
const CommentItem = props => {
  let btnDelete ;
  if (props.user === props.comment.user) {
    btnDelete = <button  style={{ float: "right" }} onClick={props.deletion}><i className="far fa-trash-alt"></i></button>;
  } else {
    btnDelete =null;
  }

  return (
    <div className="post bg-white p-1 my-1">
      <div >
        <Link to={`/profile/`}>
          <img className="round-img" alt="" />
        </Link>
      </div>

      <div >
        <p className="post-date" style={{ float: "right" }}>
          Posted on  <Moment format="YYYY/MM/DD hh:mm">{props.comment.date}</Moment>
        </p>
        <Link to={`/profile/`}>
          <h4>{props.comment.name}</h4>
        </Link>
        {btnDelete}
      </div>
      <div>
        <p  className="my-1" style={{ float: "right" }}>
          {props.comment.text}
        </p>
        
         
        
      </div>
    </div>
  );
};

export default CommentItem;
