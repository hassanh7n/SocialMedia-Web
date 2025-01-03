import { Box } from "@mui/material";

const UserImage = ({ image, size = "60px" }) => {
// console.log(image);
  return (
    <Box width={size} height={size}>
      <img
      alt="user"
        src={image}
        style={{ objectFit: "cover", borderRadius: "50%" }}
        width={size}
        height={size}
        // alt="user"
      />
    </Box>
  );
};

export default UserImage;
