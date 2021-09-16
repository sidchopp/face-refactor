import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


//Components

import LeftPartImage from './LeftPartImage'
import RightPartSignIn from './RightPartSignIn'
import ImageLinkForm from './ImageLinkForm';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
}));

function MainPage() {
  const classes = useStyles();

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <LeftPartImage />
      <RightPartSignIn />
      <ImageLinkForm />
    </Grid>
  )
}

export default MainPage
