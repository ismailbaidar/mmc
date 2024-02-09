import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setAdminCurrentPage, setPaths } from "../Features/AdminNavigationSlice";
import { TextField, FormControl, FormLabel, Radio, RadioGroup, FormControlLabel, Grid, styled, Button, Typography } from "@mui/material";
import TextEditor from "../components/TextEditor";

// StyledRadio component to customize radio button color
const StyledRadio = styled((props) => <Radio {...props} />)(({ theme }) => ({
    color: '#c83a31',
    '&.Mui-checked': {
        color: '#c83a31', 
    },
}));

export default function CreateSpeakersAdmin() {
    const dispatch = useDispatch();
    const [mctValue, setMctValue] = useState('yes');
    const [mvpValue, setMvpValue] = useState('yes');
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    const handleMctChange = (event) => {
        setMctValue(event.target.value);
    };

    const handleMvpChange = (event) => {
        setMvpValue(event.target.value);
    };

    useEffect(() => {
        dispatch(setAdminCurrentPage("speakers"));
        dispatch(setPaths(["Dashboard", "Speakers", "Create"]));
    }, []);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedPhoto(file);
    };

    const handleFileUploadClick = () => {
        document.getElementById('raised-button-file').click();
    };

    return (
        <div className="create-event-admin">
            <div className="form-title">Create Speakers</div>
            <TextField type="outlined" label="full Name" />
            <div>
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={handleFileChange} 
                />
                <label htmlFor="raised-button-file">
                    <button className="add-event-button" onClick={handleFileUploadClick}>
                        Upload Photo
                    </button>
                </label>
                
                {selectedPhoto && (
                    <Typography variant="body2" color="black">
                        Selected Photo: {selectedPhoto.name}
                    </Typography>
                )}
            </div>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <Typography variant="subtitle1" fontWeight="bold">MCT</Typography>
                        <RadioGroup
                            aria-label="MCT"
                            name="MCT"
                            value={mctValue}
                            onChange={handleMctChange}
                            row
                        >
                            <FormControlLabel
                                value="yes"
                                control={<StyledRadio />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="no"
                                control={<StyledRadio />}
                                label="No"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <FormControl component="fieldset">
                        <Typography variant="subtitle1" fontWeight="bold">MVP</Typography>
                        <RadioGroup
                            aria-label="MVP"
                            name="MVP"
                            value={mvpValue}
                            onChange={handleMvpChange}
                            row
                        >
                            <FormControlLabel
                                value="yes"
                                control={<StyledRadio />}
                                label="Yes"
                            />
                            <FormControlLabel
                                value="no"
                                control={<StyledRadio />}
                                label="No"
                            />
                        </RadioGroup>
                    </FormControl>
                </Grid>
            </Grid>

            <TextField type="outlined" label="Biography" />

            <button className="add-event-button" >
                Add Speakers
            </button>
        </div>
    );
}
