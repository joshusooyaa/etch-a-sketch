const gridContainer = document.querySelector('#drawing-grid-container');

function addGrids(numRows=2) {
  gridContainer.style.cssText = `grid-template-columns: repeat(${numRows}, 1fr);
                                 grid-template-rows: repeat(${numRows}, 1fr);`;
  let numGrids = numRows**2;
  let gridElements = [];
  
  for (let i = 0; i < numGrids; i++) {
    let newGridElement = document.createElement('div');
    newGridElement.setAttribute('class', 'grid-item');
    gridElements.push(newGridElement);
  }

  gridContainer.append(...gridElements);
}

addGrids();