import React, { useEffect, useState } from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import Clarifai from 'clarifai'

//Components

import LeftPartImage from './LeftPartImage'
import RightPartSignIn from './RightPartSignIn'
import Register from './Register';
import ImageLinkForm from './ImageLinkForm';
import FaceRecognition from './FaceRecognition';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
}));

// Clarifai API
const app = new Clarifai.App({
  apiKey: '7ab62c9b6f314d43bfd63c689ba5f4f7'
});

function MainPage() {
  const classes = useStyles();

  //states
  const [userInput, setUserInput] = useState('');
  const [imageURL, setImageURL] = useState(" ");
  const [boundingBox, setBoundingBox] = useState({});
  const [errorMessage, setErrorMessage] = useState("")
  const [route, setRoute] = useState('signIn')
  const [isSignedIn, setIsSignedIn] = useState(false)

  function faceLocation(data) {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log('from clarifai', clarifaiFace);
    // we are referencing the img attribute of id in the FaceRecognition component
    const image = document.getElementById('inputImage');
    console.log(image);
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    // this will return an OBJECT
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }

  }

  function displayFaceBox(box) {
    console.log(box);
    setBoundingBox(box)

  }

  //Event Handlers

  function onInputChange(e) {
    e.preventDefault();
    console.log(e.target.value);
    // To make the state value of userInput equals what we write in the input field
    setUserInput(e.target.value)
  }

  function onButtonSubmit(e) {
    e.preventDefault();

    // console.log(' I m clicked');
    //To make the state value of imageURL equals to the userInput(or what we write in the input field)
    setImageURL(userInput)


    // face detect api using FACE_DETECT_MODEL is predicting our userInput state value
    app.models.predict(Clarifai.FACE_DETECT_MODEL, userInput)
      .then(function (response) {
        console.log("Response from API:", response);
        // do something with response
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        displayFaceBox(faceLocation(response))
      }
      ).catch(err => console.log(err));
  }

  function onRouteChange(route) {
    // if (route === 'signout') {
    //   setIsSignedIn(false)
    // } else if (route === 'home') {
    //   setIsSignedIn(true)
    // }
    setRoute(route)
  }
  return (
    <>

      {/* <LeftPartImage /> */}


      {/* <RightPartSignIn />
        <ImageLinkForm
          onInputChange={onInputChange}
          onButtonSubmit={onButtonSubmit}
        /> */}
      {route === 'home'
        ? <div>
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
            onRouteChange={onRouteChange}
          />
          <FaceRecognition boundingBox={boundingBox} imageURL={imageURL} />
        </div>
        : (
          route === 'signIn'
            ? <Grid container component="main" className={classes.root}>
              <CssBaseline /><LeftPartImage />
              <RightPartSignIn onRouteChange={onRouteChange} />
            </Grid>
            : <Register onRouteChange={onRouteChange} />

        )
      }



      {/* <FaceRecognition boundingBox={boundingBox} imageURL={imageURL} /> */}


    </>
  )
}

export default MainPage
