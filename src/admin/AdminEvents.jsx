import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAdminCurrentPage, setPaths } from "../Features/AdminNavigationSlice"
import "../assets/styles/admin-events.css"
import { TextField } from "@mui/material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import EventsAdminTable from "../components/EventsAdminTable"
import {
  DateField,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers"
import { Link } from "react-router-dom"
import { useSelect } from "@mui/base"

export default function AdminEvents() {
  const [searchQuery, setSearchQuery] = useState("")

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setAdminCurrentPage("events"))
    dispatch(setPaths(["Dashboard", "Events"]))
  }, [])
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value)
  }

  return (
    <div className="admin-events">
      <div className="title-create-new">
        <span className="title">Events</span>
        <Link to="create" className="create-new-button">
          Create New
        </Link>
      </div>

      <div className="search-area">
        <TextField
          type="outlined"
          label="Search by Event Name"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="Start Date" />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker label="End Date" />
        </LocalizationProvider>
        <button className="search-button">search</button>
      </div>

      <EventsAdminTable searchQuery={searchQuery} />
    </div>
  )
}
