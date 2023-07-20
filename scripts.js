const SIZE = 500;
const DEFAULT_COUNT = 16;
const DEFAULT_CANVAS_SIZE = SIZE/DEFAULT_COUNT;
let color = "#5cad23";
let rainbow = true;
let erase = false;
let currentCount = DEFAULT_COUNT;

const container = document.querySelector('.container');
container.style.width = `${SIZE}px`;
container.style.height = `${SIZE}px`;

function generateCanvas(canvasSize = DEFAULT_COUNT) {
    container.replaceChildren();
    let cellSize = SIZE/canvasSize;

    for (let x = 0; x < canvasSize; x++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let y = 0; y < canvasSize; y++) {
            const div = document.createElement('div');
            div.classList.add('cell');
            div.style.height = `${cellSize}px`;
            div.style.width = `${cellSize}px`;
            div.style.borderRadius = '15%';
            row.appendChild(div);
        }
        container.appendChild(row);
    }

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.addEventListener('mouseover', () => {
        if (rainbow) {
            cell.style.backgroundColor = getRandomRgb();
        } else if (erase) {
            cell.style.backgroundColor = '#fefefe';
        } else {
            cell.style.backgroundColor = color;
        }
    }));
}

const rangeInput = document.getElementById('range');
const rangeValueDisplay = document.getElementById('rangeValue');

rangeInput.addEventListener('input', () => {
  currentCount = rangeInput.value;
  rangeValueDisplay.textContent = `${currentCount}x${currentCount}`;
});

rangeInput.addEventListener('mouseup', () => {
    generateCanvas(currentCount);
  });

function getRandomRgb() {
    const r = Math.floor(Math.random() * 256); 
    const g = Math.floor(Math.random() * 256); 
    const b = Math.floor(Math.random() * 256); 
    return `rgb(${r}, ${g}, ${b})`;
}

const colorPicker = document.getElementById('colorPicker');

colorPicker.addEventListener('input', () => {
  color = colorPicker.value;
  buttons.forEach(btn => btn.classList.remove('clicked'));
  document.querySelector('.color').click();
});

const blackButton = document.querySelector('.color');
blackButton.addEventListener('click', () => {
    rainbow = false;
    erase = false;
});

const rainbowButton = document.querySelector('.rainbow');
rainbowButton.addEventListener('click', () => {
    rainbow = true;
    erase = false;
});

const resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', () => {
    generateCanvas(currentCount);    
});

const eraseButton = document.querySelector('.erase');
eraseButton.addEventListener('click', () => {
    erase = true;
    rainbow = false;  
});

const buttons = document.querySelectorAll('.styled');
buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('clicked'));
      button.classList.add('clicked');
    });
  });

generateCanvas(DEFAULT_COUNT);