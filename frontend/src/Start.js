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
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";



const Start = () => {

    const[open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false);
    }

    const[open2, setOpen2] = useState(false)
    const handleClickOpen2 = () => {
        setOpen2(true)
    }
    const handleClose2 = () => {
        setOpen2(false);
    }
    return (
       <>
            <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
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
    </AppBar>

                      <Grid m={35} pl={80} container rowSpacing={5} columnSpacing={{ xs: 2, sm: 2, md: 0 }}>
                          <Grid item xs={4}>
                          <Button color="inherit" variant="contained" onClick={handleClickOpen}>Sign in</Button>
                          <Dialog   open={ open} onClose={handleClose} arial-labelledby="form-dialog-title">
                              < SignIn/>
                              <DialogActions>
                                  <Button onClick={handleClose} variant="contained" color="primary">Cancel</Button>
                                  <Button onClick={handleClose} variant="contained" color="success">Sign in</Button>
                              </DialogActions>
                          </Dialog>
                          </Grid>
                          <Grid item xs={4}>
                          <Button color="secondary" variant="contained" onClick={handleClickOpen2}>Sign up</Button>
                          <Dialog open={open2} onClose={handleClose2 } arial-labelledby="pop">
                              <SignUp/>
                              <DialogActions>
                                  <Button onClick={handleClose2} variant="contained" color="primary">Cancel</Button>
                                  <Button onClick={handleClose2} variant="contained" color="success">Sign up</Button>
                              </DialogActions>
                          </Dialog>
                          </Grid>
                      </Grid>


      </>

    );
};

export default Start;