import React from 'react'
import { Container } from '@material-ui/core';



// CSS
import '../App.css'

function FaceRecognition({ imageURL, boundingBox }) {
  return (
    <div  >

      {/* By making this div's position absolute, we can get the box around the image OTHERWISE the box will be around the WHOLE page */}
      <div style={{ position: 'absolute' }}>

        <img id="inputImage" src={imageURL} alt="" width='320px' height='auto' />
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
