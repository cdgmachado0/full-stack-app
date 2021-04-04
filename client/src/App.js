import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import CreateCourse from './components/CreateCourse';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import UserSignUp from './components/UserSignUp';
import PrivateRoute from './components/PrivateRoute';
import Forbidden from './components/Forbidden';
import NotFound from './components/NotFound';
import UnhandledError from './components/UnhandledError';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Courses}/>
        <PrivateRoute exact path='/courses/create' component={CreateCourse} />
        <PrivateRoute path='/courses/:id/update' component={UpdateCourse} />
        <Route path='/courses/:id' component={CourseDetail} />
        <Route path='/signin' component={UserSignIn} />
        <Route path='/signout' component={UserSignOut} />
        <Route path='/signup' component={UserSignUp} />
        <Route path='/forbidden' component={Forbidden} />
        <Route path='/notfound' component={NotFound} />
        <Route path='/error' component={UnhandledError} />
        <Route render={() => <Redirect to='/notfound' />} />
      </Switch>
    </Router>
  );
}

export default App;
