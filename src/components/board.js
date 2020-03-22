import React, { useState } from "react";
import { Row } from "./row";
import "./board.scss";

const nrOfRows = 4;
const colsPerRow = 4;
const emptyTileIndex = 0;

// make the board that contains the tiles grid
// @ return {object} - key:numeric, value:object {1:{}, 2:{},3(),...}
const makeBoard = () => {
	const board = [];
	for (let i = 0; i < nrOfRows * colsPerRow; i++) {
		const col = i % colsPerRow;
		const row = Math.floor(i / nrOfRows);
		board[i] = {
			id: i,
			display: `/assets/img/tiles/row-${row}-col-${col}.jpg`,
			row: row,
			col: col,
			type: i === emptyTileIndex ? "emptyTile" : "tile",
			animation: ""
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
			if (i % colsPerRow === 0) {
				// we have to group elements by 4 from an attay of 16 values
				rows.push(<Row key={i} row={arr.slice(i, i + colsPerRow)} onHandleClick={onHandleClick} />);
			}
			return null;
		});

		return rows;
	};

	return <div className='board'>{makeRows()}</div>;
}

export { Board };
