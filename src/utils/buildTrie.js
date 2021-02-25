import isNil from "lodash/isNil";

/**
 * This function processes any list and builds a trie out of it. the structure of the trie is as follows:
 * trie = {
 *    "some char": {
 *        ...
 *     },
 *     values: [ list of words that have the characters up to this level of the trie ]
 * }
 * This function is abstract so any list of strings can be processed into a trie
 * @param list type:array
 * @returns trie type:object
 */
export function buildTrie(list) {
  //instantiate trie object
  const trie = {};
  //loop through each word in the list
  for (var i = 0; i < list.length; i++) {
    //create a copy of the trie in tempTrie. We need this so that we can traverse the trie without worrying about changing it.
    var tempTrie = trie;
    //create a variable called item that is the current word in the list
    var item = list[i];
    //loop through each character in the item so we can add them to our trie
    for (var element in item) {
      //change characters to lowercase so that case does not affect the trie search
      var character = item[element].toLowerCase();
      //this checks if the characters exists in the current level of the trie.
      //if it does not exist (meaning the if statement computes to true) then the character gets added to the trie and the current item
      //in which this character was found gets added to the list of values for that character in the trie.
      if (isNil(tempTrie[character])) {
        tempTrie[character] = {
          values: [item],
        };
        //once the character has been added to the trie, we need to change our trie to the next level so that we can digest the subsequent
        //characters in the current item. Thats what the line below does, it makes our current trie the trie that was just created.
        tempTrie = tempTrie[character];
      }
      //this block executes if the character is already in the current trie
      else {
        //this if block checks to see if the item is already in the list of values, if not then add the item to the list of values
        //otherwise continue to the next level of the trie
        if (!tempTrie[character].values.includes(item)) {
          tempTrie[character].values.push(item);
        }
        tempTrie = tempTrie[character];
      }
    }
  }

  //return the constructued trie
  return trie;
}
