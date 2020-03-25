import React, { useState } from "react";
import { Row } from "./row";
import "./board.scss";

const nrOfRows = 4;
const nrOfCols = 5;
const emptyTileIndex = 0;
const BEGINNER_NROFSCRAMBLES = 25;
const INTERMEDIATE_NROFSCRAMBLES = 50;
const PRO_NROFSCRAMBLES = 150;
const ADAGIO_SCRAMBLESPEED = 500;
const MODERATO_SCRAMBLESPEED = 350;
const ALLEGRO_SCRAMBLESPEED = 200;

// UI texts
let displayMsg = "";
const UITexts = {
	HEADER_TEXT: { en: "Unscramble the puzzle!", nl: "Schuif de puzzel terug!" },
	DISPLAYPROGRESSTEXT: { en: "Please wait... scrambling", nl: "Even wachten... husselen..." },
	FINISHEDPROGRESSTEXT: { en: "Finished. Start unscrambling", nl: "Klaar Probeer de puzzel te maken" },
	BUTTON_SCRAMBLE_LEVEL_1: { en: "Simple scramble", nl: "Beginnend puzzelaar" },
	BUTTON_SCRAMBLE_LEVEL_2: { en: "Intermediate scramble", nl: "Gevorderd puzzelaar" },
	BUTTON_SCRAMBLE_LEVEL_3: { en: "Pro scramble", nl: "Professionele puzzelaar" },
	BUTTON_SELECT_IMAGE_AMSTERDAM: { en: "Amsterdam", nl: "Amsterdam" },
	BUTTON_SELECT_IMAGE_WORLD: { en: "Worldmap", nl: "Wereldkaart" }
};
const defaultLanguage = "nl";
const images = {
	Worldmap: "/assets/img/tiles/sliced Map of Europe",
	Amsterdam: "/assets/img/tiles/sliced Amsterdam"
};

// make the board that contains the tiles grid
// @ return {object} - key:numeric, value:object {1:{}, 2:{},3(),...}
const makeBoard = selectedImage => {
	const board = [];
	for (let i = 0; i < nrOfRows * nrOfCols; i++) {
		const col = i % nrOfCols;
		const row = Math.floor(i / nrOfCols);
		board[i] = {
			id: i,
			display: `${images[selectedImage]}/row-${row}-col-${col}.jpg`,
			row: row,
			col: col,
			type: i === emptyTileIndex ? "emptyTile" : "tile",
			recentlyMoved: false
		};
	}
	return board;
};

