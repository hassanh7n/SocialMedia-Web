import { Box } from "@mui/material";

const FriendImage = ({ image, size = "60px" }) => {
console.log(image);
  return (
    <Box width={size} height={size}>
      <img
      alt="image"
        src={image}
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        // alt="user"
      />
    </Box>
  );
};

export default FriendImage;
