import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const PostItem = props => {
  console.log(props.post);
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${props.post.user}`}>
          <img className="round-img" src={props.post.avatar} alt="" />
          <h4>{props.post.name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{props.post.title}</p>
        <p className="post-date">
          Posted on <Moment format="YYYY/MM/DD hh:mm">{props.post.date}</Moment>
        </p>
      </div>
      <Fragment>
        <button onClick={props.liked} type="button" className="btn btn-light">
          <i className="fas fa-thumbs-up" />{" "}
          <span>{props.post.likes ? 0 : props.post.likes.length}</span>
        </button>

        <button
          onClick={props.unLiked}
          type="button"
          className="btn btn-light"
        >
          <i className="fas fa-thumbs-down" />
        </button>
      </Fragment>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired
};

export default PostItem;
