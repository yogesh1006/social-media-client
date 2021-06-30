const validation = (values) => {
  let errors = {};

  if (!values.name) {
    errors.name = "Name is Required.";
  }
  if (!values.email) {
    errors.email = "Email is Required.";
  } else if (/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/.test(values.email)) {
    errors.email = "Email is Invalid.";
  }
  if (!values.password) {
    errors.password = "Password is Required.";
  } else if (values.password.lenght < 5) {
    errors.password = "Password must be more than 5 characters.";
  }

  return errors
};

export default validation;
