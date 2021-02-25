import React from "react";
import "./style.css";

//This component is the Tag seen inside the autocomplete component. Its a component that shows an individual sugestion that was selected.
//This component can be removed by clicking the X and executing the removeTag function passed in through the props.
export default function Tag(props) {
  return (
    <div className="tag__container row">
      {props.value}
      <div className="remove" onClick={() => props.removeTag(props.index)}>
        X
      </div>
    </div>
  );
}
