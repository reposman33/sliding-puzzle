This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Sliding puzzle game

Click any of the 3 buttons to scramble the puzzle. The higher the game level the more scramble iterations are applied but scrambling should never take longer than 40 secs. After scrambling has finished click an image to swap location with the empty tile.

# Want to use a different image?

Any sliced image can be used for the puzzle as long as the slices are named correctly: row<xx>-col-<col>. row 0 col 0 corresponds to the tile in the top-left corner, row 0 col 1 to the tile to the right of it and so on.

When initializing the puzzle the following parameters are used and might be modified when using another picture:

-   const nrOfRows - the number of rows in the board. 0 based;
-   const nrOfCols - the numbr of columns per row. 0 based;
-   inline in the makeBoard() function: the path to the images folder - e.g. /assets/img/tiles/sliced Amsterdam/row-${row}-col-${col}.jpg
    So for example an imagename can be row-0-col-0.jpg. Make sure that the img name corresponds to the index. So for example, if the empty tile is in the top left scorner, the filename is row-0-col-0.jpg, te second tileindex would be row-0-col-1.jpg etc;
-   emptyTileIndex - the index of the tile that contains the initially empty (black) tile. It is an image of the same dimensions as the other tiles. A special style is applied (board.scss - emptyTile);

    styleproperties adaptations in board.scss andd tile.scss might be needed when using a different image.

Slicing of an image can be done in various websites - I used https://pinetools.com/split-image. _The row-col-values used in the resulting imagenames are 1 based_

# How is the game setup?

At initialisation an array of nrOfRows \* nrOfColumns Tile Objects are created and added to an array ('boardState'). Each tile object 'knows' its row and col value. The array is independent of the physical location of the tiles on the board.

**The empty location and clicked tile never change location. Only the tile.type and the tile.display values are swapped**

## What happens when a tile is clicked?

-   If the tile.type === 'emptyTile' nothing happens;
-   the relative location (left-top-right-bottom) of the emptyTile relative to the clicked tile is determined;
-   if there is an emptyTile next to the clicked tile a sliding direction is determined (west | north | east | south), otherwise the sliding direction is undefined;
-   The emptyTile.type and the clickedTile.type values are swapped so the clicked type becomes the empty tile;
-   the emptyTile.display and the clickedTile.display values are swapped. These hold the path to the images so effectively this means swapping the images.

## Want to use fonts instead of images?

Change the Tile component tile.js: where the image is used <img>, change to <p> and display the tile.display value. Whatever is assigned to tile.display in the initialization phase gets displayed here.

## Why using React?

React is used because it is fun and easy ;) Seriously, keeping state (the objects in the boardState) and view in sync would be hard using plain JavaScript. Functional components are used instead of class components because it is less typing and because hooks are hot. The only place where useState is used is in the board.js component.

## What else

I have been trying hard to find a way to animate the tiles but after I realised that no moving is involved _and_ that it animation would requietr a totally different setup I decided against it. Maybe in a version 2.0...

`credits`

(c) march 2020 by Marc Bakker for [marcbakker.com](marcbakker.com)
