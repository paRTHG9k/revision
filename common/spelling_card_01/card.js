document.addEventListener("DOMContentLoaded", () => {
  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div id="cardTemplate" class="card" style="display:none">
      <div class="cardBorder">
        <div class="letter"></div>
        <div class="info">${wordListName}</div>
      </div>
    </div>

    <div id="cardContainer"></div>
  `
  );
  
  // ========================================
  const template = document.getElementById("cardTemplate");
  const container = document.getElementById("cardContainer");
  
  // 1. Find maximum letter count needed in any sentence
  const maxCounts = {};
  
  sentenceList.forEach(sentence => {
      const chars = sentence.toLowerCase().match(/[a-z]/g);
      if (!chars) return;
  
      const counts = {};
  
      chars.forEach(char => {
          counts[char] = (counts[char] || 0) + 1;
      });
  
      Object.entries(counts).forEach(([char, count]) => {
          maxCounts[char] = Math.max(maxCounts[char] || 0, count);
      });
  });
  
  // 2. Expand into card list
  const cardLetters = [];
  
  Object.entries(maxCounts).forEach(([char, count]) => {
      for (let i = 0; i < count; i++) {
          cardLetters.push(char);
      }
  });
  
  // 3. Sort alphabetically
  cardLetters.sort();
  
  const CARDS_PER_ROW = 4;
  const ROWS_PER_PAGE = 3;
  const CARDS_PER_PAGE = CARDS_PER_ROW * ROWS_PER_PAGE;
  
  let pageDiv;
  let rowDiv;
  
  cardLetters.forEach((char, index) => {
  
      // New page every 12 cards
      if (index % CARDS_PER_PAGE === 0) {
          pageDiv = document.createElement("div");
          pageDiv.className = "page";
          container.appendChild(pageDiv);
      }
  
      // New row every 4 cards
      if (index % CARDS_PER_ROW === 0) {
          rowDiv = document.createElement("div");
          rowDiv.className = "row";
          pageDiv.appendChild(rowDiv);
      }
  
      const card = template.cloneNode(true);
  
      card.removeAttribute("id");
      card.style.display = "";
  
      // First child div
      card.children[0].children[0].textContent = char.toUpperCase();
  
      rowDiv.appendChild(card);
  });
});