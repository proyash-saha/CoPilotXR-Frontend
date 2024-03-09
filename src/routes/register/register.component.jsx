import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";

import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/primary-button/primary-button.component";
import { API_CODES } from "../../utils/api-code.utils";
import { API_STATUS } from "../../utils/api-status.utils";

import "./register.styles.scss";

const DEFAULT_FORM_FIELDS = {
  email: "",
  password: "",
};
const BASE_URL_FOR_SERVER = "http://localhost:3001";

const Register = () => {
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
      const { data } = await Axios.post(`${BASE_URL_FOR_SERVER}/register`, {
        email: email,
        password: password,
      });

      if (
        data.status === API_STATUS.conflict &&
        data.code === API_CODES.alreadyExists
      ) {
        throw new Error("User with the same email address already exists.");
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
      </form>
    </div>
  );
};

export default Register;
