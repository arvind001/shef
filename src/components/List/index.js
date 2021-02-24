import React from "react";
import ListItem from "../ListItem/index";
import "./style.css";

export default function List(props) {
  var count = 0;
  return (
    <div className="list__container col">
      {props.list.map((el, i) => {
        if (!props.tags.includes(el)) {
          if (count < 3) {
            count = count + 1;
            return (
              <ListItem
                value={el}
                onClickItem={props.onClickItem}
                setInput={props.setInput}
              />
            );
          }
        }
      })}
    </div>
  );
}
