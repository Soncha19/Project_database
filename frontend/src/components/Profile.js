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
import {getToken, removeToken, UserLog} from "./UserLog";
import Footer from "./Footer";
import "../CSSFiles/Profile.css";

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
    let isOwner = localStorage.getItem("is_owner").toString() == "false" ? false : true;
    const [winLogOut, setWinLogOut] = useState(false)


    function handleClickWinLogOut() {
        setWinLogOut(true)
    }

    const handleCloseWinLogOut = () => {
        setWinLogOut(false);
    }
    const [leaveCompany, setLeaveCompany] = useState(false)


    function handleClickLeaveCompany() {
        setLeaveCompany(true)
    }

    const handleCloseLeaveCompany = () => {
        setLeaveCompany(false);
    }

    const [deleteCompany, setDeleteCompany] = useState(false)

    const handleLogOut = () => {
        removeToken()
        window.location.reload(false);
    }

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
        fetch('http://localhost:8080/company/?company_id=' + companyId.toString(), requestOptions)
            .then(() => this.setState({status: 'Delete successful'}));
        // fetch('http://localhost:8080/company/?company_id='+companyId.toString(), { method: 'DELETE' })
        //     .then(() => this.setState({ status: 'Delete successful' }));
        localStorage.setItem("company_id", JSON.stringify(1));
        localStorage.setItem("is_owner", JSON.stringify(false));
        setDeleteCompany(false);
        window.location.reload(false);

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
        setLeaveCompany(false);


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
        setJoinToCompany(false);


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
        setOpenNewCompany(false);
        window.location.reload(false);

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
                <div className={"background-wrapper"}>
                    <div className={"Wrapper"}><div className={"ProfileName"}> <h1 style={{textAlign: "center"}}>Profile</h1></div></div>

                    <div className={"FirstNameWrapper"}>
                    <div id={"FirstNameLabel"}><h2>First name:</h2></div>
                        <div id={"FirstNameValue"}><h2>{employee?.employee.first_name}</h2></div>
                    </div>

                    <div className={"FirstNameWrapper"}>
                        <div id={"FirstNameLabel"}><h2>Last name:</h2></div>
                        <div id={"FirstNameValue"}><h2>{employee?.employee.last_name}</h2></div>
                    </div>

                    <div className={"FirstNameWrapper"}>
                        <div id={"FirstNameLabel"}><h2>Email:</h2></div>
                        <div id={"FirstNameValue"}><h2>{employee?.employee.email}</h2></div>
                    </div>

                    <div className={"FirstNameWrapper"}>
                        <div id={"FirstNameLabel"}><h2>Phone number:</h2></div>
                        <div id={"FirstNameValue"}><h2>{employee?.employee.phone}</h2></div>
                        </div>
                    <div className={"LineBetween"}></div>
                    <div className={"Wrapper"}><div className={"ProfileName"}><h1 style={{textAlign: "center"}}>Company</h1></div></div>

                    <div className={"FirstNameWrapper"}>
                        <div id={"FirstNameLabel"}><h2>Company name:</h2></div>
                        <div id={"FirstNameValue"}><h2>{employee?.company.name}</h2></div>
                    </div>

                    <div className={"FirstNameWrapper"}>
                        <div id={"FirstNameLabel"}><h2>Company id:</h2></div>
                        <div id={"FirstNameValue"}><h2>{(companyId == 1 ? false : true) && (<h3>{companyId}</h3>)}
                            {(companyId == 1 ? true : false) && (<h1> None</h1>)}</h2></div>
                    </div>
                    <Box textAlign={'center'}>
                    {isOwner && (<Button size="large" variant="contained" color="button"
                                         key="f4" textTransform='none' onClick={handleClickDeleteCompany}

                                         sx={{
                                             my: 2, color: 'white', maxWidth: 400,
                                             // borderRadius: 9,
                                         }}>

                        Delete Company
                    </Button>)}


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
                                                            key="f3" textTransform='none'
                                                            onClick={handleClickLeaveCompany}

                                                            sx={{
                                                                my: 2, color: 'white', maxWidth: 400,
                                                                margin: 10,
                                                                // borderRadius: 9,
                                                            }}>

                        Leave Company
                    </Button>)}



                    </Box>
                </div>

            <div className={"background-wrapper"}>



                <Dialog PaperProps={{
                    style: {
                        backgroundColor: '#E2CEB5',

                    },
                }} open={openNewCompany} onClose={handleCloseNewCompany}
                        arial-labelledby="form-dialog-title">
                    <DialogContent>
                        <DialogTitle sx={{bgcolor:"#093CA9", color:"white", borderRadius:'9px', m:1, mb:5}} textAlign='center'>Create new company
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
                        <Button onClick={handleCloseNewCompany} variant="contained" sx={{bgcolor: "white", color:"black"}}>Cancel</Button>
                        <Button onClick={handleCreateNewCompany} variant="contained" sx={{bgcolor: "#093CA9"}}>Create</Button>
                    </DialogActions>
                </Dialog>

                <Dialog PaperProps={{
                    style: {
                        backgroundColor: '#E2CEB5',

                    },
                }} open={joinToCompany} onClose={handleCloseJoinToCompany}
                        arial-labelledby="form-dialog-title">
                    <DialogContent>
                        <DialogTitle sx={{bgcolor:"#093CA9", color:"white", borderRadius:'9px', m:1, mb:5}} textAlign='center'>Join to the company
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
                        <Button onClick={handleCloseJoinToCompany} variant="contained" sx={{bgcolor: "white", color:"black"}}>Cancel</Button>
                        <Button onClick={handleJoinToCompany} variant="contained" sx={{bgcolor: "#093CA9"}}>Join</Button>
                    </DialogActions>
                </Dialog>

                <Dialog PaperProps={{
                    style: {
                        backgroundColor: '#E2CEB5',

                    },
                }} open={leaveCompany} onClose={handleCloseLeaveCompany}
                        arial-labelledby="form-dialog-title">
                    <DialogContent>
                        <DialogTitle sx={{bgcolor:"#093CA9", color:"white", borderRadius:'9px', m:1, mb:5}} textAlign='center'>Leave company
                        </DialogTitle>
                        <Box textAlign='center' component="form"
                             noValidate
                             autoComplete="off"
                        >
                            <h2>Really leave company?</h2>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseLeaveCompany} variant="contained" sx={{bgcolor: "white", color:"black"}}>No</Button>
                        <Button onClick={handleLeaveCompany} variant="contained" sx={{bgcolor: "#093CA9"}}>Yes</Button>
                    </DialogActions>
                </Dialog>
                <Dialog PaperProps={{
                    style: {
                        backgroundColor: '#E2CEB5',

                    },
                }} open={deleteCompany} onClose={handleCloseDeleteCompany}
                        arial-labelledby="form-dialog-title">
                    <DialogContent>
                        <DialogTitle sx={{bgcolor:"#093CA9", color:"white", borderRadius:'9px', m:1, mb:5}} textAlign='center'>Really delete company?
                        </DialogTitle>
                        <Box textAlign='center' component="form"

                             noValidate
                             autoComplete="off"
                        >

                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDeleteCompany} variant="contained" sx={{bgcolor: "white", color:"black"}} >No</Button>
                        <Button onClick={handleDeleteCompany} variant="contained" sx={{bgcolor: "#093CA9"}}>Yes</Button>
                    </DialogActions>
                </Dialog>

            </div>
            </>
        </ThemeProvider>
    );
};

export default Profile;