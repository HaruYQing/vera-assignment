// import React from 'react'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: 16,
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "rgba(0,0,0,0.1)",
    color: theme.palette.common.black,
  },
  //   [`&.${tableCellClasses.body}`]: {
  //     fontSize: 14,
  //   },
}));

const MainPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Container sx={{ border: "1px dashed blue", py: 4 }}>
      <TableContainer sx={{ border: "1px solid red", maxWidth: "1200px" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell sx={{ width: "15%" }}>Index</StyledTableCell>
              <StyledTableCell sx={{ width: "60%" }}>Title</StyledTableCell>
              <StyledTableCell sx={{ width: "25%" }}>User</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* map here */}
            <TableRow>
              <TableCell>1</TableCell>
              <TableCell>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Veniam, temporibus!
              </TableCell>
              <TableCell>Bret</TableCell>
            </TableRow>
            {/* map end */}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={100}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Container>
  );
};

export default MainPage;
