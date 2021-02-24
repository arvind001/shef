import React, { useState, useEffect } from "react";
import List from "../List/index";
import useComponentVisibility from "../../hooks/useComponentVisibility";
import isNil from "lodash/isNil";
import "./style.css";

export default function InputList(props) {
  // const [listOpen, setListOpen] = useState(false);
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  var {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisibility(true);

  const onFocus = () => {
    setIsComponentVisible(true);
  };

  const onChange = (event) => {
    setInput(event.target.value);
    setSuggestions(event.target.value);
  };

  const setSuggestions = (input) => {
    var suggestions = props.suggestions;
    for (var i = 0; i < input.length; i++) {
      if (isNil(suggestions[input[i].toLowerCase()])) {
        setItems([]);
        return;
      } else {
        suggestions = suggestions[input[i].toLowerCase()];
        // console.log("suggestions1", suggestions);
      }
    }
    // console.log("suggestions2", suggestions);
    setItems(suggestions.values);
  };

  const allItemsinTags = () => {
    for (var i = 0; i < items.length; i++) {
      if (!props.tags.includes(items[i])) {
        return false;
      }
    }
    return true;
  };

  const onKeyDown = (event) => {
    console.log("keyCode", event.keyCode);
    if (event.keyCode === 13) {
      if (allItemsinTags()) {
        props.addTag(event, input);
        setInput("");
        return;
      }
      if (items.length > 0) {
        for (var i = 0; i < items.length; i++) {
          if (!props.tags.includes(items[i])) {
            props.addTag(event, items[i]);
            setInput("");
            break;
          }
        }
      } else {
        props.addTag(event, input);
        setInput("");
      }
      console.log("input");
    } else if (event.keyCode === 8) {
      if (input === "") {
        if (props.tags.length > 0) {
          console.log("last el", props.tags[props.tags.length - 1]);
          props.removeTag(props.tags[props.tags.length - 1]);
        }
      }

      console.log("delete pressed");
    }
  };

  return (
    <div className="input-list__container" ref={ref}>
      <input
        className="input"
        type={props.type}
        onFocus={onFocus}
        value={input}
        onChange={onChange}
        placeholder={props.placeholder}
        onKeyDown={onKeyDown}
      />
      {console.log("listes", items)}
      {isComponentVisible && input !== "" && (
        <List
          tags={props.tags}
          list={items}
          input={input}
          onClickItem={props.addTag}
          setInput={setInput}
        />
      )}
    </div>
  );
}
