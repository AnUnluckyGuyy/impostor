let count = 1;
const startingCount = 3;
const playerField = document.getElementById("player-field");

while (count <= startingCount) {
    const label = document.createElement("label");
    label.textContent = "Player " + count;

    const input = document.createElement("input");
    input.type = "text";

    const div = document.createElement("div");
    div.className = "field";
    div.appendChild(label);
    div.appendChild(input);
    playerField.appendChild(div);
    count++;
}

const addButton = document.getElementById("add");
addButton.onclick = function () {
    const label = document.createElement("label");
    label.textContent = "Player " + count;

    const input = document.createElement("input");
    input.type = "text";

    const div = document.createElement("div");
    div.className = "field";
    div.appendChild(label);
    div.appendChild(input);
    playerField.appendChild(div);
    count++;
};

const confirmButton = document.getElementById("confirm");
confirmButton.onclick = function () {
    const inputs = document.querySelectorAll("input");

    const values = Array.from(inputs).map(i => i.value);

    localStorage.setItem("formData", JSON.stringify(values));

    window.location.href = "game.html";
};