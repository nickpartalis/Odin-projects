const DEFAULT_GRID_COLOR = "#d8d8d8";

const grid = document.querySelector("#grid-container");
const gridSlider = document.querySelector("#grid-slider");
const gridSize = document.querySelector("#grid-size");
const colorPicker = document.querySelector("#color-picker");
const clearBtn = document.querySelector("#clear");

let penColor = "#000000";
let penMode = "color";
let mouseIsDown = false;

// Event listeners
grid.addEventListener("mousedown", (e) => mouseIsDown = true);
grid.addEventListener("mouseup", () => mouseIsDown = false);

gridSlider.addEventListener("change", (e) => createNewGrid(e.target.value));
gridSlider.addEventListener("mousemove", (e) => {
    let size = e.target.value;
    gridSize.textContent = `${size} x ${size}`;
});

colorPicker.addEventListener("input", () => penColor = colorPicker.value);
clearBtn.addEventListener("click", () => createNewGrid(gridSlider.value));

const modes = ["color", "random", "eraser"]
for (const mode of modes) {
    const btn = document.getElementById(mode);
    btn.addEventListener("click", (e) => {
        penMode = mode;
        const activeMode = document.querySelector(".active")
        if (activeMode) activeMode.classList.remove("active");
        btn.classList.add("active");
    });
}

function createNewGrid(size) {
    grid.innerHTML = "";
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i=0; i<size**2; i++) {
        let item = document.createElement("div");
        item.className = "grid-item";
        item.setAttribute('draggable', 'false');
        item.addEventListener("mouseover", () => {
            if (mouseIsDown) colorItem(item);
        });
        item.addEventListener("mousedown", () => colorItem(item));
        grid.appendChild(item);
    }
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
}

function colorItem(item) {
    if (penMode == "color") item.style.backgroundColor = penColor;
    else if (penMode == "random") item.style.backgroundColor = getRandomColor();
    else if (penMode == "eraser") item.style.backgroundColor = DEFAULT_GRID_COLOR;
}

window.onload = () => {
    createNewGrid(32);
}