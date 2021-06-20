import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signupUser, userSelector, clearState } from "./userSlice";
import { Link, useHistory } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const history = useHistory();

  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Signup successfull.")
      dispatch(clearState());
      history.push("/login");
    }

    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
    // eslint-disable-next-line
  }, [isSuccess, isError]);

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // setValues({...values})
    dispatch(signupUser(values));
    setValues({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <form className="flex flex-col items-center h-96  justify-center">
      <div>
        <h3>Signup</h3>
      </div>
      <div>
        <label className="block  mb-2">Name</label>
        <input
          className="mb-2"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange("name")}
        />
      </div>
      <div>
        <label className="block mb-2">Email</label>
        <input
          className="mb-2"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange("email")}
        />
      </div>
      <div>
        <label className="block mb-2">Password</label>
        <input
          className="mb-2"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange("password")}
        />
      </div>
      <button
        className="px-6 py-2 mt-4 bg-indigo-700 text-white hover:bg-indigo-400"
        onClick={onSubmit}
      >
        Signup
      </button>
      <div className="mt-4 tracking-wide">
        <p>Already Registered?<Link to="/login"> Signin</Link></p>
      </div>
      {isFetching && "Loading..."}
    </form>
  );
};

export default Signup;
