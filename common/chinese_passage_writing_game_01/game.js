
document.addEventListener("DOMContentLoaded", () => {
  document.title = `填字畫字遊戲`;
  document.body.insertAdjacentHTML(
    "beforeend",
    `

<div class="container">

    <h1>🌈 中文填字小達人 🌈</h1>

    <div class="progress">
        ⭐ 完成進度：
        <span id="starCount">0</span>
        /
        <span id="totalCount">0</span>
    </div>

    <div id="passage"></div>

    <div id="drawingPanel">

        <div class="selected-info">
            ✏️ 已選擇：
            <span id="selectedBlankText">請點選空格</span>
        </div>

        <div id="hintDisplay"></div>
        <canvas id="canvas" width="300" height="300"></canvas>

        <div class="buttons">
            <button id="hintBtn">💡 提示</button>
            <button id="clearBtn">🧽 重寫</button>
            <button id="saveBtn">✅ 儲存</button>
        </div>

    </div>

    <div id="message"></div>

</div>
      `
  );



  const BLANK_COUNT = 6;

  const passageDiv = document.getElementById("passage");
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");

  const clearBtn = document.getElementById("clearBtn");
  const saveBtn = document.getElementById("saveBtn");
  const hintBtn = document.getElementById("hintBtn");
  const hintDisplay = document.getElementById("hintDisplay");

  const selectedText =
    document.getElementById("selectedBlankText");

  const starCount =
    document.getElementById("starCount");

  const totalCount = document.getElementById("totalCount");

  let blanks = [];
  let selectedBlank = null;
  let drawing = false;

  initGame();

  function initGame() {

    let positions = [];
    let globalIndex = 0;

    passage.forEach(line => {

      [...line].forEach(char => {

        if (!'，。、！？；：「」『』（）,.!?'.includes(char)) {
          positions.push(globalIndex);
        }

        globalIndex++;
      });
    });

    shuffle(positions);

    const selectedPositions = positions.slice(0, BLANK_COUNT);

    totalCount.textContent = selectedPositions.length;

    let html = "";
    globalIndex = 0;

    passage.forEach(line => {

      [...line].forEach(char => {

        if (selectedPositions.includes(globalIndex)) {

          html += `
                <span class="blank"
                data-index="${blanks.length}">
                ?
                </span>
                `;

          blanks.push({
            answer: char,
            filled: false
          });

        } else {
          html += char;
        }

        globalIndex++;
      });

      html += "<br>";
    });

    passageDiv.innerHTML = html;

    bindBlankEvents();

    drawGrid();
  }

  function bindBlankEvents() {

    document
      .querySelectorAll(".blank")
      .forEach(blank => {

        blank.addEventListener("click", () => {

          document
            .querySelectorAll(".blank")
            .forEach(b => b.classList.remove("active"));

          blank.classList.add("active");

          selectedBlank =
            Number(blank.dataset.index);

          selectedText.textContent =
            `第 ${selectedBlank + 1} 個空格`;
        });

      });
  }

  function drawGrid() {

    ctx.clearRect(
      0, 0,
      canvas.width,
      canvas.height
    );

    ctx.strokeStyle = "#ddd";
    ctx.lineWidth = 1;

    ctx.beginPath();

    ctx.moveTo(
      canvas.width / 2,
      0
    );

    ctx.lineTo(
      canvas.width / 2,
      canvas.height
    );

    ctx.moveTo(
      0,
      canvas.height / 2
    );

    ctx.lineTo(
      canvas.width,
      canvas.height / 2
    );

    ctx.moveTo(
      0,
      0
    );

    ctx.lineTo(
      canvas.width,
      canvas.height
    );

    ctx.moveTo(
      canvas.width,
      0
    );

    ctx.lineTo(
      0,
      canvas.height
    );

    ctx.stroke();
  }

  function shuffle(arr) {

    for (let i = arr.length - 1; i > 0; i--) {

      const j =
        Math.floor(
          Math.random() * (i + 1)
        );

      [arr[i], arr[j]]
        =
        [arr[j], arr[i]];
    }
  }

  /* Drawing */

  canvas.addEventListener(
    "mousedown",
    startDraw
  );

  canvas.addEventListener(
    "mousemove",
    draw
  );

  canvas.addEventListener(
    "mouseup",
    stopDraw
  );

  canvas.addEventListener(
    "mouseleave",
    stopDraw
  );

  canvas.addEventListener(
    "touchstart",
    e => {
      e.preventDefault();
      startDraw(
        touchToMouse(e)
      );
    }
  );

  canvas.addEventListener(
    "touchmove",
    e => {
      e.preventDefault();
      draw(
        touchToMouse(e)
      );
    }
  );

  canvas.addEventListener(
    "touchend",
    stopDraw
  );

  function touchToMouse(e) {

    return {
      clientX: e.touches[0].clientX,
      clientY: e.touches[0].clientY
    };
  }

  function startDraw(e) {

    drawing = true;

    const rect =
      canvas.getBoundingClientRect();

    ctx.beginPath();

    ctx.moveTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );
  }

  function draw(e) {

    if (!drawing) return;

    const rect =
      canvas.getBoundingClientRect();

    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#333";

    ctx.lineTo(
      e.clientX - rect.left,
      e.clientY - rect.top
    );

    ctx.stroke();
  }

  function stopDraw() {

    drawing = false;
  }

  clearBtn.addEventListener(
    "click",
    () => {

      drawGrid();
    }
  );

  /* Hint */

  hintBtn.addEventListener(
    "click",
    () => {

      if (selectedBlank === null) {

        alert("請先選擇空格");
        return;
      }

      const answer =
        blanks[selectedBlank].answer;

      hintDisplay.textContent =
        answer;

      hintDisplay.style.display =
        "flex";

      setTimeout(() => {

        hintDisplay.style.display =
          "none";

      }, 3000);

    });

  /* Save */

  saveBtn.addEventListener(
    "click",
    () => {

      if (selectedBlank === null) {

        alert("請先選擇空格");
        return;
      }

      const target =
        document.querySelector(
          `.blank[data-index="${selectedBlank}"]`
        );

      const img =
        document.createElement("img");

      img.src =
        canvas.toDataURL();

      img.className =
        "filled-char";

      target.innerHTML = "";
      target.appendChild(img);

      blanks[selectedBlank].filled =
        true;

      updateStars();

      drawGrid();
    });

  function updateStars() {

    const completed =
      blanks.filter(
        b => b.filled
      ).length;

    starCount.textContent =
      completed;

    if (completed === blanks.length) {

      const message =
        document.getElementById(
          "message"
        );

      message.innerHTML =
        "🎉🌟 太棒了！你完成了所有生字！ 🌟🎉";

      message.classList.add(
        "success"
      );
    }
  }


});

