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
## Features
### Dynamically Adding Grids
---
**Overview**\
Grids need to initially start at 16x16. This can be done using Javascript, since it wouldn't make sense to hard code this in. The grids will need to go in the drawing area, so this will have to get the container that will contain the divs. Once the container is found, then load the grids. Instead of using flex box, it seems that using css grid would make most sense, so this method will be used.

`drawing-grid-container` is an ID since there will only be one place to draw. This is a unique area and shouldn't be a class. Its grid styling will be dynamically added by the JS since `grid-template-columns` this will allow for later implementation of letting the user change the size of the grid layout.

Once the appropriate amount of grids have been created, they need to have listeners added to them. Since we're creating a drawing app, we ideally want to click and draw, however the click listener won't work because then we'd have to click on every grid to color (instead of dragging). Therefore, we can check for mouseover instead, and can add an event listener for mouse down elsewhere -- which will trigger a boolean we can check inside the callback function for this event listener.

**PsuedoCode for `addGrids`**
```
parameters: number of rows (or columns, they'll be the same number)

update grid container styling based on rows

for number of rows^2 (grid size - ex: 16x16)
    create grid item
    set up grid item to trigger a function when mouse hovers over

add all grid items to grid container
```
<br>

### Filling Grids In
---
**Overview**\
This is a callback function on a `grid-item` when the event mouseover is triggered. However, we don't want the user to fill in the grid just on a mouseover, we also want to make sure that the mouse is currently down. Therefore, outside of fillInColor we can have an eventlistener for both mousedown and mouseup and have these modify a boolean, which then can be checked by fillInColor to know whether or not to fill in or return.

In the case that the mouse is down, fillInColor needs to know what color to fill in with. A function will be called to get this color.

**Psuedocode for `fillInColor`**
```
if mouse is down
    get fill color -- default black
    fill in the grid with the fill color
```

**Psuedocode for `getFillColor`**
```
// Empty for now - dependent on setting up a color picker for user
```
<br>

### User Settings
---
**Overview**\
There are several settings the user is allowed to manipulate to get different outcomes when drawing. These settings include: 
1. Updating the number of grids (exponentially 1, 4, 9, 16) to a max of 4096 grids in the drawing area and a min of 1
2. Changing the color of the drawing tool
3. Rainbow grid coloring tool
4. Clear the drawing area


**Updating Grid Size**\
To update the grid size, several things need to happen:
1. Slider element (input with range) that gets the users desired size
2. Set up a listener for that slider element when it changes
3. Call a function to update based on that change



