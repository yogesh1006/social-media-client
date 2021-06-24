import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { signinUser, userSelector, clearState } from "./userSlice";
import { Link, useHistory } from "react-router-dom";
import toast from "react-hot-toast";



const Signin = () => {

    const [values, setValues] = useState({
        email: "",
        password: "",
      });
    

      const dispatch = useDispatch();
      const history = useHistory();
      const { isFetching, isSuccess, isError, errorMessage } = useSelector(
        userSelector
      );
  
    
      useEffect(() => {
        return () => {
          dispatch(clearState());
        };
        // eslint-disable-next-line
      }, []);
    
      useEffect(() => {
        if (isError) {
          toast.error(errorMessage);
          dispatch(clearState());
        }
    
        if (isSuccess) {
          toast.success("Signin successfull.")
          dispatch(clearState());
          history.push("/");
        }
        // eslint-disable-next-line
      }, [isError, isSuccess]);

      const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value });
      };
    
    
      const onSubmit = (e) => {
        e.preventDefault();
        // setValues({...values})
        dispatch(signinUser(values));
        setValues(
          {
            email:"",
            password:"",
        }
        )
      }

  return (
    <div>
      <form className="flex flex-col items-center h-96  justify-center">
        <div>
          <h4>Signin</h4>
        </div>
        <div>
          <label className="block">Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange("email")}
          />
        </div>
        <div>
          <label className="block">Password</label>
          <input
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
          Signin
        </button>
        <div className="mt-4 tracking-wide">
        <p>Don't have an Account?<Link to="/register" className="text-indigo"> Signup</Link></p>
      </div>
        {isFetching && "Loading..."}
      </form>
    </div>
  );
};

export default Signin;
