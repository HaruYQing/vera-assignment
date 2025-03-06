import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Post, User } from "../types";
import { fetchPost, fetchUser } from "../services/api";
import RefreshIcon from "@mui/icons-material/Refresh";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";

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
    <Container
      sx={{
        py: 4,
        position: "relative",
        // border: "1px dashed blue"
      }}
    >
      <IconButton
        onClick={() => navigate(-1)}
        sx={{ position: "fixed", top: "16px", left: "16px" }}
      >
        <KeyboardBackspaceRoundedIcon />
      </IconButton>
      <Paper
        sx={{
          // border: "1px dashed green",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
          px: 1,
          py: 4,
          width: "100%",
          maxWidth: "1200px",
        }}
      >
        <Box
          sx={{
            border: "1px solid rgba(0,0,0,0.1)",
            backgroundColor: "rgba(0,0,0,0.1)",
            width: { xs: "80%", md: "85%", lg: "90%" },
            px: 4,
            py: 2,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: "20px" }}>
            {post?.title}
          </Typography>
          <Typography sx={{ fontWeight: "bolder" }}>
            Author: {user?.name}
          </Typography>
        </Box>
        <Box
          sx={{
            border: "1px solid rgba(0,0,0,0.1)",
            width: { xs: "80%", md: "85%", lg: "90%" },
            px: 4,
            py: 4,
            display: "flex",
          }}
        >
          <Typography>{post?.body}</Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PostDetailsPage;
