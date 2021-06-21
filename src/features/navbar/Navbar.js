import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
   <div className="border-b-4 border-gray-400 ">
     <div className="flex justify-between p-4">
       <div className="ml-3 text-2xl tracking-wide">
         <Link to="/">Instagram</Link>
       </div>
       <div className="mr-2.5 space-x-3">
         <Link to="/register">Signup</Link>
         <Link to="/login">Signin</Link>
         <Link to="/profile">Profile</Link>
         <Link to="/createpost">Create Post</Link>

       </div>
     </div>
   </div>
  );
};

export default Navbar;
