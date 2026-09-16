const wordListName = 'Month 📅'; 

const wordList = [
  "january","february","march","april",
  "may","june","july","august",
  "september","october","november","december"
];

function computeQuestionFromIndexAndWord(currentIndex, wcurrentWordord) {
  return `📅 Month ${currentIndex + 1}`;
}