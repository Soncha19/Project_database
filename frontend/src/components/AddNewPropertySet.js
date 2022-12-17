import React, {useState} from 'react';
import TextField from "@mui/material/TextField";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Divider, FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select, Typography
} from "@mui/material";
import {getToken} from "./UserLog";
import AddNewPropertySetDiffPreAns from "./AddNewPropertySetDiffPreAns";
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';

const AddNewPropertySet = () => {
    const [nameOfProp, setPropName] = useState();
    const [propId, setPropId] = useState();
    const [numberAns, setNumberAns] = useState([{value: ''}]);
    const [inputFields, setInputFields] = useState([{title: ''}])
    const [inputAnswer, setInputAnswer] = useState([{answer: ''}])
    const [dialog, setDialog] = useState(null);
    let companyId = localStorage.getItem("company_id");
    ;

    const [winChoseAdd, setWinChoseAdd] = useState(false)


    function handleClickWinChoseAdd() {
        setWinChoseAdd(true)
    }

    const handleCloseWinChoseAdd = () => {
        setWinChoseAdd(false);
    }


    const open = Boolean(dialog);
    const handleClose = () => {
        setDialog(null);
    };

    // console.log(inputFields)


    const handleChangePropName = (event) => {
        setPropName(event.target.value);

    };

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    };
    const handleFormChangeAnswers = (index, event) => {
        let data = [...inputAnswer];
        data[index][event.target.name] = event.target.value;
        setInputAnswer(data);
    };

    const handleFormChangeValue = (index, event) => {
        let data = [...numberAns];
        data[index][event.target.name] = event.target.value;
        setNumberAns(data);
    };
    const addFields = () => {
        let newfield = {title: ''}
        setInputFields([...inputFields, newfield])

    };
    const addFieldsAnswer = () => {
        let newO = {answer: ''};
        let new1 = {value: ''};
        setInputAnswer([...inputAnswer, newO]);
        setNumberAns([...numberAns, new1]);
    };
    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    };
    const removeFieldsAnswer = (index) => {
        let data = [...inputAnswer];
        data.splice(index, 1)
        setInputAnswer(data)
        let data1 = [...numberAns];
        data1.splice(index, 1)
        setNumberAns(data1)
    };
    const handleClickOpen = () => {
        setDialog(true)
    }
    const que = []
    for (let i = 0; i < inputFields.length; i++) {
        que.push({
            "number": i,
            "text": inputFields[i].title
        })

    }
    const preAns = []
    for (let i = 0; i < inputAnswer.length; i++) {
        preAns.push({
            "numeric_value": numberAns[i].value,
            "text": inputAnswer[i].answer
        })

    }
    console.log(JSON.stringify({
        "property_set": {
            "name": nameOfProp
        },
        "questions": que,
        "pre_answers": preAns
    }))

    const submit = (e) => {
        fetch('http://localhost:8080/allPropertySet', {
            method: 'POST',
            body: JSON.stringify({
                "property_set": {
                    "name": nameOfProp,
                    "company_id": companyId.toString(),
                },
                "questions": que,
                "pre_answers": preAns
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${getToken()}`
            },
        })
            .then((response) => response.json())
            .then(response => setPropId(response.id))
            .catch((err) => {
                console.log(err.message);
            });

        setDialog(null);
        //         fetch('http://localhost:8080/propertySet', {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         name: nameOfProp,
        //         is_used: true,
        //         company_id: 1,
        //     }),
        //     headers: {
        //         'Content-type': 'application/json; charset=UTF-8',
        //     },
        // })
        //     .then((response) => response.json())
        //     .then(response => setPropId(response.id))
        //     .catch((err) => {
        //         console.log(err.message);
        //     });
        // for (let i = 0; i < inputFields.length; i++) {
        //     fetch('http://localhost:8080/question', {
        //         method: 'POST',
        //         body: JSON.stringify({
        //             number: i,
        //             text: inputFields[i].title,
        //             property_set_id: propId,
        //         }),
        //         headers: {
        //             'Content-type': 'application/json; charset=UTF-8',
        //         },
        //     })
        //         .then((response) => response.json())
        //         .then()
        //         .catch((err) => {
        //             console.log(err.message);
        //         });
        //
        // }
        //
        //
        //
        //
        //
        // for (let i = 0; i < inputAnswer.length; i++) {
        //     fetch('http://localhost:8080/preAnswer', {
        //         method: 'POST',
        //         body: JSON.stringify({
        //             text: inputAnswer[i].answer,
        //             numeric_value: parseInt(numberAns[0].value),
        //             property_set_id: propId,
        //
        //         }),
        //         headers: {
        //             'Content-type': 'application/json; charset=UTF-8',
        //         },
        //     })
        //         .then((response) => response.json())
        //         .then()
        //         .catch((err) => {
        //             console.log(err.message);
        //         });
        // }
    }


    return (
        <div>
            <Button size="large" sx={{bgcolor: "#093CA9"}} variant="contained"
                    onClick={handleClickWinChoseAdd}>+</Button>

            <Dialog PaperProps={{
                style: {
                    backgroundColor: '#E2CEB5',

                },
            }} fullWidth maxWidth="lg" open={open} onClose={handleClose}>
                <DialogTitle sx={{bgcolor:"#093CA9", color:"white", borderRadius:'9px', m:2}} textAlign='center'>Create new property set </DialogTitle>
                <Box textAlign='center' component="form"
                     sx={{
                         '& > :not(style)': {m: 1, width: '50ch'}, marginTop: 3,
                     }}

                     noValidate
                     autoComplete="off"
                >
                    <TextField sx={{
                        bgcolor: "#FFFFFF"
                    }} width='fit-content' id="pp" label="Property Name" onChange={handleChangePropName}
                               type="text" placeholder='Property Name'
                               variant="outlined"></TextField>
                </Box>
                <Grid container justifyContent="center"
                      alignItems="center" direction="row">
                    <Grid item xs>

                        <DialogContent>


                            {inputFields.map((input, index) => {
                                return (
                                    <div key={index}>
                                        <TextField sx={{
                                            bgcolor: "#FFFFFF",
                                            margin: 1,
                                        }} label="Property" name='title' placeholder='Property' value={input.title}
                                                   onChange={event => handleFormChange(index, event)}
                                                   variant="outlined"></TextField>

                                        <Button sx={{bgcolor: "#093CA9", my: 1, ml: 2}} variant="contained"
                                                onClick={() => removeFields(index)}><CloseIcon/></Button>
                                    </div>

                                )
                            })}
                            <Button sx={{bgcolor: "#093CA9", my: 2, ml: 9}} variant="contained"
                                    onClick={addFields}><AddIcon/> </Button>


                        </DialogContent>
                    </Grid>
                    <Grid item xs>

                        <DialogContent>


                            {inputAnswer.map((input, index) => {
                                return (

                                    <div key={index}>
                                        <Grid>
                                            <TextField sx={{
                                                bgcolor: "#FFFFFF", margin: 1,
                                            }} label="Answer" name='answer' placeholder='Answer'
                                                       value={input.answer}
                                                       onChange={event => handleFormChangeAnswers(index, event)}
                                                       variant="outlined"></TextField>
                                            <TextField sx={{
                                                bgcolor: "#FFFFFF", margin: 1, width: '15ch',
                                            }} label="Value" name='value' placeholder='Value'
                                                       value={input.value}
                                                       onChange={event => handleFormChangeValue(index, event)}
                                                       variant="outlined"></TextField>

                                            <Button sx={{bgcolor: "#093CA9", my: 1, ml: 2}} variant="contained"
                                                    onClick={() => removeFieldsAnswer(index)}><CloseIcon/></Button>
                                        </Grid>

                                    </div>

                                )
                            })}

                            <Button sx={{bgcolor: "#093CA9", my: 2, ml: 9}} variant="contained"
                                    onClick={addFieldsAnswer}><AddIcon/></Button>

                        </DialogContent>
                    </Grid>
                </Grid>
                <DialogActions>
                    <Button sx={{bgcolor: "white", color: "black"}} variant="contained"
                            onClick={handleClose}>Close</Button>
                    <Button size="large" sx={{bgcolor: "#093CA9"}} variant="contained" onClick={submit}>Save</Button>
                </DialogActions>
            </Dialog>
            <Dialog PaperProps={{
                style: {
                    backgroundColor: '#E2CEB5',
                },
            }}
                     open={winChoseAdd} onClose={handleCloseWinChoseAdd}
                    arial-labelledby="form-dialog-title">
                <DialogContent>
                    <DialogTitle sx={{bgcolor:"#093CA9", color:"white", borderRadius:'9px', mb:'12%'}} textAlign='center'>Choose the type of property set

                    </DialogTitle>
                    <Box textAlign='center' component="form"
                         sx={{
                             '& > :not(style)': {m: 1, width: '50ch'}, marginTop: 3,
                         }}
                         noValidate
                         autoComplete="off"
                    >
                        <Grid justifyContent="center" alignItems="center" direction="row"
                              container>
                            <Grid>
                                <AddNewPropertySetDiffPreAns/>
                            </Grid>
                            <Grid>
                                <Typography  sx={{m:1, color: 'black'}} variant="h6">or</Typography>
                            </Grid>
                            <Grid>
                                <Button onClick={handleClickOpen} justifyContent="centre" margin="auto" size="large"
                                        variant="contained" sx={{bgcolor: "#093CA9"}}>same answers to
                                    all</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseWinChoseAdd} variant="contained"
                            sx={{bgcolor: "#093CA9", mt:2}}>Cancel</Button>

                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddNewPropertySet;