import React from "react";
import "./style.css";

export default function Tag(props) {
  return (
    <div className="tag__container row">
      {props.value}
      <div className="remove" onClick={() => props.removeTag(props.value)}>
        X
      </div>
    </div>
  );
}
