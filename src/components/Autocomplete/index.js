import React, { useState, useEffect } from "react";
import Tag from "../Tag/index";
import InputList from "../InputList/index";
import { buildTrie } from "../../utils/buildTrie";
import { spices } from "../../constants/spices";
import "./style.css";

/**
 * This component uses the other components in the components folder to create the required functionality which is similar to the Material UI autcomplete component.
 * This component has two state variables to keep track of the tags that have been selected and the trie.
 * The tags are a list of strings and the trie is the object returned from the buildTrie function. The trie is used to construct
 * the suggestions displayed to the user. More on that later.
 */
export default function Autocomplete(props) {
  //the items selected from the suggestions (List component)
  const [tags, setTags] = useState([]);
  //the object used for generating the suggestions whenever the input changes
  const [trie, setTrie] = useState({});

  //when this component first loads, the trie for the search should get built. This happens only once instead of on every render because
  //we pass an empty array as the second argument to useEffect.
  useEffect(() => {
    var spicesTrie = buildTrie(spices);
    setTrie(spicesTrie);
  }, []);

  /**
   * function to manage tags specifically adding a tag to the current list of tags.
   * @param {*} tag string to be added to list of tags
   */
  const addTag = (tag) => {
    //if our tag is an empty string don't do anything otherwise execute the block inside the if statement
    if (tag !== "") {
      //make a copy of the tags currently in state
      var newTags = [...tags];
      //add tag to copy
      newTags.push(tag);
      //set the tags in state to copied tags array
      setTags(newTags);
    }
  };

  /**
   * function to manage tags specifically removing a tag at a given index from the list of tags
   * @param {*} index the index to remove from the list of tags
   */
  const removeTag = (index) => {
    //make a copy of the tags currently in state
    var newTags = [...tags];
    //remove a single item at index in the copied array
    newTags.splice(index, 1);
    //set the tags in state to copied tags array
    setTags(newTags);
  };

  //The components to be rendered for the autocomplete element. Which has a container which houses the tags and the input (the list attached to the input is not tied to this component)
  return (
    <div className="autocomplete__container row">
      {/* The tags from the tags state variable, for each one a Tag Component is rendered. The Tag component is passed 
        a value, its index, and a function to remove it if necessary.
      */}
      {tags.map((el, i) => {
        //Tag component with a value which is the current tag and its index along with a function to remove the tag from the list of tags
        //stored in the state of the autocomplete
        return <Tag value={el} removeTag={removeTag} index={i} />;
      })}
      {/* This is the input component along with the pop up of suggestions when the input is active, and we pass the suggestions,
      total set of selected tags, add and remove tag functions, input placeholder and input type as props to the input and suggestion List */}
      <div className="input__container col">
        <InputList
          type="text"
          suggestions={trie}
          placeholder={props.placeholder}
          addTag={addTag}
          removeTag={removeTag}
          tags={tags}
        />
      </div>
    </div>
  );
}
