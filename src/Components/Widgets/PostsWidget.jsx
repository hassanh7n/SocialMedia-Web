import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setPosts } from "state";
import PostWidget from "./PostWidget";
import { getAllPosts, getUserPosts, getAllComments } from "../../redux-toolkit/auth";
// import { likeOrUnlikePost, , postComments} from "../../redux-toolkit/auth";


const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const {posts} = useSelector((store) => store.auth);

  

  useEffect(() => {
    if (isProfile) {
      dispatch(getUserPosts(userId));
     
    } else {
      dispatch(getAllPosts());
    }
  }, []); 

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          pictureUrl,
          userPictureUrl,
          comments,
          likes,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={pictureUrl}
            userPicturePath={userPictureUrl}
            likes={likes}
            comments = {comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;
