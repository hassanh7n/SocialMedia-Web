import React from 'react'
import './Users.css'
import { IconButton, Typography, useTheme } from "@mui/material";
import Flex from '../widget/Flex';


const Users = ({user}) => {
     const theme = useTheme();
      const { palette } = useTheme();
      const neutralLight = theme.palette.neutral.light;
      const dark = theme.palette.neutral.dark;
      // const background = theme.palette.background.default;
      const primaryLight = theme.palette.primary.light;
      const alt = theme.palette.background.alt;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;
      
    const {picture, _id, firstName, lastName} = user;
  return (
    <Flex  >
        <img className='user-img' src={picture} alt="" />
        <p className='user-name'>{firstName}</p>
    </Flex>
  )
}

export default Users