import * as React from "react"
import { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { alpha } from "@mui/material/styles"
import Box from "@mui/material/Box"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TablePagination from "@mui/material/TablePagination"
import TableRow from "@mui/material/TableRow"
import TableSortLabel from "@mui/material/TableSortLabel"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import { Link } from "react-router-dom"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import FormControlLabel from "@mui/material/FormControlLabel"
import Switch from "@mui/material/Switch"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { visuallyHidden } from "@mui/utils"
import { useDispatch, useSelector } from "react-redux"
import { deleteEvent, getAllEvents } from "../Features/EventSlice"
import Loading from "./Loading"

function createData(id, name, dateStart, dateEnd) {
  return {
    id,
    name,

    dateStart,
    dateEnd,
  }
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

const headCells = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "ID",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Event Name",
  },

  {
    id: "dateStart",
    numeric: false,
    disablePadding: false,
    label: "Start Date",
  },
  {
    id: "dateEnd",
    numeric: false,
    disablePadding: false,
    label: "End Date",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
]

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

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
  )
}

function EnhancedTableToolbar(props) {
  const { numSelected } = props

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          IT Events
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete"></Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>{/* <FilterListIcon /> */}</IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

function EventsAdminTable({ searchQuery }) {
  const [order, setOrder] = React.useState("asc")
  const [orderBy, setOrderBy] = React.useState("calories")
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const events = useSelector((state) => state.EventReducer.events)
  // const [filteredRows, setFilteredRows] = useState(rows)
  const rows = []
  const loading = useSelector((state) => state.EventReducer.loading)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllEvents())
  }, [])
  useEffect(() => {
    const filtered = rows?.filter((row) =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    // setFilteredRows(filtered)
    setPage(0)
  }, [searchQuery])
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelected = rows.map((n) => n.id);
  //     setSelected(newSelected);
  //     return;
  //   }
  //   setSelected([]);
  // };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (id) => selected.indexOf(id) !== -1

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0
  function handleDelete(id) {
    dispatch(deleteEvent(id)).then(() => dispatch(getAllEvents()))
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        {loading ? (
          <Loading scale=".5" />
        ) : (
          <TableContainer>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {events?.map((row, index) => {
                  const isItemSelected = isSelected(row.id)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: "pointer" }}
                    >
                      {/* <TableCell padding="checkbox"></TableCell> */}
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>

                      <TableCell align="left">{row.dateStart}</TableCell>
                      <TableCell align="left">{row.dateEnd}</TableCell>
                      <TableCell align="left">
                        <IconButton>
                          <Link to={`/admin/events/update/${row.id}`}>
                            <EditIcon />
                          </Link>
                        </IconButton>
                        <IconButton onClick={() => handleDelete(row.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={7} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          // count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}

EventsAdminTable.propTypes = {
  searchQuery: PropTypes.string.isRequired,
}

export default EventsAdminTable
