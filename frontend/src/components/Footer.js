import React from "react";
import {AppBar, Card, Grid, Toolbar, Typography} from "@mui/material";
import {Info, Security} from "@mui/icons-material";
import {Link} from "react-router-dom";


const Footer = () =>
    <>
    <Grid>
        <Card sx={{
            bgcolor: '#FFE7CB',
            minWidth: 400,
            margin: 1,
            height: 220,
            boxShadow: 0

        }}>

        </Card>
    </Grid>
        <AppBar position="static" elevation={0} component="footer" color="default">
            <Toolbar style={{ justifyContent: "center" }}>
                <Typography >Procadi</Typography>
                <Typography variant="caption">©2022</Typography>
            </Toolbar>
        </AppBar>
    </>

export default Footer;