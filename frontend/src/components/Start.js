import React, {useState} from 'react';
import {
    AppBar,
    Container,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    Toolbar,
    IconButton,
    Typography, makeStyles, Grid
} from "@mui/material";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import RoundedAppBar from "./RoundedAppBar";


const Start = () => {


    return (
        <>
            <Box sx={{flexGrow: 1, margin: 1,}}>
                <AppBar sx={{borderRadius: '10px', bgcolor: "#093CA9"}} position="center">

                    <Toolbar minWidth="md" disableGutters sx={{ml: 20, mr: 10}}>
                        <Grid justifyContent="space-evenly" alignItems="center" direction="row"
                              container>
                            <Typography
                                variant="h5"


                                sx={{
                                    mr: -2,
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
                        </Grid>
                        <Grid justifyContent="flex-end" alignItems="center" direction="row"
                              container>

                            < SignIn/>


                            <SignUp/>

                        </Grid>
                    </Toolbar>

                </AppBar>
            </Box>

        </>

    );
};

export default Start;