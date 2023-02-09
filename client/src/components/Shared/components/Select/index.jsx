import React from "react";
import Select from "react-select";
import classNames from "classnames";
import "./style.css";

const StyledSelect = (props) => {
  return (
    <div className={classNames("select-wrapper", { error: props.error })}>
      {props.label && <label className="blends-input-label" htmlFor={props.name}>{props.label}</label>}
      <Select
        id={props.name}
        className="blends-select"
        classNamePrefix="blends-select"
        {...props}
        noOptionsMessage={() => 'אין תוצאות'}
      />
    </div>
  );
};

export default StyledSelect;
