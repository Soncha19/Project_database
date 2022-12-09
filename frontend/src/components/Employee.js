import React, {useEffect, useState} from 'react';
import Header from "./Header";
import {Card, CardHeader, CardMedia, Grid} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import PropsButton from "./PropsButton";
import Typography from "@mui/material/Typography";
import EmployeePropsButton from "./EmployeePropsButton";
import {getToken} from "./UserLog";

const Employee = () => {

    const location = useLocation();
    let teamId = location.state.id.id;
    let isOwner = localStorage.getItem("is_owner").toString() == "false" ? false: true;
    const [teammates, setTeammates] = useState();

    function GetTeammates() {
        useEffect(() => {
            fetch("http://localhost:8080/employee/findByTeam?team_id=" + teamId.toString(), {
                'methods': 'GET',
                headers: {
                    'Content-Type': 'application/json',
                     Authorization: `Bearer ${getToken()}`
                }
            })
                .then(response => response.json())
                .then(response => setTeammates(response))
                .catch(error => console.log(error))
        }, [])

    }

    GetTeammates();
    return (
        <>
            <Header/>
            <Grid container spacing={0}>
                {
                    teammates?.map((item, index) =>
                        <Emp company_id={ item?.company_id} teamId={teamId} id={item?.id} key={item?.id} first_name={item?.first_name}
                             last_name={item?.last_name}/>
                    )
                }
                {isOwner && (<Link to="/addpropertysettoemployee" state={{teamId: {teamId}}} style={{textDecoration: 'none'}}>
                    <Card variant="outlined" sx={{
                        bgcolor: '#E2CEB5',
                        padding: 15,
                        margin: 2,
                        borderRadius: 9


                    }}>

                        <Grid>
                            <Grid item xs={0}>
                                <h5>New Employee</h5>
                            </Grid>
                        </Grid>


                    </Card>
                </Link>)}
            </Grid>

        </>
    );
};

const Emp = ({teamId, first_name, last_name, key, id}) => {
    let isOwner = localStorage.getItem("is_owner").toString() == "false" ? false: true;
    return (
        <Card sx={{
            bgcolor: '#E2CEB5',
            borderRadius: 9,
            minWidth: 400,
            margin: 1,
            height: 350,

        }}>
            <CardHeader
                action={
                   isOwner && ( <EmployeePropsButton props={{id: {id}, teamId: {teamId}}}/>)
                }/>

             <Link to="/feedbackhistory" state={{id: {id}}} style={{textDecoration: 'none'}}>

            <CardMedia>
                <Typography sx={{color:"black", ml:4}} variant="h3">
                   {first_name}
                </Typography>


                <Card variant="filled" sx={{
                    bgcolor: '#E2CEB5',
                    height: 200,
                }}></Card>
                <Typography sx={{color:"black", ml:25, my:-7}} variant="h3">
                    {last_name}
                </Typography>
            </CardMedia>
             </Link>
        </Card>

    );

};
export default Employee;