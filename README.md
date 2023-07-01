# Overview
This is a project that is outlined by [The Odin Project](https://www.theodinproject.com/about). The assignment guidelines can be found [here](https://www.theodinproject.com/lessons/foundations-etch-a-sketch).

# Description
This is a web app that contains a fixed drawing area which allows the user to draw in. The drawing area is initially made up of 16x16 grids and can be increased to a max of 64x64 or decreased to a minimum of 1x1. Each grid inside the drawing area, when drawn on, will be filled with the current drawing color.

The user has multiple options that allow them a varying "drawing experience". These options include:
1. Change draw color
2. Change background color
    * Note that changing the background color does NOT reset anything that has been drawn
3. Change the grid size (changes how many drawable grids there are)
    * Note that this resets the drawing area!
4. Change draw mode:
    * Regular mode (draws what the current color is)
    * Rainbow mode (randomly chooses an rgb color to draw)
    * Eraser mode (sets the color back to the background color)
5. Reset/clear grid

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
This is a callback function on a `grid-item` when the event mouseover is triggered. However, we don't want the user to fill in the grid just on a mouseover, we also want to make sure that the mouse is currently down. Therefore, outside of updateGridItem we can have an eventlistener for both mousedown and mouseup and have these modify a boolean, which then can be checked by updateGridItem to know whether or not to fill in or return.

In the case that the mouse is down, updateGridItem needs to know what color to fill in with. A function will be called to get this color.

**Psuedocode for `updateGridItem`**
```
if mouse is down
    get fill color -- default black
    if in draw mode (not erase)
        fill in the grid with the fill color
    otherwise reset grid (erase mode)
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
3. Erase Mode
4. Rainbow grid coloring tool
5. Change Background Color
6. Clear the drawing area


**Updating Grid Size**\
To update the grid size, several things need to happen:
1. Slider element (input with range) that gets the users desired size
2. Set up a listener for that slider element when it changes
3. Call a function to update based on that change

**Change Draw Color**\
To change the draw color, several things need to happen:
1. Create an input type="color", default value of black
2. Create an event listener to update color value of drawing
    * The reason we use this over getting the value every time when drawing is that this is much faster in that it doesn't need to make a function call and access the DOM node that contains the color value every time a user goes to draw.

**Eraser**
1. Set up an input checkbox
2. When clicked, make it so draw mode is changed to erase
    * Note this requires updating fillInColor to account for if it is in draw mode or not.
    * Requires setting up an event listener for checkbox when clicked -- set to erase, and when not set to draw

**Rainbow Color**
1. Set up an input checkbox (we can reuse the eraser styling for this)
2. Link state of eraser, color, and rainbow to each other
    * We now have multiple ways to draw -- draw with color, draw with rainbow, or erase, so we need to make it so we can't have two or more "checked"
3. Link to `updateGridItem` and have it now check the state it's in -- if it's in draw mode, draw that color, if it's in rainbow mode, call `getRandomColor` to get the random color.
    * `getRandomColor` will return a HEX color code. Although to calculate this is slower, this is ideal since we have a style variable that we use (which uses HEX) to update colors in the UI based on the current color, and we'll update this variable to the random color as well.

**Pseudocode for `getRandomColor`**
```
for 6 iterations
   get a random hex character (from 0-9 A-F)
   append the random hex character to color

return hex color
```

**Background Color**\
For background color, we have two options. We can either make it so it resets the page, or we can make it so it only changes the grid-items that have the initial background color. The second option is harder, so we go for that.
1. Create a div `background-color`
2. It can take the same format of the `color-setting` div
3. Create an event listener that checks when user updates background color
    * On change, check for all grid-items that are the exact same color and change them to the new background color. 

**Clear Drawing**\
This is fairly straight forward with everything already set up. We have `clearGrid` as an option, but we also have 'drawn' classes indicating what divs have been drawn in and what haven't. And since clear doesn't need to add or remove grids, it doesn't make sense to use this. So instead we'll create a new function to call that will check for all drawn grids, and set their color to the background color.
1. Create button with event listener on click
2. Call `resetGrid` which contains the above explained functionality.





