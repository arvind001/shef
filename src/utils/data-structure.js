import isNil from "lodash/isNil";

export function buildTrie(list) {
  const trie = {};
  for (var i = 0; i < list.length; i++) {
    var tempTrie = trie;
    var item = list[i];
    for (var element in item) {
      var character = item[element].toLowerCase();
      if (isNil(tempTrie[character])) {
        tempTrie[character] = {
          values: [item],
        };
        tempTrie = tempTrie[character];
      } else {
        if (!tempTrie[character].values.includes(item)) {
          tempTrie[character].values.push(item);
        }
        tempTrie = tempTrie[character];
      }
    }
  }
  return trie;
}
