import React, {useState} from 'react';
import {Button, Dialog, DialogActions, DialogContent, Grid} from "@mui/material";
import TextField from "@mui/material/TextField";
import {getToken, setToken, setUser, UserLog} from "./UserLog";
import {useNavigate} from "react-router-dom";


const useInput = (initialValue, validations) => {
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
const SignUp = () => {
    const email = useInput('', {isEmpty: true, minLength: 5, isEmail: true})
    const password = useInput('', {isEmpty: true, minLength: 8,})
    // const [token, setToken] = useState();
    const first_name = useInput('',)
    const last_name = useInput('',)
    const phone = useInput('',)
    const companyId = useInput('',)
    const CreateCompany = useInput('',)
    const [open2, setOpen2] = useState(false)
    let navigate = useNavigate();

    const handleClickOpen2 = () => {
        setOpen2(true)
    }

    const handleClose2 = () => {
        setOpen2(false);
    }
    const handleSignUp = () => {
        fetch('http://localhost:8080/employee/', {
            method: 'POST',
            body: JSON.stringify({
                first_name: first_name.value,
                last_name: last_name.value,
                email: email.value,
                password: password.value,
                phone: phone.value,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then(response => setToken(response))
            .catch(error => console.log(error));
        let path = '/teams';
        navigate(path);

        fetch("http://localhost:8080/employee/findByToken", {
            'methods': 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then(response => response.json())
            .then(response => setUser(response))
            .catch(error => console.log(error))

    }

    return (
        <>
            <Button size="large" bgcolor="#012E95" variant="contained" onClick={handleClickOpen2}>Sign up</Button>
            <Dialog open={open2} onClose={handleClose2} arial-labelledby="pop">
                <DialogContent>
                    <h1>Sign up</h1>
                    <TextField onChange={e => first_name.onChange(e)} onBlur={e => first_name.onBlur(e)} autoFocus
                               margin="dense"
                               id="first_name" label="First Name" type="string" fullWidth variant="filled"/>
                    <TextField onChange={e => last_name.onChange(e)} onBlur={e => last_name.onBlur(e)} autoFocus
                               margin="dense"
                               id="last_name" label="Last Name" type="string" fullWidth variant="filled"/>
                    <TextField onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)} autoFocus margin="dense"
                               id="email" label="Email" type="email" fullWidth variant="filled"/>
                    <TextField onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)} autoFocus
                               margin="dense"
                               id="password" label="Password" type="password" fullWidth variant="filled"/>
                    <TextField onChange={e => phone.onChange(e)} onBlur={e => phone.onBlur(e)} autoFocus margin="dense"
                               id="phone" label="Phone" type="phone" fullWidth variant="filled"/>
                    {/*<Grid container justifyContent="space-between" alignItems="center">*/}
                    {/*    <Grid item>*/}
                    {/*        <TextField onChange={e => companyId.onChange(e)} onBlur={e => companyId.onBlur(e)} autoFocus*/}
                    {/*                   margin="dense" id="companyId" label="Company Id" type="string" fullWidth*/}
                    {/*                   variant="filled"/>*/}
                    {/*    </Grid>*/}
                    {/*    <h3>or</h3>*/}
                    {/*    <Grid item>*/}
                    {/*        <TextField onChange={e => CreateCompany.onChange(e)} onBlur={e => CreateCompany.onBlur(e)} autoFocus*/}
                    {/*                   margin="dense" id="CreateCompany" label="Create Company" type="String" fullWidth*/}
                    {/*                   variant="filled"/>*/}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose2} variant="contained" color="primary">Cancel</Button>
                    <Button onClick={handleSignUp} variant="contained" color="success">Sign up</Button>
                </DialogActions>
            </Dialog>
        </>
    )
        ;
};

export default SignUp;

