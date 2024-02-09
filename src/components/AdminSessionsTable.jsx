import * as React from "react"
import PropTypes from "prop-types"
import { alpha } from "@mui/material/styles"
import { useState, useEffect } from "react"
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

import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { visuallyHidden } from "@mui/utils"
import { useDispatch, useSelector } from "react-redux"
import { deleteSession, getAllSession } from "../Features/SessionSlice"

import Loading from "./Loading"
import { getAllEvents } from "../Features/EventSlice"

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

const headCells = [
  {
    id: "eventName",
    numeric: false,
    disablePadding: false,
    label: "Event Name",
  },
  {
    id: "sessionDescription",
    numeric: false,
    disablePadding: false,
    label: "Session Description",
  },
  {
    id: "numberOfPlaces",
    numeric: true,
    disablePadding: false,
    label: "Number of Places",
  },
  {
    id: "eventType",
    numeric: false,
    disablePadding: false,
    label: "Type",
  },
  {
    id: "startDate",
    numeric: false,
    disablePadding: false,
    label: "Start Date",
  },
  {
    id: "endDate",
    numeric: false,
    disablePadding: false,
    label: "End Date",
  },
  {
    id: "eventAddress",
    numeric: false,
    disablePadding: false,
    label: "Address",
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
]

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
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
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>{/* <FilterListIcon /> */}</IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

function AdminSessionsTable({ searchQuery }) {
  const [order, setOrder] = React.useState("asc")
  const [orderBy, setOrderBy] = React.useState("calories")
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const rows = useSelector((state) => state.EventReducer.events)

  const dispatch = useDispatch()
  const loading = useSelector((state) => state.SessionReducer.loading)
  useEffect(() => {
    dispatch(getAllEvents()).then(() => console.log(rows))
    console.log("hello from the table session ")
    console.log(rows)
  }, [])
  const [filteredRows, setFilteredRows] = useState(rows)

  useEffect(() => {
    setFilteredRows(rows)
    console.log(rows)
  }, [rows])
  useEffect(() => {
    const filtered = rows?.filter((row) =>
      row.type?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    setFilteredRows(filtered)
    setPage(0)
  }, [searchQuery])
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

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

  const handleChangeDense = (event) => {
    setDense(event.target.checked)
  }

  const isSelected = (id) => selected.indexOf(id) !== -1

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredRows.length) : 0

  return (
    <>
      {loading && (
        <div className="loading-wrapper">
          <Loading />
        </div>
      )}
      <Box sx={{ width: "100%" }}>
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar numSelected={selected.length} />

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
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows?.length}
                />
                <TableBody>
                  {rows?.map((event, index) => {
                    const color = `${Math.floor(
                      Math.random() * 10
                    )}${Math.floor(Math.random() * 10)}${Math.floor(
                      Math.random() * 10
                    )}${Math.floor(Math.random() * 10)}${Math.floor(
                      Math.random() * 10
                    )}${Math.floor(Math.random() * 10)}`

                    return event.sessions.map((row) => {
                      const isItemSelected = isSelected(row.id)
                      const labelId = `enhanced-table-checkbox-${index}`
                      console.log(row)
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
                          <TableCell padding="checkbox"></TableCell>
                          {/* <TableCell align="left">{row.id}</TableCell> */}
                          {/* <TableCell align="left">{row.sessionName}</TableCell> */}
                          <TableCell align="left">
                            <span
                              className={`bg-[#${color}] p-3 rounded-[5000px] text-white text-[.7rem]`}
                            >
                              {event.name}
                            </span>
                          </TableCell>
                          <TableCell align="left">
                            {row.description.length > 15
                              ? row.description.substring(0, 15) + "..."
                              : row.description}
                          </TableCell>
                          <TableCell align="left">{row.nbrplace}</TableCell>
                          <TableCell align="left">{row.type}</TableCell>
                          <TableCell align="left">{row.dateStart}</TableCell>
                          <TableCell align="left">{row.dateEnd}</TableCell>
                          <TableCell align="left">{row.adress}</TableCell>
                          <TableCell align="left" className="action-cell">
                            <Link
                              to={`/admin/events/${row.id}/sessions/create`}
                            >
                              <IconButton>
                                <EditIcon />
                              </IconButton>
                            </Link>
                            <IconButton
                              onClick={() =>
                                dispatch(deleteSession(row.id)).then(() =>
                                  dispatch(getAllEvents())
                                )
                              }
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={10} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </>
  )
}
AdminSessionsTable.propTypes = {
  searchQuery: PropTypes.string.isRequired,
}
export default AdminSessionsTable
