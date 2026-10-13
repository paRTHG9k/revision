  document.addEventListener("DOMContentLoaded", () => {const fontHtml = `
    <!-- Google Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+HK:wght@200..900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=LXGW+WenKai+Mono+TC&family=Short+Stack&display=swap" rel="stylesheet">

    
  `;

  document.head.insertAdjacentHTML('beforeend', fontHtml);
  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div id="container" class="page"></div>
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
          if (typeof isChinese !== 'undefined' && isChinese) {
            span1.className = span1.className + " span1-chin";
          }
          span1.textContent = pageWords[index];
          card.appendChild(span1);

          const span2 = document.createElement("span");
          span2.className = "span2";
          if (typeof isChinese !== 'undefined' && isChinese) {
            span2.className = span2.className + " span2-chin";
          }
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