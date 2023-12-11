import PropTypes from "prop-types";

function FormInputField({ label, type, name, value, handleChange, errorMsg }) {
  return (
    <div className="field">
      <p className="field-label">{label}</p>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        required
      />
      <p className="error-msg">{errorMsg}</p>
    </div>
  );
}
export default FormInputField;

FormInputField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  handleChange: PropTypes.func,
  errorMsg: PropTypes.string,
};
