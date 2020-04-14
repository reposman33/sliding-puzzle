import React, { useState } from "react";
import { Row } from "./row";
import { Header } from "./header";
import { Buttons } from "./buttons";
import { I18n } from "../Services/I18n";

import "./board.scss";

const nrOfRows = 4;
const nrOfCols = 5;
const emptyTileIndex = 0;

// UI texts
let progressbar = "";
let percentage;
let headerText = I18n.get("HEADER_TEXT");

const images = {
	Worldmap: "/assets/img/tiles/sliced Map of Europe",
	Amsterdam: "/assets/img/tiles/sliced Amsterdam",
};

// make the board that contains the tiles grid
// @ return {object} - key:numeric, value:object {1:{}, 2:{},3(),...}
const makeBoard = (selectedImage) => {
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
			recentlyMoved: false,
		};
	}
	return board;
};

function Board() {
	// define state hook
	const [boardState, setBoardState] = useState(makeBoard("Worldmap"));
	const [moveCount, setMoveCount] = useState(0);

	const onHandleClick = (tile, displayMoveCount = true) => {
		// ignore clicks on the black square since it is not a tile
		if (tile.type === "emptyTile") {
			return;
		}
		// retrieve the emptytile from it's type value
		const emptyTile = boardState.filter((tile) => tile.type === "emptyTile")[0];
		// determine if the clicked tile can move and if so, where. possible values: north|south|east|west|undefined
		const move = determineMove(tile, emptyTile);
		// use an explicit boolean value instead of relying on undefined being false and a string being true
		if (!!move) {
			// clone state (#immutability!)
			const newBoardState = [...boardState];

			//swap types of tiles so the clicked tile becomnes the empty tile and vice versa
			[newBoardState[emptyTile.id].type, newBoardState[tile.id].type] = [
				newBoardState[tile.id].type,
				newBoardState[emptyTile.id].type,
			];
			// swap display value of clicked tiles with emptytile
			[newBoardState[emptyTile.id].display, newBoardState[tile.id].display] = [
				newBoardState[tile.id].display,
				newBoardState[emptyTile.id].display,
			];
			displayMoveCount && setMoveCount(moveCount + 1);
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
		let emptyTile;
		let availableTiles = [];
		let randomTileIndex;
		let shuffleCount = 0;
		const progresbarLength = 100; // characters

		console.log("Follow the trailpath back!");

		// clone boardstate because we need to change tile property recentlyMoved
		const _boardState = [...boardState];

		let intervalId = setInterval(() => {
			// find the index of the current emptyTile
			availableTiles = [];
			emptyTile = boardState.find((tile) => tile.type === "emptyTile");
			// determine tiles surrounding the empty tile we can swap
			emptyTile.col - 1 > -1 && availableTiles.push(emptyTile.id - 1);
			emptyTile.col + 1 < nrOfCols && availableTiles.push(emptyTile.id + 1);
			emptyTile.row - 1 > -1 && availableTiles.push(emptyTile.id - nrOfCols);
			emptyTile.row + 1 < nrOfRows && availableTiles.push(emptyTile.id + nrOfCols);
			// filter any tile that has been moved the last time to prevent it from being shuffled back
			availableTiles = availableTiles.filter((tileIndex) => !_boardState[tileIndex].recentlyMoved);
			// pick a random tile index from the array of available tile indexes
			randomTileIndex = availableTiles[Math.floor(Math.random() * availableTiles.length)];
			// reset all recentlyMovedProperties
			_boardState.map((tile) => (tile.recentlyMoved = false));
			// mark emptyTile as recentlyMoved. EmptyTile will swap and thus become the randomly selected tile
			_boardState[emptyTile.id].recentlyMoved = true;

			// create the UI message
			shuffleCount += 1;
			percentage = Math.floor(shuffleCount * (100 / nrOfMoves));
			progressbar = "|".repeat(Math.floor(shuffleCount * (progresbarLength / nrOfMoves)));
			// when finished, display appropriate text
			headerText =
				shuffleCount === nrOfMoves ? I18n.get("FINISHEDPROGRESSTEXT") : I18n.get("DISPLAYPROGRESSTEXT");
			// log output with a hint
			console.log(`shuffle ${shuffleCount} of ${nrOfMoves}: moving tile ${randomTileIndex}`);

			// swap tiles!
			onHandleClick(_boardState[randomTileIndex], false);

			// some housekeeping to prevent this thing from running forever...
			if (shuffleCount === nrOfMoves) {
				clearInterval(intervalId);
				// setting this has result as soon as user clicks tile and component is rendered again
				progressbar = "";
				percentage = "";
				console.log("End of path. Follow the breadcrumbs back ;)");
			}
		}, scrambleSpeed);
	};

	return (
		<React.Fragment>
			<div className='container'>
				<Header headerText={headerText} progressbar={progressbar} percentage={percentage} />

				<div className='board'>{makeRows()}</div>

				<Buttons onScramble={onScramble} setBoardState={setBoardState} makeBoard={makeBoard} />
			</div>
		</React.Fragment>
	);
}

export { Board };
