import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Post, User } from "../types";
import { fetchPost, fetchUser } from "../services/api";
import RefreshIcon from "@mui/icons-material/Refresh";

const PostDetailsPage = () => {
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!postId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const postData = await fetchPost(parseInt(postId));
        setPost(postData);

        const userData = await fetchUser(postData.userId);
        setUser(userData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  // TO-DO: replace by something looks better
  if (loading) {
    return (
      <Container
        sx={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            my: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          my={4}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  // TO-DO: use better words
  if (error) {
    return (
      <Container>
        <Typography color="error" my={4}>
          {error}
        </Typography>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Back
        </Button>
      </Container>
    );
  }

  // TO-DO: {post && ()}
  return (
    <Container sx={{ py: 4 }}>
      <Box>
        <p>{post?.title}</p>
        <span>{post?.body}</span>
        <p>{user?.username}</p>
      </Box>
    </Container>
  );
};

export default PostDetailsPage;
