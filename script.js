/* Global Variables */
let mouseDown = false;
let drawMode = true;
let eraserMode = false;
let rainbowMode = false;
let isPressing = false;
let drawColor = "black";
let backgroundColor = "white";

/* End Global Variables */


/* Update Grid */
function addGrids(numRows=16) {
  const gridContainer = document.querySelector('#drawing-grid-container');
  gridContainer.style.cssText = `grid-template-columns: repeat(${numRows}, 1fr);
                                 grid-template-rows: repeat(${numRows}, 1fr);`;
  const numGrids = numRows**2;
  let gridElements = [];
  
  for (let i = 0; i < numGrids; i++) {
    const newGridElement = document.createElement('div');
    newGridElement.setAttribute('class', 'grid-item');
    newGridElement.addEventListener('mousedown', updateGridItem);
    newGridElement.addEventListener('mouseover', checkIfCanFill);
    newGridElement.style.backgroundColor = backgroundColor;
    gridElements.push(newGridElement);
  }

  gridContainer.append(...gridElements);
}

function clearGrid() {
  const gridContainer = document.querySelector('#drawing-grid-container');
  gridContainer.textContent = '';
}
/* End Update Grid*/


/* Grid fill */
function checkIfCanFill(e) {
  if (mouseDown) {
    updateGridItem(e);
  }
}

function updateGridItem(e) {
  e.preventDefault(); // To prevent dragging
  if (eraserMode) {
    e.target.style.backgroundColor = backgroundColor;
    if (e.target.classList.contains('drawn'))
      e.target.classList.toggle('drawn'); 
  }
  else if (rainbowMode) {
    e.target.style.backgroundColor = getRandomColor();
    if (!e.target.classList.contains('drawn'))
      e.target.classList.toggle('drawn');
  }
  else {
    e.target.style.background = drawColor;
    if (!e.target.classList.contains('drawn'))
      e.target.classList.toggle('drawn');
  }
}

function getRandomColor() {
  const toChooseFrom = "0123456789ABCDEF"; // All hex possibilities
  const maxOptions = toChooseFrom.length;
  const maxHexCharacters = 6;
  let color = "#";
  for (let i = 0; i < maxHexCharacters; i++) {
    let randomChoice = Math.floor(Math.random() * maxOptions);
    color += toChooseFrom[randomChoice];
  }
  document.documentElement.style.setProperty('--rainbow-color', color);
  return color;
}
/* End Grid Fill */


/* Update Grid Size */
function updateGridSizeDisplay() {
  const gridSizeDisplay = this.previousElementSibling;
  const inputValue = this.value;

  gridSizeDisplay.textContent = `Grid Size: ${inputValue}x${inputValue}`
}
/* End Update Grid Size*/



