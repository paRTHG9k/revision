

document.addEventListener("DOMContentLoaded", () => {
    document.title = `Spell by Phonics`;
    document.body.insertAdjacentHTML(
        "beforeend",
        `
      <h1>${wordListName}</h1>

      <div class="legend">
          <span class="magic">Magic E</span>
          <span class="short-vowel">Short Vowel</span>
          <span class="vowel-team">Vowel Team</span>
          <span class="blend">Blend</span>
          <span class="digraph">Digraph</span>
          <span class="suffix">Suffix</span>
      </div>
      
      <div id="container"></div>
    `
    );
    // ========================================




    const container = document.getElementById("container");

    sections.forEach(section => {

        const sectionDiv = document.createElement("div");
        sectionDiv.className = "section";

        sectionDiv.innerHTML = `
            <div class="section-title">
                ${section.title}
            </div>
        `;

        section.items.forEach(item => {

            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <div class="sentence">
                    ${item.sentence}
                </div>
            `;

            item.words.forEach(word => {

                const wordDiv = document.createElement("div");
                wordDiv.className = "word";

                const wordTitle = document.createElement("div");
                wordTitle.className = "word-name";
                wordTitle.textContent = word.text;

                const phonics = document.createElement("div");
                phonics.className = "phonics-row";

                word.chunks.forEach(chunk => {

                    const span = document.createElement("span");

                    span.className =
                        `chunk ${chunk.type || 'default'}`;

                    span.textContent = chunk.text;

                    if (chunk.silent) {
                        span.classList.add("silent");
                    }

                    if (chunk.group) {
                        span.dataset.group = chunk.group;
                    }

                    phonics.appendChild(span);

                });

                wordDiv.appendChild(wordTitle);
                wordDiv.appendChild(phonics);

                card.appendChild(wordDiv);

                setTimeout(() => {
                    drawMagicBrackets(phonics);
                }, 0);

            });

            sectionDiv.appendChild(card);

        });

        container.appendChild(sectionDiv);

    });

    function drawMagicBrackets(container) {

        const groups = {};

        container.querySelectorAll("[data-group]").forEach(el => {

            const g = el.dataset.group;

            groups[g] = groups[g] || [];

            groups[g].push(el);

        });

        Object.values(groups).forEach(items => {

            if (items.length !== 2) return;

            const start = items[0];
            const end = items[1];

            const parent = container.getBoundingClientRect();

            const s = start.getBoundingClientRect();
            const e = end.getBoundingClientRect();

            const left =
                s.left - parent.left + s.width / 2;

            const right =
                e.left - parent.left + e.width / 2;

            const bracket = document.createElement("div");
            bracket.className = "magic-bracket";

            bracket.style.left = left + "px";
            bracket.style.width = (right - left) + "px";
            bracket.style.top = "36px";

            container.appendChild(bracket);

            const label = document.createElement("div");

            label.className = "magic-label";

            label.style.left =
                (left + right) / 2 - 15 + "px";

            label.style.top = "55px";

            label.innerText = "a_e";

            container.appendChild(label);

        });

    }
});

