/* Global Variables */
let mouseDown = false;
let drawColor = "black";
/* End Global Variables */


/***********************/
/**** Grid Settings ****/
/***********************/

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
    newGridElement.addEventListener('mousedown', fillInColor);
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
    fillInColor(e);
  }
}

function fillInColor(e) {
  e.preventDefault(); // To prevent dragging
  e.target.style.background = drawColor;
}
/* End Grid Fill */

/***************************/
/**** End Grid Settings ****/
/***************************/


/***********************/
/**** User Settings ****/
/***********************/

/* Update Grid Size */
function updateGridSizeDisplay() {
  const gridSizeDisplay = this.previousElementSibling;
  const inputValue = this.value;

  gridSizeDisplay.textContent = `Grid Size: ${inputValue}x${inputValue}`
}
/* End Update Grid Size*/

/***************************/
/**** End User Settings ****/
/***************************/


/* IIFE to add listeners and grid */
(function() {
  const gridSlider = document.querySelector(".grid-slider");
  const colorPicker = document.querySelector(`.color-setting input[type="color"]`);

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

  window.addEventListener('mousedown', setMouseDown);
  window.addEventListener('mouseup', setMouseUp);
  gridSlider.addEventListener('input', updateGridSizeDisplay);
  gridSlider.addEventListener('change', updateDrawingArea);
  colorPicker.addEventListener('change', updateColor);

  addGrids();
})();