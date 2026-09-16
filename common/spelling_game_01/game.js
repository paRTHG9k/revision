let currentIndex = 0;
let currentWord = "";

let answer = "";
let selectedCells = [];

let gridData = [];
let gridSize = 0;

const synth = window.speechSynthesis;

function startGame() {
    currentIndex = 0;
    document.getElementById("gameArea").style.display = "block";
    loadQuestion();
}

function loadQuestion() {

    if (currentIndex >= wordList.length) {

        document.getElementById("question").innerHTML =
            "🎉 Congratulations!";

        document.getElementById("message").innerHTML =
            "You completed all wordList!";

        document.getElementById("grid").innerHTML = "";


        return;
    }

    currentWord = wordList[currentIndex];

    answer = "";
    selectedCells = [];

    document.getElementById("selected").textContent = "";
    document.getElementById("message").textContent = "";
    document.getElementById("retryPanel").style.display = "none";

    updateProgress();
    updateQuestion();

    generateGrid(currentWord);

    setTimeout(() => {
        speakCurrentWord();
    }, 300);
}

function updateProgress() {

    document.getElementById("progress").innerHTML =
        `📈 Progress: ${currentIndex + 1} / ${wordList.length}`;
}

function updateQuestion() {
    var question = computeQuestionFromIndexAndWord(currentIndex, currentWord);
    if (question != null) {
        document.getElementById("question").innerHTML = question;
    }
}

function speakCurrentWord() {
    speechSynthesis.cancel();
    
    const word = currentWord;

    setTimeout(() => {

        const utterance =
            new SpeechSynthesisUtterance(word);

        utterance.lang = "en-US";
        utterance.rate = 0.8;
        utterance.pitch = 1;

        speechSynthesis.speak(utterance);

    }, 150);
}

function clearSelection() {

    answer = "";
    selectedCells = [];

    document.querySelectorAll(".cell").forEach(c => {
        c.classList.remove("selected");
    });

    document.getElementById("selected").textContent = "";
}

function retryQuestion() {

    clearSelection();

    document.getElementById("retryPanel").style.display = "none";
    document.getElementById("message").textContent = "";
}

function giveUp() {

    document.getElementById("message").style.color = "#f44336";

    document.getElementById("message").innerHTML =
        `💡 Answer: <b>${currentWord.toUpperCase()}</b>`;

    document.getElementById("retryPanel").style.display = "none";

    setTimeout(() => {
        currentIndex++;
        loadQuestion();
    }, 2000);
}

function submitAnswer() {

    if (answer.toLowerCase() === currentWord.toLowerCase()) {

        document.getElementById("message").style.color =
            "#2e7d32";

        document.getElementById("message").innerHTML =
            "✅ Correct!";

        setTimeout(() => {
            currentIndex++;
            loadQuestion();
        }, 800);

    } else {

        document.getElementById("message").style.color =
            "#d32f2f";

        document.getElementById("message").innerHTML =
            `❌ Incorrect: ${answer.toUpperCase()}`;

        document.getElementById("retryPanel").style.display =
            "block";
    }
}

function randomLetter() {

    return String.fromCharCode(
        65 + Math.floor(Math.random() * 26)
    );
}

function generateGrid(word) {

    gridSize = Math.floor(Math.sqrt(word.length)) + 1;

    gridData = [];

    for (let r = 0; r < gridSize; r++) {

        gridData.push([]);

        for (let c = 0; c < gridSize; c++) {

            gridData[r][c] = "";
        }
    }

    const path = createWordPath(word.length);

    for (let i = 0; i < word.length; i++) {

        let pos = path[i];

        gridData[pos.r][pos.c] =
            word[i].toUpperCase();
    }

    for (let r = 0; r < gridSize; r++) {

        for (let c = 0; c < gridSize; c++) {

            if (gridData[r][c] === "") {

                gridData[r][c] = randomLetter();
            }
        }
    }

    renderGrid();
}

