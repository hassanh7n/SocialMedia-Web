import React, { useEffect, useState } from 'react'
import { getConvOfUser, getConvUser } from '../../redux-toolkit/auth';
import { useDispatch, useSelector } from 'react-redux';
import SingleGetUser from './SingleGetUser';
import { IconButton, Typography, useTheme } from "@mui/material";
import Conversation from './Conversation.css'
import { Box, useMediaQuery } from "@mui/material";
import Flex from '../widget/Flex';



const Conversations = ({conversation}) => {
  
      const theme = useTheme();
    const { palette } = useTheme();
    const alt = theme.palette.background.alt;
   
    
    
    return (
        <Flex padding={"0.8rem 1rem"}   backgroundColor={alt} className='user-main-div'>
            
            <img  className='users-img' src={conversation.members[3]} alt="" />
            <h4  className='user-name'>{conversation.members[2]}</h4>
        {/* {conversation?.map((user) => {
        // const {picture, firstName} = user;
        console.log(user);
        
        return(
            <SingleGetUser id={user._id} user={user} />
        )

        })} */}
       
    </Flex>
  )
}

export default Conversations