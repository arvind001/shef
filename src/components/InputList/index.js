import React, { useState } from "react";
import List from "../List/index";
import useComponentVisibility from "../../hooks/useComponentVisibility";
import isNil from "lodash/isNil";
import "./style.css";

//This component is comprised of an input and a popup list for the suggestions when the input changes.
export default function InputList(props) {
  //the value in the input
  const [input, setInput] = useState("");
  //all the possible items based on the input value
  const [items, setItems] = useState([]);

  //we use the custom visibility hook in this component to keep track of whether the suggestions pop up is open or not
  var {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisibility(true);

  //when a user clicks into the input the pop up list should be visible
  const onFocus = () => {
    setIsComponentVisible(true);
  };

  //when the input value changes we need tp update the input value to this new value and also set the new suggestions
  const onChange = (event) => {
    setInput(event.target.value);
    setSuggestions(event.target.value);
  };

  //Based on the input value this function returns the list of items that include the string of chars in the inputValue.
  //These suggestions come from the values in the trie.
  const setSuggestions = (input) => {
    //if input is empty then there will be no suggestions so I can set items to an empty array
    if (input === "") {
      setItems([]);
      return;
    }
    //this is the trie that was built in the autocomplete component
    var suggestions = props.suggestions;
    //We are going to loop through each character and move through our trie object based on the current character
    for (var i = 0; i < input.length; i++) {
      //if the character does not exist in the trie then that input value is not in the trie which means our items will be an empty array
      if (isNil(suggestions[input[i].toLowerCase()])) {
        setItems([]);
        return;
      } else {
        //if the character does exist then lets move to the next level of the trie by setting suggestions to the object for the current char
        suggestions = suggestions[input[i].toLowerCase()];
      }
    }
    //once we have looped through our whole input value, we can safely say that our current suggestions object is the object for
    //the input value string that we have and all we need to do is set the items to the values for that suggestion object
    setItems(suggestions.values);
  };

  //This function is a check to see if all the items that have been suggested are in our list of selected tags. We need this check
  //so that we can add freeform text when there are no more suggestions left.
  const allItemsinTags = () => {
    for (var i = 0; i < items.length; i++) {
      if (!props.tags.includes(items[i])) {
        return false;
      }
    }
    return true;
  };

  //This function executes when a key is pressed on the input component. It checks the keycode to determine what type if click occurred
  const onKeyDown = (event) => {
    //block of code in the event that this key down was an enter
    if (event.keyCode === 13) {
      //in case all the items are in the selected tags, then we want to add the freeform input to the list of tags, but only if the input value
      //is not empty
      if (input !== "" && allItemsinTags()) {
        props.addTag(input);
        setInput("");
        return;
      }
      //if the list of items is greater than 0 then when enter is pressed we want the first item to be added to tags
      if (items.length > 0) {
        //a for loop is required since there might be some items already selected and we need to find the first item that hasn't been added
        //to tags already. Once the first item that isn't already in tags is found we add that tag, change the input to empty and break
        //out of the loop.
        for (var i = 0; i < items.length; i++) {
          if (input !== "" && !props.tags.includes(items[i])) {
            props.addTag(items[i]);
            setInput("");
            break;
          }
        }
      }
      //this else is if there are no items left or if there were none to begin with and to add the freeform input to the list of tags
      //and making sure that input is not empty.
      else {
        if (input !== "") {
          props.addTag(input);
          setInput("");
        }
      }
    }
    //block of code in the event that this key down was a delete
    else if (event.keyCode === 8) {
      //only execute specific code to delete the last tag in the list of tags if the input is empty
      if (input === "") {
        //Only remove a tag if there are 1 or more tags in the list of selected tags
        if (props.tags.length > 0) {
          //remove the last tag in the list of tags
          props.removeTag(props.tags.length - 1);
        }
      }
    }
  };

  //Render the input html component and conditionally render a List component (the popup) based on its visibility
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
      {isComponentVisible && input !== "" && (
        <List
          tags={props.tags}
          list={items}
          input={input}
          onClickItem={props.addTag}
          setInput={setInput}
          listLength={3}
        />
      )}
    </div>
  );
}
