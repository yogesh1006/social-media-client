import React from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logout } from "../user/userSlice";

const Navbar = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <div className="border-b-4 border-gray-400 ">
      <div className="flex justify-between p-4">
        <div className="ml-3 text-2xl tracking-wide">
          <Link to={localStorage.getItem("token") ? "/" : "/login"}>
            Instagram
          </Link>
        </div>
        <div className="mr-2.5 space-x-3">
          {localStorage.getItem("token") ? (
            <>
              <Link to="/profile">Profile</Link>
              <Link to="/createpost">Create Post</Link>
              <button
                onClick={() => {
                  localStorage.clear();
                  dispatch(logout());
                  history.push("/login");
                }}
              >
                Logout{" "}
              </button>
            </>
          ) : (
            <>
              <Link key="2" to="/register">
                Signup
              </Link>
              <Link key="4" to="/login">
                Signin
              </Link>
            </>
          )}
          {/* {renderList()} */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
