import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// Components
// import Face from '../images/face.jpg'
import UseStyles from './UseStyles';
import MyParticles from './MyParticles';

//CSS
import '../App.css'

// // Material UI styles
// const useStyles = makeStyles((theme) => ({
//   root: {
//     height: '100vh',
//   },
//   image: {
//     backgroundImage: `url(${Face})`,
//     backgroundRepeat: 'no-repeat',
//     backgroundColor:
//       theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
//     backgroundSize: 'cover',
//     backgroundPosition: 'center',
//   },
// }));

function LeftPartImage() {
  const classes = UseStyles();
  return (
    <Grid item xs={false} sm={4} md={7} className={classes.image} >
      < MyParticles id="tsparticles" />
    </Grid>
  )
}

export default LeftPartImage
