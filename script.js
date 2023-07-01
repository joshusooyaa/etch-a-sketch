/* Global Variables */
let mouseDown = false;
/* End Global Variables */

/* Load Grid */
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
/* End Load Grid */

/* Grid fill */
function checkIfCanFill(e) {
  if (mouseDown) {
    fillInColor(e);
  }
}

function fillInColor(e) {
  e.preventDefault(); // To prevent dragging
  // TODO: Get fill color (dependent on user choice)
  e.target.style.background = "black";
}


/* IIFE to add listeners and grid */
(function() {
  function setMouseDown() {
    mouseDown = true;
  }

  function setMouseUp() {
    mouseDown = false;
  }

  window.addEventListener('mousedown', setMouseDown);
  window.addEventListener('mouseup', setMouseUp);

  addGrids();
})();