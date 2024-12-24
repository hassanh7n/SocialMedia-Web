import React from 'react'
import './Comment.css'
const Comment = ({comments}) => {

    const {bioPic, name, postId, comment} = comments;

    
  return (
    <div className='main-div-comment'>
        <img className='comment-img' src={bioPic} alt="" />
        <div className="bio">
        <h1 className='comment-name'>{name}</h1>
        <p className='comment-disc'>{comment}</p>
        </div>
    </div>
  )
}

export default Comment