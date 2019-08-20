import React, {useState} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css'; 



const app = new Clarifai.App({
  apiKey: '2db03d7f76f542b0a74493e5b27d25a2'
});


const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 400
      }
    }
  },
  "move": {
    "enable": true,
    "speed": 8,
  }
}



function App() {
  const [input, setInput] = useState('');

//events
  const onInputChange = (event) => {
    console.log(event.target.value);
  }

    const onButtonSubmit = () => {
      console.log('click');
      app.models.predict('a403429f2ddf4b49b307e318f00e528b', 'https://samples.clarifai.com/face-det.jpg').then(
    function(response) {
     console.log(response);
    },
    function(err) {
      // there was an error
    }
  );
    }
//

  return (
    <div className='App'>
      <Particles className='particles'
        params={particlesOptions}
        />                  
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>
      <FaceRecognition />
    </div>
  );
}

export default App;
