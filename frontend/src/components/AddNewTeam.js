import React, {useState} from 'react';
import {Button, Card, createTheme, Grid, ThemeProvider} from "@mui/material";
import TextField from "@mui/material/TextField";

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


const AddNewTeam = () => {
    const [teamName, setTeamName] = useState(false);
    let companyId = 1;
    const handleChangeTeamName = (event) => {
        setTeamName(event.target.value);
    };
    const [tag, setTag] = useState(false);
    const handleChangeTag = (event) => {
        setTag(event.target.value);
    };

    const handleSubmit = (e) => {

 window.location.reload(1);
      fetch('http://localhost:8080/team', {
         method: 'POST',
         body: JSON.stringify({
            name: teamName,
            tag: tag,
            company_id: companyId,
         }),
         headers: {
            'Content-type': 'application/json; charset=UTF-8',
         },
      })
         .then((response) => response.json())
         .then((post) => {
            setTeamName();
            setTag();
         })
         .catch((err) => {
            console.log(err.message);
         });

   };

        return (

            <ThemeProvider theme={theme}>
                <Card sx={{
                    bgcolor: '#E2CEB5',
                    margin: 2,
                    padding: 5,
                    borderRadius: 9

                }}>
                    <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2}>
                        <Grid item xs={0}>
                            <TextField color="button" sx={{
                                bgcolor: 'white',
                                borderColor: '#E2CEB5',
                                borderRadius: 2,
                            }} onChange={handleChangeTeamName}
                                       autoFocus
                                       margin="dense" id="teamName" label="Name" type="teamName" fullWidth
                                       variant="outlined"/>
                        </Grid>
                        <Grid item xs={0}>
                            <TextField color="button" sx={{
                                'background-color': 'white',
                                borderColor: '#E2CEB5',
                                borderRadius: 2,
                            }} onChange={handleChangeTag} autoFocus margin="dense"
                                       id="tag" label="Tag" type="tag" fullWidth variant="outlined"/>
                        </Grid>
                        <Grid item xs={0}>
                            <Button color="button" variant="contained" onClick={handleSubmit}>Save</Button>
                        </Grid>
                    </Grid>


                </Card>
            </ThemeProvider>
        );
    };

    export default AddNewTeam;