import React from "react";
import "./style.css";

//A component that represents each suggestion in the pop up that shows up for InputList
export default function ListItem(props) {
  return (
    <div
      className="list-item__container"
      //if the list item is clicked then we want to add that item to this list of tags and set the input back to empty
      onClick={(e) => {
        props.onClickItem(props.value);
        props.setInput("");
      }}
    >
      <div className="list-item__text">{props.value}</div>
    </div>
  );
}
