import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {Dialog, DialogActions, DialogContent} from "@mui/material";


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
const SignIn = () => {
    const email = useInput('',)
    const password = useInput('',)
    const[open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false);
    }
    return (

        <DialogContent>
            <h1>Sign in</h1>
            <TextField onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)} autoFocus margin="dense" id="email" label="Email" type="email" fullWidth variant="filled" />
            <TextField onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)} autoFocus margin="dense" id="password" label="Password" type="password" fullWidth variant="filled" />

            {/*<h1>{email.value}</h1>*/}
        {/*<DialogActions>*/}
        {/*    <Button onClick={handleClose} variant="contained" color="primary">Cancel</Button>*/}
        {/*    <Button onClick={handleClose} variant="contained" color="success">Sign in</Button>*/}

        {/*</DialogActions>*/}
        </DialogContent>


    );
};

export default SignIn;