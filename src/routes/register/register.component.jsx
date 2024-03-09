import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/primary-button/primary-button.component";

import { registerUser } from "../../backend/user.auth";

import "./register.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const Register = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const navigate = useNavigate();
  const goToHomeHandler = () => {
    navigate("/home");
  };

  const resetFormInputFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleFormInputChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      registerUser(email, password);
      goToHomeHandler();
    } catch (error) {
      console.log(
        "register.component - handleFormSubmit() - Error: User registration failed.",
        error
      );
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleFormSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleFormInputChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleFormInputChange}
          name="password"
          value={password}
        />

        <Button type="submit">Register</Button>

        <p className="log-in-container">
          Already have an account?&nbsp;
          <Link className="log-in-link" to="/log-in">
            Log In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
