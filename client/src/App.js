import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';


function App() {
  return (

    //here is where all the routes will be
    <Router>
      <Switch>
        <Route exact path='/' component={Courses}/>
        <Route path='/courses/:id' component={CourseDetails} />
      </Switch>
    </Router>
    
   
  );
}

export default App;
