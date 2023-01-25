import React, {useRef} from "react";
import InputMask from "react-input-mask";
import classNames from "classnames";
import "./style.css";
import { useEffect } from "react";

const Input = (props) => {
  const inputRef = useRef();
  useEffect(() => {
    if(props.autoFocus) {
      if (inputRef.current){
        inputRef.current.focus();
      }
    }
  }, [])
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
        <input id={props.name} className="blends-input" {...props} ref={inputRef}/>
      </InputMask>
    </div>
  );
};

export default Input;
