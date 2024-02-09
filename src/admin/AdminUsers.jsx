import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAdminCurrentPage, setPaths } from "../Features/AdminNavigationSlice";
import { TextField, Select, MenuItem } from "@mui/material";
import UsersAdminTable from "../components/UsersAdminPage";
import { Link } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
export default function AdminUsers() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  useEffect(() => {
    dispatch(setAdminCurrentPage("users"));
    dispatch(setPaths(["Dashboard", "Users"]));
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleRoleSelectChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return (
    <div className="admin-events">
      <div className="title-create-new">
        <span className="title">Users</span>
        <Link to="create" className="create-new-button">
          Create New
        </Link>
      </div>

      <div className="search-area">
        <TextField
          type="outlined"
          label="Search"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <Select
          value={selectedRole}
          
          onChange={handleRoleSelectChange}
          label="Role"
          type="outlined"
         
        >
          <InputLabel id="demo-simple-select-helper-label">Role</InputLabel>
          <MenuItem onClick={()=>setSelectedRole("")} value="">All</MenuItem>
          <MenuItem onClick={()=>setSelectedRole("User")} value="User">User</MenuItem>
          <MenuItem onClick={()=>setSelectedRole("Admin")} value="Admin">Admin</MenuItem>
        </Select>
      </div>
      <UsersAdminTable searchQuery={searchQuery} selectedRole={selectedRole} />



    </div>
  );
}
