import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signupUser, userSelector, clearState } from "./userSlice";
import { Link, useHistory } from "react-router-dom";
import toast from "react-hot-toast";
// import validation from "./validation"

import { useFormik } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isFetching, isSuccess, errorMessage, isError } =
    useSelector(userSelector);

  useEffect(() => {
    return () => {
      dispatch(clearState());
      // history.push('/login')
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Signup successfull.");
      history.push('/login')
      dispatch(clearState());
    }

    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
    // eslint-disable-next-line
  }, [isSuccess, isError]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(15, "Must be 15 characters or less")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .max(20, "Must be 20 characters or less")
        .required("Required"),
    }),
    onSubmit: (values) => {
      // alert(JSON.stringify(values, null, 2));
      dispatch(signupUser(values))
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col items-center h-full justify-center">
      <div className="mb-2">
        <h1 className="text-3xl underline text-indigo-700">Signup</h1>
      </div>
      <label htmlFor="name" className="block  mb-2"> Name</label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
      />
      {formik.touched.name && formik.errors.name ? (
        <div className="text-left text-red-500 text-sm">{formik.errors.name}</div>
      ) : null}

      <label htmlFor="email" className="block  mb-2">Email Address</label>
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

      <label htmlFor="password" className="block  mb-2">Password</label>
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

      <button type="submit" className="px-6 py-2 mt-4 bg-indigo-700 text-white hover:bg-indigo-400">Submit</button>
      <div className="mt-4 tracking-wide">
        <p>
          Already Registered?<Link to="/login" className="text-indigo-700 underline"> Signin</Link>
        </p>
      </div>
      {isFetching && "Loading..."}
    </form>
  );
};

export default Signup;

// const Signup = () => {
//   const [values, setValues] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState({})
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const { isFetching, isSuccess, errorMessage,isError} =
//     useSelector(userSelector);

// useEffect(() => {
//   return () => {
//     dispatch(clearState());
//   };
//   // eslint-disable-next-line
// }, []);

// useEffect(() => {
//   if (isSuccess) {
//     toast.success("Signup successfull.")
//     dispatch(clearState());
//   }

//   if (isError) {
//     toast.error(errorMessage);
//     dispatch(clearState());
//   }
//   // eslint-disable-next-line
// }, [isSuccess, isError]);

//   const handleChange = (name) => (event) => {
//     setValues({ ...values, [name]: event.target.value });
//   };

//   const onSubmit = (e) => {
//     e.preventDefault();
//     console.log(values);
//     setErrors(validation(values));
//     dispatch(signupUser(values));
//     setValues({
//       name: "",
//       email: "",
//       password: "",
//     });
//     toast.success("Signup successfull.")
//     history.push("/login");

//   };

//   return (
//     <form className="flex flex-col items-center h-96  justify-center">
//       <div>
//         <h3>Signup</h3>
//       </div>
//       <div>
//         <label className="block  mb-2">Name</label>
//         <input
//           className="mb-2"
//           type="text"
//           name="name"
//           value={values.name}
//           onChange={handleChange("name")}
//         />
//         {errors.name && <p>{errors.name}</p>}
//       </div>
//       <div>
//         <label className="block mb-2">Email</label>
//         <input
//           className="mb-2"
//           type="email"
//           name="email"
//           value={values.email}
//           onChange={handleChange("email")}
//         />
//        {errors.email && <p className="text-red-600">{errors.email}</p>}
//       </div>
//       <div>
//         <label className="block mb-2">Password</label>
//         <input
//           className="mb-2"
//           type="password"
//           name="password"
//           value={values.password}
//           onChange={handleChange("password")}
//         />
//         {errors.password && <p>{errors.password}</p>}
//       </div>
//       <button
//         className="px-6 py-2 mt-4 bg-indigo-700 text-white hover:bg-indigo-400"
//         onClick={onSubmit}
//       >
//         Signup
//       </button>
//       <div className="mt-4 tracking-wide">
//         <p>Already Registered?<Link to="/login"> Signin</Link></p>
//       </div>
//       {isFetching && "Loading..."}
//     </form>
//   );
// };

// export default Signup;
