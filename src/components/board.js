import React, { useState } from "react";
import { Row } from "./row";
import "./board.scss";

const nrOfRows = 4;
const nrOfCols = 5;
const emptyTileIndex = 0;
const BEGINNER_NROFSCRAMBLES = 25;
const INTERMEDIATE_NROFSCRAMBLES = 50;
const PRO_NROFSCRAMBLES = 15150 / 4.0;
const ADAGIO_SCRAMBLESPEED = 500;
const MODERATO_SCRAMBLESPEED = 350;
const ALLEGRO_SCRAMBLESPEED = 200;

// make the board that contains the tiles grid
// @ return {object} - key:numeric, value:object {1:{}, 2:{},3(),...}
const makeBoard = () => {
	const board = [];
	for (let i = 0; i < nrOfRows * nrOfCols; i++) {
		const col = i % nrOfCols;
		const row = Math.floor(i / nrOfCols);
		board[i] = {
			id: i,
			display: `/assets/img/tiles/sliced Amsterdam/row-${row}-col-${col}.jpg`,
			row: row,
			col: col,
			type: i === emptyTileIndex ? "emptyTile" : "tile"
		};
	}
	return board;
};

function Board() {
	// define state hook
	const [boardState, setBoardState] = useState(makeBoard());

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
				// we have to group elements by 4 from an attay of 16 values
				rows.push(<Row key={i} row={arr.slice(i, i + nrOfCols)} onHandleClick={onHandleClick} />);
			}
		});
		return rows;
	};

	const onClickScramble = (nrOfMoves, scrambleSpeed) => onScramble(nrOfMoves, scrambleSpeed);

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
		let intervalId = setInterval(() => {
			// // - 3 - find the index of the current emptyTile
			emptyTile = boardState.find(tile => tile.type === "emptyTile");
			// - 4 - determine the emptyTileArea the emptyTile resides
			emptyTilesArea = Object.keys(emptyTileAreas).find(key => emptyTileAreas[key].includes(emptyTile.id));
			// - 5 - given te emptyTile index, determine the available tile indexes we can choose from
			availableTiles = availableTileIndexes[emptyTilesArea](emptyTile.id);
			// - 6 - pick a random tile index from the array of available tile indexes
			randomTileIndex = availableTiles[Math.floor(Math.random() * availableTiles.length)];
			// - 7 - do that thing you do!
			onHandleClick(boardState[randomTileIndex]);
			// some housekeeping to prevent this thing from running forever...
			shuffleCount += 1;
			// log output
			console.log(`shuffle ${shuffleCount} of ${nrOfMoves}: moving tile ${randomTileIndex}`);
			if (shuffleCount === nrOfMoves) {
				clearInterval(intervalId);
				console.log("End of path");
			}
		}, scrambleSpeed);
	};

	return (
		<React.Fragment>
			<div className='board'>{makeRows()}</div>
			<div>
				<button onClick={() => onClickScramble(BEGINNER_NROFSCRAMBLES, ADAGIO_SCRAMBLESPEED)}>
					Simple scramble
				</button>
				<button onClick={() => onClickScramble(INTERMEDIATE_NROFSCRAMBLES, MODERATO_SCRAMBLESPEED)}>
					Intermediate scramble
				</button>
				<button onClick={() => onClickScramble(PRO_NROFSCRAMBLES, ALLEGRO_SCRAMBLESPEED)}>
					Scramble like a Pro!
				</button>
			</div>
		</React.Fragment>
	);
}

export { Board };
