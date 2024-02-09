import React, { useEffect } from "react"
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
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import Switch from "@mui/material/Switch"
import FormControlLabel from "@mui/material/FormControlLabel"
import { Link, useNavigate } from "react-router-dom"
import { visuallyHidden } from "@mui/utils"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import { deleteSession } from "../Features/SessionSlice"

function createData(
  id,
  sessionName,
  description,
  address,
  numPlaces,

  startDate,
  endDate
) {
  return {
    id,
    sessionName,
    description,
    address,
    numPlaces,

    startDate,
    endDate,
  }
}

const headCells = [
  { id: "id", numeric: true, disablePadding: true, label: "ID" },
  {
    id: "sessionName",
    numeric: false,
    disablePadding: false,
    label: "Session Name",
  },
  {
    id: "description",
    numeric: false,
    disablePadding: false,
    label: "Description",
  },
  { id: "address", numeric: false, disablePadding: false, label: "Address" },
  {
    id: "numPlaces",
    numeric: true,
    disablePadding: false,
    label: "Number of Places",
  },

  {
    id: "startDate",
    numeric: false,
    disablePadding: false,
    label: "Start Date",
  },
  { id: "endDate", numeric: false, disablePadding: false, label: "End Date" },
  { id: "actions", numeric: false, disablePadding: false, label: "Actions" },
]

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

const EnhancedTableHead = (props) => {
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
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  numSelected: PropTypes.number.isRequired,
  rowCount: PropTypes.number.isRequired,
}

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props

  return (
    <Toolbar>
      {
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
          className="flex justify-content-between"
        >
          <div className="add-session">
            <div>Sessions</div>
            <Link to="sessions/create">
              <FontAwesomeIcon icon={faPlus} />
            </Link>
          </div>
        </Typography>
      }
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
}

const EventSessionPage = (props) => {
  const [order, setOrder] = React.useState("asc")
  const [orderBy, setOrderBy] = React.useState("calories")
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const rows = props.sessions
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc"
    setOrder(isAsc ? "desc" : "asc")
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows?.map((n) => n.id)
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
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleDelete = (id) => {
    dispatch(deleteSession(id)).then(() =>
      navigate("/admin/events/update/" + id)
    )
    console.log(`Deleting item with ID: ${id}`)
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows?.length) : 0

  useEffect(() => {
    console.log("rows", rows)
  }, [rows])
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
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
              {rows?.map((row, index) => {
                const isItemSelected = isSelected(row.id)
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox"></TableCell>
                    <TableCell align="left">{index + 1}</TableCell>
                    <TableCell align="left">
                      <Link to="/">{row.name}</Link>
                    </TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="left">{row.adress}</TableCell>
                    <TableCell align="left">{row.nbrplace}</TableCell>
                    <TableCell align="left">{row.dateStart}</TableCell>
                    <TableCell align="left">{row.dateEnd}</TableCell>
                    <TableCell align="left" className="action-cell">
                      <Link to={`sessions/${row.id}`}>
                        <IconButton aria-label="edit">
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(row.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })}
              {emptyRows > 0 && (
                <TableRow>
                  <TableCell colSpan={9} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
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
  )
}

export default EventSessionPage
