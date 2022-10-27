import React, {useEffect, useState} from 'react';
import Header from "./components/Header";
import {Card, Grid} from "@mui/material";
import AddNewTeam from "./components/AddNewTeam";
import {Link, useLocation} from "react-router-dom";
import employeesData from "./dataForTesting/dataEmployees";

const Employee = () => {
    let teamId;
    const location = useLocation();
    teamId = location.state.id.id;

    const [teammates, setTeammates] = useState();

    function GetTeammates() {
        useEffect(() => {
            fetch("http://localhost:8080/employee/findByTeam?team_id=" + teamId.toString(), {
                'methods': 'GET',
                headers: {
                    'Content-Type': 'application/json'
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
      <Grid  container spacing={0}>
        {employeesData.map((data, key) => {
          return (
            <div key={key}>
              <Emp
                key={key}
                first_name={data.name}
                last_name={data.tag}
              />
            </div>
          );
        })}

          {
              teammates?.map((item, index) =>

                  <Emp id={item?.id} key={item?.id} first_name={item?.first_name} last_name={item?.last_name} />
              )
          }
          <Card variant="outlined" sx={{

        p: 20,
        margin: 2,
        padding: 15,
        flexGrow: 2,
        elevation: 2,
              maxWidth: 60
      }} >

        <Grid >
          <Grid item xs={0}>
            <h5>New Employee</h5>
          </Grid>
        </Grid>


    </Card>

      </Grid>

</>
    );
};

const Emp = ({ first_name, last_name, key, id }) => {

  return (
<Link to="/teams" state={{id:{id}}} style={{textDecoration: 'none'}}>
    <Card sx={{

        p: 20,
        margin: 2,
        padding: 15,
        flexGrow: 2,
        elevation: 2,
      }} >


        <Grid >
          <Grid item xs={0}>
            <h5>{first_name}</h5>
          </Grid>
          <Grid item xs={0}>
            <h5>{last_name}</h5>
          </Grid>
        </Grid>


    </Card>
    </Link>
  );

};
export default Employee;