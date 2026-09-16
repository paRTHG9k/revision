const wordListName = 'Number 🔢';

const wordList = [
  "one","two","three","four","five",
  "six","seven","eight","nine","ten",
  "eleven","twelve","thirteen","fourteen","fifteen",
  "sixteen","seventeen","eighteen","nineteen","twenty"
];

function computeQuestionFromIndexAndWord(currentIndex, currentWord) {
  return `🔢 Number ${currentIndex + 1}`;
}