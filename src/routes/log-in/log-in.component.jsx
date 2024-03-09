import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/primary-button/primary-button.component";

import { isExistingUser } from "../../backend/user.auth";

import "./log-in.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const LogIn = () => {
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
      const userIsValid = isExistingUser(email, password);
      if (!userIsValid) {
        throw new Error("User is invalid!");
      }
      goToHomeHandler();
    } catch (error) {
      console.log(
        "log-in.component - handleFormSubmit() - Error: User log in failed.",
        error
      );
    }
  };

  return (
    <div className="log-in-container">
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

        <Button type="submit">Log In</Button>

        <p className="register-container">
          Don't have an account?&nbsp;
          <Link className="register-link" to="/register">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
