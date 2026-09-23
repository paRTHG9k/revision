document.addEventListener("DOMContentLoaded", () => {
  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div id="container"></div>
  `
  );
  
  // ========================================
  generateGrid(wordList, colsPerPage, rowsPerPage);
});


const colsPerPage = 4;
const rowsPerPage = 4;

function generateGrid(words, cols, rows) {
  const container = document.getElementById("container");
  container.innerHTML = "";

  const maxCellsPerPaper = cols * rows;
  const totalPapers = Math.ceil(words.length / maxCellsPerPaper);

  for (let p = 0; p < totalPapers; p++) {
    const paper = document.createElement("div");
    paper.className = "paper paper-a4-landscape";

    const startIndex = p * maxCellsPerPaper;
    const endIndex = startIndex + maxCellsPerPaper;
    const pageWords = words.slice(startIndex, endIndex);

    for (let r = 0; r < rows; r++) {
      const rowDiv = document.createElement("div");
      rowDiv.className = "row";

      for (let c = 0; c < cols; c++) {
        const index = r * cols + c;
        if (index < pageWords.length) {
          const card = document.createElement("div");
          card.className = "card";

          const span1 = document.createElement("span");
          span1.className = "span1";
          span1.textContent = pageWords[index];
          card.appendChild(span1);

          const span2 = document.createElement("span");
          span2.className = "span2";
          span2.textContent = wordListName + ' (' + (startIndex + index + 1) + ')';
          card.appendChild(span2);

          rowDiv.appendChild(card);
        }
      }

      paper.appendChild(rowDiv);
    }

    container.appendChild(paper);
  }
}