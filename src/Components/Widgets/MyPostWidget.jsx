import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import FlexBetween from "../widget/FlexBetweeen";
import Dropzone from "react-dropzone";
import UserImage from "./UserImage";
import WidgetWrapper from "./WidgetWrapper";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postImageUpload, createPost } from "../../redux-toolkit/auth";
// import { setPosts } from "state";

const MyPostWidget = () => {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [file, setFile] = useState();
  const [post, setPost] = useState("");
  const { palette } = useTheme();
  const { user, postsPicture, isLoading } = useSelector((store) => store.auth);
  const {picture, _id} = user;
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMain = palette.neutral.mediumMain;
  const medium = palette.neutral.medium;

  // const handlePost = async () => {
  //   const formData = new FormData();
  //   formData.append("userId", _id);
  //   formData.append("description", post);
  //   if (image) {
  //     formData.append("picture", image);
  //     formData.append("picturePath", image.name);
  //   }

  //   // const response = await fetch(`http://localhost:3001/posts`, {
  //   //   method: "POST",
  //   //   headers: { Authorization: `Bearer ${token}` },
  //   //   body: formData,
  //   // });
  //   // const posts = await response.json();
  //   // dispatch(setPosts({ posts }));
  //   setImage(null);
  //   setPost("");
  // };
  const handleImage = (e) => {
    // const files = Array.from(e.target.files);
        // console.log(e.target.files[0]);
        setFile(e.target.files[0])
    const formData = new FormData();
    formData.append('file', e.target.files[0])
    // console.log(formData);
    dispatch(postImageUpload(formData))
    
  }

  const handlePost = () => {

  // console.log(post, postsPicture);

  dispatch(createPost({
    userId : _id,
    pictureUrl : postsPicture,
    description : post
  }))
  setIsImage(!isImage)

  setFile("");
  setPost("");
}
  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picture} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${medium}`}
          borderRadius="5px"
          mt="1rem"
          p="1rem"

        >
          
          
            <>
                  
                    <input 
                    className='file-input' 
                    onChange={handleImage} 
                    type="file" 
                    name="img" 
                    id="file-input" 
                    placeholder='choose file' 
                    multiple={false}
                    // onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
                    />
            </>
                  
          {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
          {/* <Dropzone
            acceptedFiles=".jpg,.jpeg,.png"
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${palette.primary.main}`}
                  p="1rem"
                  width="100%"
                  sx={{ "&:hover": { cursor: "pointer" } }}
                >
                  <input type="file" {...getInputProps()} 
                  onChange={handleImage} 
                  />
                  {!file ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{file.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{ width: "15%" }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone> */}
        </Box>
      )}

      <Divider sx={{ margin: "1.25rem 0" }} />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined sx={{ color: mediumMain }} />
          <Typography
            color={mediumMain}
            sx={{ "&:hover": { cursor: "pointer", color: medium } }}
          >
            Image
          </Typography>
        </FlexBetween>

        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Clip</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <AttachFileOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Attachment</Typography>
            </FlexBetween>

            <FlexBetween gap="0.25rem">
              <MicOutlined sx={{ color: mediumMain }} />
              <Typography color={mediumMain}>Audio</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined sx={{ color: mediumMain }} />
          </FlexBetween>
        )}

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
    </WidgetWrapper>
  );
};

export default MyPostWidget;
