import React, {useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import {createTheme, Dialog, DialogActions, DialogContent, ThemeProvider, Typography} from "@mui/material";
import {getToken, removeToken, setToken, setUser, UserLog} from "./UserLog";
import {Link, useNavigate} from "react-router-dom";


const theme = createTheme({

    palette: {
        now: {
            main: '#093CA9',
            contrastText: '#fff',
        },
        button: {
            main: '#012E95',
            contrastText: '#fff',
        },
    },
});
const useInput = (initialValue) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setDirty] = useState(false)

    const onChange = (e) => {
        setValue(e.target.value)
    }
    const onBlur = (e) => {
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
    const [open, setOpen] = useState(false)
    // const [token, setToken] = useState();
    let username = email.value
    let navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false);
    }

    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

// authorization: `Bearer ${getToken()}`
    const handleSignIn = () => {
        let path = '/teams';
        fetch('http://localhost:8080/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then(response => setUser(response))
            .catch(error => console.log(error));


        sleep(3000).then(() => {
            navigate('/teams');
            window.location.reload(false);

        })
        //     .then(() => {
        //     navigate('/teams');
        // });

        // localStorage.setItem('token', JSON.stringify(token));

    };

    return (
        <>
            <ThemeProvider theme={theme}>
                <Button size="large" variant="contained" color="button"
                                        key={"teams"}
                                        sx={{my: 2, color: 'white', display: 'block'}} onClick={handleClickOpen}>Log in</Button>
                <Dialog PaperProps={{
                    style: {
                        backgroundColor: '#36342C',
                    },
                }} open={open} onClose={handleClose} arial-labelledby="form-dialog-title">
                    <DialogContent>

                        <Typography sx={{color: "white"}} justifyContent="centre" margin="auto" variant="h2"
                                    component="h2">
                            Log in
                        </Typography>
                        <TextField sx={{bgcolor: "white"}} onChange={e => email.onChange(e)}
                                   onBlur={e => email.onBlur(e)} autoFocus margin="dense"
                                   id="email" label="Email" type="email" fullWidth variant="filled"/>
                        <TextField sx={{bgcolor: "white"}} onChange={e => password.onChange(e)}
                                   onBlur={e => password.onBlur(e)} autoFocus
                                   margin="dense"
                                   id="password" label="Password" type="password" fullWidth variant="filled"/>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="contained" color="button">Cancel</Button>

                        <Button onClick={handleSignIn} variant="contained" color="button">Log in</Button>

                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </>
    );
};

export default SignIn;