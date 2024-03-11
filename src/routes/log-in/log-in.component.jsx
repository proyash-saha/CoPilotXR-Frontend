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

import "./log-in.styles.scss";

const DEFAULT_FORM_FIELDS = {
  email: "",
  password: "",
};
const BASE_URL_FOR_SERVER = "http://localhost:3001";

const LogIn = () => {
  const { login } = useContext(UserContext);
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
        toast("Couldn't find your account. Please register.", {
          id: "1",
        });
        throw new Error("User not found.");
      }

      if (
        data.status === API_STATUS.unauthorized &&
        data.code === API_CODES.badRequest
      ) {
        toast("Incorrect username or password.", {
          id: "2",
        });
        throw new Error("Incorrect username or password.");
      }

      if (
        data.status === API_STATUS.internalServerError &&
        data.code === API_CODES.internalServerError
      ) {
        toast("Oops! Something went wrong.", {
          id: "3",
        });
        throw new Error("Internal Server Error.");
      }

      const userData = data.data;
      login(userData);
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
      <Toaster
        position="top-center"
        containerStyle={{
          top: 80,
        }}
      />

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

      <ChatBot />
    </div>
  );
};

export default LogIn;
