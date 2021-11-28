import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import NoteState from './context/notes/NoteState';


function App() {
  return (
  <>
  <NoteState>
    <Router>
    {/* <Alert msg="this is alert"/> */}
      <Navbar/>
      <div className="container">
      <Switch>
          <Route exact path="/">
            <div className="todo-app">
            <Home />
            </div>
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
        </Switch>
        </div>
      </Router>
    </NoteState>
    </>
  );
}

export default App;
