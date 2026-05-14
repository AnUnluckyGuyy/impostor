const mainDiv = document.querySelector(".container");

const players =
    JSON.parse(localStorage.getItem("formData")) || [];

const roles = selectImpostorAndJester(players);

let currentPlayer = 0;

let word = "";
let hint = "";

startGame();

async function startGame() {
    const words = await loadWords();

    const wordAndHint = pickWordAndHint(words);

    word = wordAndHint.word;
    hint = wordAndHint.hint;

    renderPlayerCard();
}

function revealWords() {
    
}

function renderPlayerCard() {
    mainDiv.innerHTML = "";

    if (currentPlayer >= players.length) {
        const done = document.createElement("h1");

        const index = getRandomIndex(players);

        done.textContent =
            `Quem começa é: ${players[index]}`;
        done.style.color = "white";
        
        // reveal button 
        const buttonReveal = document.createElement("button");
        buttonReveal.textContent = "Revelar";
        buttonReveal.onclick = function () {
            while (mainDiv.firstElementChild) {
                mainDiv.firstElementChild.remove();
            }
            
            const revealScreen = document.createElement("p");
            revealScreen.textContent = `A palavra era: ${word}\n
            O impostor era: ${players[roles.indexOf("impostor")]}\n
            O palhaço era: ${players[roles.indexOf("jester")]}\n
            A dica era: ${hint}`;
            revealScreen.style.whiteSpace = "pre-line";
            revealScreen.style.color = "white";
            mainDiv.appendChild(revealScreen);
        };

        mainDiv.appendChild(done);
        mainDiv.appendChild(buttonReveal);
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
    front.textContent = `${player}`;

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

function getRandomIndex(array) {
    const min = 0;
    const max = array.length - 1;

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function loadWords() {
    const response =
        await fetch("./database/words.json");
    console.log(response);

    const words =
        await response.json();
    console.log(response);

    return words;
}

function pickWordAndHint(words) {
    const i = getRandomIndex(words);

    const entry = words[i];

    const word = entry.word;

    const hintIndex =
        getRandomIndex(entry.hints);

    const hint =
        entry.hints[hintIndex];

    return {
        word: word,
        hint: hint
    };
}