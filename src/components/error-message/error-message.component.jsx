import "./error-message.styles.scss";

const ErrorMessage = ({ message }) => {
  return <div>{message && <p className="error-message">{message}</p>}</div>;
};

export default ErrorMessage;
