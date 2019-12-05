import React from "react";
import { Link } from "react-router-dom";
import CommentItem from "./CommentIem";

const CommentSection = (props) => {
  const addComment= (e)=>{
      e.preventDefault(); 
      props.commentAddition(props.post._id, e.target.text.value);
      e.target.text.value="";
  };
  const postId= props.post._id;
  const commentsItems= props.post.comments.map(comment=><CommentItem 
    user={props.user} 
    key={comment._id} 
    comment={comment}
    
    deletion={()=>props.commentDeletion(props.post._id,comment._id)}
    />);
  return (
    <div style={ {width: '80%', margin:"auto"}}>
      {props.user ? <form
        className="form my-1"
        onSubmit={addComment}
      >
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Comment on the Post"
        />
        <input type="submit"  className="btn btn-dark my-1" value="Comment" />
      </form>:null}
      {commentsItems}
   
    </div>
  );
};

export default CommentSection;
