import React, { useState } from 'react'
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
import {logoutUser, setMode} from '../../redux-toolkit/auth'
import {useNavigate} from 'react-router-dom';
import FlexBetweeen from '../widget/FlexBetweeen';


const Index = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuToggled, setIsMobileViewToggled] = useState(false);
  const {user} = useSelector((state) => state.auth);
  // console.log(user);
  const theme = useTheme();
  const isNonMobileScreenView = useMediaQuery("(min-width: 1000px)");
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  const Name =  `${user.firstName} ${user.lastName}`;






  return (
    <FlexBetweeen padding="1rem 6%" backgroundColor={alt}>
      <FlexBetweeen gap="1.75rem">
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

        {isNonMobileScreenView && (
          <FlexBetweeen
          backgroundColor={neutralLight}
          borderRadius="9px"
          gap="3rem"
          padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetweeen>
        )}



      </FlexBetweeen>






      {/* Desktop Nav */}
      {isNonMobileScreenView ? (
        <FlexBetweeen gap="2rem">

          {/* nightmode or lightmode button */}
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{fontSize : "25px"}} />
            ) : 
            (<LightMode sx={{fontSize : "25px", color : dark}} />)
            }
          </IconButton>

          <Message sx={{fontSize : "25px"}} />
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
              onClick={() => dispatch(logoutUser())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
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
                <MenuItem onClick={() => dispatch(setMode())}>
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