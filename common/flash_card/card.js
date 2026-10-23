document.addEventListener("DOMContentLoaded", () => {
    document.title = `Flash Card`;
    const fontHtml = `
        <!-- Google Font -->
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC&family=Short+Stack&display=swap" rel="stylesheet">

        
    `;

    document.head.insertAdjacentHTML('beforeend', fontHtml);


    document.body.className = 'bg-slate-50 text-slate-800 min-h-screen flex flex-col justify-between font-sans selection:bg-indigo-100';
    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <!-- Header / Controls Bar -->
      <header class="bg-white shadow-sm px-4 py-3 sticky top-0 z-10">
          <div class="max-w-md mx-auto flex flex-col gap-3">
              <div class="flex items-center justify-between">
                  <h1 class="text-lg font-bold text-indigo-600 flex items-center gap-2">
                      📇 Word Cards
                  </h1>
              </div>
  
              <!-- Selectors Grid -->
              <div class="grid grid-cols-2 gap-2">
                  <div>
                      <label class="block text-[11px] font-medium text-slate-500 mb-1">Word List</label>
                      <select id="listSelect" class="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                          <option value="">-- Select List --</option>
                      </select>
                  </div>
                  <div>
                      <label class="block text-[11px] font-medium text-slate-500 mb-1">Display Mode</label>
                      <select id="modeSelect" class="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none">
                          <option value="normal">Normal Order</option>
                          <option value="random">Random Order</option>
                      </select>
                  </div>
              </div>
          </div>
      </header>
  
      <!-- Main Card Area -->
      <main class="flex-1 flex flex-col items-center justify-center p-4 max-w-md mx-auto w-full">
          <!-- Progress Bar & Counter -->
          <div class="w-full flex justify-between items-center text-xs text-slate-500 mb-2 font-medium px-1">
              <span id="cardCounter">Card 0 of 0</span>
              <span id="currentListName" class="truncate max-w-[200px]">No list selected</span>
          </div>
          <div class="w-full bg-slate-200 h-1.5 rounded-full mb-4 overflow-hidden">
              <div id="progressBar" class="bg-indigo-600 h-full w-0 transition-all duration-300"></div>
          </div>
  
          <!-- Single Card Container (No Flip) -->
          <div class="w-full h-72 bg-white border border-slate-200 rounded-2xl p-6 shadow-xl flex flex-col justify-between select-none">
              <div class="flex justify-between items-center text-xs text-indigo-500 font-semibold uppercase tracking-wider">
                  <span>Word</span>
              </div>
              <div class="flex-1 flex items-center justify-center text-center">
                  <p id="cardText" class="text-6xl sm:text-6xl font-bold text-slate-800 break-words max-w-full">
                      Select a list
                  </p>
              </div>
              <div class="text-center text-xs text-slate-400">
                  Use arrow keys or buttons to navigate
              </div>
          </div>
  
          <!-- Navigation Buttons -->
          <div class="w-full grid grid-cols-2 gap-3 mt-6">
              <button id="prevBtn" class="bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-medium py-3 px-4 rounded-xl shadow-sm transition active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-sm">
                  ◀ Prev
              </button>
              <button id="nextBtn" class="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl shadow-md transition active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-sm">
                  Next ▶
              </button>
          </div>
      </main>
  
      <!-- Footer -->
      <footer class="text-center py-4 text-xs text-slate-400">
          Local Word Cards App • 100% Offline
      </footer>
    `
    );
    
    // ========================================
    let currentCards = [];      // Parsed words for active list
    let displayIndices = [];    // Order mapping
    let currentIndex = 0;

    const listSelect = document.getElementById('listSelect');
    const modeSelect = document.getElementById('modeSelect');
    const cardText = document.getElementById('cardText');
    const cardCounter = document.getElementById('cardCounter');
    const currentListName = document.getElementById('currentListName');
    const progressBar = document.getElementById('progressBar');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    // Populate dropdown from word_list_dict in word_list.js
    function initDropdown() {
        listSelect.innerHTML = '<option value="">-- Select List --</option>';
        if (typeof word_list_dict !== 'undefined') {
            for (let key in word_list_dict) {
                const opt = document.createElement('option');
                opt.value = key;
                opt.textContent = key;
                listSelect.appendChild(opt);
            }
        } else {
            alert("Error: word_list.js could not be loaded!");
        }
    }
    initDropdown();

    // Parse multiline text string into simple word array
    function parseWordList(text) {
        const lines = text.split(/\r?\n/);
        const cards = [];
        for (let line of lines) {
            line = line.trim();
            if (line) {
                cards.push(line);
            }
        }
        return cards;
    }

    // Shuffle helper (Fisher-Yates)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function loadSelectedList(key) {
        if (!key || !word_list_dict[key]) return;
        currentCards = parseWordList(word_list_dict[key]);
        currentListName.textContent = key;
        initSession();
    }

    listSelect.addEventListener('change', (e) => {
        loadSelectedList(e.target.value);
    });

    modeSelect.addEventListener('change', () => {
        if (currentCards.length > 0) {
            initSession();
        }
    });

    function initSession() {
        displayIndices = currentCards.map((_, i) => i);
        if (modeSelect.value === 'random') {
            shuffleArray(displayIndices);
        }
        currentIndex = 0;
        updateCardDisplay();
    }

    function updateCardDisplay() {
        if (currentCards.length === 0) {
            cardText.textContent = "No words available";
            cardCounter.textContent = "Card 0 of 0";
            progressBar.style.width = "0%";
            prevBtn.disabled = true;
            nextBtn.disabled = true;
            return;
        }

        const cardIndex = displayIndices[currentIndex];
        cardText.textContent = currentCards[cardIndex];

        cardCounter.textContent = `Card ${currentIndex + 1} of ${currentCards.length}`;
        const progress = ((currentIndex + 1) / currentCards.length) * 100;
        progressBar.style.width = `${progress}%`;

        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === currentCards.length - 1;
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCardDisplay();
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < currentCards.length - 1) {
            currentIndex++;
            updateCardDisplay();
        }
    });

    // Keyboard shortcuts support (Left/Right arrow keys to navigate)
    document.addEventListener('keydown', (e) => {
        if (e.code === 'ArrowRight' && currentIndex < currentCards.length - 1) {
            currentIndex++;
            updateCardDisplay();
        } else if (e.code === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            updateCardDisplay();
        }
    });

    // Automatically load the first list on startup
    const firstKey = Object.keys(word_list_dict)[0];
    if (firstKey) {
        listSelect.value = firstKey;
        loadSelectedList(firstKey);
    }
    
  });