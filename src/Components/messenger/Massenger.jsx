import React, { useEffect, useState } from 'react'
import './Messenger.css'
import {Box, useMediaQuery} from "@mui/material";
import Navbar from '../Navbar';
import { useDispatch, useSelector } from 'react-redux';
import FriendListWidget from '../Widgets/FriendListWidget';
import AdvertWidget from '../Widgets/AdvertWidget';
import { getAllConversations, getAllUsers, getConvOfUser, getConvUser } from '../../redux-toolkit/auth';
import Users from './Users';
import Chat from './Chat';
import Conversations from './Conversations';
import { IconButton, Typography, useTheme } from "@mui/material";
import Flex from '../widget/Flex';


const Massenger = () => {
  const {user, users, conversations, conversation} = useSelector((store) => store.auth);
  console.log(conversation);
       const theme = useTheme();


       const [id, setId] = useState()
         
  
  const alt = theme.palette.background.alt;
  
  const dispatch = useDispatch();
  
  useEffect(()=> {
    dispatch(getAllUsers())
    dispatch(getAllConversations(user._id))
  },[])
  useEffect(() => {
    const User = (userId) => {
       dispatch(getConvUser(userId))

    }
  }, [conversations])
  const {_id} = user;
  const name = id?.members[2]
  const url = id?.members[3]
  console.log(name, url);

  useEffect(() => {
    dispatch(getConvOfUser({conversationId : id}))
  }, [id])
  
  // console.log(conversations);
  
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
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
        <div className="main-div">
          <div className="left">
          <Flex padding={"0.7rem"} backgroundColor={alt}  className="topbar">
          {users.map((user) => {
          return(
            <Users  className="topbar" key={user._id} user={user} />
          )

        })}
          </Flex >
          <div  className="conv">
            {conversations === null ? (<Flex  padding={"1rem"} backgroundColor={alt}> <h4>please make friends to start chatting!</h4></Flex>) : (<>
              {conversations?.map((conversation) => {
            console.log(conversation);
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
          </div>
          <div className="right">
            <Flex className='top' backgroundColor={alt} >
              <img className='msg-user-img' src={url} alt="" />
              <p>{name}</p>
            </Flex>
            <div className="conversations">  {conversation === null ? (<Flex  padding={"1rem"} backgroundColor={alt}> <h4>Nothing found</h4></Flex>) : (<>
              {conversation?.map((conversation) => {
            console.log(conversation);
            // const {members} = conversation
            
            // User(conversation.members[1])
            // dispatch(getConvUser(conversation.members[1]))
            return(
                <Chat  key={conversation._id} conversation={conversation} />
            )
          })}
            </>)}</div>
          </div>
        </div>
        
      </Box>
    </Box>
  )
}

export default Massenger