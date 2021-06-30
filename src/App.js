import React, {useEffect} from "react";
import { Switch, Route, useHistory } from "react-router";
import Navbar from "./features/navbar/Navbar";
import Profile from "./features/user/Profile";
import Signin from "./features/user/Signin";
import Signup from "./features/user/Signup";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Toaster } from "react-hot-toast";
import Home from "./features/home/Home";
import CreatePost from "./features/post/CreatePost";
import PrivateRoute from "./PrivateRoute";
import { useDispatch } from "react-redux";
import {getUser} from "./features/user/userSlice"
import UserProfile from "./features/user/UserProfile";

function App() {
  const history = useHistory()
  const dispatch = useDispatch();
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch(getUser())
    }else {
      history.push("/login")
    }
    // eslint-disable-next-line
  },[])

  return (
    <div className="App">
      <Navbar />
       <Toaster/>
      <Switch>
        <Route path="/register" component={Signup}></Route>
        <Route path="/login" component={Signin}></Route>
        <Route path="/profile/:userId" component={UserProfile}></Route>

        <PrivateRoute exact path="/" component={Home}></PrivateRoute>
        <PrivateRoute exact path="/profile" component={Profile}></PrivateRoute>
        <PrivateRoute path="/createpost" component={CreatePost}></PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
