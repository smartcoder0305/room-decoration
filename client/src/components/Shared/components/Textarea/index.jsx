import React from "react";
import "./style.css";

const Textarea = (props) => {
  return (
    <div>
      <label className="blends-input-label" htmlFor={props.name}>
        {props.label}
      </label>
      <textarea id={props.name} {...props}></textarea>
    </div>
  );
};

export default Textarea;
