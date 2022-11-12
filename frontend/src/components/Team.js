import React, {useEffect, useState} from 'react';
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardActionArea,
    CardContent,
    CardHeader,
    createTheme,
    Grid,
    ThemeProvider, CardMedia,
} from "@mui/material";
import Header from "./Header";
import {Link} from "react-router-dom";
import AddNewTeam from "./AddNewTeam";
import Typography from "@mui/material/Typography";
import {red} from "@mui/material/colors";
import Box from "@mui/material/Box";
import PropsButton from "./PropsButton";
import IconButton from "@mui/material/IconButton";
import Employee from "./Employee";

const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#0971f1',
            darker: '#053e85',
        },
        ap: {
            main: '#093CA9',
            contrastText: '#fff',
        },
        button: {
            main: '#012E95',
            contrastText: '#fff',
        },
    },
});

const Team = (props) => {
    const [team, setTeam] = useState();
    const [isShown, setIsShown] = useState(false);
    let companyId = 1;

    const handleClick = event => {

        setIsShown(current => !current);
    };

    function GetTeams() {
        useEffect(() => {
            fetch('http://localhost:8080/team/findByCompany?company_id=' + companyId.toString(), {
                'methods': 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(response => setTeam(response))
                .catch(error => console.log(error))
        }, [])
    }

    GetTeams();

    return (

        <>
            <Header/>

            <Grid container spacing={0}>

                {

                    team?.map((item, index) =>
                        <Teamsd companyId={companyId} id={item?.id} key={item?.id} name={item?.name} tag={item?.tag}/>
                    )
                }
                <Button onClick={handleClick} style={{textDecoration: 'none'}}>
                    <Card variant="outlined" sx={{
                        bgcolor: '#E2CEB5',
                        padding: 15,
                        margin: 2,
                        borderRadius: 9


                    }}>

                        <Grid>
                            <Grid item xs={0}>
                                <h5>New team</h5>
                            </Grid>
                        </Grid>


                    </Card>
                </Button>
                {isShown && (<AddNewTeam/>)}
            </Grid>


        </>

    );

};

const Teamsd = ({name, tag, key, id, companyId}) => {

    return (

        // <Link to="/employees" state={{id: {id}}} style={{textDecoration: 'none'}}>
        <Card sx={{
            bgcolor: '#E2CEB5',
            minWidth: 400,
            margin: 1,
            height: 350,
            borderRadius: 9
        }}>
            <CardHeader
                action={
                    <PropsButton props={{id: {id}, companyId: {companyId}}}/>
                }/>

             <Link to="/employees" color="black" state={{id: {id}}} style={{textDecoration: 'none'}}>

            <CardMedia>
                <Typography sx={{color:"black", ml:4}} variant="h3">
                    {name}
                </Typography>

                <Card variant="filled" sx={{
                    bgcolor: '#E2CEB5',
                    height: 200,
                }}></Card>
                <Typography sx={{color:"black", ml:25, my:-7}} variant="h3">
                    {tag}
                </Typography>
            </CardMedia>
             </Link>
        </Card>

    );

};
export default Team;