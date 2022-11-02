import React, {useState} from 'react';
import {DialogContent, Grid} from "@mui/material";
import TextField from "@mui/material/TextField";


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
    const name = useInput('',)
    const surname = useInput('',)
    const phone = useInput('',)
    const companyId = useInput('',)
    const CreateCompany = useInput('',)

    return (

        <DialogContent>
            <h1>Sign up</h1>
            <TextField onChange={e => name.onChange(e)} onBlur={e => name.onBlur(e)} autoFocus margin="dense" id="name"
                       label="Name" type="string" fullWidth variant="filled"/>
            <TextField onChange={e => surname.onChange(e)} onBlur={e => surname.onBlur(e)} autoFocus margin="dense"
                       id="surname" label="Surname" type="string" fullWidth variant="filled"/>
            <TextField onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)} autoFocus margin="dense"
                       id="email" label="Email" type="email" fullWidth variant="filled"/>
            <TextField onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)} autoFocus margin="dense"
                       id="password" label="Password" type="password" fullWidth variant="filled"/>
            <TextField onChange={e => phone.onChange(e)} onBlur={e => phone.onBlur(e)} autoFocus margin="dense"
                       id="phone" label="Phone" type="phone" fullWidth variant="filled"/>
            <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                    <TextField onChange={e => companyId.onChange(e)} onBlur={e => companyId.onBlur(e)} autoFocus
                               margin="dense" id="companyId" label="Company Id" type="string" fullWidth
                               variant="filled"/>
                </Grid>
                <h3>or</h3>
                <Grid item>
                    <TextField onChange={e => CreateCompany.onChange(e)} onBlur={e => CreateCompany.onBlur(e)} autoFocus
                               margin="dense" id="CreateCompany" label="Create Company" type="String" fullWidth
                               variant="filled"/>
                </Grid>
            </Grid>
        </DialogContent>
    );
};

export default SignUp;