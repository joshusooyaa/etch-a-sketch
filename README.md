# Overview
This is a project that is outlined by [The Odin Project](https://www.theodinproject.com/about). The assignment guidelines can be found [here](https://www.theodinproject.com/lessons/foundations-etch-a-sketch).

# Description
This is a web app that contains a fixed drawing area which allows the user to draw in. The drawing area is initially made up of 16x16 grids and can be increased to a max of 64x64 or decreased to a minimum of 1x1. Each grid inside the drawing area, when drawn on, will be filled with the current drawing color.

<br>


# Process
<small>*Iterative process to solve the problem*</small>
## Steps
1. Build the base HTML
2. Set up a container that will hold the grids (the drawing area)
3. Dynamically add the initial 16x16 grids inside the container
<br></br>
## Algorithms
### Dynamically Adding Grids
---
**Overview**\
Grids need to initially start at 16x16. This can be done using Javascript, since it wouldn't make sense to hard code this in. The grids will need to go in the drawing area, so this will have to get the container that will contain the divs. Once the container is found, then load the grids. Instead of using flex box, it seems that using css grid would make most sense, so this method will be used.

`drawing-grid-container` is an ID since there will only be one place to draw. This is a unique area and shouldn't be a class. Its grid styling will be dynamically added by the JS since `grid-template-columns` this will allow for later implementation of letting the user change the size of the grid layout.

**PsuedoCode for `addGrids`**
```
parameters: number of rows (or columns, they'll be the same number)

get the grid container
update grid container styling based on rows

for number of rows^2 (grid size - ex: 16x16)
    create grid item
    add appropriate styling

add all grid items to grid container
```


