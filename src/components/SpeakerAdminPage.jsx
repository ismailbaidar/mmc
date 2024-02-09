import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { visuallyHidden } from "@mui/utils";
import EditUsersAdmin from "../admin/EditUsersAdmin";

function createData(id, fullName, photo, mct, mvp, biograph) {
  return {
    id,
    fullName,
    photo,
    mct,
    mvp,
    biograph
  };
}

const rows = [
  createData(1, "Anas BELABBES", "../Images/anas_belabbes.jpg", true, false, "Lorem ipsum dolor sit amet, consectetur adipiscing elit."),
  createData(2, "Outman BAZZAZ", "../Images/outman_bazzaz.jpg", false, true, "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."),
];

const headCells = [
  { id: "id", numeric: true, disablePadding: true, label: "ID" },
  { id: "fullName", numeric: false, disablePadding: false, label: "fullName" },
  { id: "photo", numeric: false, disablePadding: false, label: "Photo" },
  { id: "mct", numeric: false, disablePadding: false, label: "MCT" },
  { id: "mvp", numeric: false, disablePadding: false, label: "MVP" },
  { id: "biograph", numeric: false, disablePadding: false, label: "Biograph" },
  { id: "actions", numeric: false, disablePadding: false, label: "Actions" }
];

function EnhancedTableHead(props) {
  const {
    order,
    orderBy,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id && (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              )}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function SpeakersTable({ searchQuery }) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("id");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filteredRows, setFilteredRows] = useState(rows);

  useEffect(() => {
    const filtered = rows.filter(row => row.fullName.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredRows(filtered);
    setPage(0);
  }, [searchQuery]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table aria-labelledby="tableTitle">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell align="left">{row.id}</TableCell>
                    <TableCell align="left">{row.fullName}</TableCell>
                    <TableCell align="left">
                      <img src={row.photo} style={{ maxWidth: "100px" }} alt={`Speaker ${row.id}`} />
                    </TableCell>
                    <TableCell align="left">{row.mct ? "Yes" : "No"}</TableCell>
                    <TableCell align="left">{row.mvp ? "Yes" : "No"}</TableCell>
                    <TableCell align="left">{row.biograph.length>15?row.biograph.substring(0,15)+"...":row.biograph}</TableCell>

                    <TableCell align="left">
                      <IconButton>
                        <Link to={`edit/${row.id}`}>
                          <EditIcon />
                        </Link>
                      </IconButton>
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default SpeakersTable;
