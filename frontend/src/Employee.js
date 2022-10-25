import React from 'react';
import Header from "./components/Header";
import {Card, Grid} from "@mui/material";
import AddNewTeam from "./components/AddNewTeam";
import {Link} from "react-router-dom";
import employeesData from "./dataForTesting/dataEmployees";

const Employee = () => {
 return (
<>
        <Header/>
      <Grid  container spacing={0}>
        {employeesData.map((data, key) => {
          return (
            <div key={key}>
              <Emp
                key={key}
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
            <h5>New Employee</h5>
          </Grid>
        </Grid>


    </Card>

      </Grid>

</>
    );
};

const Emp = ({ name, tag, key }) => {

  return (
<Link to="/teams" state={{id:{key}}} style={{textDecoration: 'none'}}>
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
export default Employee;