import {
  Alert,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
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
import {
  deleteComment,
  fetchComments,
  fetchPost,
  fetchUser,
} from "../services/api";
import RefreshIcon from "@mui/icons-material/Refresh";
import KeyboardBackspaceRoundedIcon from "@mui/icons-material/KeyboardBackspaceRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import Face6RoundedIcon from "@mui/icons-material/Face6Rounded";
import { useAuth } from "../contexts/authContext";

const PostDetailsPage = () => {
  const { postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState(0);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const { loggedInUserEmail } = useAuth();

  const handleOpenConfirm = () => {
    setShowConfirm(true);
  };

  const handleCloseConfirm = () => {
    setShowConfirm(false);
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(commentId);

      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );

      handleCloseConfirm();
    } catch (error) {
      console.error("Error deleting comment:", error);
      setDeleteError(true);
    }
  };

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

  return (
    <>
      {post ? (
        <>
          <IconButton
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
              <Typography
                variant="h4"
                sx={{ alignSelf: "start", ml: 3, mb: 2 }}
              >
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
              <Typography
                variant="h5"
                sx={{ alignSelf: "start", marginLeft: 4 }}
              >
                Comments
              </Typography>
              <List
                sx={{
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
                        mb: "auto",
                      }}
                    >
                      <Avatar>
                        <Face6RoundedIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      sx={{
                        mr: 2,
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold" }}>
                        {comment.name}
                      </Typography>
                      <Typography>{comment.body}</Typography>
                    </ListItemText>
                    {comment.email === loggedInUserEmail && (
                      <IconButton
                        onClick={() => {
                          handleOpenConfirm();
                          setDeleteId(comment.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Container>
          <Dialog open={showConfirm} onClose={handleCloseConfirm}>
            <DialogTitle>{"Confirm Delete Comment"}</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to delete this comment?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={handleCloseConfirm}>
                Cancel
              </Button>
              <Button onClick={() => handleDeleteComment(deleteId)} autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
          {deleteError && (
            <Alert
              sx={{ position: "fixed", bottom: 0 }}
              severity="error"
              onClose={() => setDeleteError(false)}
            >
              Sorry, something went wrong. Please try again later.
            </Alert>
          )}
        </>
      ) : (
        <>
          <Container>
            <Typography variant="h1">
              Sorry, something went wrong. Please try again later.
            </Typography>
          </Container>
        </>
      )}
    </>
  );
};

export default PostDetailsPage;
