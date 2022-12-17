import React, {useState} from 'react';
import {Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid} from "@mui/material";
import TextField from "@mui/material/TextField";
import {getToken} from "./UserLog";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from '@mui/icons-material/Add';
const AddNewPropertySetDiffPreAns = () => {

    const [nameOfProp, setPropName] = useState();
    const [propId, setPropId] = useState();
    const [numberAns, setNumberAns] = useState([{value: ''}]);
    const [inputFields, setInputFields] = useState([{title: ''}])
    const [inputAnswer, setInputAnswer] = useState([{answer: ''}])
    const [dialog, setDialog] = useState(null);
    let companyId = localStorage.getItem("company_id");
    const [winAddPreAns, setWinAddPreAns] = useState(false)
    const [allInputAnswer, setAllInputAnswer] = useState([])
    const [allNumberAns, setAllNumberAns] = useState([])
    // const [que, setQue] = useState([])
    const [preAns, setPreAns] = useState([])


    function handleClickWinAddPreAns() {
        setWinAddPreAns(true)
    }

    const handleCloseWinAddPreAns = () => {
        setWinAddPreAns(false);
    }
    // const que = []
    let count = 0
    const handleWinAddPreAns = (index) => {
        setAllInputAnswer([...allInputAnswer, [...inputAnswer]])
        setAllNumberAns([...allNumberAns, [...numberAns]])
        let data = [];
        for (let i = 0; i < inputAnswer.length; i++) {
            data.push({
                "numeric_value": parseInt(numberAns[i].value),
                "text": inputAnswer[i].answer
            });
        }
        console.log(data)
        setPreAns([...preAns, data])
        console.log(preAns)
        // setQue([...que, {
        //     "question": {
        //         "number": count,
        //         "text": inputFields[count].title
        //     },
        //     "pre_answers": preAns
        // }]);
        //
        // count += 1;

        setInputAnswer([{answer: ''}]);
        setNumberAns([{value: ''}]);
        // setInputFields([{title: ''}])
        setWinAddPreAns(false)
    };
console.log(preAns)
    // console.log(allInputAnswer)
    // console.log(setAllNumberAns)
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

    // let preAns = []

    // let count = 0;
    // let preAns = []
    // for (let i = 0; i < allInputAnswer[count].length; i++) {
    //
    //         // let u = allInputAnswer[i].length;
    //         preAns.push({
    //             "numeric_value": allNumberAns[count][i].value,
    //             "text": allInputAnswer[count][i].answer
    //         })
    // }
    //
    const que = []
    for (let i = 0; i < inputFields.length; i++) {
        que.push({
            "question": {
                "number": i,
                "text": inputFields[i].title
            },
            "pre_answers": preAns[i]
        });
    }
    //     count += 1;
    //         preAns = [];
    // }

    // for (let i = 0; i < inputFields.length; i++) {
    //     que.push({
    //         "question": {
    //             "number": i,
    //             "text": inputFields[i].title
    //         },
    //         "pre_answers": preAns
    //     })
    //
    // }
    console.log(JSON.stringify({
        "property_set": {
            "name": nameOfProp,
        },
        "questions": que
    }))

    const submit = (e) => {
        fetch('http://localhost:8080/allPropertySetUnique', {
            method: 'POST',
            body: JSON.stringify({
                "property_set": {
                    "name": nameOfProp,
                },
                "questions": que
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${getToken()}`
            },
        })
            .then((response) => response.json())
            .then(response => setPropId(response))
            .catch((err) => {
                console.log(err.message);
            });

        setDialog(null);
        window.location.reload(false);
    }
    return (
        <div >
            <Button  size="large" sx={{ bgcolor: "#093CA9"}} variant="contained" onClick={handleClickOpen}>unique answers</Button>
            <Dialog PaperProps={{
                style: {
                    backgroundColor: '#E2CEB5',

                },
            }} fullWidth maxWidth="sm" open={open} onClose={handleClose}>
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
                                        <Button sx={{bgcolor: "#093CA9", my: 1, ml: 2}} variant="contained"
                                                onClick={() => handleClickWinAddPreAns(index)}>Add Pre Answers</Button>
                                    </div>

                                )
                            })}
                            <Button sx={{bgcolor: "#093CA9", my: 2, ml: 9}} variant="contained"
                                    onClick={addFields}><AddIcon/></Button>


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
                        backgroundColor: '#36342C',
                    },
                }} open={winAddPreAns} onClose={handleCloseWinAddPreAns}
                    arial-labelledby="form-dialog-title">

                <DialogTitle bgcolor='#093CA9' color="white" textAlign='center'>Pre Answers
                </DialogTitle>
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

                <DialogActions>
                    <Button onClick={handleCloseWinAddPreAns} variant="contained" color="primary">Cansel</Button>
                    <Button onClick={handleWinAddPreAns} variant="contained" color="success">Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddNewPropertySetDiffPreAns;