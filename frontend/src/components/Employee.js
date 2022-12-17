import React, {useEffect, useState} from 'react';
import Header from "./Header";
import {Button, Card, CardHeader, CardMedia, Grid} from "@mui/material";
import {Link, useLocation} from "react-router-dom";
import Typography from "@mui/material/Typography";
import EmployeePropsButton from "./EmployeePropsButton";
import {getToken} from "./UserLog";

const Employee = () => {
    const [teammates, setTeammates] = useState();

    const location = useLocation();
    let teamId = location.state.id.id;

    let isOwner = localStorage.getItem("is_owner").toString() == "false" ? false : true;

    function GetTeammates() {
        useEffect(() => {
            // if (teammates.length == 0) {
            // console.log(teammates)
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
            // }
        }, [])
    }

    GetTeammates();

    console.log(teammates);
    return (
        <>
            <Header/>
            <Grid container spacing={0}>
                {
                    teammates?.map((item) =>
                        <Emp company_id={item?.company_id} teamId={teamId} id={item?.id} key={item?.id}
                             first_name={item?.first_name}
                             last_name={item?.last_name}/>
                    )
                }
                {isOwner && (
                    <Link to="/addpropertysettoemployee" state={{teamId: {teamId}}} style={{textDecoration: 'none'}}>
                        <Button sx={{
                            bgcolor: '#E2CEB5',
                            borderRadius: 9,
                            minWidth: 326,
                            margin: 1,
                            height: 310,
                            marginTop: 3

                        }} style={{textDecoration: 'none'}}>

                            <Grid>
                                <Grid item xs={0}>
                                    <Typography sx={{color: "black"}} variant="h7"
                                    >
                                        New employee
                                    </Typography>
                                </Grid>
                            </Grid>


                        </Button>
                    </Link>)}
            </Grid>

        </>
    );
};

const Emp = ({teamId, first_name, last_name, id}) => {
      const [propName, setPropName] = useState();
    // <CardHeader
    //             action={
    //                 isOwner && (<EmployeePropsButton props={{id: {id}, teamId: {teamId}}}/>)
    //             }/>
    // let isOwner = localStorage.getItem("is_owner").toString() == "false" ? false : true;
    function GetPropName() {
        useEffect(() => {
            // if (teammates.length == 0) {
            // console.log(teammates)
            fetch("http://localhost:8080/propertySetByEmployee/?employee_id=" + id.toString(), {
                'methods': 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getToken()}`
                }
            })
                .then(response => response.json())
                .then(response => setPropName(response.name))
                .catch(error => console.log(error))
            // }
        }, [])
    }

    GetPropName()
    return (
        <Card sx={{
            bgcolor: '#E2CEB5',
            borderRadius: 9,
            minWidth: 320,
            margin: 1,
            height: 310,
            marginTop: 3

        }}>


            <Link to="/feedbackhistory" state={{id: {id}}} style={{textDecoration: 'none'}}>

                <CardMedia>
                    <Typography sx={{color: "black", ml: 4, mt:3}} variant="h4">
                        <Grid>
                            {first_name}
                        </Grid>
                        <Grid>
                            {last_name}
                        </Grid>
                    </Typography>



                    <Typography sx={{minWidth: 195, color: "black", mt:13, mr:1,ml:15, borderRadius:3,  }} variant="h4">
                        {propName}
                    </Typography>
                </CardMedia>
            </Link>
        </Card>

    );

};
export default Employee;