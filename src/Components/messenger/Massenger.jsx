import React, { useEffect, useRef, useState } from 'react'
import './Messenger.css'
import {Box, useMediaQuery} from "@mui/material";
import Navbar from '../Navbar';
import { useDispatch, useSelector } from 'react-redux';
import FriendListWidget from '../Widgets/FriendListWidget';
import AdvertWidget from '../Widgets/AdvertWidget';
import { getAllConversations, getAllUsers, getConvOfUser, getConvUser, sendMessage } from '../../redux-toolkit/auth';
import Users from './Users';
import Chat from './Chat';
import Conversations from './Conversations';
import { IconButton, Typography, useTheme, InputBase, Button } from "@mui/material";
import Flex from '../widget/Flex';
import FlexBetween from '../widget/FlexBetweeen';
import FlexBetweeen from '../widget/FlexBetweeen';
import { io } from 'socket.io-client';



const Massenger = () => {
  const scrollRef = useRef();
  const {user, users, conversations, conversation, isLoading, message} = useSelector((store) => store.auth);
  // console.log(conversation);
       const theme = useTheme();
        const socket = useRef()
        // const [socket, setSocket] = useState(null);
        let [allMessages, setAllMessages] = useState(conversation);
       const [id, setId] = useState()
        const [msg, setMsg] = useState("");
        const { palette } = useTheme();
        
        const [arrivalMessage, setArrivalMessage] = useState(null)
        const main = palette.neutral.main;
        const primary = palette.primary.main;
        // console.log( conversations)
        allMessages = conversation
  
  const alt = theme.palette.background.alt;
  const al = theme.palette.background.default
// conversation ? setAllMessages(conversation) : setAllMessages()
// console.log(allMessages);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    
    socket.current.on("getMessage", data => {
      const {senderId, text} = data;
      // console.log(senderId, text);

      setArrivalMessage({
        senderId : senderId,
        text : text
      })
    // data && id?.members.includes(data.senderId)  && 

    // setAllMessages((prev) => [...prev, data.senderId, data.text])
    // [...conversation, data.senderId, data.text]
      
    
  })
}, [])

// console.log(arrivalMessage);
 
  useEffect(() => {
    socket.current.emit("add user", user._id)
    socket.current.on("getUsers", users => {
      // console.log(users);
      
    })
  }, [user])




  useEffect(() => {
    arrivalMessage && id?.members.includes(arrivalMessage.senderId)  && 
    setAllMessages(conversation, arrivalMessage)
  }, [arrivalMessage])
  console.log(arrivalMessage)
  





















  
  const dispatch = useDispatch();
  useEffect(()=> {
    // dispatch(getAllUsers())
    dispatch(getAllConversations(user._id))
  },[])
  useEffect(() => {
    const User = (userId) => {
       dispatch(getConvUser(userId))

    }
  }, [conversations])
  const me = user._id === id?.members[0] ? true : false;
  const [toggle, setToggle] = useState(true);
  const {_id} = user;
  // console.log(name, url);
  const handlePost = () => {
    
    
      const recieverId = user._id === id?.members[0] ? id?.members[1] : id?.members[0]
      
      const date = new Date();
      socket.current.emit("sendMessage", {
        senderId : user._id,
        receiverId : recieverId,
        text : msg
      })
      dispatch(sendMessage({
        senderId : user._id,
        conversationId : id?._id,
        text : msg,
        createdAt : date.toDateString()
      }))
      setMsg("")
      // dispatch(getAllPosts())
    }

  useEffect(() => {
    dispatch(getConvOfUser({conversationId : id?._id}))
  }, [id?._id, message, arrivalMessage])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [id?._id, message, arrivalMessage, handlePost]);
  
    
  
  // console.log(conversations);
  
  const isNonMobileScreens = useMediaQuery("(min-width:800px)");
  
  
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Flex className="main-div">
          <Flex  backgroundColor={al}  className={toggle ? "left" : "leftOther"}>
          <Flex  ml={"1rem"} padding={"0.7rem"} backgroundColor={alt}  className="topbar">
            <FlexBetweeen>You can only message to your friends!. So try to make more and more friends </FlexBetweeen>
          {/* {users.map((user) => {
          return(
            // <Users  className="topbar" key={user._id} user={user} />
          )

        })} */}
          </Flex >
          <div onClick={() => setToggle(!isNonMobileScreens ? !toggle : true)}   className="conv">
            {conversations === null ? (<Flex  padding={"1rem"} backgroundColor={primary}> <h4>please make friends to start chatting!</h4></Flex>) : (<>
              {conversations?.map((conversation) => {
            // console.log(conversation);
            // const {members} = conversation
            
            // User(conversation.members[1])
            // dispatch(getConvUser(conversation.members[1]))
            return(
              <div onClick={() => setId(conversation)}>
                <Conversations  key={conversation._id} conversation={conversation} />
              </div>
            )
          })}
            </>)}
          

          </div>
          </Flex>
          <div border={alt} className="right">
            <Flex className='top' backgroundColor={alt} >
              {!isNonMobileScreens && (<Button onClick={() => setToggle(!toggle)}>Back</Button>)}
              
              <img className='msg-user-img' src={me ? id?.receiverPicture : id?.senderPicture} alt="" />
              <p>{me ? id?.receiverName : id?.senderName}</p>
            </Flex>
            <div    className="conversations">  {conversation === null ? (<Flex  padding={"1rem"} backgroundColor={alt}> <h4>Nothing found</h4></Flex>) : (<>
              {conversation?.map((conversation) => {
            // console.log(conversation);
            // const {members} = conversation
            
            // User(conversation.members[1])
            // dispatch(getConvUser(conversation.members[1]))
            return(
              <Flex ref={scrollRef}  className='right-conv'>
                <Chat  key={conversation._id} conversation={conversation} />
                {/* <div  ></div> */}
              </Flex>
            )
          })}
            </>)}</div>
            <Box className="bottom" mt="0.5rem" ml={"1.5rem"} mr={"1.5rem"}>
          <FlexBetween gap="1rem">
        {/* <UserImage image={user.picture} /> */}
        <InputBase
          placeholder="lets chat..."
          onChange={(e) => setMsg(e.target.value)}
          value={msg}
          sx={{
            width: "90%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
            height : "40px"
          }}
        />
        <Button
          disabled={isLoading}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          send
        </Button>
      </FlexBetween>
      
        </Box>
            
          </div>
          
        </Flex>
        
      </Box>
    </Box>
  )
}

export default Massenger