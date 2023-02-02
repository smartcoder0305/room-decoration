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
      <label 
        className={classNames("blends-input-label2", {'blends-input-label2-filled': isActive})} 
        htmlFor={props.name} 
        style={{ right: !props.icon && isActive ? "16px" : props.name === 'zipCode'? '57px' : "68px", top: isActive ? "-6px" : "25px", opacity: isActive ? 1 : 0}}
      >
        {props.label}
      </label>
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
            <span className={classNames('blends-input2-divider', {'blends-input-divider-filled': inputRef.current?.value})}></span>
          </>
        }
        <input 
          id={props.name} 
          className={classNames('blends-input2', {'blends-input2-center': props.name === 'zipCode'})} 
          style={{maxWidth: "calc(100% - 50px)"}} 
          placeholder={ isActive ? '' : props.placeholder} 
          ref={inputRef} 
          autoFocus={props.autoFocus}
          onFocus={handleActive}
          onBlur={handleBlur}
          maxLength={props.maxLength}
          />
      </div>
    </div>
  );
};

export default Input;
