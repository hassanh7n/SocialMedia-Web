import React, { useEffect, useRef } from 'react'
import './Chat.css'
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';

const Chat = ({conversation}) => {
          const {user, isLoading} = useSelector((store) => store.auth);


  
           
  console.log(conversation);
  
  const {text, senderId, createdAt} = conversation;
  const me = user._id === senderId ? true : false;
 
// console.log(me);

  return (
    <div className={me ? "me chat-main-div" : "they chat-main-div"}>
      <div className={me ? "me " : "they"}>
      <i className='text' >{text}</i>
      <p>{createdAt}</p>
      </div>
    </div>
  )
}

export default Chat