function Board() {
	// define state hook
	const [boardState, setBoardState] = useState(makeBoard("Worldmap"));

	const I18n = token => {
		console.log(token);
		return UITexts[token].hasOwnProperty(navigator.language.substr(0, 2))
			? UITexts[token][navigator.language.substr(0, 2)]
			: UITexts[token][defaultLanguage];
	};
	const onHandleClick = tile => {
		// ignore clicks on the black square since it is not a tile
		if (tile.type === "emptyTile") {
			return;
		}
		// retrieve the emptytile from it's type value
		const emptyTile = boardState.filter(tile => tile.type === "emptyTile")[0];
		// determine if the clicked tile can move and if so, where. possible values: north|south|east|west|undefined
		const move = determineMove(tile, emptyTile);
		// use an explicit boolean value instead of relying on undefined being false and a string being true
		if (!!move) {
			// clone state (#immutability!)
			const newBoardState = [...boardState];

			//swap types of tiles so the clicked tile becomnes the empty tile and vice versa
			[newBoardState[emptyTile.id].type, newBoardState[tile.id].type] = [
				newBoardState[tile.id].type,
				newBoardState[emptyTile.id].type
			];
			// swap display value of clicked tiles with emptytile
			[newBoardState[emptyTile.id].display, newBoardState[tile.id].display] = [
				newBoardState[tile.id].display,
				newBoardState[emptyTile.id].display
			];
			setBoardState(newBoardState);
		}
	};

	const determineMove = (tile, emptyTile) =>
		emptyTile.col === tile.col && tile.row - emptyTile.row === 1
			? "north"
			: tile.col === emptyTile.col && tile.row - emptyTile.row === -1
			? "south"
			: tile.row === emptyTile.row && tile.col - emptyTile.col === 1
			? "west"
			: tile.row === emptyTile.row && tile.col - emptyTile.col === -1
			? "east"
			: undefined;

	const makeRows = () => {
		const rows = [];
		boardState.map((tile, i, arr) => {
			if (i % nrOfCols === 0) {
				// we have to group elements by 4 from an array of 16 values
				rows.push(<Row key={i} row={arr.slice(i, i + nrOfCols)} onHandleClick={onHandleClick} />);
			}
			return null;
		});
		return rows;
	};

	const onScramble = (nrOfMoves, scrambleSpeed) => {
		// How does this work?
		// We need to identify of locations of emptyTiles where neighbouring tiles can be determined in the same manner. So when the emptyTile is in the top-left corner all availableTiles can be reached by adding 1 or the number of columns; When the emptytile is in the top row (excluding the topLeft and topRight corners) all available tiles can be determined by either adding -1, +1 or nrOfColumns to the emptyTile.
		// - 1 - specify emptyTile locations that have neighbouring tiles that can be detrmined by the same calculation
		const emptyTileAreas = {};
		emptyTileAreas.topLeftEmptyTileIndex = [0];
		emptyTileAreas.topRightEmptyTileIndex = [nrOfCols - 1];
		emptyTileAreas.bottomLeftEmptyTileIndex = [nrOfCols * nrOfRows - nrOfCols];
		emptyTileAreas.bottomRightEmptyTileIndex = [nrOfCols * nrOfRows - 1];
		emptyTileAreas.topBorderColumnEmptyTileIndexes = [];
		for (let col = 1; col < nrOfCols - 1; col++) {
			emptyTileAreas.topBorderColumnEmptyTileIndexes.push(col);
		}
		emptyTileAreas.bottomBorderColumnEmptyTileIndexes = [];
		for (let col = 1; col < nrOfCols - 1; col++) {
			emptyTileAreas.bottomBorderColumnEmptyTileIndexes.push((nrOfRows - 1) * nrOfCols + col);
		}
		emptyTileAreas.leftBorderColumnEmptyTileIndexes = [];
		emptyTileAreas.rightBorderColumnEmptyTileIndexes = [];
		emptyTileAreas.midBoardEmptyTileIndexes = [];
		for (let row = 1; row < nrOfRows - 1; row++) {
			emptyTileAreas.leftBorderColumnEmptyTileIndexes.push(row * nrOfCols);
			emptyTileAreas.rightBorderColumnEmptyTileIndexes.push(row * nrOfCols + nrOfCols - 1);
			for (let col = 1; col < nrOfCols - 1; col++) {
				emptyTileAreas.midBoardEmptyTileIndexes.push(row * nrOfCols + col);
			}
		}
		// For each of these 9 areas we want to determine how to calculate the availble tiles. The availableTile index depends on the emptyTile index. To keep it simple the keyvalue is a function that accepts the emptyTile index and returns an array of availableTile indexes.
		// - 2 - specify the indexes of available tiles for each collection of emptyTiles
		const availableTileIndexes = {
			topLeftEmptyTileIndex: emptyTileIndex => [emptyTileIndex + 1, emptyTileIndex + nrOfCols],
			topRightEmptyTileIndex: emptyTileIndex => [emptyTileIndex - 1, emptyTileIndex + nrOfCols],
			bottomLeftEmptyTileIndex: emptyTileIndex => [emptyTileIndex + 1, emptyTileIndex - nrOfCols],
			bottomRightEmptyTileIndex: emptyTileIndex => [emptyTileIndex - 1, emptyTileIndex - nrOfCols],
			topBorderColumnEmptyTileIndexes: emptyTileIndex => [
				emptyTileIndex - 1,
				emptyTileIndex + nrOfCols,
				emptyTileIndex + 1
			],
			bottomBorderColumnEmptyTileIndexes: emptyTileIndex => [
				emptyTileIndex - 1,
				emptyTileIndex - nrOfCols,
				emptyTileIndex + 1
			],

			leftBorderColumnEmptyTileIndexes: emptyTileIndex => [
				emptyTileIndex - nrOfCols,
				emptyTileIndex + 1,
				emptyTileIndex + nrOfCols
			],
			rightBorderColumnEmptyTileIndexes: emptyTileIndex => [
				emptyTileIndex - nrOfCols,
				emptyTileIndex - 1,
				emptyTileIndex + nrOfCols
			],
			midBoardEmptyTileIndexes: emptyTileIndex => [
				emptyTileIndex - nrOfCols,
				emptyTileIndex + 1,
				emptyTileIndex + nrOfCols,
				emptyTileIndex - 1
			]
		};
		let emptyTile;
		let emptyTilesArea;
		let availableTiles;
		let randomTileIndex;

		let shuffleCount = 0;

		console.log("Follow the trailpath back!");

		// Now we want to determine the available tiles given an emptyTile. We do that in an interval for a nice visual effect.
		// clone boardstate because we need to change tile property recentlyMoved
		const _boardState = [...boardState];

		let intervalId = setInterval(() => {
			// // - 3 - find the index of the current emptyTile
			emptyTile = boardState.find(tile => tile.type === "emptyTile");
			// - 4 - determine the emptyTileArea the emptyTile resides in
			emptyTilesArea = Object.keys(emptyTileAreas).find(key => emptyTileAreas[key].includes(emptyTile.id));
			// - 5 - given the emptyTileArea, determine the available tile indexes we can shuffle
			availableTiles = availableTileIndexes[emptyTilesArea](emptyTile.id);
			// - 6 - filter any tile that has been moved the last time to prevent it from being shuffled back
			availableTiles = availableTiles.filter(tileIndex => !_boardState[tileIndex].recentlyMoved);
			// - 7 - pick a random tile index from the array of available tile indexes
			randomTileIndex = availableTiles[Math.floor(Math.random() * availableTiles.length)];
			// reset all recentlyMovedProperties
			_boardState.map(tile => (tile.recentlyMoved = false));
			// - 8 -  Mark emptyTile as recentlyMoved. EmptyTile will swap and thus become the randomly selected tile
			_boardState.map(tile => {
				tile.type === "emptyTile" ? (tile.recentlyMoved = true) : (tile.recentlyMoved = false);
				return tile;
			});

			// - 9 - do that thing you do!
			onHandleClick(_boardState[randomTileIndex]);

			// create the UI message
			shuffleCount++;
			displayMsg = I18n("DISPLAYPROGRESSTEXT") + " " + Math.floor((shuffleCount / nrOfMoves) * 100) + "%";
			// when finished, display appropriate text
			displayMsg = shuffleCount === nrOfMoves ? I18n("FINISHEDPROGRESSTEXT") : displayMsg;
			// log output with a hint
			console.log(`shuffle ${shuffleCount} of ${nrOfMoves}: moving tile ${randomTileIndex}`);

			// - 10 - some housekeeping to prevent this thing from running forever...
			if (shuffleCount === nrOfMoves + 1) {
				clearInterval(intervalId);
				// setting this has result as soon as user clicks tile and component is rendered again
				displayMsg = "";
				console.log("End of path. Follow the breadcrumbs back ;)");
			}
		}, scrambleSpeed);
	};

	return (
		<React.Fragment>
			<div className='container'>
				<header className='header'>
					<p>{I18n("HEADER_TEXT")}</p>
				</header>

				<span className='subHeader'>{displayMsg}</span>
				<div className='board'>{makeRows()}</div>
				<div>
					<button
						onClick={() => {
							onScramble(BEGINNER_NROFSCRAMBLES, ADAGIO_SCRAMBLESPEED);
						}}>
						{I18n("BUTTON_SCRAMBLE_LEVEL_1")}
					</button>
					<button
						onClick={() => {
							onScramble(INTERMEDIATE_NROFSCRAMBLES, MODERATO_SCRAMBLESPEED);
						}}>
						{I18n("BUTTON_SCRAMBLE_LEVEL_2")}
					</button>
					<button
						onClick={() => {
							onScramble(PRO_NROFSCRAMBLES, ALLEGRO_SCRAMBLESPEED);
						}}>
						{I18n("BUTTON_SCRAMBLE_LEVEL_3")}
					</button>
				</div>
				<div>
					<button onClick={() => setBoardState(makeBoard("Amsterdam"))}>
						{I18n("BUTTON_SELECT_IMAGE_AMSTERDAM")}
					</button>
					<button onClick={() => setBoardState(makeBoard("Worldmap"))}>
						{I18n("BUTTON_SELECT_IMAGE_WORLD")}
					</button>
				</div>
			</div>
		</React.Fragment>
	);
}

export { Board };
