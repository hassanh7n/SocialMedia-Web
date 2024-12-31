import React from 'react'
import './Chat.css'
import { useSelector } from 'react-redux';

const Chat = ({conversation}) => {
    const {user, isLoading} = useSelector((store) => store.auth);
  console.log(isLoading);
  
  const {text, senderId} = conversation;
  const me = user._id === senderId ? true : false;
 

  return (
    <div className={me ? "me chat-main-div" : "they chat-main-div"}>
      <div className={me ? "me " : "they"}>
      <i className='text' >{text}</i>
      </div>
    </div>
  )
}

export default Chat