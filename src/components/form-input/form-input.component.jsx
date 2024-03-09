import "./form-input.styles.scss";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="form-input-container">
      <div>
        <label className="label">{label}</label>
      </div>
      <div>
        <input className="form-input" {...otherProps} />
      </div>
    </div>
  );
};

export default FormInput;
