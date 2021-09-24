import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import HowToRegIcon from '@material-ui/icons/HowToReg';
import Container from '@material-ui/core/Container';
import "animate.css"


// Components
import Footer from './Footer'

//CSS
import '../App.css'

// Material UI styles
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  heroContent: {
    // backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1, 0, 4),
  },

}));


function RightPartSignIn({ onRouteChange, loadUser, setRoute }) {
  const classes = useStyles();

  // States
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  //  Event Handlers
  function onEmailChange(e) {
    e.preventDefault()
    setSignInEmail(e.target.value)
  }

  function onPasswordChange(e) {
    e.preventDefault()
    setSignInPassword(e.target.value)
  }

  function onSubmitSignIn(e) {
    e.preventDefault()

    ////// Fetching data from backend server
    fetch("http://localhost:3000/signIn", {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        // console.log(user);
        if (user.id) {

          loadUser(user)
          onRouteChange('home')
        } else {
          setRoute('signIn')
        }
      })
    ////// Back end fetching above
  }

  return (
    // style={{ background: '#ED820E ' }}
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom className="animate__animated animate__pulse">
              Face Detection
            </Typography>
          </Container>
        </div>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        {/* Sign in form starts below */}

        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            type="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onEmailChange}
          />
          <TextField
            variant="outlined"
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
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            startIcon={<HowToRegIcon />}
            onClick={onSubmitSignIn}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" onClick={() => onRouteChange('register')} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Box mt={10}>

            {/* Sign in form ends above */}

            {/* Component Import */}
            <Footer />
            {/*  */}

          </Box>
        </form>
      </div>
    </Grid>
  )
}

export default RightPartSignIn;
