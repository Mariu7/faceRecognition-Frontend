import React, {useState} from 'react';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
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
  const [imageUrl, setImageUrl] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin')
  const [isSignedIn, setisSignedIn] = useState(false);

  // Functions/////////////////

const calculateFaceLocation = (data) => {
  const clarifiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputImage');
  const width = Number(image.width);
  const height = Number(image.height)
  return {
    leftCol: clarifiFace.left_col * width,
    topRow: clarifiFace.top_row * height,
    rightCol: width - (clarifiFace.right_col * width),
    bottomRow: height - (clarifiFace.bottom_row *height)
  }
}

const displayFaceBox = (box) => {
  setBox(box);
}
///////events/////////////////////////////////////////////////////
  const onInputChange = (event) => {
    setInput(event.target.value); 
  }

    const onButtonSubmit = () => {
      setImageUrl(input);           
      app.models.predict(Clarifai.FACE_DETECT_MODEL, input).then(response => displayFaceBox(calculateFaceLocation(response)))
      .catch(err => console.log(err));
    }

    //Route
    const onRouteChange = (route) => {
      if (route === 'signout') {
        setisSignedIn(false);
      } else if (route === 'home') {
        setisSignedIn(true);
      }
      setRoute(route);
    }


  return (
    <div className='App'>
      <Particles className='particles'
        params={particlesOptions}
        />                  
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange} />
      { route === 'home'
        ? <div> 
            <Logo />
            <Rank />
            <ImageLinkForm 
              onInputChange={onInputChange} 
              onButtonSubmit={onButtonSubmit}/>
            <FaceRecognition  box={box} imageUrl={imageUrl}/>
          </div>
        : ( 
        route === 'signin' 
        ? <Signin onRouteChange={onRouteChange} />
        : <Register onRouteChange={onRouteChange} />
      )
            
      }
    </div>
  );
}

export default App;
