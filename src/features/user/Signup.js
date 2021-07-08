import React, { useEffect,useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { signupUser, userSelector, clearState } from "./userSlice";
import { Link, useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";

const Signup = () => {
  const [image,setImage]= useState("")
  const [url,setUrl]= useState(undefined)
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
     if(url) {
      dispatch(signupUser(formik.values))
    }
    // eslint-disable-next-line
  }, [url])

  const uploadPic = ()=>{
    const data = new FormData()
      data.append("file",image)
      data.append("upload_preset","instagram")
      data.append("cloud_name","pbu")
      fetch("https://api.cloudinary.com/v1_1/pbu/image/upload",{
          method:"post",
          body:data
      })
      .then(res => res.json())
      .then(data => {
          setUrl(data.url)
      })
      .catch((err) => {
          console.log(err);
      })
}

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
      pic:url
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
      if(image) {
        uploadPic()
      }else {
        dispatch(signupUser(values))
      }
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

       <label htmlFor="image" className="block  mb-2">Upload Profile Picture</label>
       <input
          id="image"
          name="image"
          type="file"
          className="ml-6 flex justify-center"
          onChange={(e) => setImage(e.target.files[0])}
        />

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