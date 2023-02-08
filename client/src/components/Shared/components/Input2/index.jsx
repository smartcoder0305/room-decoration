import React, {useRef, useState, useMemo} from "react";
import classNames from "classnames";
import "./style.css";
import { useEffect } from "react";
import useWindowDimensions from "@helpers/hooks/windowDemensions";

const Input = (props) => {
  const inputRef = useRef();
  const [isActive, setActive] = useState(false);
  const { height, width } = useWindowDimensions();
  
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

  const inputType = useMemo(() => {
    if (props.name === "phoneNumber") return "tel";
    else if (props.name === "email") return "email";
    return "text";
  }, [props.name]);

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
          style={{minWidth: "calc(100% - 55px)"}} 
          placeholder={ isActive ? '' : props.placeholder} 
          ref={inputRef} 
          autoFocus={props.autoFocus}
          onFocus={handleActive}
          onBlur={handleBlur}
          type={inputType}
          maxLength={props.maxLength}
          max={props.maxValue}
          inputmode={props.name === "phoneNumber" ? "numeric" : null}
          />
      </div>
    </div>
  );
};

export default Input;
