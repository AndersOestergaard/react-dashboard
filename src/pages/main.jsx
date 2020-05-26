import React, { Component } from "react";
import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";
import Home from "./home";
import Dashboard from "./dashboard";
import Contact from "./contact";

 
export default class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          
          <div className="sidenav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/contact">Page 2</NavLink>
          </div>
          <div className="header">
            <h3 className="align-text-bottom">Dashboard App</h3>
          </div>
          <div className="main">
            <div className="content">
              <Route exact path="/" component={Home}/>
              <Route path="/dashboard" component={Dashboard}/>
              <Route path="/contact" component={Contact}/>
            </div>
          </div>
        </div>
      </HashRouter>
    );
  }
}