import React, {useEffect, useState} from 'react';
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    CardMedia, ClickAwayListener, createTheme, Dialog, DialogActions, DialogContent, DialogTitle,
    Fab,
    Grid,
    Grow,
    MenuItem,
    MenuList,
    Paper,
    Popper, ThemeProvider
} from "@mui/material";
import Header from "./Header";
import AddIcon from '@mui/icons-material/Add';
import PropsButton from "./PropsButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {getToken, UserLog} from "./UserLog";

const options = ['Create a new company', 'Join to the company', 'Leave company',];
const theme = createTheme({

    palette: {
        now: {
            main: '#093CA9',
            contrastText: '#fff',
        },
        button: {
            main: '#012E95',
            contrastText: '#fff',
        },
    },
});
const Profile = () => {
    const [employee, setEmployee] = useState();
    const [company, setCompany] = useState();
    const [open, setOpen] = useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [openNewCompany, setOpenNewCompany] = useState(false)
    const [companyName, setCompanyName] = useState();
    const [joinToCompany, setJoinToCompany] = useState(false)
    const [companyIdToJoin, setCompanyIdToJoin] = useState();
    let companyId = localStorage.getItem("company_id");
    let arr = ['first_name', 'last_name', 'company_id'];
    let isInCompany = companyId !== 1 ? false : true // якщо в компанії тоді присвоюється 0
    let isntInCompany = companyId == 1 ? true : false
    let isOwner = localStorage.getItem("is_owner").toString() == "false" ? false: true;
    const [leaveCompany, setLeaveCompany] = useState(false)


function handleClickLeaveCompany() {
        setLeaveCompany(true)
    }
    const handleCloseLeaveCompany = () => {
        setLeaveCompany(false);
    }
const [deleteCompany, setDeleteCompany] = useState(false)


    function handleClickDeleteCompany() {
        setDeleteCompany(true)
    }

    const handleCloseDeleteCompany = () => {
        setDeleteCompany(false);
    }
    const handleDeleteCompany = () => {
 const requestOptions = {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${getToken()}`,
        }
    };
    fetch('http://localhost:8080/company/?company_id='+companyId.toString(), requestOptions)
        .then(() => this.setState({ status: 'Delete successful' }));
    // fetch('http://localhost:8080/company/?company_id='+companyId.toString(), { method: 'DELETE' })
    //     .then(() => this.setState({ status: 'Delete successful' }));
    localStorage.setItem("company_id", JSON.stringify(1));
    localStorage.setItem("is_owner", JSON.stringify(false))
    }
    const handleLeaveCompany = () => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}`},
            body: JSON.stringify({company_id: 1})
        };
        fetch('http://localhost:8080/employee/?employee_id=' + localStorage.getItem("id").toString(), requestOptions)
            .then(response => response.json())
            .then(response => localStorage.setItem("company_id", JSON.stringify(response.company_id)));

    }

    const handleChangeCompanyIdToJoin = (event) => {
        setCompanyIdToJoin(event.target.value);

    };

    const handleJoinToCompany = () => {
        const requestOptions = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}`},
            body: JSON.stringify({company_id: companyIdToJoin})
        };
        fetch('http://localhost:8080/employee/?employee_id=' + localStorage.getItem("id").toString(), requestOptions)
            .then(response => response.json())
            .then(response => localStorage.setItem("company_id", JSON.stringify(response.company_id)));

    }
    // const requestOptions = {
    //        method: 'PUT',
    //        headers: { 'Content-Type': 'application/json' },
    //        body: JSON.stringify({ title: 'React PUT Request Example' })
    //    };
    //    fetch('https://jsonplaceholder.typicode.com/posts/1', requestOptions)
    //        .then(response => response.json())
    //        .then(data => this.setState({ postId: data.id }));
    function handleClickJoinToCompany() {
        setJoinToCompany(true)
    }

    const handleCloseJoinToCompany = () => {
        setJoinToCompany(false);
    }
    const handleCreateNewCompany = () => {
        fetch('http://localhost:8080/company/', {
            method: 'POST',
            body: JSON.stringify({
                name: companyName
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${getToken()}`
            },

        })
            .then((response) => response.json())
            .then(response => localStorage.setItem("company_id", JSON.stringify(response.id)))
            .catch((err) => {
                console.log(err.message);
            });
        localStorage.setItem("is_owner", JSON.stringify(true))
    }
    const handleChangeCompanyName = (event) => {
        setCompanyName(event.target.value);

    };

    function handleClickOpenNewCompany() {
        setOpenNewCompany(true)
    }

    const handleCloseNewCompany = () => {
        setOpenNewCompany(false);
    }


    function GetEmployees() {
        useEffect(() => {
            fetch("http://localhost:8080/profile/?employee_id=" + localStorage.getItem("id").toString(), {
                'methods': 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
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
        <ThemeProvider theme={theme}>
            <>
                <Header/>

                <Grid container justifyContent="center"
                      alignItems="center">


                    <Card sx={{
                        my: 10,
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

                    {(companyId == 1 ? false : true) && (<Card sx={{

                        maxWidth: 250,
                        margin: 10,
                        bgcolor: '#E2CEB5',
                        borderRadius: 9,
                    }}>
                        <CardHeader
                            sx={{my: -2, mr: 2}}
                            action={
                                <h4>Company name</h4>
                            }/>
                        <CardContent sx={{my: -4}}>
                            <h1>{employee?.company.name} </h1>

                        </CardContent>
                    </Card>)}
                    <Card sx={{

                        maxWidth: 250,
                        margin: 10,
                        bgcolor: '#E2CEB5',
                        borderRadius: 9,
                    }}>
                        <CardHeader
                            sx={{my: -2, mr: 2}}
                            action={
                                <h4>Company Id</h4>
                            }/>
                        <CardContent sx={{my: -4}}>
                            {(companyId == 1 ? false : true) && (<h1> {companyId}</h1>)}
                            {(companyId == 1 ? true : false) && (<h1> None</h1>)}
                        </CardContent>
                    </Card>


                </Grid>
                <Grid container justifyContent="center"
                      alignItems="center">

                    <Card sx={{
                        my: 10,
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


                    {isntInCompany && (<Button size="large" variant="contained" color="button"
                                               key="f1" textTransform='none' onClick={handleClickOpenNewCompany}

                                               sx={{
                                                   my: 2, color: 'white', maxWidth: 400,
                                                   margin: 10,
                                                   // borderRadius: 9,
                                               }}>

                        Create a new company
                    </Button>)}

                    {isntInCompany && (<Button size="large" variant="contained" color="button"
                                               key="f2" textTransform='none' onClick={handleClickJoinToCompany}

                                               sx={{
                                                   my: 2, color: 'white', maxWidth: 400,
                                                   margin: 10,
                                                   // borderRadius: 9,
                                               }}>

                        Join to the company
                    </Button>)}
                    {!isOwner && !isntInCompany && (<Button size="large" variant="contained" color="button"
                                                key="f3" textTransform='none' onClick={handleClickLeaveCompany}

                                                sx={{
                                                    my: 2, color: 'white', maxWidth: 400,
                                                    margin: 10,
                                                    // borderRadius: 9,
                                                }}>

                        Leave Company
                    </Button>)}
                    {isOwner &&  (<Button size="large" variant="contained" color="button"
                                                key="f4" textTransform='none' onClick={handleClickDeleteCompany}

                                                sx={{
                                                    my: 2, color: 'white', maxWidth: 400,
                                                    margin: 10,
                                                    // borderRadius: 9,
                                                }}>

                        Delete Company
                    </Button>)}


                </Grid>

                <Dialog open={openNewCompany} onClose={handleCloseNewCompany}
                        arial-labelledby="form-dialog-title">
                    <DialogContent>
                        <DialogTitle bgcolor='#093CA9' color="white" textAlign='center'>Create new company
                        </DialogTitle>
                        <Box textAlign='center' component="form"
                             sx={{
                                 '& > :not(style)': {m: 1, width: '50ch'}, marginTop: 3,
                             }}
                             noValidate
                             autoComplete="off"
                        >
                            <TextField sx={{
                                bgcolor: "#FFFFFF"
                            }} width='fit-content' id="pp" label="Company Name" onChange={handleChangeCompanyName}
                                       type="text" placeholder='Company Name'
                                       variant="outlined"></TextField>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseNewCompany} variant="contained" color="primary">Cancel</Button>
                        <Button onClick={handleCreateNewCompany} variant="contained" color="success">Create</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={joinToCompany} onClose={handleCloseJoinToCompany}
                        arial-labelledby="form-dialog-title">
                    <DialogContent>
                        <DialogTitle bgcolor='#093CA9' color="white" textAlign='center'>Join to the company
                        </DialogTitle>
                        <Box textAlign='center' component="form"
                             sx={{
                                 '& > :not(style)': {m: 1, width: '50ch'}, marginTop: 3,
                             }}
                             noValidate
                             autoComplete="off"
                        >
                            <TextField sx={{
                                bgcolor: "#FFFFFF"
                            }} width='fit-content' id="pp" label="Company Id" onChange={handleChangeCompanyIdToJoin}
                                       type="text" placeholder='Company Id'
                                       variant="outlined"></TextField>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseJoinToCompany} variant="contained" color="primary">Cancel</Button>
                        <Button onClick={handleJoinToCompany} variant="contained" color="success">Join</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={leaveCompany} onClose={handleCloseLeaveCompany}
                        arial-labelledby="form-dialog-title">
                    <DialogContent>
                        <DialogTitle bgcolor='#093CA9' color="white" textAlign='center'>Leave company
                        </DialogTitle>
                        <Box textAlign='center' component="form"
                             sx={{
                                 '& > :not(style)': {m: 1, width: '50ch'}, marginTop: 3,
                             }}
                             noValidate
                             autoComplete="off"
                        >
                            <h2>Really leave company?</h2>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseLeaveCompany} variant="contained" color="primary">No</Button>
                        <Button onClick={handleLeaveCompany} variant="contained" color="success">Yes</Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={deleteCompany} onClose={handleCloseDeleteCompany}
                        arial-labelledby="form-dialog-title">
                    <DialogContent>
                        <DialogTitle bgcolor='#093CA9' color="white" textAlign='center'>Really delete company?
                        </DialogTitle>
                        <Box textAlign='center' component="form"
                             sx={{
                                 '& > :not(style)': {m: 1, width: '50ch'}, marginTop: 3,
                             }}
                             noValidate
                             autoComplete="off"
                        >

                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDeleteCompany} variant="contained" color="primary">No</Button>
                        <Button onClick={handleDeleteCompany} variant="contained" color="success">Yes</Button>
                    </DialogActions>
                </Dialog>
            </>
        </ThemeProvider>
    );
};

export default Profile;