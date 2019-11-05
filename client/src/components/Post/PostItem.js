import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import Moment from 'react-moment'
import PropTypes from "prop-types";


/*
<Moment format="YYYY/MM/DD hh:mm">{props.post.date}</Moment>
*/
const PostItem = (props) => {

  

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

        <Link to={`/posts/${props.post.id}`} className='btn btn-primary'>
            Discussion{' '}
            {props.post.comments.length > 0 && (
              <span className='comment-count'>{props.post.comments.length}</span>
            )}
          </Link>
          {props.curUser!==null && props.curUser === props.post.user && (
            <button
              onClick={props.deleted}
              type='button'
              className='btn btn-danger'
            >
              <i className='fas fa-times' />
            </button>
          )}
      </Fragment>
    </div>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  unLiked: PropTypes.func.isRequired,
  
};

export default PostItem;
