import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { setAdminCurrentPage, setPaths } from "../Features/AdminNavigationSlice"
import AdminSessionsTable from "../components/AdminSessionsTable"
import { TextField } from "@mui/material"

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"

import {
  DateField,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers"
AdapterDayjs
export default function AdminSessions() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setAdminCurrentPage("session"))
    dispatch(setPaths(["Dashboard", "Sessions"]))
  }, [])
  const [searchQuery, setSearchQuery] = useState("")
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value)
  }
  return (
    <div className="admin-sessions">
      <div className="title-create-new">
        <span className="title">Sessions</span>
      </div>

      <div className="search-area">
        <TextField
          type="outlined"
          label="search"
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
      <AdminSessionsTable searchQuery={searchQuery} />
    </div>
  )
}
