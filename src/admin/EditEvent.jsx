import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setAdminCurrentPage, setPaths } from "../Features/AdminNavigationSlice"
import { Button, IconButton, TextField } from "@mui/material"
import {
  DateField,
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { TextareaAutosize } from "@mui/base"
import "../assets/styles/create-event-admin.css"
import TextEditor from "../components/TextEditor"
import EventSessionPage from "./EventSessionPage"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { addEvent, getAllEvents, updateEvent } from "../Features/EventSlice"
import { useParams } from "react-router-dom"

export default function EditEvent() {
  const dispatch = useDispatch()
  const events = useSelector((state) => state.EventReducer.events)
  useEffect(() => {
    dispatch(setAdminCurrentPage("events"))
    dispatch(setPaths(["Dashboard", "Events", "Create"]))
  }, [])

  const startDate = useRef()
  const endDate = useRef()
  const file = useRef()
  const [description, setDescription] = useState("")
  const name = useRef()

  const [formData, setFormData] = useState({
    supportFiles: [],
  })
  const handleDeleteFile = (fileIndex) => {
    const updatedFiles = [...formData.supportFiles]
    updatedFiles.splice(fileIndex, 1)
    setFormData({
      ...formData,
      supportFiles: updatedFiles,
    })
  }
  useEffect(() => {
    dispatch(getAllEvents())
  }, [])
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setFormData({
      ...formData,
      supportFiles: files,
    })
  }

  const { id } = useParams()
  function handleSubmit() {
    const formData = new FormData()
    formData.append("DateEnd", endDate.current.value)
    formData.append("DateStart", startDate.current.value)
    formData.append("Description", description)
    formData.append("file", file.current.files[0])
    formData.append("Name", name.current.value)
    dispatch(updateEvent({ formData, id }))
    console.log(
      startDate.current.value,
      description,
      endDate.current.value,
      file.current.files[0],
      name.current.value
    )
  }

  return (
    <div className="create-event-admin">
      <div className="form-title">Create event</div>
      <TextField type="outlined" label="Event Name" inputRef={name} />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker label="Start Date" inputRef={startDate} />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker label="End Date" inputRef={endDate} />
      </LocalizationProvider>
      <div>
        <input
          accept="image/*, application/pdf"
          id="file-upload"
          type="file"
          ref={file}
          multiple
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <label htmlFor="file-upload">
          <Button
            variant="contained"
            component="span"
            startIcon={<CloudUploadIcon />}
          >
            Add Support
          </Button>
        </label>
        {formData?.supportFiles.length > 0 && (
          <div className="file-preview">
            {formData?.supportFiles.map((file, index) => (
              <div key={index} className="preview-item">
                {file.type.includes("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview-${index}`}
                    style={{ maxWidth: "100%", maxHeight: "100px" }}
                  />
                ) : (
                  <span>{file.name}</span>
                )}
                <IconButton
                  color="secondary"
                  className="delete-icon"
                  onClick={() => handleDeleteFile(index)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </IconButton>
              </div>
            ))}
          </div>
        )}
      </div>
      <TextEditor setDescription={setDescription} />
      <div className="event-sessions-table">
        <EventSessionPage
          sessions={events?.find((e) => e.id == id)?.sessions}
        />
      </div>
      <button className="add-event-button" onClick={handleSubmit}>
        Add Event
      </button>
    </div>
  )
}
