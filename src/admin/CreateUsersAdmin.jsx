import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setAdminCurrentPage, setPaths } from "../Features/AdminNavigationSlice"
import { TextField } from "@mui/material"
import TextEditor from "../components/TextEditor"
export default function CreateUsersAdmin() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setAdminCurrentPage("users"))
    dispatch(setPaths(["Dashboard", "Users", "Create"]))
  }, [])
  return (
    <div className="create-event-admin">
      <div className="form-title">Create Users</div>
      <TextField type="outlined" label="User fullName" />
      <TextField type="outlined" label="Email" />
      <TextField type="outlined" label="Password" />
      <TextField type="outlined" label="Role" />
      
      <button className="add-event-button">Add Users</button>

    </div>
  )
}
