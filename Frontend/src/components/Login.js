import React, { useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import AppBar from '@mui/material/AppBar';
import { Toolbar } from '@mui/material';
import imgPath from "./Images/unnamed.jpg"

import axios from 'axios';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Clartiy Plus Package
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

function Login() {
  const [value, setValue] = React.useState('');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
    email: data.get('email'),
    password: data.get('password'),
    });
    console.log(value);
    if(value === "Guard"){
      const response = await axios.post(`http://localhost:9003/order/login/guard/${data.get('email')}/${data.get('password')}/`)
      .then(response => {
        console.log(response.data);
        if(response.data === "Valid Login"){
          navigate("/guardlandingpage");
        }
        else {
          alert("Invalid Credentials, try again!");
        }
      })
    }
    else if(value === "Recipient"){
      const response = await axios.post(`http://localhost:9003/recipient/login/recipient/${data.get('email')}/${data.get('password')}/`)
      .then(response => {
        console.log(response.data);
        if(response.data === "Valid Login"){
          navigate("/userformpage");
        }
        else {
          alert("Invalid Credentials, try again!");
        }
      })
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:'#0d47a1'}}>
        <Toolbar>
        <a href="https://www.iiitb.ac.in/" style={{ textDecoration: 'none',color: 'white'}}>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1, textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',}}}>
            Clarity Plus Package
          </Typography>
          </a>
          <img
            src= {imgPath}
            style={{ width: 160, height: 90, marginLeft: 'auto' }}
          />
        </Toolbar>
      </AppBar>
    </Box>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControl
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
            <FormLabel 
            sx = {{
                fontWeight: 'bold',
                color: 'black',
            }}
            id="demo-row-radio-buttons-group-label">Login As</FormLabel>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={value}
                onChange={handleChange}
            >
            <FormControlLabel sx={{
                marginRight: 6,
            }}
            value="Guard" control={<Radio />} label="Guard" />
            <FormControlLabel sx={{
                marginLeft: 5,
            }}
            value="Recipient" control={<Radio />} label="Recipient" />
            </RadioGroup>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default Login;