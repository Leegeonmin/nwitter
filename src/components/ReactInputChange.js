import React from "react";
export const ReactInputChange = (event, onChangeFunc) => {
  const {
    target: { value },
  } = event;
  onChangeFunc(value);
};
