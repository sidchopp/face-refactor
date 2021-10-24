import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';

// Components
import UseStyles from './UseStyles';

// CSS
import '../App.css'

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

function FaceRecognition({ imageURL, boundingBox }) {
  const classes = UseStyles();

  return (
    <div className={classes.paper} >
      {/* By making this div's position absolute, we can get the box around the image OTHERWISE the box will be around the WHOLE page */}
      <div style={{ position: 'absolute' }}>
        <img id="inputImage" src={imageURL} alt="" width='350px' height='350px' />
        <div className='face-box'
          style={{
            top: boundingBox.topRow, right: boundingBox.rightCol, bottom: boundingBox.bottomRow, left: boundingBox.leftCol
          }}>
        </div>
      </div>
    </div>
  )
}

export default FaceRecognition;
