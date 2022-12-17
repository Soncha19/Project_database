import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import {createTheme, Dialog, DialogActions, DialogContent, DialogTitle, Grid, ThemeProvider} from "@mui/material";
import RoundedAppBar from "./RoundedAppBar";
import {useState} from "react";
import {removeToken} from "./UserLog";


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
const Header = () => {
    const [winLogOut, setWinLogOut] = useState(false)

    function handleClickWinLogOut() {
        setWinLogOut(true)
    }

    const handleCloseWinLogOut = () => {
        setWinLogOut(false);
    }
    const handleLogOut = () => {
        removeToken()
        window.location.reload(false);
    }

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{flexGrow: 1, margin: 1,}}>
                <AppBar sx={{borderRadius: '10px'}} color="now" position="center">
                    <Toolbar minWidth="md" disableGutters sx={{mr: 8}}>
                        <Grid justifyContent="space-around" alignItems="center" direction="row"
                              container>
                            <Link to="/teams" style={{textDecoration: 'none'}}>
                                <Typography
                                    variant="h5"


                                    sx={{
                                        mr: 0,
                                        flexGrow: 1,

                                        fontFamily: 'monospace',
                                        fontWeight: 700,
                                        letterSpacing: '.2rem',
                                        color: 'white',
                                        textDecoration: 'none',
                                    }}
                                    component="div"
                                >
                                    PROCADI
                                </Typography>
                            </Link>
                        </Grid>

                        <Grid justifyContent="flex-end" alignItems="center" direction="row"
                              container>
                            <Link to={"/teams"} style={{textDecoration: 'none'}}>
                                <Button size="large" variant="contained" color="button"
                                        key={"teams"}
                                        sx={{my: 2, color: 'white', display: 'block'}}
                                >
                                    teams
                                </Button>
                            </Link>

                            <Link to={"/employeesofthecompany"} style={{textDecoration: 'none'}}>
                                <Button size="large" variant="contained" color="button"
                                        key={""}
                                        sx={{mx: 2, my: 2, display: 'block'}}
                                >
                                    employees
                                </Button>
                            </Link>

                            <Link to="/profile" style={{textDecoration: 'none'}}>
                                <Button size="large" variant="contained" color="button"
                                        key="Profile"

                                        sx={{my: 2, color: 'white',}}>

                                    Profile
                                </Button>
                            </Link>
                            <Button size="large" variant="contained" color="button"
                                    key="f5" textTransform='none' onClick={handleClickWinLogOut}

                                    sx={{
                                        my: 2, color: 'white', ml: 2
                                    }}>

                                Log out
                            </Button>

                        </Grid>

                    </Toolbar>

                </AppBar>
            </Box>
            <Dialog PaperProps={{
                style: {
                    backgroundColor: '#E2CEB5',
                },
            }} open={winLogOut} onClose={handleCloseWinLogOut}
            >
                <DialogContent>
                    <DialogTitle sx={{bgcolor:"#093CA9", color:"white", borderRadius:'9px', m:1}} textAlign='center'>Really log out?
                    </DialogTitle>
                    <Box textAlign='center' component="form"
                         noValidate
                         autoComplete="off"
                    >
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseWinLogOut} variant="contained" sx={{color:"black", bgcolor: "white"}}>No</Button>
                    <Button onClick={handleLogOut} variant="contained" sx={{bgcolor: "#093CA9"}} >Yes</Button>
                </DialogActions>
            </Dialog>
        </ThemeProvider>
    );
};

export default Header;