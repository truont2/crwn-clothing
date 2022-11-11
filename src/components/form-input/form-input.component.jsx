import React from "react";
import {FormInputLabel, Input, Group} from './form-input.styles.jsx'

const FormInput = ({ label, ...otherProps }) => {
  return (
    <Group className="group">
    <Input className="form-input" {...otherProps} />
    {/* basically if the user has typed something, then apply the shrink class */}
      {label && (
        <FormInputLabel
        // 0 falsey, everything else truthy
          shrink={otherProps.value.length}
        >
          {label}
        </FormInputLabel>
      )}
    </Group>
  );
};

export default FormInput;
