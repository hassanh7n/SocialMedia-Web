import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../widget/FlexBetweeen";
import { addOrRemoveFreinds, createConversations } from "../../redux-toolkit/auth";
// import FriendImage from "../Widgets/FriendImage";
import UserImage from "../Widgets/UserImage";

const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
  // console.log(friendId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, currentUser, isLoading } = useSelector((store) => store.auth);
  const {_id} = user;
  const {friends} = useSelector((store) => store.auth); 

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  
  const isFriend = friends.find((friend) => friend._id === friendId);
  const show = currentUser._id === user._id ? true : false;

  const patchFriend = async () => {
    dispatch(addOrRemoveFreinds({
      _id : _id,
      friendId : friendId
    }))
    dispatch(createConversations({
      senderId : _id,
      recieverId : friendId
    }))
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
      <UserImage image={userPicturePath} />
      {/* <img src={userPicturePath} alt="" /> */}
        <Box
          onClick={() => {
            navigate(`/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {_id !== friendId &&  (
        <IconButton
        disabled={isLoading}
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined disabled={isLoading} sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined disabled={isLoading} sx={{ color: primaryDark }} />
        )}
      </IconButton>
      )}
    </FlexBetween>
  );
};

export default Friend;
