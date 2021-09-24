import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

//Email Validator
var validator = require("email-validator");

const theme = createTheme();

function Register({ onRouteChange, loadUser, setRoute }) {

  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  // const [validEmail, setValidEmail] = useState(true)

  // Event Handlers
  function onEmailChange(e) {
    e.preventDefault()
    if (validator.validate(e.target.value)) {
      setEmail(e.target.value)
    }
    // else {
    //   setValidEmail(false)
    // }
  }

  function onPasswordChange(e) {
    e.preventDefault()
    setPassword(e.target.value)
  }
  function onNameChange(e) {
    e.preventDefault()
    setName(e.target.value)
  }

  // for useEffect to work React component must start with an uppercase letter
  function OnSubmitSignIn(e) {
    e.preventDefault();

    ////// Fetching data from backend server
    fetch("http://localhost:3000/register", {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user.id) {
          loadUser(user)
          onRouteChange('home')
        } else {
          setRoute('register')
          // onRouteChange('signIn')
        }
      })
    ////// Back end fetching above
  }

  return (
    <ThemeProvider theme={theme}>
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
            <HowToRegIcon />
          </Avatar>
          <Typography component="h1" variant="h3">
            Welcome!
          </Typography>
          <Typography style={{ marginBottom: '15px' }} component="h1" variant="h5">
            New User
          </Typography>

          {/* onSubmit={handleSubmit} */}
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
              onChange={onNameChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              autoComplete="email"
              onChange={onEmailChange}
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
              onChange={onPasswordChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              startIcon={<HowToRegIcon />}
              onClick={OnSubmitSignIn}
            >
              Register
            </Button>
            <Button
              type="submit"
              fullWidth
              color="secondary"
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => setRoute('signIn')}
              startIcon={<ArrowBackIosIcon />}
            >
              Back to Home
            </Button>
            <Grid container>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider >
  );
}

export default Register;