import React, {useRef, useState, useEffect} from "react";
import InputMask from "react-input-mask";
import classNames from "classnames";
import useWindowDimensions from "@helpers/hooks/windowDemensions";
import "./style.css";

const Input = (props) => {
  const inputRef = useRef();
  const [direction, setDirection] = useState(props.style?.direction);
  const { height, width } = useWindowDimensions();
  useEffect(() => {
    if(props.autoFocus) {
      if (inputRef.current){
        inputRef.current.focus();
      }
    }
  }, [])

  const handleFocus = () => {
    if (width < 768 && props.name === 'cardNumber')
      setDirection('ltr');
  }

  const handleBlur = () => {
    if (width < 768 && props.name === 'cardNumber')
      setDirection('rtl')
  }
  return (
    <div className={classNames('blends-input-wrapper', {error: props.error})}>
      {props.label && (
        <label className="blends-input-label" htmlFor={props.name}>
          {props.label}
        </label>
      )}
      {/* <InputMask
        mask={props?.mask}
        value={props.value}
        onChange={props.onChange}
      > */}
        <input 
          id={props.name} 
          className="blends-input" 
          {...props}
          style={{direction: direction}}
          ref={inputRef}
          onFocus={handleFocus}
          onBlur={handleBlur}
          />
      {/* </InputMask> */}
    </div>
  );
};

export default Input;
