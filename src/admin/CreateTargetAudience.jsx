import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  setAdminCurrentPage,
  setPaths,
} from "../Features/AdminNavigationSlice";
import { TextField } from "@mui/material";
import {
  DateField,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextareaAutosize } from "@mui/base";
import "../assets/styles/create-event-admin.css";
import TextEditor from "../components/TextEditor";
import EventSessionPage from "./EventSessionPage";
import { addTargetAudience } from "../Features/TargetAudienceSlice";
export default function CreateTargetAudience() {
  const dispatch = useDispatch();
  const targetAudienceName = useRef();
  useEffect(() => {
    dispatch(setAdminCurrentPage("target audience"));
    dispatch(setPaths(["Dashboard", "TargetAudience", "Create"]));
  }, []);
  function handleSubmit() {
    console.log("aaaa");
    dispatch(
      addTargetAudience({
        nameTargetAudience: targetAudienceName.current.value,
      })
    );
  }
  return (
    <div className="create-event-admin">
      <div className="form-title">Create Target Audience</div>
      <TextField
        type="outlined"
        label="Target Audience Name"
        inputRef={targetAudienceName}
      />

      <button className="add-event-button" onClick={handleSubmit}>
        Add Target Audience
      </button>
    </div>
  );
}
