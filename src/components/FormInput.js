import React from "react";

function FormInput(props) {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        className={props.class}
        accept = {props.accept}
        onChange = {props.onChange}
        name = {props.name}
        value = {props.value}
        pattern = {props.pattern}
        required
      />
    </div>
  );
}

export default FormInput;
