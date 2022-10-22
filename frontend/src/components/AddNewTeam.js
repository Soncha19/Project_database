import React, {useState} from 'react';
import {Button, Card, Grid} from "@mui/material";
import TextField from "@mui/material/TextField";

const useInput = (initialValue) => {
    const[value, setValue] = useState(initialValue)
    const[isDirty, setDirty] = useState(false)

    const onChange = (e) =>{
        setValue(e.target.value)
    }
    const onBlur = (e) =>{
        setDirty(true)
    }
    return {
        value,
        onChange,
        onBlur,
        isDirty,

    }
}
const AddNewTeam = () => {
        const teamName = useInput('',)
    const tag = useInput('',)
    return (
    <Card sx={{
        margin: 2,

      }} >


        <Grid   container direction="column" justifyContent="center" alignItems="center" spacing={2}>
          <Grid item xs={0}>
             <TextField onChange={e => teamName.onChange(e)} onBlur={e => teamName.onBlur(e)} autoFocus margin="dense" id="teamName" label="New team name" type="teamName" fullWidth variant="filled" />
          </Grid>
          <Grid item xs={0}>
            <TextField onChange={e => tag.onChange(e)} onBlur={e => tag.onBlur(e)} autoFocus margin="dense" id="tag" label="Tag" type="tag" fullWidth variant="filled" />
              </Grid>
              <Grid item xs={0}>
              <Button color="inherit" variant="contained">Save</Button>
          </Grid>
        </Grid>


    </Card>
    );
};

export default AddNewTeam;