import React from "react";
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import { LandingPage, MenuPage, DashboardPage } from "./pages"
/* 
Hey, Shahzain here well here is your main App file you can add more routes in here
*/
function App() {
  return (
    <Switch>
      <Route path="/" exact={ true } component={ LandingPage } />
      <Route path="/menu" exact={ true } component={ MenuPage } />
      <Route path="/dashboard/:id" exact={ true } component={ DashboardPage } />
    </Switch>
  );
}

export default App;
