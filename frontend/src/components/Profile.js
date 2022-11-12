import React, {useEffect, useState} from 'react';
import {Card, Grid} from "@mui/material";
import Header from "./Header";

const Profile = () => {
    const [employee, setEmployee] = useState();
    const [company, setCompany] = useState();
    let companyId = employee?.company_id;
    let arr = ['first_name', 'last_name', 'company_id'];
    console.log(company)


    function GetEmployees() {
        useEffect(() => {
            fetch("http://localhost:8080/profile/?employee_id=2", {
                'methods': 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(response => setEmployee(response))
                .catch(error => console.log(error))
        }, [])
    }

    GetEmployees();

    // function GetCompany() {
    //     useEffect(() => {
    //         fetch("http://localhost:8080/company/?company_id=" + companyId , {
    //             'methods': 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //             .then(response => response.json())
    //             .then(response => setCompany(response))
    //             .catch(error => console.log(error))
    //     }, [])
    // }
    //
    // GetCompany()
    return (
        <>
            <Header/>


            <Grid container spacing={0}>
                <Card sx={{
                    margin: 4,
                    flexGrow: 2,
                    elevation: 2,
                    maxWidth: 250
                }}>
                    <h4>First name</h4>
                    <h1>{employee?.employee.first_name}</h1>
                </Card>
                <Card sx={{
                    margin: 4,
                    flexGrow: 2,
                    elevation: 2,
                    maxWidth: 250
                }}>
                    <h4>Last name</h4>
                    <h1>{employee?.employee.last_name}</h1>
                </Card>
                <Card sx={{
                    margin: 4,
                    flexGrow: 2,
                    elevation: 2,
                    maxWidth: 250
                }}>
                    <h4>Company</h4>
                    <h1>{employee?.company.name}</h1>
                </Card>
                <Card sx={{
                    margin: 4,
                    flexGrow: 5,
                    elevation: 2,
                    maxWidth: 1000
                }}>
                    <h4>email</h4>
                    <h1> {employee?.employee.email}</h1>
                </Card>
                <Card sx={{
                    margin: 4,
                    flexGrow: 5,
                    elevation: 2,
                    maxWidth: 500
                }}>
                    <h4>phone</h4>
                    <h1> {employee?.employee.phone}</h1>
                </Card>

            </Grid>
        </>
    );
};

export default Profile;