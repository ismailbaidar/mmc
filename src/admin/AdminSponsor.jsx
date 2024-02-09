import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAdminCurrentPage,
  setPaths,
} from "../Features/AdminNavigationSlice";
import SponsorAdminTable from "../components/SponsorAdminTable"
import "../assets/styles/admin-events.css";
import { TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EventsAdminTable from "../components/EventsAdminTable";
import {
  DateField,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { Link } from "react-router-dom";
import { useSelect } from "@mui/base";

export default function AdminSponsor() {
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAdminCurrentPage("sponsor"));
    dispatch(setPaths(["Dashboard", "Sponsor"]));
  }, []);
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="admin-events">
      <div className="title-create-new">
        <span className="title">Sponsor</span>
        <Link to="create" className="create-new-button">
          Create New
        </Link>
      </div>

      <div className="search-area">
        <TextField
          type="outlined"
          label="Search by sponsor Name"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
       
        {/* <button className="search-button">search</button> */}
      </div>

      <SponsorAdminTable searchQuery={searchQuery} />
    </div>
  );
}
