import React, {useEffect, useState} from 'react';
import {DialogActions, DialogContent} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


const useValidation = (value, validations) => {
    const[isEmpty, setEmpty] = useState(true)
    const[minLengthError, setMinLengthError] = useState(false)
    const[emailError, setEmailError] = useState(false)
    const[inputValid, setInputValid] = useState(false)

    useEffect(() => {
        for (const validation in validations){
            switch (validation) {
                case 'minLength':
                    value.length < validations[validation] ? setMinLengthError(true) : setMinLengthError(false)

                    break;
                case 'isEmpty':
                    value ? setEmpty(false) : setEmpty(true)
                    break;
                case 'isEmail':
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true)
                    break;

            }
        }

        }, [value])

    useEffect(() => {
        if(isEmpty || minLengthError || emailError){
            setInputValid(false)
        }else{
            setInputValid(true)
        }
        },[isEmpty, minLengthError, emailError] )
    return {
        isEmpty,
        minLengthError,
        emailError,
        inputValid,
    }
}
const useInput = (initialValue, validations) => {
    const[value, setValue] = useState(initialValue)
    const[isDirty, setDirty] = useState(false)
    const valid = useValidation(value, validations)

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
        ...valid
    }
}
const SignUp = () => {
    const email = useInput('', {isEmpty: true, minLength: 5, isEmail: true})
    const password = useInput('',{isEmpty: true, minLength: 8,})
    const name = useInput('',)
    const surname = useInput('',)
    const phone = useInput('',)
        const[open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false);
    }
    return (

         <DialogContent>
                <h1>Sign up</h1>
                <TextField onChange={e => name.onChange(e)} onBlur={e => name.onBlur(e)} autoFocus margin="dense" id="name" label="Name" type="string" fullWidth variant="filled" />
                <TextField onChange={e => surname.onChange(e)} onBlur={e => surname.onBlur(e)} autoFocus margin="dense" id="surname" label="Surname" type="string" fullWidth variant="filled" />
                {/*{(email.isDirty && email.isEmpty) && <div style={{color:'yellow'}}>Email cannot to be empty</div>}*/}
                {/*{(email.isDirty && email.minLengthError) && <div style={{color:'yellow'}}>Email must to be longer than 5 elements</div>}*/}
                {/*{(email.isDirty && email.emailError) && <div style={{color:'yellow'}}>Incorrect email</div>}*/}
                <TextField onChange={e => email.onChange(e)} onBlur={e => email.onBlur(e)} autoFocus margin="dense" id="email" label="Email" type="email" fullWidth variant="filled" />
               {/*{(password.isDirty && password.isEmpty) && <div style={{color:'yellow'}}>password cannot to be empty</div>}*/}
               {/* {(password.isDirty && password.minLengthError) && <div style={{color:'yellow'}}>password must to be longer than 8 elements</div>}*/}
                <TextField onChange={e => password.onChange(e)} onBlur={e => password.onBlur(e)} autoFocus margin="dense" id="password" label="Password" type="password" fullWidth variant="filled" />
                <TextField onChange={e => phone.onChange(e)} onBlur={e => phone.onBlur(e)} autoFocus margin="dense" id="phone" label="Phone" type="phone" fullWidth variant="filled" />
              {/*<TextField onChange={e => companyId.onChange(e)} onBlur={e => companyId.onBlur(e)} autoFocus margin="dense" id="companyId" label="Company Id" type="integer" fullWidth variant="filled" />*/}

              {/*<button disabled={!email.inputValid || !password.inputValid} type='submit'>Sign up</button>*/}
        {/*             <DialogActions>*/}
        {/*    <Button onClick={handleClose} variant="contained" color="primary">Cancel</Button>*/}
        {/*    <Button onClick={handleClose} variant="contained" color="success">Sign up</Button>*/}

        {/*</DialogActions>*/}
            </DialogContent>



    );
};

export default SignUp;