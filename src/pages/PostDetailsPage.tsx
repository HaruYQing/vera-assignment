import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Comment, Post, User } from "../types";
import { fetchComments, fetchPost, fetchUser } from "../services/api";
import RefreshIcon from "@mui/icons-material/Refresh";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import Face6RoundedIcon from "@mui/icons-material/Face6Rounded";

const PostDetailsPage = () => {
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
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

        const commentData = await fetchComments(parseInt(postId));
        setComments(commentData);
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
    <>
      <IconButton
        // TO-DO: return to the exact page that post is at
        onClick={() => navigate(-1)}
        sx={{ position: "absolute", top: "16px", left: "16px", zIndex: 2 }}
      >
        <KeyboardBackspaceRoundedIcon />
      </IconButton>
      <Container
        sx={{
          py: 4,
          position: "relative",
        }}
      >
        <Paper
          sx={{
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
          <Typography variant="h4" sx={{ alignSelf: "start", ml: 3, mb: 2 }}>
            Post
          </Typography>
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
        <Paper
          sx={{
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
          <Typography variant="h5" sx={{ alignSelf: "start", marginLeft: 4 }}>
            Comments
          </Typography>
          <List
            sx={{
              // border: "1px dotted red",
              width: { xs: "80%", md: "85%", lg: "90%" },
            }}
          >
            {comments.map((comment, index) => (
              <ListItem
                key={index}
                sx={{
                  border: "1px dotted rgba(0,0,0,0.3)",
                  mb: 2,
                }}
              >
                <ListItemAvatar
                  sx={{
                    // border: "1px dotted gray",
                    mb: "auto",
                  }}
                >
                  <Avatar>
                    <Face6RoundedIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    // border: "1px dotted blue",
                    mr: 2,
                  }}
                >
                  <Typography sx={{ fontWeight: "bold" }}>
                    {comment.name}
                  </Typography>
                  <Typography>{comment.body}</Typography>
                </ListItemText>
                <IconButton
                // sx={{ border: "1px dotted purple" }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </>
  );
};

export default PostDetailsPage;
