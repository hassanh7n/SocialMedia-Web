import React, { useEffect, useState } from 'react'
import {Box, useMediaQuery, Divider} from "@mui/material";
import Navbar from '../Navbar';
import UserWidget from '../Widgets/UserWidget';
import MyPostWidget from '../Widgets/MyPostWidget';
import PostsWidget from '../Widgets/PostsWidget';
import { useDispatch, useSelector } from 'react-redux';
import FriendListWidget from '../Widgets/FriendListWidget';
import AdvertWidget from '../Widgets/AdvertWidget';
import { getAllUsers } from '../../redux-toolkit/auth';
import Users from './Users';
import Flex from '../widget/Flex';

import "./Users.css"
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const {user, allusers} = useSelector((store) => store.auth);
  const dispatch = useDispatch();
         const theme = useTheme();

  
  

  const {_id} = user;
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <Box >
      <Navbar  />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        {/* user section  */}
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget 
          picturePath={user.picture} 
          location={user.location}
          firstName={user.firstName}
          lastName={user.lastName}
          occupation={user.occupation}
          viewedProfile={user.viewedProfile}
          impressions={user.impressions}
          />
        </Box>

        {/* // my post widget */}
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={_id} />
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default HomePage