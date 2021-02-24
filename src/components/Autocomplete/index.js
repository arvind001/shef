import React, { useState, useEffect } from "react";
import Tag from "../Tag/index";
import InputList from "../InputList/index";
import { buildTrie } from "../../utils/buildTrie";
import { spices } from "../../constants/spices";
import cloneDeep from "lodash/cloneDeep";
import "./style.css";

export default function Autocomplete(props) {
  const [tags, setTags] = useState([]);
  const [spicesTrie, setSpicesTrie] = useState({});

  useEffect(() => {
    var trie = buildTrie(spices);
    setSpicesTrie(trie);
  }, []);

  const addTag = (event, tag) => {
    var newTags = cloneDeep(tags);
    newTags.push(tag);
    setTags(newTags);
    event.stopPropagation();
  };

  const removeTag = (tag) => {
    var newTags = cloneDeep(tags);
    const index = newTags.indexOf(tag);
    if (index > -1) {
      newTags.splice(index, 1);
      setTags(newTags);
    }
  };

  return (
    <div className="autocomplete__container row">
      {/* <div className="tags__container row">
        
      </div> */}
      {tags.map((el) => {
        return <Tag value={el} removeTag={removeTag} />;
      })}
      <div className="input__container col">
        <InputList
          type="text"
          suggestions={spicesTrie}
          placeholder={props.placeholder}
          addTag={addTag}
          removeTag={removeTag}
          tags={tags}
        />
      </div>
    </div>
  );
}
