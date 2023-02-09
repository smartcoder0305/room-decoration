import React from "react";
import "./style.css";

const Textarea = (props) => {
  return (
    <div>
      <label className="blends-input-label" htmlFor={props.name} style={{fontSize: "14px", fontWeight: "400"}}>
        {props.label}
      </label>
      <textarea id={props.name} {...props}></textarea>
    </div>
  );
};

export default Textarea;
