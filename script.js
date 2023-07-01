/* Global Variables */
let mouseDown = false;
let eraserMode = false;
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
  }
  else {
    e.target.style.background = drawColor;
  }
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
  const eraserDiv = document.querySelector(`.eraser input[type="checkbox"]`)
  
  function setMouseDown() {
    mouseDown = true;
  }

  function setMouseUp() {
    mouseDown = false;
  }

  function updateDrawingArea() {
    clearGrid();
    addGrids(this.value);
  }

  function updateColor() {
    drawColor = this.value;
  }

  function toggleEraser() {
    eraserMode = eraserMode ? false : true;
  }

  window.addEventListener('mousedown', setMouseDown);
  window.addEventListener('mouseup', setMouseUp);
  gridSlider.addEventListener('input', updateGridSizeDisplay);
  gridSlider.addEventListener('change', updateDrawingArea);
  // Input instead of change because user can click off and draw and color  
  // change doesn't implement immediately when this happens
  colorPicker.addEventListener('input', updateColor);  
  eraserDiv.addEventListener('change', toggleEraser);

  addGrids();
})();