import React, { useEffect, useRef, useState } from "react"
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  IconButton,
} from "@mui/material"
import CloudUploadIcon from "@mui/icons-material/CloudUpload"
import { GridDeleteIcon } from "@mui/x-data-grid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { setPaths } from "../Features/AdminNavigationSlice"
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { useNavigate, useParams } from "react-router-dom"
import { addSession } from "../Features/SessionSlice"
import { getSubCategories } from "../Features/CategorySlice"
import Loading from "../components/Loading"
import { getTargetAudiences } from "../Features/TargetAudienceSlice"

const CreateSessionPage = () => {
  const [formData, setFormData] = useState({
    supportFiles: [],
  })
  const targetAudience = useSelector(
    (state) => state.TargetAudienceReducer.targetAudiences
  )
  const subcategories = useSelector(
    (state) => state.CategoryReducer.subCategories
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getSubCategories())
    dispatch(getTargetAudiences())
  }, [])

  useEffect(() => {
    dispatch(setPaths(["Dashboard", "Sessions", "Create"]), [])
  }, [])

  const sessionNameRef = useRef()
  const sessionStartDate = useRef()
  const sessionEndDate = useRef()
  const sessionSponsor = useRef()
  const sessionDescription = useRef()
  const sessionTargetAudience = useRef()
  const sessionNbrPlaces = useRef()
  const sessionType = useRef()
  const sessionAddress = useRef()

  const loading = useSelector((state) => state.SessionReducer.loading)

  const handleChange = (e) => {
    console.log(e.target)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    setFormData({
      ...formData,
      supportFiles: formData.supportFiles.concat(files),
    })
  }

  const handleDeleteFile = (fileIndex) => {
    const updatedFiles = [...formData.supportFiles]
    updatedFiles.splice(fileIndex, 1)
    setFormData({
      ...formData,
      supportFiles: updatedFiles,
    })
  }
  const { id } = useParams()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({
      adress: sessionAddress.current.value,
      dateEnd: sessionEndDate.current.value,
      dateStart: sessionStartDate.current.value,
      description: "  ",
      nbrplace: parseInt(sessionNbrPlaces.current.value),
      type: sessionType.current.value,
      // id: "<uuid>",
      eventId: id,
      targetAudienceId: sessionTargetAudience.current.value,
    })

    dispatch(
      addSession({
        name: sessionNameRef.current.value,
        adress: sessionAddress.current.value,
        dateEnd: sessionEndDate.current.value,
        dateStart: sessionStartDate.current.value,
        description: "something",
        nbrplace: sessionNbrPlaces.current.value,
        type: sessionType.current.value,
        targetAudienceId: sessionTargetAudience.current.value,
        eventId: id,
      })
    ).then(() => navigate("/admin/events/update/" + id))
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit} className="create-session-admin">
          <TextField
            label="session Name"
            name="eventName"
            fullWidth
            inputRef={sessionNameRef}
            margin="normal"
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Start Date"
              name="startDate"
              type="date"
              fullWidth
              margin="normal"
              format="YYYY-MM-DDThh:mm:ss"
              inputRef={sessionStartDate}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </LocalizationProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="End Date"
              name="endDate"
              type="date"
              inputRef={sessionEndDate}
              fullWidth
              format="YYYY-MM-DDThh:mm:ss"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </LocalizationProvider>

          <TextField
            label="Number of Places"
            name="numberOfPlaces"
            inputRef={sessionNbrPlaces}
            type="number"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Type"
            name="eventType"
            fullWidth
            inputRef={sessionType}
            margin="normal"
          />
          <TextField
            label="Address"
            name="eventAddress"
            inputRef={sessionAddress}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="targetAudienceLabel">Target Audience</InputLabel>
            <Select
              inputRef={sessionTargetAudience}
              labelId="targetAudienceLabel"
              name="targetAudience"
            >
              {targetAudience?.map((ta) => {
                return (
                  <MenuItem value={`${ta.targetAudienceId}`}>
                    {ta.nameTargetAudience}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="sponsorLabel">Sponsor</InputLabel>
            <Select
              labelId="sponsorLabel"
              name="sponsor"
              inputRef={sessionSponsor}
            >
              <MenuItem value="Sponsor A">Sponsor A</MenuItem>
              <MenuItem value="Sponsor B">Sponsor B</MenuItem>
              <MenuItem value="Sponsor C">Sponsor C</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="categoryLabel">Category</InputLabel>
            <Select
              labelId="categoryLabel"
              // inputRef={sessionCa}
              name="category"
            >
              {subcategories.map((sc) => {
                return (
                  <MenuItem value={sc.subCategoryId}>
                    {sc.nameSubCategory}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>

          <div>
            <input
              accept="image/*, application/pdf"
              id="file-upload"
              type="file"
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
            {formData.supportFiles.length > 0 && (
              <div className="file-preview">
                {formData.supportFiles.map((file, index) => (
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

          <Button type="submit" className="submit-form-button">
            Submit
          </Button>
        </form>
      )}
    </>
  )
}

export default CreateSessionPage
