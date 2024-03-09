import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";

import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/primary-button/primary-button.component";
import { API_CODES } from "../../utils/api-code";
import { API_STATUS } from "../../utils/api-status";

import "./log-in.styles.scss";

const DEFAULT_FORM_FIELDS = {
  email: "",
  password: "",
};
const BASE_URL_FOR_SERVER = "http://localhost:3001";

const LogIn = () => {
  const [formFields, setFormFields] = useState(DEFAULT_FORM_FIELDS);
  const { email, password } = formFields;

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
      const { data } = await Axios.post(`${BASE_URL_FOR_SERVER}/login`, {
        email: email,
        password: password,
      });

      if (
        data.status === API_STATUS.unauthorized &&
        data.code === API_CODES.notFound
      ) {
        throw new Error("User not found.");
      }

      if (
        data.status === API_STATUS.unauthorized &&
        data.code === API_CODES.badRequest
      ) {
        throw new Error("Incorrect username or password.");
      }

      if (
        data.status === API_STATUS.internalServerError &&
        data.code === API_CODES.internalServerError
      ) {
        throw new Error("Internal Server Error.");
      }

      goToHomeHandler();
    } catch (error) {
      console.log(
        "log-in.component - handleFormSubmit() - Error: User log in failed.\n",
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
