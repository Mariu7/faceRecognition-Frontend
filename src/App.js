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
  apiKey: '1d789fd119ca45eb94665de408d9661e'
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
  const [user,setUser] = useState({
            id: '',
            name: '',
            email: '',   
            password: '',         
            entries: 0,
            joined: ''
  }  )

  // Functions/////////////////
const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    })
    }
  



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
      app.models.predict(Clarifai.DEMOGRAPHICS_MODEL, input)
      .then(response => {
        console.log('hi', response)
        if(response) {
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            setUser(Object.assign(user, {entries: count}))
          })
        }
         displayFaceBox(calculateFaceLocation(response))})
      .catch(err => console.log(err));
    }

    //Route
    const onRouteChange = (route) => {
      if (route === 'signin') {
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
            <Rank name={user.name} entries={user.entries}/>
            <ImageLinkForm 
              onInputChange={onInputChange} 
              onButtonSubmit={onButtonSubmit}/>
            <FaceRecognition  box={box} imageUrl={imageUrl}/>
          </div>
        : ( 
        route === 'signin' 
        ? <Signin loadUser={loadUser} onRouteChange={onRouteChange} />
        : <Register loadUser={loadUser} onRouteChange={onRouteChange} />
      )
            
      }
    </div>
  );
}

export default App;
