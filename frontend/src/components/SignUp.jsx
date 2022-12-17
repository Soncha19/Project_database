import React, {useState} from 'react';
import {
    Button,
    createTheme,
    Dialog,
    DialogActions,
    DialogContent, DialogTitle,
    Grid,
    ThemeProvider,
    Typography
} from "@mui/material";
import TextField from "@mui/material/TextField";
import {getToken, setToken, setUser, UserLog} from "./UserLog";
import {useNavigate} from "react-router-dom";

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

    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
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
            .then(response => setUser(response))
            .catch(error => console.log(error));

        sleep(3000).then(() => {
            navigate('/teams');
            window.location.reload(false);

        })

    }

    return (
        <>
            <ThemeProvider theme={theme}>
                <Button size="large" variant="contained" color="button"
                                        key={""}
                                        sx={{mx: 2, my: 2, display: 'block'}} onClick={handleClickOpen2}>Sign up</Button>
                <Dialog PaperProps={{
                    style: {
                        backgroundColor: '#E2CEB5',
                    },
                }} open={open2} onClose={handleClose2} arial-labelledby="pop">
                    <DialogTitle sx={{bgcolor:"#093CA9", color:"white", borderRadius:'9px', m:2}} textAlign='center'>Sign up </DialogTitle>
                    <DialogContent>

                        <TextField sx={{bgcolor: "white"}} onChange={e => first_name.onChange(e)}
                                   onBlur={e => first_name.onBlur(e)} autoFocus
                                   margin="dense"
                                   id="first_name" label="First Name" type="string" fullWidth variant="filled"/>
                        <TextField sx={{bgcolor: "white"}} onChange={e => last_name.onChange(e)}
                                   onBlur={e => last_name.onBlur(e)} autoFocus
                                   margin="dense"
                                   id="last_name" label="Last Name" type="string" fullWidth variant="filled"/>
                        <TextField sx={{bgcolor: "white"}} onChange={e => email.onChange(e)}
                                   onBlur={e => email.onBlur(e)} autoFocus margin="dense"
                                   id="email" label="Email" type="email" fullWidth variant="filled"/>
                        <TextField sx={{bgcolor: "white"}} onChange={e => password.onChange(e)}
                                   onBlur={e => password.onBlur(e)} autoFocus
                                   margin="dense"
                                   id="password" label="Password" type="password" fullWidth variant="filled"/>
                        <TextField sx={{bgcolor: "white"}} onChange={e => phone.onChange(e)}
                                   onBlur={e => phone.onBlur(e)} autoFocus margin="dense"
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
                        <Button onClick={handleClose2} variant="contained" color="button">Cancel</Button>
                        <Button onClick={handleSignUp} variant="contained" color="button">Sign up</Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </>
    )
        ;
};

export default SignUp;

