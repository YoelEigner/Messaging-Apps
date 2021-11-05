import Login from "./home/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React from "react";
import io from "socket.io-client";
import Chat from './home/Home'
import Lobby from './home/Loby';
import "./App.scss";
import SignUp from './home/Signup';

const socket = io.connect('http://localhost:8000/');



const Appmain = (props) =>  {
  return (
    <React.Fragment>
      <div className="right">
        <Lobby
          userId={props.match.params.userId}
          socket={socket}
        />
      </div>
      <div className="left">
        {/* <Process /> */}
      </div>
    </React.Fragment>
  );
}


function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Login socket={socket} />
          </Route>          
          <Route exact path="/chat/:userId" component={Appmain} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </div>
    </Router>
  );
}

export default App