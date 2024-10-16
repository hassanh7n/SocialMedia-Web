import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetweeen";
import { addOrRemoveFreinds } from "../../redux-toolkit/auth";
// import FriendImage from "../Widgets/FriendImage";
import UserImage from "../Widgets/UserImage";

const FriendsTwo = ({ friendId, name, subtitle, picture }) => {
  console.log(picture, name);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, currentUser } = useSelector((store) => store.auth);
  const {_id} = user;
  const {friends, isLoading} = useSelector((store) => store.auth); 

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const isFriend = friends.find((friend) => friend._id === friendId);
  const show = currentUser._id === user._id ? true : false;
  // console.log(show);

  const patchFriend = async () => {
    dispatch(addOrRemoveFreinds({
      _id : _id,
      friendId : friendId,
    }))
  };

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
      <UserImage image={picture} />
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
      {_id !== friendId && show &&  (
        <IconButton
        disabled={isLoading}
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined disabled={isLoading}  sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined disabled={isLoading}  sx={{ color: primaryDark }} />
        )}
      </IconButton>
      )}
    </FlexBetween>
  );
};

export default FriendsTwo;
