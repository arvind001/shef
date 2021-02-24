import React from "react";
import "./style.css";

export default function ListItem(props) {
  return (
    <div
      className="list-item__container"
      onClick={(e) => {
        props.onClickItem(e, props.value);
        props.setInput("");
      }}
    >
      <div className="list-item__text">{props.value}</div>
    </div>
  );
}
