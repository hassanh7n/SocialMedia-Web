import { Box, Typography, useTheme } from "@mui/material";
import FriendsTwo from "../widget/FriendsTwo";
import WidgetWrapper from "./WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsersfrinds } from "../../redux-toolkit/auth";


const FriendListWidgetTwo = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const { friends} = useSelector((store) => store.auth);
  

  // console.log(friends);

  useEffect(() => {
    dispatch(getUsersfrinds(userId))
  }, []);

  return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends.map((friend) => (
          <FriendsTwo
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            picture={friend.picture}
            
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidgetTwo;
