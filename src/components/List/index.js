import React from "react";
import ListItem from "../ListItem/index";
import "./style.css";

//This component is a list and is used primarily as a pop up for the input in the InputList component.
//The reason this is it's own component is so that the length of the list can be set through the props and so that only items that
//are not in the selected tags are shown as suggestions.
export default function List(props) {
  var count = 0;
  return (
    <div className="list__container col">
      {props.list.map((el, i) => {
        //A check to ensure only items not already in the selected tags are shown as suggestions
        if (!props.tags.includes(el)) {
          //Ensures our list doesnt extend beyond the length of suggestions provided via the props
          if (count < props.listLength) {
            count = count + 1;
            //For each item in the list render a special ListItem component
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
