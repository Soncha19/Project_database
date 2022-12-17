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
    ThemeProvider, CardMedia, Divider,
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
import {GetEmp, getEmpCompanyId, GetEmployee, getToken, getUser, setUser, UserLog} from "./UserLog";
import GetEmployeeInfo from "./GetEmployeeInfo";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";

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

const Team = () => {
    const [team, setTeam] = useState();
    const [isShown, setIsShown] = useState(false);
    const [emp, setEmp] = useState(false);
    let companyId = localStorage.getItem("company_id");
    let isOwner = localStorage.getItem("is_owner").toString() == "false" ? false : true;


    console.log(companyId)
    // console.log(localStorage.getItem("id"));
    // CallToGetEmp();
    // function CallToGetEmp() {
    //     GetEmployee().then(response => setEmp(response));
    // }

    function checkDefaultEmployee() {

        if (companyId == 1) {
            return false;
        } else {
            return true;
        }
    }

    const handleClick = () => {

        setIsShown(current => !current);
    };

    function GetTeams() {
        useEffect(() => {
            fetch('http://localhost:8080/team/findByCompany?company_id=' + companyId.toString(), {
                'methods': 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
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

            {checkDefaultEmployee() && <Grid container spacing={0}>

                {

                    team?.map((item, index) =>
                        <Teamsd companyId={companyId} id={item?.id} key={item?.id} name={item?.name} tag={item?.tag}/>
                    )
                }
                {!isShown && isOwner && (<Button sx={{
                    bgcolor: '#E2CEB5',
                    padding: 15,
                    margin: 2,
                    borderRadius: 9,
                    marginTop: 3


                }} onClick={handleClick} style={{textDecoration: 'none'}}>


                    <Grid>
                        <Grid item xs={0}>

                            <Typography sx={{color: "black"}} variant="h7"
                            >
                                New team
                            </Typography>
                        </Grid>
                    </Grid>


                </Button>)}
                {isShown && (<AddNewTeam/>)}
            </Grid>}


        </>

    );

};

const Teamsd = ({name, tag, key, id, companyId}) => {
    let isOwner = localStorage.getItem("is_owner").toString() == "false" ? false : true;
    return (

        // <Link to="/employees" state={{id: {id}}} style={{textDecoration: 'none'}}>
        <Card sx={{
            bgcolor: '#E2CEB5',
            borderRadius: 9,
            minWidth: 320,
            margin: 1,
            height: 310,
            marginTop: 3

        }}>
            <CardHeader
                action={
                    isOwner && (<PropsButton props={{id: {id}, companyId: {companyId}}}/>)
                }/>

            <Divider sx={{bgcolor: "white", ml:2, mr:2}}/>
            <Link to="/employees" color="black" state={{id: {id}}} style={{textDecoration: 'none'}}>

                <CardMedia>

                    <Typography sx={{color: "black", ml: 4}} variant="h4">
                        {name}
                    </Typography>

                    <Card variant="filled" sx={{
                        bgcolor: '#E2CEB5',
                        height: 250,
                    }}></Card>
                    <Typography sx={{minWidth: 195, color: "black", ml: 12, my: -17}} variant="h4">
                        {tag}
                    </Typography>
                </CardMedia>
            </Link>
        </Card>

    );

};
export default Team;