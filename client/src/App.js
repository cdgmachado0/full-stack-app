import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Courses from './components/Courses';


function App() {
  return (

    //here is where all the routes will be
    <Router>
      <Route path='/' component={Courses}/>
    </Router>
    
   
  );
}

export default App;
