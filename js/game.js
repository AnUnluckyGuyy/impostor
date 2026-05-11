const mainDiv = document.querySelector(".container");

const players =
    JSON.parse(localStorage.getItem("formData")) || [];

const roles = selectImpostorAndJester(players);

const words = loadWords();
const wordAndHint = pickWordAndHint(words);

const word = wordAndHint["word"];
const hint = wordAndHint["hint"];

let currentPlayer = 0;

renderPlayerCard();

function renderPlayerCard() {
    mainDiv.innerHTML = "";

    if (currentPlayer >= players.length) {
        const done = document.createElement("h1");
        let index = getRandomIndex(players);
        done.textContent = `Quem começa é: ${players[index]} `;
        mainDiv.appendChild(done);
        return;
    }

    const player = players[currentPlayer];
    const role = roles[currentPlayer];

    const name = document.createElement("h2");
    name.textContent = player;

    const card = document.createElement("div");
    card.className = "card";

    const front = document.createElement("div");
    front.className = "front";
    front.textContent = "Segure para revelar...";

    const back = document.createElement("div");
    back.className = "back";

    let content = "";

    if (role === "impostor") {
        content = `IMPOSTOR
Dica: ${hint}`;
    } else if (role === "jester") {
        content = `PALHAÇO
Palavra: ${word}`;
    } else {
        content = `INOCENTE
Palavra: ${word}`;
    }

    back.textContent = content;

    card.appendChild(front);
    card.appendChild(back);

    // Desktop hold
    card.addEventListener("mousedown", () => {
        card.classList.add("flipped");
    });

    card.addEventListener("mouseup", () => {
        card.classList.remove("flipped");
    });

    card.addEventListener("mouseleave", () => {
        card.classList.remove("flipped");
    });

    // Mobile hold
    card.addEventListener("touchstart", () => {
        card.classList.add("flipped");
    });

    card.addEventListener("touchend", () => {
        card.classList.remove("flipped");
    });

    const buttonNext = document.createElement("button");
    buttonNext.textContent = "Passar >>>";

    buttonNext.onclick = function () {
        currentPlayer++;
        renderPlayerCard();
    };

    mainDiv.appendChild(name);
    mainDiv.appendChild(card);
    mainDiv.appendChild(buttonNext);
}

function selectImpostorAndJester(players) {
    const min = 0;
    const max = players.length - 1;

    const impostorIndex =
        Math.floor(Math.random() * (max - min + 1)) + min;

    let jesterIndex =
        Math.floor(Math.random() * (max - min + 1)) + min;

    while (impostorIndex === jesterIndex) {
        jesterIndex =
            Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const roles = [];

    for (let i = 0; i < players.length; i++) {
        if (i === impostorIndex) {
            roles.push("impostor");
        } else if (i === jesterIndex) {
            roles.push("jester");
        } else {
            roles.push("innocent");
        }
    }

    return roles;
}

function getRandomIndex(players) {
    const min = 0;
    const max = players.length - 1;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loadWords() {
    let response = fetch("database/words.json");

    let words = response.json();
    return words;
}

function pickWordAndHint(words) {
    let i = getRandomIndex(words);
    
    let entry = words[i];
    let word = entry["word"];
    let hintIndex = getRandomIndex(entry["hints"]);
    let hint = entry["hints"][hintIndex];

    return {"word": word, "hint": hint};
}