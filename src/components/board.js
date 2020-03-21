import React, { useState } from "react";
import { Row } from "./row";
import "./board.scss";

const nrOfRows = 4;
const colsPerRow = 4;
const emptyTile = 0;
const imgPath = "/assets/img/tiles/";
const makeBoard = () => {
	const board = [];
	for (let row = 0; row < nrOfRows; row++) {
		board[row] = {};
		for (let col = 0; col < colsPerRow; col++) {
			const id = row * colsPerRow + col;
			const type = id === emptyTile ? "emptyTile" : "tile";

			board[row][col] = {
				id: id,
				row: row,
				col: col,
				type: type,
				animate: "",
				imgPath: imgPath
			};
		}
	}
	return board;
};

function Board() {
	const [boardState, setBoardState] = useState(makeBoard());

	const onHandleClick = tile => {
		if (tile.type === "emptyTile") {
			return;
		}
		const move = determineMove(tile);

		if (move) {
			// clean state by removing existing animation values
			const newBoardState = boardState.map(row => Object.keys(row).map(i => ({ ...row[i], animation: "" })));
			// add animatin to clicked tile
			newBoardState[tile.row][tile.col].animation = move;
			// update type of emptytile
			if (move === "west" && tile.col > 0) {
				newBoardState[tile.row][tile.col - 1].type = "tile";
			} else if (move === "east" && tile.col < colsPerRow) {
				newBoardState[tile.row][tile.col + 1].type = "tile";
			} else if (move === "north" && tile.row > 0) {
				newBoardState[tile.row - 1][tile.col].type = "tile";
			} else if (move === "south" && tile.row < nrOfRows) {
				newBoardState[tile.row + 1][tile.col].type = "tile";
			}
			// location of clicked tile becomes location of empty tile
			newBoardState[tile.row][tile.col].type = "emptyTile";

			setBoardState(newBoardState);
		}
	};

	const determineMove = tile =>
		// is emptyTile above clicked tile?
		tile.row > 0 && boardState[tile.row - 1][tile.col].type === "emptyTile"
			? "north"
			: // is emptyTile below clicked tile?
			tile.row < nrOfRows - 1 && boardState[tile.row + 1][tile.col].type === "emptyTile"
			? "south"
			: // is emptyTile left of clicked tile?
			tile.col > 0 && boardState[tile.row][tile.col - 1].type === "emptyTile"
			? "west"
			: // is emptyTile right of clicked tile?
			tile.col < colsPerRow - 1 && boardState[tile.row][tile.col + 1].type === "emptyTile"
			? "east"
			: undefined;

	const makeRows = () =>
		Object.keys(boardState).map(i => <Row key={i} row={boardState[i]} onHandleClick={onHandleClick} />);

	return <div className='board'>{makeRows()}</div>;
}

export { Board };