function createWordPath(length) {

    const edgeCells = [];

    for (let r = 0; r < gridSize; r++) {

        for (let c = 0; c < gridSize; c++) {

            if (
                r === 0 ||
                c === 0 ||
                r === gridSize - 1 ||
                c === gridSize - 1
            ) {
                edgeCells.push({ r, c });
            }
        }
    }

    const start =
        edgeCells[
        Math.floor(Math.random() * edgeCells.length)
        ];

    const path = [start];

    const used = new Set([
        `${start.r},${start.c}`
    ]);

    while (path.length < length) {

        const current = path[path.length - 1];

        const nextOptions = [];

        for (let dr = -1; dr <= 1; dr++) {

            for (let dc = -1; dc <= 1; dc++) {

                if (dr === 0 && dc === 0) continue;

                const nr = current.r + dr;
                const nc = current.c + dc;

                const key = `${nr},${nc}`;

                if (
                    nr >= 0 &&
                    nr < gridSize &&
                    nc >= 0 &&
                    nc < gridSize &&
                    !used.has(key)
                ) {
                    nextOptions.push({
                        r: nr,
                        c: nc
                    });
                }
            }
        }

        if (nextOptions.length === 0) {

            return createWordPath(length);
        }

        const next =
            nextOptions[
            Math.floor(Math.random() * nextOptions.length)
            ];

        path.push(next);

        used.add(`${next.r},${next.c}`);
    }

    return path;
}

function renderGrid() {

    const grid = document.getElementById("grid");

    grid.innerHTML = "";

    grid.style.gridTemplateColumns =
        `repeat(${gridSize}, 60px)`;

    for (let r = 0; r < gridSize; r++) {

        for (let c = 0; c < gridSize; c++) {

            const cell =
                document.createElement("div");

            cell.className = "cell";

            cell.textContent =
                gridData[r][c];

            cell.dataset.row = r;
            cell.dataset.col = c;

            cell.onclick = function(){

                const row = parseInt(cell.dataset.row);
                const col = parseInt(cell.dataset.col);
            
                const index = selectedCells.findIndex(
                    item => item.row === row && item.col === col
                );
            
                // Already selected -> unselect
                if(index >= 0){
            
                    selectedCells.splice(index, 1);
            
                    cell.classList.remove("selected");
            
                }else{
            
                    selectedCells.push({
                        row: row,
                        col: col,
                        letter: cell.textContent
                    });
            
                    cell.classList.add("selected");
                }
            
                rebuildAnswer();
            };

            grid.appendChild(cell);
        }
    }
}
    
function rebuildAnswer(){

    answer = "";

    selectedCells.forEach(item => {
        answer += item.letter.toLowerCase();
    });

    document.getElementById("selected").textContent =
        answer.toUpperCase();
}

document.addEventListener("DOMContentLoaded", () => {
    document.title = `Spelling game ${wordListName}`;
    document.body.insertAdjacentHTML(
        "beforeend",
        `

      <h1>Spelling game ${wordListName}</h1>
      
      <div id="gameArea">

          <div class="card">
              <div id="progress"></div>
          </div>

          <div class="card">
              <div id="question"></div>

            <button
                class="btn-blue"
                onclick="speakCurrentWord()">

                🔊 Play Word
            </button>

          </div>

          <div class="card">
              <div id="selected"></div>
              <div class="instructions">
                  Tap letters in any order to spell the word.
              </div>
          </div>

          <div id="grid"></div>

          <div>
              <button class="btn-green" onclick="submitAnswer()">
                  ✅ Submit
              </button>

              <button class="btn-orange" onclick="clearSelection()">
                  🧹 Clear
              </button>
          </div>

          <div id="message"></div>

          <div id="retryPanel">
              <button class="btn-blue" onclick="retryQuestion()">
                  🔄 Retry
              </button>

              <button class="btn-red" onclick="giveUp()">
                  🏳️ Give Up
              </button>
          </div>

      </div>
      `
    );

    startGame(wordList);
});