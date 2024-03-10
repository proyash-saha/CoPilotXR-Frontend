import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";

import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/primary-button/primary-button.component";
import ErrorMessage from "../../components/error-message/error-message.component";

import { API_CODES } from "../../utils/api-code.utils";
import { API_STATUS } from "../../utils/api-status.utils";
import { UserContext } from "../../contexts/user.context";

import "./register.styles.scss";

const DEFAULT_FORM_FIELDS = {
  email: "",
  password: "",
};
const BASE_URL_FOR_SERVER = "http://localhost:3001";

const Register = () => {
  const { login } = useContext(UserContext);
  const [formFields, setFormFields] = useState(DEFAULT_FORM_FIELDS);
  const { email, password } = formFields;
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const goToHomeHandler = () => {
    navigate("/home");
  };

  const handleFormInputChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const { data } = await Axios.post(`${BASE_URL_FOR_SERVER}/register`, {
        email: email,
        password: password,
      });

      if (
        data.status === API_STATUS.conflict &&
        data.code === API_CODES.alreadyExists
      ) {
        setErrorMessage("You'r account already exists. Please log in.");
        throw new Error("User with the same email address already exists.");
      }

      if (
        data.status === API_STATUS.internalServerError &&
        data.code === API_CODES.internalServerError
      ) {
        setErrorMessage("Oops! Something went wrong.");
        throw new Error("Internal Server Error.");
      }

      const userData = { email: email };
      login(userData);
      goToHomeHandler();
    } catch (error) {
      console.log(
        "register.component - handleFormSubmit() - Error: User registration failed.\n",
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

        <ErrorMessage message={errorMessage} />
      </form>
    </div>
  );
};

export default Register;
