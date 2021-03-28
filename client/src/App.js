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
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';
import PrivateRoute from './components/PrivateRoute';
import Forbidden from './components/Forbidden';


function App() {
  return (

    //here is where all the routes will be
    <Router>
      <Switch>
        <Route exact path='/' component={Courses}/>
        <Route path='/courses/:id' component={CourseDetails} />
        <PrivateRoute path='/update/:id' component={UpdateCourse} />
        <PrivateRoute path='/create' component={CreateCourse} />
        <Route path='/signin' component={UserSignIn} />
        <Route path='/signout' component={UserSignOut} />
        <Route path='/signup' component={UserSignUp} />
        <Route path='/forbidden' component={Forbidden} />
      </Switch>
    </Router>
    
   
  );
}

export default App;
