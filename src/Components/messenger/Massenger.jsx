import React, { useEffect, useState } from 'react'
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


const Massenger = () => {
  const {user, users, conversations, conversation, isLoading, message} = useSelector((store) => store.auth);
  // console.log(conversation);
       const theme = useTheme();


       const [id, setId] = useState()
        const [msg, setMsg] = useState("");
        const { palette } = useTheme();
        const main = palette.neutral.main;
        const primary = palette.primary.main;
  
  const alt = theme.palette.background.alt;
  const al = theme.palette.background.default


  console.log(id);
  
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
  // const name = me ? id?.members[4] : id?.members[2]
  // const url = id?.members[3]
  // console.log(name, url);
  const handlePost = () => {
    // console.log(msg);
    
      // console.log(post, postsPicture);
    
      dispatch(sendMessage({
        senderId : user._id,
        conversationId : id,
        text : msg
      }))
      setMsg("")
      // dispatch(getAllPosts())
    }

  useEffect(() => {
    dispatch(getConvOfUser({conversationId : id?._id}))
  }, [id?._id, message])

  
    
  
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
              
              <img className='msg-user-img' src={me ? id?.members[5] : id?.members[3]} alt="" />
              <p>{me ? id?.members[4] : id?.members[2]}</p>
            </Flex>
            <div  className="conversations">  {conversation === null ? (<Flex  padding={"1rem"} backgroundColor={alt}> <h4>Nothing found</h4></Flex>) : (<>
              {conversation?.map((conversation) => {
            console.log(conversation);
            // const {members} = conversation
            
            // User(conversation.members[1])
            // dispatch(getConvUser(conversation.members[1]))
            return(
              <Flex className='right-conv'>
                <Chat  key={conversation._id} conversation={conversation} />
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
          POST
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