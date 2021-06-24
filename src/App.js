import React, {useEffect} from "react";
import { Switch, Route, useHistory } from "react-router";
import "./App.css";
import Navbar from "./features/navbar/Navbar";
import Profile from "./features/user/Profile";
import Signin from "./features/user/Signin";
import Signup from "./features/user/Signup";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Toaster } from "react-hot-toast";
import Home from "./features/home/Home";
import CreatePost from "./features/post/CreatePost";
import PrivateRoute from "./PrivateRoute";
import { useSelector,useDispatch } from "react-redux";
import {addToken} from "./features/user/userSlice"

function App() {
  const history = useHistory()
  const {token} = useSelector(state => state.user)
  const dispatch = useDispatch();
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"))
    if(user){
      dispatch(addToken())
    }else {
      history.push("/login")
    }
  },[token])

  return (
    <div className="App">
      <Navbar />
       <Toaster/>
      <Switch>
        <Route path="/register" component={Signup}></Route>
        <Route path="/login" component={Signin}></Route>

        <PrivateRoute exact path="/" component={Home}></PrivateRoute>
        <PrivateRoute path="/profile" component={Profile}></PrivateRoute>
        <PrivateRoute path="/createpost" component={CreatePost}></PrivateRoute>
      </Switch>
    </div>
  );
}

export default App;
