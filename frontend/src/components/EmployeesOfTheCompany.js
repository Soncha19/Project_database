import React, {useEffect, useState} from 'react';
import {Link, useLocation} from "react-router-dom";
import Header from "./Header";
import {Box, Card, CardMedia, Grid} from "@mui/material";
import TextField from "@mui/material/TextField";
import {getToken, UserLog} from "./UserLog";
import Typography from "@mui/material/Typography";


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
                    marginBottom: 3
                }} onChange={(event) => setValue(event.target.value)} autoFocus margin="dense" id="employee_name"
                           label="Name" type="text" variant="outlined"/>
            </Box>

            <Grid container spacing={0}>
                {
                    filteredEmployees?.map((item, index) =>
                        <Emp id={item?.id} key={item?.id} first_name={item?.first_name} last_name={item?.last_name}
                             role={item?.role} is_owner={item?.is_owner}/>
                    )
                }
            </Grid>

        </>
    );
};

const Emp = ({first_name, last_name, id, role, is_owner}) => {
    let isOwner = is_owner ? "owner" : 0;

    let isManager = role == "false" ? "manager" : 0;
    let isEmp = "employee"
    return (
        <Link to="/feedbackhistory" state={{id: {id}}} style={{textDecoration: 'none'}}>
            <Card sx={{
                bgcolor: '#E2CEB5',
                borderRadius: 9,
                minWidth: 310,
                margin: 1,
                height: 310,
                marginTop: 3

            }}>

                <CardMedia sx={{
                    marginTop: 4,
                }}>
                    <Typography sx={{color: "black", ml: 4}} variant="h4">
                        <Grid>
                            {first_name}
                        </Grid>
                        <Grid>
                            {last_name}
                        </Grid>
                        <Card variant="filled" sx={{
                        bgcolor: '#E2CEB5',
                        height: 250,
                    }}></Card>
                    </Typography>
                    <Typography sx={{minWidth: 195, color: "black", ml: 12, my: -17}} variant="h4">{isOwner || isManager || isEmp}</Typography>
                </CardMedia>

            </Card>

        </Link>
    );

};


export default EmployeesOfTheCompany;