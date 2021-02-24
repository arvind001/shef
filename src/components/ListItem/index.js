import React from "react";
import "./style.css";

export default function ListItem(props) {
  return (
    <div
      className="list-item__container"
      onClick={(e) => props.onClickItem(e, props.value)}
    >
      <div className="list-item__text">{props.value}</div>
    </div>
  );
}
