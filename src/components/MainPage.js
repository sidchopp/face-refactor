import React, { useEffect, useState } from 'react';

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

  //states
  // const [input, setInput] = useState('');
  // const [imageURL, setImageURL] = useState(" ");
  // const [boundingBox, setBoundingBox] = useState({});
  // const [errorMessage, setErrorMessage] = useState("")

  //Event Handlers

  function onInputChange(e) {
    e.preventDefault();
    console.log(e.target.value);
    // To make the state value of userInput equals what we write in the input field
    //setUserInput(e.target.value)
  }

  function onButtonSubmit(e) {
    e.preventDefault();
    console.log('I m clicked');
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <LeftPartImage />
      <RightPartSignIn />
      <ImageLinkForm
        onInputChange={onInputChange}
        onButtonSubmit={onButtonSubmit}
      />
    </Grid>
  )
}

export default MainPage
