import React from "react";
import InputMask from "react-input-mask";
import classNames from "classnames";
import "./style.css";

const Input = (props) => {
  return (
    <div className={classNames('blends-input-wrapper', {error: props.error})}>
      {props.label && (
        <label className="blends-input-label" htmlFor={props.name}>
          {props.label}
        </label>
      )}
      <InputMask
        mask={props?.mask}
        value={props.value}
        onChange={props.onChange}
      >
        <input id={props.name} className="blends-input" {...props}/>
      </InputMask>
    </div>
  );
};

export default Input;
