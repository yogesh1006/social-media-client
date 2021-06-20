import React from "react";
import { Switch, Route } from "react-router";
import "./App.css";
import Navbar from "./features/navbar/Navbar";
import Profile from "./features/user/Profile";
import Signin from "./features/user/Signin";
import Signup from "./features/user/Signup";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Toaster } from "react-hot-toast";
import Home from "./features/home/Home";

function App() {
  return (
    <div className="App">
      <Navbar />
       <Toaster/>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/register" component={Signup}></Route>
        <Route path="/login" component={Signin}></Route>
        <Route path="/profile" component={Profile}></Route>
      </Switch>
    </div>
  );
}

export default App;
