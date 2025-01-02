import React, { useEffect, useState } from 'react'
import {
  Box, 
  useMediaQuery,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  Divider
} from '@mui/material';
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close
} from '@mui/icons-material'
import {  useDispatch, useSelector  } from 'react-redux';
import {getAllUsers, logoutUser, setMode} from '../../redux-toolkit/auth'
import {Link, Navigate, useNavigate} from 'react-router-dom';
import FlexBetweeen from '../widget/FlexBetweeen';
import Flex from '../widget/Flex';
import '../HomePage/Users.css'

const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [serach, setSearch] = useState("")
  const [isMobileMenuToggled, setIsMobileViewToggled] = useState(false);
  const {user, allusers} = useSelector((state) => state.auth);
  // console.log(user);
  const theme = useTheme();
  const isNonMobileScreenView = useMediaQuery("(min-width: 1000px)");
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  // const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  // const alt = theme.palette.background.alt;
  const Name =  `${user.firstName} ${user.lastName}`;
  const [is, setIs] = useState(false)
  
  const alt = theme.palette.background.alt;
  const al = theme.palette.background.default
  useEffect(() => {
    const {name} = serach;
    // console.log(name);
    
 dispatch(getAllUsers(serach))

  }, [serach])



  return (
    <FlexBetweeen
    padding="1rem 6%" backgroundColor={alt}>
      <FlexBetweeen
      
      gap="1.75rem">

        {isNonMobileScreenView && (
          <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          onClick={() => navigate("/")}
          sx={{
            "&:hover" : {
              color : primaryLight,
              cursor : 'pointer',
            },
          }}
          >
            FreeVoice
          </Typography>
        )}
        {!isNonMobileScreenView && (
        <Typography
        fontWeight="bold"
        fontSize="1.5rem"
        color="primary"
        onClick={() => navigate("/")}
        sx={{
          "&:hover" : {
            color : primaryLight,
            cursor : 'pointer',
          },
        }}
        >
          FreeVoice
        </Typography>
        )}
        

          <Flex
          backgroundColor={neutralLight}
          borderRadius="9px"
          gap="0rem"
          padding="0rem 0rem"
          >
            <InputBase
            className='input'
            onClick={() => setIs(!is)}
            placeholder="Search..." 
            onChange={(e) => setSearch(e.target.value)}
          value={serach}
          sx={{
            width: "90%",
            // backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
            height : "40px"
          }}/>
          </Flex>
          {is && (

<Flex  className='widget' backgroundColor={al}>
{allusers && (
  <Flex  className='user-widget'>
  {allusers.map((user) => {
    const {_id, firstName, picture} = user;
    return(
      <a href={`${_id}`}>

      <Flex onClick={() => setIs(!is)} backgroundColor={alt} className='box'>
        
      <img  className='user-img' src={picture} alt="" />
      <h4>{firstName}</h4>
      <Divider />
      </Flex>
      </a>
      
    )
  })}
  </Flex>
)}

</Flex>
) }

        



      </FlexBetweeen>






      {/* Desktop Nav */}
      {isNonMobileScreenView ? (
        <FlexBetweeen 
    onClick={() => setIs(false)}
        
        gap="2rem">

          {/* nightmode or lightmode button */}
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{fontSize : "25px"}} />
            ) : 
            (<LightMode sx={{fontSize : "25px", color : dark}} />)
            }
          </IconButton>
          
          <a href="/messenger">
          <Message  className='pointer' sx={{fontSize : "25px"}}>
          </Message>
          </a>
  
          

          <Notifications sx={{fontSize : "25px"}} />
          <Help sx={{fontSize : "25px"}} />
          <FormControl variant='standard' value={Name}>
            <Select
            value={Name}
            sx={{
              backgroundColor : neutralLight,
              width : "150px",
              borderRadius : "0.25rem",
              p: "0.25rem 1rem",
              "& .MuiSvgIcon-root" : {
                pr : "0.25rem",
                width : "3rem",
              },
              "& .MuiSelect-select:focus" : {
                backgroundColor : neutralLight,
              },
            }}
            input={<InputBase />}
            >
              <MenuItem value={Name}>
                <Typography>{Name}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(logoutUser())}>Log Out</MenuItem>
            </Select>
          </FormControl>

        </FlexBetweeen>
      ) : (
        <IconButton
        onClick={() => setIsMobileViewToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}


      {/* Mobile Nav */}
      {!isNonMobileScreenView && isMobileMenuToggled && (
        <Box
        position="fixed"
        right="0"
        bottom="0"
        height="100%"
        zIndex="10"
        maxWidth="500px"
        minWidth="300px"
        backgroundColor={alt}
        >
          {/* close icon */}
          <Box 
          display="flex"
          justifyContent="flex-end"
          p="1rem"
          >
            <IconButton
            onClick={() => setIsMobileViewToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          <FlexBetweeen
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton>
            <Link to="/messenger">
            <Message className='pointer' sx={{ fontSize: "25px" }} />
            </Link>
            </IconButton>
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={Name}>
              <Select
                value={Name}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={Name}>
                  <Typography>{Name}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(logoutUser())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetweeen>{/* MENU ITEMS */}

        </Box>
      )}
    </FlexBetweeen>
  )
}

export default Index