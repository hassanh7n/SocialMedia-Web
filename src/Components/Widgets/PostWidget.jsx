import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
// import {
//   Typography,
//   InputBase,
//   Button,
//   useMediaQuery,
// } from "@mui/material";
import { Box, Divider, IconButton,Button, Typography, useTheme, InputBase } from "@mui/material";
import FlexBetween from "../widget/FlexBetweeen";
// import Friend from "components/Friend";
import WidgetWrapper from "./WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Friend from "../widget/Friend";
import { likeOrUnlikePost, getAllComments, postComments, getAllPosts} from "../../redux-toolkit/auth";
import Comment from "./Comment";
import UserImage from "./UserImage";


const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments
}) => {
  const [isComments, setIsComments] = useState(false);
  const [commentUpload, setCommentUpload] = useState(false)
  const [updateComment, setUpdateComment] = useState(false);
  const dispatch = useDispatch();
  const {user, isLoading,commentss, upload} = useSelector((store) => store.auth);

  // const commentcount = comments.length
  // console.log(commentss);
  const [post, setPost] = useState("");
  let [like, setLike] = useState(false);

  let isLiked = Boolean(likes[user._id]);
  // like = isLiked
  const likeCount = like  ? Object.keys(likes).length + 1 : Object.keys(likes).length;
  const {_id} = user;
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  console.log(isLiked);
  // if(isLiked){
  //   setLike(true)
  // }else{
  //   setLike(false)
  // }


  // if(isLiked){
  //   return setLike(true)
  // }
  const patchLike = () => {
    // isLiked = false
    // isLiked = !isLiked
   setLike(!like)
   
   dispatch(likeOrUnlikePost( {
     postId : postId,
     userId : _id
    }
  ))
  dispatch(getAllPosts())
  }
  const handlePost = () => {
  console.log(post);
  
    // console.log(post, postsPicture);
  
    dispatch(postComments({
      userId : _id,
      postId : postId,
      comment : post
    }))
    setPost("")
    // dispatch(getAllPosts())
  }
  


  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={picturePath}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton 
            onClick={patchLike}
            >
              {like ?  (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{upload? <>{commentss.length}</> : <>{comments.length}</>}</Typography>
          </FlexBetween>
        </FlexBetween>

        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      
      {isComments && (
        <Box mt="0.5rem">
          <FlexBetween gap="1rem">
        {/* <UserImage image={user.picture} /> */}
        <InputBase
          placeholder="Leave a comment"
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
            height : "40px"
          }}
        />
        <Button
          disabled={isLoading}
          onClick={handlePost}
          sx={{
            color: palette.background.alt,
            backgroundColor: palette.primary.main,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
      {upload? <>{commentss?.map((comments, i) => (
            <Box key={`${1}-${i}`}>
              
              <Divider />
              <Typography >
                
                <Comment comments={comments}  sx={{ color: main, m: "0.5rem 0", pl: "1rem" }} />
              </Typography>
              {/* <h2>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto quidem quis qui numquam voluptas laborum eius, eligendi reprehenderit ut, laboriosam, distinctio voluptatem maxime necessitatibus perspiciatis officia in. Earum, quisquam. Sit.</h2> */}
            </Box>
          ))}</> : <>{comments?.map((comments, i) => (
            <Box key={`${1}-${i}`}>
              
              <Divider />
              <Typography >
                
                <Comment comments={comments}  sx={{ color: main, m: "0.5rem 0", pl: "1rem" }} />
              </Typography>
              {/* <h2>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iusto quidem quis qui numquam voluptas laborum eius, eligendi reprehenderit ut, laboriosam, distinctio voluptatem maxime necessitatibus perspiciatis officia in. Earum, quisquam. Sit.</h2> */}
            </Box>
          ))}</>}
          
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;
