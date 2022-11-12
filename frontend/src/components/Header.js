import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import {createTheme, ThemeProvider} from "@mui/material";
import RoundedAppBar from "./RoundedAppBar";
const pages = ['teams', 'employees'];

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
        <RoundedAppBar  borderRadius="2" color="now"   position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Link to="/teams" style={{textDecoration: 'none'}}>
                        <Typography
                            variant="h5"



                            sx={{
                                mr: 125,
                                ml: 0,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                            PROCADI
                        </Typography>
                    </Link>
                    <Box  sx={{  display: {xs: 'none', md: 'flex'}}}>

                        <Link to={"/teams"} style={{textDecoration: 'none'}}>
                            <Button size="large" variant="contained" color="button"
                                key={"teams"}
                                sx={{ my: 2, color: 'white', display: 'block'}}
                            >
                                teams
                            </Button>
                        </Link>


                        <Link to={"/employeesofthecompany"} style={{textDecoration: 'none'}}>
                            <Button  size="large" variant="contained" color="button"
                                key={""}
                                sx={{mx: 2, my: 2, display: 'block'}}
                            >
                                employees
                            </Button>
                        </Link>

                        <Link to="/profile" style={{textDecoration: 'none'}}>
                            <Button  size="large" variant="contained" color="button"
                                key="Profile" textTransform='none'

                                sx={{my: 2, color: 'white', }} >

                                Profile
                            </Button>
                        </Link>
                    </Box>
                </Toolbar>
            </Container>
        </RoundedAppBar>
        </ThemeProvider>
    );
};

export default Header;