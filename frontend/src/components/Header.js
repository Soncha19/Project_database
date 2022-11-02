import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
const pages = ['teams', 'employees'];

const Header = () => {

    return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
            <Link to="/teams" style={{textDecoration: 'none'}}>
          <Typography
            variant="h6"
            noWrap
            component="a"

            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
             color: 'white',
              textDecoration: 'none',
            }}
          >
            PROCADI
          </Typography>
            </Link>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
                <Link to={"/"+page} style={{textDecoration: 'none'}}>
              <Button
                key={page}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
                </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0}}>
              <Link to="/profile" style={{textDecoration: 'none'}}>
            <Button
            key="Profile"

                sx={{ my: 2, color: 'white', display: 'block' }}>

                Profile
            </Button>
                  </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    );
};

export default Header;