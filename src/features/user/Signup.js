import { useSelector, useDispatch } from "react-redux";
import { signupUser, userSelector } from "./userSlice";
import { Link, useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loader from "react-loader-spinner";

const Signup = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isFetching } = useSelector(userSelector);

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
        dispatch(signupUser(values))
          .unwrap()
          .then((res) => {
            toast.success("Signup successfull.");
            history.push("/login");
          })
          .catch((err) => console.log(err));
      }
    },
  );
  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col items-center h-full justify-center"
    >
      <div className="mb-2">
        <h1 className="text-3xl underline text-indigo-700">Signup</h1>
      </div>
      <label htmlFor="name" className="block  mb-2">
        {" "}
        Name
      </label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
      />
      {formik.touched.name && formik.errors.name ? (
        <div className="text-left text-red-500 text-sm">
          {formik.errors.name}
        </div>
      ) : null}

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
        <div className="text-left text-red-500 text-sm">
          {formik.errors.email}
        </div>
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
        <div className="text-left text-red-500 text-sm">
          {formik.errors.password}
        </div>
      ) : null}

      <button
        type="submit"
        className="px-6 py-2 mt-4 bg-indigo-700 text-white hover:bg-indigo-400"
      >
        Submit
      </button>
      <div className="mt-4 tracking-wide">
        <p>
          Already Registered?
          <Link to="/login" className="text-indigo-700 underline">
            {" "}
            Signin
          </Link>
        </p>
      </div>
      {isFetching && (
        <div className="flex flex-col justify-center items-center absolute inset-0 z-10">
          {" "}
          <Loader type="TailSpin" color="#00BFFF" height={70} width={70} />
        </div>
      )}
    </form>
  );
};

export default Signup;
