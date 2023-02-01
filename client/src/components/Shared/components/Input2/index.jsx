import React, {useRef, useState} from "react";
import classNames from "classnames";
import "./style.css";
import { useEffect } from "react";

const Input = (props) => {
  const inputRef = useRef();
  const [isActive, setActive] = useState(false);
  useEffect(() => {
    if(props.autoFocus) {
      if (inputRef.current){
        inputRef.current.focus();
      }
    }
  }, [])

  const handleActive = (e) => {
    setActive(true)
  }

  const handleBlur = (e) => {
    setActive(false)
  }

  return (
    <div {...props} style={{position: "relative"}}>
      {props.label && (
          <label className="blends-input-label2" htmlFor={props.name}>
            {isActive && props.label}
          </label>
        )}
      <div 
        className={classNames('blends-input-wrapper2', 
            {error: props.error}, 
            {'blends-input-active': isActive},  
            {'blends-input-active-phone': isActive && props.name === 'phoneNumber'},
            {'blends-input-error-phone': props.error && props.name === 'phoneNumber'}
            )} 
            {...props}>
        {props.icon && <>
            <span className="blends-input2-icon">
              {props.icon}
            </span>
            <span className={classNames('blends-input2-divider', {'blends-input-divider-active': inputRef.current?.value})}></span>
          </>
        }
        <input 
          id={props.name} 
          className="blends-input2" 
          style={{maxWidth: "calc(100% - 50px)"}} 
          placeholder={props.placeholder} 
          ref={inputRef} 
          autoFocus={props.autoFocus}
          onFocus={handleActive}
          onBlur={handleBlur}
          />
      </div>
    </div>
  );
};

export default Input;
