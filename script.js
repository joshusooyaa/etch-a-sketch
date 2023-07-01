/* Global Variables */
let mouseDown = false;
let eraserMode = false;
let isPressingEraser = false;
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
  const eraserBox = document.querySelector(`.eraser .checkbox`)
  
  function setMouseDown() {
    mouseDown = true;
  }

  function setMouseUp() {
    mouseDown = false;
    isPressingEraser = false;
  }

  function updateDrawingArea() {
    clearGrid();
    addGrids(this.value);
  }

  function updateColor() {
    drawColor = this.value;
    document.documentElement.style.setProperty('--hex-base', drawColor);
  }

  function toggleEraser() {
    eraserMode = eraserMode ? false : true;
    this.classList.toggle('active');
  }

  function togglePressing(e) {
    e.preventDefault();
    // Temporary deactive active styling when pressing on the button
    if (e.target.classList.contains('active')) 
      e.target.classList.toggle('active');
    
    e.target.classList.toggle('pressing');
  }

  function checkPressing(e) {
    if (e.type == "mouseover" && isPressingEraser) {
      e.target.classList.toggle('pressing');
      isPressingEraser = false;
      return;
    } 
    if (this.classList.contains('pressing')) togglePressing(e);

    // Reactivate active styling in the case it was removed when pressing
    if (!e.target.classList.contains('active') && eraserMode)
      e.target.classList.toggle('active');
    
    if (e.type == "mouseout" && mouseDown) isPressingEraser = true;
    if (e.type == "mouseup") isPressingEraser = false;
  }

  window.addEventListener('mousedown', setMouseDown);
  window.addEventListener('mouseup', setMouseUp);
  
  gridSlider.addEventListener('input', updateGridSizeDisplay);
  gridSlider.addEventListener('change', updateDrawingArea);
  
  // Input instead of change because user can click off and draw and color  
  // change doesn't implement immediately when this happens
  colorPicker.addEventListener('input', updateColor);  
  
  eraserBox.addEventListener('click', toggleEraser);
  eraserBox.addEventListener('mousedown', togglePressing);
  eraserBox.addEventListener('mouseup', checkPressing);
  eraserBox.addEventListener('mouseout', checkPressing);
  eraserBox.addEventListener('mouseover', checkPressing);

  addGrids();
})();