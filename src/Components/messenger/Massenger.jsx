import { useSelector } from "react-redux";
import "./Messenger.css";
// import Topbar from "../../components/topbar/Topbar";
// import Conversation from "../../components/conversations/Conversation";
// import Message from "../../components/message/Message";
// import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";



export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const {user, users} = useSelector((store) => store.auth);
  const scrollRef = useRef();


 


  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            
          </div>
        </div>
      </div>
    </>
  );
}
