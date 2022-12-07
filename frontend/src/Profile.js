import React from 'react';
import {Card, Grid} from "@mui/material";
import Header from "./components/Header";

const Profile = () => {
    return (
          <>
              <Header/>
            <Grid container spacing={0}>
  <Card sx={{
        margin: 4,
        flexGrow: 2,
        elevation: 2,
              maxWidth: 250
      }} >
      <h4>Full Name</h4>
    <h1>Piter Gree</h1>
  </Card>
  <Card sx={{
        margin: 4,
        flexGrow: 2,
        elevation: 2,
              maxWidth: 250
      }} >
      <h4>Surname</h4>
    <h1>PitGt__</h1>
  </Card>
  <Card sx={{
        margin: 4,
        flexGrow: 2,
        elevation: 2,
              maxWidth: 250
      }} >
      <h4>Company</h4>
    <h1>Google</h1>
  </Card>
     <Card sx={{
        margin: 4,
        flexGrow: 5,
        elevation: 2,
              maxWidth: 1000
      }} >
         <h4>email</h4>
    <h1> pitgr@gmail.com</h1>
  </Card>
  <Card sx={{
        margin: 4,
        flexGrow: 5,
        elevation: 2,
              maxWidth: 500
      }} >
      <h4>phone</h4>
    <h1> +380680475894</h1>
  </Card>
</Grid>
</>
    );
};

export default Profile;