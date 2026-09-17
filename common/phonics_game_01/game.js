document.addEventListener("DOMContentLoaded", () => {
  document.title = `Spell by Phonics Game`;
  document.body.insertAdjacentHTML(
    "beforeend",
    `
      <div class="game-card">

      <h1>📖 Phonics Builder</h1>
      
      <div class="legend">
          <span class="magic">Magic E</span>
          <span class="short-vowel">Short Vowel</span>
          <span class="vowel-team">Vowel Team</span>
          <span class="blend">Blend</span>
          <span class="digraph">Digraph</span>
      </div>
      
      <div id="sectionName" class="section"></div>
      <div id="targetWord" class="word"></div>
      
      <div id="slots" class="slots"></div>
      <div id="pool" class="pool"></div>
      
      <div class="controls">
          <button class="check-btn" onclick="checkAnswer()">✅ Check</button>
          <button class="reset-btn" onclick="loadQuestion()">🔄 Reset</button>
          <button class="next-btn" onclick="nextQuestion()">➡ Next</button>
      </div>
      
      <div id="message" class="message"></div>
      
      </div>
  `
  );

  loadQuestion();
});

// ========================================


const dummyPieces = [
  { text: "oa", type: "vowel-team" },
  { text: "ee", type: "vowel-team" },
  { text: "sh", type: "digraph" },
  { text: "th", type: "digraph" },
  { text: "ch", type: "digraph" },
  { text: "tr", type: "blend" },
  { text: "st", type: "blend" }
];


let currentQuestion = 0;
let selectedPiece = null;

const questionCount =
  Number(
    prompt(
      "How many words?",
      "10"
    )
  ) || 10;

let questions =
  selectRandomQuestions(
    sections,
    questionCount
  );

function buildQuestionPool(sections) {
  const questions=[];
  sections.forEach(section => {
    section.items.forEach(item => {
      item.words.forEach(word => {
        let answer=[];

        word.chunks.forEach(chunk=>{
          if(chunk.magicFill){
            answer.push(chunk.magicFill[0]);
          }else{
            answer.push(chunk.text);
          }});

        questions.push({
          section: section.title,
          word: word.text,
          chunks: word.chunks, 
          answer:answer
        });
      });
    });
  });

  return questions;
}

function selectRandomQuestions(
  sections,
  count = 10
) {

  const allQuestions =
    buildQuestionPool(sections);

  const shuffled =
    [...allQuestions]
      .sort(() => Math.random() - 0.5);

  return shuffled.slice(
    0,
    Math.min(count, allQuestions.length)
  );
}

function loadQuestion() {

  selectedPiece = null;

  const q = questions[currentQuestion];

  document.getElementById("sectionName").innerText =
    "📚 " + q.section;

  document.getElementById("targetWord").innerText =
    q.word;

  document.getElementById("message").innerText = "";

  createSlots(q);
  createPieces(q);
}

function createSlots(q) {

  const slots = document.getElementById("slots");

  slots.innerHTML = "";

  q.answer.forEach((x, index) => {

    const slot = document.createElement("div");

    slot.className = "slot";
    slot.dataset.index = index;

    slot.onclick = function () {

      if (!selectedPiece) return;

      const allSlots =
        document.querySelectorAll(".slot");

      if (selectedPiece.dataset.magic) {

        const start =
          Number(this.dataset.index);

        const offset =
          Number(selectedPiece.dataset.offset);

        if (start + offset >= allSlots.length) {
          return;
        }

        const parts =
          selectedPiece.dataset.magic.split(",");

        allSlots[start].innerText = parts[0];
        allSlots[start].dataset.value = parts[0];

        allSlots[start + offset].innerText = parts[1];
        allSlots[start + offset].dataset.value = parts[1];

      } else {

        this.innerText =
          selectedPiece.dataset.value;

        this.dataset.value =
          selectedPiece.dataset.value;
      }

      selectedPiece.remove();
      selectedPiece = null;

      document
        .querySelectorAll(".piece")
        .forEach(p => p.classList.remove("selected"));
    };

    slots.appendChild(slot);

  });

}

function createPieces(q) {

  const pool =
    document.getElementById("pool");

  pool.innerHTML = "";

  let pieces = [...q.chunks];

  while (pieces.length < q.chunks.length + 4) {

    pieces.push(
      dummyPieces[
      Math.floor(
        Math.random() * dummyPieces.length
      )
      ]
    );
  }

  pieces.sort(() => Math.random() - 0.5);

  pieces.forEach(chunk => {

    const piece =
      document.createElement("div");

    piece.className =
      `piece ${chunk.type || "default"}`;

    piece.innerText =
      chunk.text;

    piece.dataset.value =
      chunk.text;

    if (chunk.magicFill) {

      piece.dataset.magic =
        chunk.magicFill.join(",");

      piece.dataset.offset =
        chunk.slotOffset || 2;
    }

    piece.onclick = function () {

      document
        .querySelectorAll(".piece")
        .forEach(p => p.classList.remove("selected"));

      selectedPiece = this;

      this.classList.add("selected");
    };

    pool.appendChild(piece);

  });

}

function checkAnswer() {

  const q =
    questions[currentQuestion];

  const slots =
    document.querySelectorAll(".slot");

  let correct = true;

  slots.forEach((slot, index) => {

    if (slot.dataset.value === q.answer[index]) {

      slot.classList.add("correct");
      slot.classList.remove("wrong");

    } else {

      slot.classList.add("wrong");
      slot.classList.remove("correct");

      correct = false;
    }

  });

  document.getElementById("message").innerText =
    correct ? "🎉 Great Job!" : "❌ Try Again";
}

function nextQuestion() {

  currentQuestion++;

  if (currentQuestion >= questions.length) {
    currentQuestion = 0;
  }

  loadQuestion();
}