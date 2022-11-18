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
            <RoundedAppBar   sx={{bgcolor:"#093CA9"}} position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: {xs: 'none', md: 'flex'},
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            PROCADI
                        </Typography>
                    </Toolbar>
                </Container>
            </RoundedAppBar>

            <Grid m={35} pl={80} container rowSpacing={5} columnSpacing={{xs: 2, sm: 2, md: 0}}>
                <Grid item xs={4}>
                    < SignIn/>
                </Grid>
                <Grid item xs={4}>
                    <SignUp/>
                </Grid>
            </Grid>
        </>

    );
};

export default Start;