import React from 'react';
import { Card, Grid, } from "@mui/material";
import Header from "./components/Header";
import {Link} from "react-router-dom";
import AddNewTeam from "./components/AddNewTeam";

const Team = (props) => {
    return (
<>
        <Header/>
      <Grid  container spacing={0}>
        {props.teams.map((data, key) => {
          return (
            <div key={data.id}>
              <Teamsd
                key={data.id}
                name={data.name}
                tag={data.tag}
              />
            </div>
          );
        })}

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
            <h5>New team</h5>
          </Grid>
        </Grid>


    </Card>
          <AddNewTeam/>
      </Grid>

</>
    );

};
const Teamsd = ({ name, tag, key }) => {

  return (
<Link to="/employees" state={{id:{key}}} style={{textDecoration: 'none'}}>
    <Card sx={{

        p: 20,
        margin: 2,
        padding: 15,
        flexGrow: 2,
        elevation: 2,
      }} >


        <Grid >
          <Grid item xs={0}>
            <h5>{name}</h5>
          </Grid>
          <Grid item xs={0}>
            <h5>{tag}</h5>
          </Grid>
        </Grid>


    </Card>
    </Link>
  );

};
export default Team;