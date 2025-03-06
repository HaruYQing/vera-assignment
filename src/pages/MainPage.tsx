// import React from 'react'
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Link,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { fetchPosts, fetchUsers } from "../services/api";
import { PostWithUser } from "../types";
import { useNavigate } from "react-router-dom";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: 16,
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(0,0,0,0.1)",
    color: theme.palette.common.black,
  },
}));

const MainPage = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<PostWithUser[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // get posts and users
      const [postsData, usersData] = await Promise.all([
        fetchPosts(),
        fetchUsers(),
      ]);

      // combine datas
      const postsWithUsers = postsData.map((post, index) => {
        const user = usersData.find((user) => user.id === post.userId);
        return {
          index: index + 1, // auto-incremented
          id: post.id,
          title: post.title,
          name: user ? user.name : "Unknown User",
          userId: post.userId,
        };
      });

      setPosts(postsWithUsers);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // on first rendering
  useEffect(() => {
    fetchData();
  }, []);

  // on refreshing
  const handleRefresh = () => {
    fetchData();
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          my: 3,
        }}
      >
        <Typography variant="h4">Posts</Typography>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </Box>
      <TableContainer sx={{ maxWidth: "1200px" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ width: "15%" }}>Index</StyledTableCell>
              <StyledTableCell sx={{ width: "60%" }}>Title</StyledTableCell>
              <StyledTableCell sx={{ width: "25%" }}>User</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((post, index) => (
                <TableRow key={index}>
                  <TableCell>{post.index}</TableCell>
                  <TableCell>
                    <Link
                      onClick={() => {
                        navigate(`post/${post.id}`);
                      }}
                      sx={{ cursor: "pointer" }}
                    >
                      {post.title}
                    </Link>
                  </TableCell>
                  <TableCell>{post.name}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={posts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};

export default MainPage;
