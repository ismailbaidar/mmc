import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setAdminCurrentPage, setPaths } from "../Features/AdminNavigationSlice"
import { TextField } from "@mui/material"
import TextEditor from "../components/TextEditor"
export default function EditUsersAdmin() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setAdminCurrentPage("users"))
    dispatch(setPaths(["Dashboard", "Users", "Edit"]))
  }, [])
  return (
    <div className="create-event-admin">
      <div className="form-title">Edit Users</div>
      <TextField type="outlined" label="User fullName" />
      <TextField type="outlined" label="Email" />
      <TextField type="outlined" label="Password" />
      <TextField type="outlined" label="Role" />
      
      <button className="add-event-button">Edit Users</button>

    </div>
  )
}
