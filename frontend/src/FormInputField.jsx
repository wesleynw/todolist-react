import PropTypes from "prop-types";
import styles from "./FormInputField.module.css";

function FormInputField({ label, type, name, value, handleChange, errorMsg }) {
  return (
    <div className={styles.field}>
      <p className={styles.fieldLabel}>{label}</p>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        required
      />
      <p className={styles.errorMsg}>{errorMsg}</p>
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
