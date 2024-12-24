import React from 'react'
import './Messenger.css'
import {Box, useMediaQuery} from "@mui/material";
import Navbar from '../Navbar';
import UserWidget from '../Widgets/UserWidget';
import MyPostWidget from '../Widgets/MyPostWidget';
import PostsWidget from '../Widgets/PostsWidget';
import { useSelector } from 'react-redux';
import FriendListWidget from '../Widgets/FriendListWidget';
import AdvertWidget from '../Widgets/AdvertWidget';

const Massenger = () => {
  const {user} = useSelector((store) => store.auth);
  const {_id} = user;
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
        {/* user section  */}
      </Box>
    </Box>
  )
}

export default Massenger