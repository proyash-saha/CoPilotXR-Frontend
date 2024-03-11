import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Axios from "axios";

import FormInput from "../../components/form-input/form-input.component";
import Button from "../../components/primary-button/primary-button.component";
import ChatBot from "../../components/chatbot/chatbot.component";

import { API_CODES } from "../../utils/api-code.utils";
import { API_STATUS } from "../../utils/api-status.utils";
import { UserContext } from "../../contexts/user.context";

import "./register.styles.scss";

const DEFAULT_FORM_FIELDS = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};
const BASE_URL_FOR_SERVER = "http://localhost:3001";

const Register = () => {
  const { login } = useContext(UserContext);
  const [formFields, setFormFields] = useState(DEFAULT_FORM_FIELDS);
  const { firstName, lastName, email, password } = formFields;

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
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });

      if (
        data.status === API_STATUS.conflict &&
        data.code === API_CODES.alreadyExists
      ) {
        toast("Your account already exists. Please log in.", {
          id: "1",
        });
        throw new Error("User already exists.");
      }

      if (
        data.status === API_STATUS.internalServerError &&
        data.code === API_CODES.internalServerError
      ) {
        toast("Oops! Something went wrong.", {
          id: "2",
        });
        throw new Error("Internal Server Error.");
      }

      const userData = data.data;
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
      <Toaster
        position="top-center"
        containerStyle={{
          top: 80,
        }}
      />

      <form onSubmit={handleFormSubmit}>
        <FormInput
          label="First name"
          type="text"
          required
          onChange={handleFormInputChange}
          name="firstName"
          value={firstName}
        />

        <FormInput
          label="Last name"
          type="text"
          required
          onChange={handleFormInputChange}
          name="lastName"
          value={lastName}
        />

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

      <ChatBot />
    </div>
  );
};

export default Register;
