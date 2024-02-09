import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAdminCurrentPage, setPaths } from "../Features/AdminNavigationSlice";
import { TextField, Select, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import SpeakersTable from "../components/SpeakerAdminPage";
export default function AdminSpeakers() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(setAdminCurrentPage("speakers"));
    dispatch(setPaths(["Dashboard", "Speakers"]));
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };


  return (
    <div className="admin-events">
      <div className="title-create-new">
        <span className="title">Speaker</span>
        <Link to="create" className="create-new-button">
          Create New
        </Link>
      </div>

      <div className="search-area">
        <TextField
        className="searchIcon"
          type="outlined"
          label="Search"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
       
      </div>
      <SpeakersTable searchQuery={searchQuery}  />



    </div>
  );
}
