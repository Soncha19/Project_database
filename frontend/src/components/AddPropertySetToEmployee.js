import React, {useEffect, useState} from 'react';
import Header from "./Header";
import {Link, Navigate, redirect, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {Box, Button, Card, Grid, MenuItem} from "@mui/material";
import TextField from "@mui/material/TextField";
import AddNewPropertySet from "./AddNewPropertySet";
import Team from "./Team";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

const AddPropertySetToEmployee = () => {
    let companyId = 1;

    const location = useLocation();
    let teamId = location.state.teamId.teamId;
    console.log(teamId)

    const [employees, setEmployees] = useState();
    const [propertySets, setPropertySets] = useState();
    const [properties, setProperties] = useState();
    const [idProperties, setIdProperties] = useState();
    const [idEmployee, setIdEmployee] = useState();

    const [isShown, setIsShown] = useState(false);
    console.log(idEmployee)

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

    const handleClickDelete = (e) => {



    };
    const navigate = useNavigate();

    const submit = (e) => {


        // window.open("http://localhost:3000/teams", '_blank', 'noopener,noreferrer')
        e.preventDefault(); // запобігає оновленню сторінки
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
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
                    'Content-Type': 'application/json'
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
                    'Content-Type': 'application/json'
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

                        ml: isShown? 20 : 10,
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
                    {isShown && <Button size="large" sx={{mr:2,bgcolor: "#093CA9"}} variant="contained" onClick={handleClickDelete}>
                        <DeleteTwoToneIcon/>
                    </Button>}
                    <AddNewPropertySet/>
                </Grid>
            </Box>
            <Box sx={{my: 10}} x textAlign='center'>
                <Button size="large" sx={{bgcolor: "#093CA9"}} variant="contained" onClick={submit}>Save</Button>
            </Box>
        </>
    );
};


export default AddPropertySetToEmployee;