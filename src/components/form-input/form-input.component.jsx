import React from "react";
import './form-input.styles.scss'

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
    <input className="form-input" {...otherProps} />
    {/* basically if the user has typed something, then apply the shrink class */}
      {label && (
        <label
          className={`${
            otherProps.value.length ? 'shrink' : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;