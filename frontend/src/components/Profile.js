import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, CardMedia, Grid} from "@mui/material";
import Header from "./Header";
import PropsButton from "./PropsButton";

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


                    <Grid container justifyContent="center"
                          alignItems="center" >


                            <Card sx={{
                                my:10,
                                margin: 10,
                                maxWidth: 500,
                                bgcolor: '#E2CEB5',
                                borderRadius: 9,

                            }}>
                                <CardHeader
                                    sx={{my: -2, mr: 2}}
                                    action={
                                        <h4>First name</h4>
                                    }/>
                                <CardContent sx={{my: -4}}>
                                    <h1>{employee?.employee.first_name}</h1>
                                </CardContent>
                            </Card>


                            <Card sx={{

                                maxWidth: 250,
                                margin: 10,
                                bgcolor: '#E2CEB5',
                                borderRadius: 9,
                            }}>
                                <CardHeader
                                    sx={{my: -2, mr: 2}}
                                    action={
                                        <h4>Last name</h4>
                                    }/>
                                <CardContent sx={{my: -4}}>
                                    <h1>{employee?.employee.last_name}</h1>
                                </CardContent>
                            </Card>

                            <Card sx={{

                                maxWidth: 250,
                                margin: 10,
                                bgcolor: '#E2CEB5',
                                borderRadius: 9,
                            }}>
                                <CardHeader
                                    sx={{my: -2, mr: 2}}
                                    action={
                                        <h4>Company</h4>
                                    }/>
                                <CardContent sx={{my: -4}}>
                                    <h1>{employee?.company.name}</h1>
                                </CardContent>
                            </Card>


                    </Grid>
                    <Grid  container justifyContent="center"
                          alignItems="center" >

                            <Card sx={{
                                my:10,
                                margin: 10,
                                maxWidth: 400,
                                bgcolor: '#E2CEB5',
                                borderRadius: 9,
                            }}>
                                <CardHeader
                                    sx={{my: -2, mr: 2}}
                                    action={
                                        <h4>Email</h4>
                                    }/>
                                <CardContent sx={{my: -4}}>
                                    <h1>{employee?.employee.email}</h1>
                                </CardContent>
                            </Card>


                            <Card sx={{
                                maxWidth: 400,
                                margin: 10,

                                bgcolor: '#E2CEB5',
                                borderRadius: 9,
                            }}>
                                <CardHeader
                                    sx={{my: -3, mr: 2}}
                                    action={
                                        <h4>Phone number</h4>
                                    }/>
                                <CardContent sx={{my: -4}}>
                                    <h1>{employee?.employee.phone}</h1>
                                </CardContent>
                            </Card>


            </Grid>
        </>
    );
};

export default Profile;