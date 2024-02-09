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

export default function EditSpeakersAdmin() {
    const dispatch = useDispatch();
    const [mctValue, setMctValue] = useState('yes');
    const [mvpValue, setMvpValue] = useState('yes');

    const handleMctChange = (event) => {
        setMctValue(event.target.value);
    };

    const handleMvpChange = (event) => {
        setMvpValue(event.target.value);
    };

    useEffect(() => {
        dispatch(setAdminCurrentPage("speakers"));
        dispatch(setPaths(["Dashboard", "Speakers", "Edit"]));
    }, []);



    const handleFileUploadClick = () => {
        document.getElementById('raised-button-file').click();t
    };

    return (
        <div className="create-event-admin">
            <div className="form-title">Edit Speakers</div>
            <TextField type="outlined" label="full Name" />
            <div>

                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                />
                <label htmlFor="raised-button-file">
                    <button className="add-event-button" onClick={handleFileUploadClick}>
                        Upload Photo
                    </button>
                </label>
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
                Edit Speakers
            </button>
        </div>
    );
}
