import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setAdminCurrentPage,
  setPaths,
} from "../Features/AdminNavigationSlice";
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
import TargetAudienceTable from "../components/DashboardTargetAudienceTable";

export default function AdminTargetAudience() {
  const [searchQuery, setSearchQuery] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAdminCurrentPage("target audience"));
    dispatch(setPaths(["Dashboard", "TargetAudience"]));
  }, []);
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div className="admin-target-audience">
      <div className="title-create-new">
        <span className="title">Target Audience</span>
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

        <button className="search-button">search</button>
      </div>
      <TargetAudienceTable />
    </div>
  );
}
