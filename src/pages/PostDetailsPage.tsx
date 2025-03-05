import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

const PostDetailsPage = () => {
  const { postId } = useParams();
  return (
    <Box>
      <p>post ID: {postId}</p>
    </Box>
  );
};

export default PostDetailsPage;
