import React, {useEffect, useState} from 'react';
import Header from "./Header";
import {Link, Navigate, redirect, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {
    Accordion,
    AccordionSummary,
    Box,
    Button,
    Card,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem, Paper, styled
} from "@mui/material";
import TextField from "@mui/material/TextField";
import AddNewPropertySet from "./AddNewPropertySet";
import Team from "./Team";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import {getToken} from "./UserLog";

import LightbulbIcon from '@mui/icons-material/Lightbulb';
import AddNewPropertySetDiffPreAns from "./AddNewPropertySetDiffPreAns";
import Typography from "@mui/material/Typography";

const AddPropertySetToEmployee = () => {
    let companyId = localStorage.getItem("company_id");
    const location = useLocation();
    let teamId = location.state.teamId.teamId;
    const [employees, setEmployees] = useState();
    const [propertySets, setPropertySets] = useState();
    const [properties, setProperties] = useState();
    const [idProperties, setIdProperties] = useState();
    const [idEmployee, setIdEmployee] = useState();
    const [isOpen, setIsOpen] = useState(false);
    const [isShown, setIsShown] = useState(false);
    const [propertyForShow, setPropertyForShow] = useState([]);
    const [preAnswer, setPreAnswer] = useState([]);
    const [question, setQuestion] = useState([]);
    const [allForPropertySet, setAllForPropertySet] = useState();
    const [idQue, setIdQue] = useState();

    function handleClickLookClose() {
        setIsOpen(false)
    }

    console.log(allForPropertySet)


    const handleChange = (event) => {
        setIdEmployee(event.target.value);
    };


    const handleChangeProperties = (event) => {
        setIdProperties(event.target.value);
        setIsShown(true);


    };
    const handleClickOwnTrue = (e) => {

        setIsShown(true);

    };
    const handleClickOwnFalse = (e) => {

        setIsShown(false);

    };

    const handleClickLook = (e) => {
        GetAllAboutPropertySet();
        setIsOpen(true)


    };
    const navigate = useNavigate();

    function GetAllAboutPropertySet() {

        fetch("http://localhost:8080/propertySet/?property_set_id=" + idProperties.toString(), {
            'methods': 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then(response => response.json())
            .then(response => setPropertyForShow(response))
            .catch(error => console.log(error))
        fetch("http://localhost:8080/allForPropertySet/?property_set_id=" + idProperties.toString(), {
            'methods': 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`
            }
        })
            .then(response => response.json())
            .then(response => setAllForPropertySet(response))
            .catch(error => console.log(error))


    };


    const submit = (e) => {


        // window.open("http://localhost:3000/teams", '_blank', 'noopener,noreferrer')
        // e.preventDefault(); // запобігає оновленню сторінки
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`
            },
            body: JSON.stringify({
                team_id: teamId
            })
        };
        fetch('http://localhost:8080/employee/?employee_id=' + idEmployee.toString(), requestOptions)
            .then(response => response.json());

        fetch('http://localhost:8080/feedbackHistory/', {
            method: 'POST',
            body: JSON.stringify({
                employee_id: idEmployee,
                property_set_id: idProperties,
                team_id: teamId,
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${getToken()}`
            },
        })
            .then((response) => response.json())
            .then()
            .catch((err) => {
                console.log(err.message);
            });

        navigate(-1);

    };


    function GetPropertySets() {
        useEffect(() => {
            fetch("http://localhost:8080/propertySets/?company_id=" + companyId.toString(), {
                'methods': 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                }
            })
                .then(response => response.json())
                .then(response => setPropertySets(response))
                .catch(error => console.log(error))
        }, [])
    };

    function GetEmployeesAndPropertySets() {
        useEffect(() => {
            fetch("http://localhost:8080/employee/findByCompany/noTeam?company_id=" + companyId.toString(), {
                'methods': 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                }
            })
                .then(response => response.json())
                .then(response => setEmployees(response))
                .catch(error => console.log(error))
        }, [])
    };

    GetEmployeesAndPropertySets();
    GetPropertySets();
    const filteredPropertySets = propertySets?.filter(propertySet => {
        return propertySet?.is_used == 1
    });
    const Item = styled(Paper)(({theme}) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 60,
        lineHeight: '60px',
    }));

    return (
        <>
            <Header/>
            <Box textAlign='center'>
                <TextField
                    sx={{
                        color: "#012E95",

                        my: 9,
                        width: '70ch',
                        bgcolor: 'white',
                        borderColor: '#E2CEB5',
                    }} id="filled-select-employee_name" select label="Employee" onChange={handleChange} type="text"
                    variant="filled"
                >
                    {employees?.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.first_name + " " + option.last_name}
                        </MenuItem>
                    ))}
                </TextField>
            </Box>

            <Box textAlign='center'>
                <Grid container justifyContent="center"
                      alignItems="center">
                    <TextField sx={{
                        color: "#093CA9",
                        mr: 2,

                        ml: isShown ? 20 : 10,
                        width: '70ch',
                        bgcolor: 'white',
                        borderColor: '#E2CEB5',
                    }} id="prop" select label="Property set" onChange={handleChangeProperties} type="text" fullWidth
                               variant="filled"
                    >
                        {filteredPropertySets?.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.name}
                            </MenuItem>
                        ))}

                    </TextField>
                    {isShown && <Button size="large" sx={{mr: 2, bgcolor: "#093CA9"}} variant="contained"
                                        onClick={handleClickLook}>
                        <LightbulbIcon/>
                    </Button>}
                    <AddNewPropertySet/>

                </Grid>
            </Box>
            <Box sx={{my: 10}} x textAlign='center'>
                <Button size="large" sx={{bgcolor: "#093CA9"}} variant="contained" onClick={submit}>Save</Button>
            </Box>
            <Dialog PaperProps={{
                style: {
                    backgroundColor: '#E2CEB5',
                },
            }} open={isOpen} onClose={handleClickLookClose}
            >
                <DialogContent>
                    <DialogTitle sx={{bgcolor:"#093CA9", color:"white", borderRadius:'9px', mb:'12%'}} textAlign='center'>Property set - {propertyForShow?.name}
                    </DialogTitle>
                    <Box textAlign='center' component="form"
                         noValidate
                         autoComplete="off"
                    >
                        {
                            allForPropertySet?.questions?.map((item) =>

                                <Item sx={{m: 1}}>
                                    <Typography sx={{color: "black"}} variant="h7"
                                    >
                                        {item?.text}
                                    </Typography>
                                </Item>
                            )


                        }

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickLookClose} variant="contained" sx={{bgcolor: "#093CA9"}}>Close</Button>

                </DialogActions>
            </Dialog>
        </>
    );
};


export default AddPropertySetToEmployee;