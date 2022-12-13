import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import Header from "./Header";
import {Box, Card, Grid} from "@mui/material";
import TextField from "@mui/material/TextField";
import {getToken, UserLog} from "./UserLog";


const EmployeesOfTheCompany = () => {
    // let companyId;
    // const location = useLocation();
    //companyId = location.state.id.id;
    let companyId = localStorage.getItem("company_id");

    const [employees, setEmployees] = useState();
    const [value, setValue] = useState('');

    function GetEmployees() {
        useEffect(() => {
            fetch("http://localhost:8080/employee/findByCompany?company_id=" + companyId.toString(), {
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
    }

    GetEmployees();
    const filteredEmployees = employees?.filter(employee => {
        return employee.first_name.toLowerCase().includes(value.toLowerCase()) || employee.last_name.toLowerCase().includes(value.toLowerCase())
    });
    return (
        <>
            <Header/>
            <Box textAlign='center' component="form"
                     sx={{
                         '& > :not(style)': {m: 1, width: '50ch'}, marginTop: 3,
                     }}

                     noValidate
                     autoComplete="off"
                >
            <TextField sx={{
                color: "#012E95",
                ml: 20,

                width: '50ch',
                bgcolor: 'white',
                borderColor: '#E2CEB5',
                marginTop: 3,
                marginBottom:3
            }} onChange={(event) => setValue(event.target.value)} autoFocus margin="dense" id="employee_name"
                       label="Name" type="text" variant="outlined"/>
</Box>

            <Grid container spacing={0}>
                {
                    filteredEmployees?.map((item, index) =>
                        <Emp id={item?.id} key={item?.id} first_name={item?.first_name} last_name={item?.last_name} role={item?.role}/>
                    )
                }
            </Grid>

        </>
    );
};

const Emp = ({first_name, last_name, key, id, role}) => {
    return (
        <Link to="/feedbackhistory" state={{id: {id}}} style={{textDecoration: 'none'}}>
            <Card sx={{
                bgcolor: '#E2CEB5',
                margin: 2,
                padding: 13,
                borderRadius: 9

            }}>


                <h2>{first_name}</h2>


                <h2>{last_name}</h2>
                <h5>{role}</h5>


            </Card>

        </Link>
    );

};


export default EmployeesOfTheCompany;