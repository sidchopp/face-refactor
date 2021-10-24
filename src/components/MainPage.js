import React, { useState } from 'react';

//MUI
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
// import { makeStyles } from '@material-ui/core/styles';

//Clarifai
import Clarifai from 'clarifai'

//Components

import LeftPartImage from './LeftPartImage'
import RightPartSignIn from './RightPartSignIn'
import Register from './Register';
import ImageLinkForm from './ImageLinkForm';
import FaceRecognition from './FaceRecognition';
import UseStyles from './UseStyles';
//import Spinner from './Spinner';


// const useStyles = makeStyles((theme) => ({
//   root: {
//     height: '100vh',
//   },
//   paper: {
//     margin: theme.spacing(8, 4),
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//   },
// }));

// Clarifai API
const app = new Clarifai.App({
  apiKey: '7ab62c9b6f314d43bfd63c689ba5f4f7'
});

function MainPage() {
  const classes = UseStyles();

  //states
  const [userInput, setUserInput] = useState('');
  const [imageURL, setImageURL] = useState(" ");
  const [boundingBox, setBoundingBox] = useState({});
  //const [errorMessage, setErrorMessage] = useState("")
  const [route, setRoute] = useState('signIn')
  const [isSignedIn, setIsSignedIn] = useState(false)
  //const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  });

  function loadUser(data) {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    })
  }

  function faceLocation(data) {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    //console.log('from clarifai', clarifaiFace);
    // we are referencing the img attribute of id in the FaceRecognition component
    const image = document.getElementById('inputImage');
    // console.log(image);
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(width, height);
    // this will return an OBJECT
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  function displayFaceBox(box) {
    //console.log(box);
    setBoundingBox(box)
  }

  //Event Handlers

  function onInputChange(e) {
    e.preventDefault();
    //console.log(e.target.value);
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
        //console.log("Response from API:", response);
        // do something with response
        // console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
        if (response) {

          // fetch('http://localhost:3000/image', { is replaced by the link from heroku backend server
          fetch('https://secure-atoll-87375.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              setUser(Object.assign(user, { entries: count }))
            })
        }
        displayFaceBox(faceLocation(response))
      }
      ).catch(err => console.log(err));
  }

  function onRouteChange(route) {
    if (route === 'signOut') {
      setIsSignedIn(false)
    } else if (route === 'home') {
      setIsSignedIn(true)
    }
    setRoute(route)
  }

  return (
    <>
      {route === 'home'
        ? <div>
          {/* <Rank name={user.name} entries={user.entries} /> */}
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
            onRouteChange={onRouteChange}
            name={user.name}
            entries={user.entries}
          />
          <FaceRecognition boundingBox={boundingBox} imageURL={imageURL} />
        </div>
        : (
          route === 'signIn'
            ? <Grid container component="main" className={classes.root}>
              <CssBaseline /><LeftPartImage />
              <RightPartSignIn loadUser={loadUser} onRouteChange={onRouteChange} setRoute={setRoute} />
            </Grid>
            : <Register loadUser={loadUser} onRouteChange={onRouteChange} setRoute={setRoute} />
        )
      }
    </>
  )
}

export default MainPage