/* IIFE to add listeners and grid */
(function() {
  const gridSlider = document.querySelector(".grid-slider");
  const colorPicker = document.querySelector(`.color-setting input[type="color"]`);
  const backgroundColorPicker = document.querySelector(`.background-setting input[type="color"]`)
  const eraserBox = document.querySelector(`.eraser .checkbox`);
  const rainbowBox = document.querySelector(`.rainbow-setting .checkbox`);
  const drawBox = document.querySelector(`.draw-mode .checkbox`);
  
  function setMouseDown() {
    mouseDown = true;
  }

  function setMouseUp() {
    mouseDown = false;
    isPressing = false;
  }

  function updateDrawingArea() {
    clearGrid();
    addGrids(this.value);
  }

  function updateColor() {
    drawColor = this.value;
    document.documentElement.style.setProperty('--hex-base', drawColor);

    // Convert from hex to rgb
    const tempElement = document.createElement('div');
    tempElement.style.backgroundColor = drawColor;
    const backgroundColorRGB = tempElement.style.backgroundColor;

    // ex: (120, 50, 20) --> [120, 50, 20]
    const colorParts = backgroundColorRGB.match(/\d+/g).map(Number);
    const [r, g, b] = colorParts;

    // https://stackoverflow.com/questions/596216/formula-to-determine-perceived-brightness-of-rgb-color
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    const textColor = luminance > 0.5 ? 'black' : 'white';

    document.documentElement.style.setProperty('--text-color', textColor);
  }

  function updateBackgroundColor() {
    backgroundColor = this.value;

    const gridItems = document.querySelectorAll('.grid-item');
    gridItems.forEach(item => {
      if (!item.classList.contains('drawn')) {
        item.style.backgroundColor = backgroundColor;
      }
    });
  }

  function toggleMode() {
    if (this.parentNode.classList.value == 'draw-mode') {
      if (drawMode) {
        return;
      }
      else {
        drawMode = true;
        drawBox.classList.toggle('active');
        
        if (rainbowMode) {
          rainbowMode = false;
          rainbowBox.classList.toggle('active');
        }
        else {
          eraserMode = false;
          eraserBox.classList.toggle('active');
        }
      }
    }
    else if (this.parentNode.classList.value == 'rainbow-setting') {
      if (rainbowMode) { // If deactivating, re-active drawMode
        drawMode = true;
        rainbowMode = false;
        drawBox.classList.toggle('active');
      }
      else {
        rainbowMode = true;

        if (drawMode) {
          drawMode = false;
          drawBox.classList.toggle('active');
        }
        else {
          eraserMode = false;
          eraserBox.classList.toggle('active');
        }
      }
      this.classList.toggle('active');
    }
    else {
      if (eraserMode) { // If deactivating, re-active drawMode
        drawMode = true;
        eraserMode = false;
        drawBox.classList.toggle('active');
      }
      else {
        eraserMode = true;

        if (drawMode) {
          drawMode = false;
          drawBox.classList.toggle('active');
        }
        else {
          rainbowMode = false;
          rainbowBox.classList.toggle('active');
        }
      }
      this.classList.toggle('active');
    }

    console.log(rainbowBox.classList);
    console.log(rainbowMode);
    console.log(drawBox.classList);
    console.log(drawMode);
    console.log(eraserBox.classList);
    console.log(eraserMode);

  }

  function togglePressing(e) {
    e.preventDefault();
    // Temporary deactivate active styling when pressing on the button
    if (e.target.classList.contains('active')) 
      e.target.classList.toggle('active');
    
    e.target.classList.toggle('pressing');
  }

  function checkPressing(e) {
    if (e.type == "mouseover" && isPressing) {
      isPressing = false;
      togglePressing(e);
      return;
    } 
    if (this.classList.contains('pressing')) togglePressing(e);

    // Reactivate active styling in the case it was removed when pressing
    if (!e.target.classList.contains('active')) {
      if (eraserMode && e.target == eraserBox) eraserBox.classList.toggle('active');
      if (drawMode && e.target == drawBox) drawBox.classList.toggle('active');
      if (rainbowMode && e.target == rainbowBox) rainbowBox.classList.toggle('active');
    }
    
    if (e.type == "mouseout" && mouseDown) isPressing = true;
    if (e.type == "mouseup") isPressing = false;
  }

  window.addEventListener('mousedown', setMouseDown);
  window.addEventListener('mouseup', setMouseUp);
  
  gridSlider.addEventListener('input', updateGridSizeDisplay);
  gridSlider.addEventListener('change', updateDrawingArea);
  
  // Input instead of change because user can click off and draw and color  
  // change doesn't implement immediately when this happens
  colorPicker.addEventListener('input', updateColor); 
  backgroundColorPicker.addEventListener('change', updateBackgroundColor); 
  
  // Add box click event listeners
  [eraserBox, rainbowBox, drawBox].forEach(element => {
    element.addEventListener('click', toggleMode);
    element.addEventListener('mousedown', togglePressing);
    ['mouseup', 'mouseout', 'mouseover'].forEach(event => {
      element.addEventListener(event, checkPressing);
    })
  })

  addGrids();
})();