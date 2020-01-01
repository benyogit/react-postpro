import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Moment from "react-moment";
import moment from "moment";

import PropTypes from "prop-types";

/*
<Moment format="YYYY/MM/DD hh:mm">{props.post.date}</Moment>
*/
const PostItem = props => {

  let dateFormat; 
  const thisYear=new Date().getTime()
  if(moment(props.post.date).isSame(thisYear, "year")){
    dateFormat=<Moment format="MMM DD">{props.post.date}</Moment>;
  }else{
    dateFormat=<Moment format="MMM DD, YYYY">{props.post.date}</Moment>;
  }
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${props.post.user}`}>
          <img className="round-img" src={props.post.avatar} alt="" />
          <h4>{props.post.name}</h4>
        </Link>
      </div>
      <div>
        <Link
          /*onClick={props.onGetPost}*/
          to={`/posts/${props.post._id}`}
         
        >
          <p className="my-1">{props.post.title}</p>
        </Link>

        <p className="post-date">
          Posted on {dateFormat}
        </p>

        <Fragment>
          <button onClick={props.liked} type="button" className="btn btn-light">
            <i className="fas fa-thumbs-up" />{" "}
            <span>{props.post.likes ? props.post.likes.length : 0}</span>
          </button>

          <button
            onClick={props.unLiked}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-down" />
          </button>

          <Link
            /*onClick={props.onGetPost}*/
            to={`/posts/${props.post._id}`}
            className="btn btn-primary"
          >
            Discussion{" "}
            {props.post.comments.length > 0 && (
              <span className="comment-count">
                {props.post.comments.length}
              </span>
            )}
          </Link>
          {props.curUser !== null && props.curUser === props.post.user && (
            <button
              onClick={props.deleted}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
          )}
        </Fragment>
      </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  unLiked: PropTypes.func.isRequired
};

export default PostItem;
