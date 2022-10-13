import React from "react";

const OnChangedInput = ({ type, placeholder, onChangeFunction, value }) => {
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    onChangeFunction(value);
  };
  return (
    <input
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      required
    ></input>
  );
};

export default OnChangedInput;
