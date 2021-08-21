import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout, userSelector } from "../user/userSlice";
import { useDetectOutsideClick } from "./useDetectOutsideClick";
import "../../App.css";

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isSuccess, user } = useSelector(userSelector);

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

  return (
    <>
      <div className="flex justify-between items-center p-4 bg-indigo-400">
        <div className="ml-3 text-2xl tracking-wide">
          <Link to={localStorage.getItem("token") ? "/" : "/login"} className="text-3xl underline text-white">
            Frndzs
          </Link>
        </div>

        <div className="container">
          <div className="menu-container relative flex justify-center items-center">
            <button
              onClick={onClick}
              className="menu-trigger bg-white flex justify-between items-center px-2 py-2 border-none align-middle shadow transition-shadow ml-auto rounded-lg cursor-pointer hover:shadow-2xl"
            >
              <span className="font-bold align-middle text-base my-3 mr-2">
                {isSuccess && user.name }
              </span>
              <img
                className="rounded-full h-10 w-10"
                src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/df/df7789f313571604c0e4fb82154f7ee93d9989c6.jpg"
                alt="User avatar"
              />
            </button>

            <nav
              ref={dropdownRef}
              className={
                isActive
                  ? "visible opacity-1 transform translate-y-0  bg-white rounded-lg absolute  top-20 right-0 w-60 shadow-2xl py-2"
                  : "bg-white rounded-lg absolute inset-x-0 top-20 right-0 w-60 shadow-md opacity-0 invisible py-2"
              }
              // className={`menu ${isActive ? "active" : "inactive"}`}
            >
              {isSuccess ? (
                <ul className="m-0 p-2 divide-y">
                  <li className=" p-2">
                    <Link className="block text-black" to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li className=" p-2">
                    <Link className="block text-black" to="/createpost">
                      Create Post
                    </Link>
                  </li>
                  <li className=" p-2">
                    <Link className="block text-black" to="/myfollowingposts">
                      My following posts
                    </Link>
                  </li>
                  <li className="border-b-2 p-2">
                    <button
                      onClick={() => {
                        localStorage.clear();
                        dispatch(logout());
                        history.push("/login");
                      }}
                    >
                        Logout
                    </button>
                  </li>
                </ul>
              ) : (
                <ul className="m-0 p-2 divide-y">
                  <li className=" p-2">
                    <Link className="block text-black" to="/login">
                      Signin
                    </Link>
                  </li>
                  <li className=" p-2">
                    <Link className="block text-black" to="/register">
                      Signup
                    </Link>
                  </li>
                </ul>
              )}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

