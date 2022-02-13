function cleanInput(query) {
  let words = query.split(" ");
  let newJoin = [];
  words.forEach((word) => {
    newWord = word[0].toUpperCase() + word.substr(1);
    newJoin.push(newWord);
  });
  const newQuery = newJoin.join(" ");
  return newQuery;
}

module.exports = cleanInput;
