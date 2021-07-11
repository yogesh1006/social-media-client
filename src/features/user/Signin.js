import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signinUser, userSelector, clearState } from "./userSlice";
import { Link, useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

const Signin = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isFetching, isSuccess, errorMessage, isError } =
    useSelector(userSelector);

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Signin successfull.");
      // return dispatch(clearState());
      history.push("/");
    }

    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
    // eslint-disable-next-line
  }, [isSuccess, isError]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      dispatch(signinUser(values));
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col items-center h-96  justify-center"
    >
       <div className="mb-2">
        <h1 className="text-3xl underline text-indigo-700">Signin</h1>
      </div>
      <label htmlFor="email" className="block  mb-2">
        Email Address
      </label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div className="text-left text-red-500 text-sm">{formik.errors.email}</div>
      ) : null}

      <label htmlFor="password" className="block  mb-2">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div className="text-left text-red-500 text-sm">{formik.errors.password}</div>
      ) : null}

      <button
        type="submit"
        className="px-6 py-2 mt-4 bg-indigo-700 text-white hover:bg-indigo-400"
        disabled={!formik.isValid}
      >
        Submit
      </button>
      <div className="mt-4 tracking-wide">
        <p>
          Don't have an Account?
          <Link to="/register" className="text-indigo-700 underline">
            {" "}
            Signup
          </Link>
        </p>
      </div>
      {isFetching && "Loading..."}
    </form>
  );
};

export default Signin;

// const Signin = () => {

//     const [values, setValues] = useState({
//         email: "",
//         password: "",
//       });

//       const dispatch = useDispatch();
//       const history = useHistory();
//       const { isFetching, isSuccess, isError, errorMessage } = useSelector(
//         userSelector
//       );

//       useEffect(() => {
//         return () => {
//           dispatch(clearState());
//         };
//         // eslint-disable-next-line
//       }, []);

//       useEffect(() => {
//         if (isError) {
//           toast.error(errorMessage);
//           dispatch(clearState());
//         }

//         if (isSuccess) {
//           toast.success("Signin successfull.")
//           dispatch(clearState());
//           history.push("/");
//         }
//         // eslint-disable-next-line
//       }, [isError, isSuccess]);

//       const handleChange = (name) => (event) => {
//         setValues({ ...values, [name]: event.target.value });
//       };

//       const onSubmit = (e) => {
//         e.preventDefault();
//         // setValues({...values})
//         dispatch(signinUser(values));
//         setValues(
//           {
//             email:"",
//             password:"",
//         }
//         )
//       }

//   return (
//     <div>
//       <form className="flex flex-col items-center h-96  justify-center">
//         <div>
//           <h4>Signin</h4>
//         </div>
//         <div>
//           <label className="block">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={values.email}
//             onChange={handleChange("email")}
//           />
//         </div>
//         <div>
//           <label className="block">Password</label>
//           <input
//             type="password"
//             name="password"
//             value={values.password}
//             onChange={handleChange("password")}
//           />
//         </div>
//         <button
//           className="px-6 py-2 mt-4 bg-indigo-700 text-white hover:bg-indigo-400"
//           onClick={onSubmit}
//         >
//           Signin
//         </button>
//         <div className="mt-4 tracking-wide">
//         <p>Don't have an Account?<Link to="/register" className="text-indigo"> Signup</Link></p>
//       </div>
//         {isFetching && "Loading..."}
//       </form>
//     </div>
//   );
// };

// export default Signin;
