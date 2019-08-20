import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({onInputChange, onButtonSubmit}) => {
    return (
    <div className='center'> 
    <img alt='recognition' src={'https://samples.clarifai.com/face-det.jpg'} />
       
    </div>
    )
}

export default FaceRecognition;