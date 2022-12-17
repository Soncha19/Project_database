import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import {createTheme, Grid, ThemeProvider} from "@mui/material";
import RoundedAppBar from "./RoundedAppBar";


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

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{flexGrow: 1, margin: 1,}}>
                <AppBar sx={{borderRadius: '10px'}} color="now" position="center">
                    <Toolbar minWidth="md" disableGutters sx={{ml:-5, mr:5}} >
                        <Grid justifyContent="space-around" alignItems="center" direction="row"
                              container>
                            <Link to="/teams" style={{textDecoration: 'none'}}>
                                <Typography
                                    variant="h5"


                                    sx={{
                                        mr: 2,
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

                        <Grid  justifyContent="flex-end" alignItems="center" direction="row"
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
                                <Button size="large"  variant="contained" color="button"
                                        key="Profile"

                                        sx={{my: 2, color: 'white',}}>

                                    Profile
                                </Button>
                            </Link>
                        </Grid>

                    </Toolbar>

                </AppBar>
            </Box>
        </ThemeProvider>
    );
};

export default Header;