import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import Courses from './components/Courses';
import CourseDetails from './components/CourseDetails';
import UpdateCourse from './components/UpdateCourse';
import CreateCourse from './components/CreateCourse';


function App() {
  return (

    //here is where all the routes will be
    <Router>
      <Switch>
        <Route exact path='/' component={Courses}/>
        <Route path='/courses/:id' component={CourseDetails} />
        <Route path='/update/:id' component={UpdateCourse} />
        <Route path='/create' component={CreateCourse} />
      </Switch>
    </Router>
    
   
  );
}

export default App;
