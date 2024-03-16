import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/index";
import FriendListWidgetTwo from "../Widgets/FriendListWidgetTwo";
import MyPostWidget from "../Widgets/MyPostWidget";
import PostsWidget from "../Widgets/PostsWidget";
import UserWidget from "../Widgets/UserWidget";
import { getUser } from "../../redux-toolkit/auth";

const ProfilePage = () => {
  const dispatch = useDispatch();
  // const [user, setUser] = useState(null);
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    dispatch(getUser(id));
  }, []);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  const {currentUser, user} = useSelector((store) => store.auth);
  console.log(currentUser);
   // eslint-disable-line react-hooks/exhaustive-deps
  
  if (!currentUser) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget 
          _id={id} 
          picturePath={currentUser.picture} 
          location={currentUser.location}
          firstName={currentUser.firstName}
          lastName={currentUser.lastName}
          occupation={currentUser.occupation}
          viewedProfile={currentUser.viewedProfile}
          impressions={currentUser.impressions}
          />
          <Box m="2rem 0" />
          <FriendListWidgetTwo  userId={id} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget 
          picturePath={currentUser.picture} />
          <Box m="2rem 0" />
          <PostsWidget userId={id} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;