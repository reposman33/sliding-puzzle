import React, { useState } from "react";
import { Row } from "./row";
import "./board.scss";

function Board() {
	const nrOfRows = 4;
	const colsPerRow = 4;
	const emptyTile = 0;
	const board = {};
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
				animate: ""
			};
		}
	}

	const [boardState, setBoardState] = useState(board);

	const onHandleClick = tile => {
		if (tile.type === "emptyTile") {
			return;
		}
		const move = determineMove(tile);

		if (move) {
			const newBoard = { ...boardState };
			// update type of clicked tile
			newBoard[tile.row][tile.col].type = "emptyTile";
			// update type of empty tile

			if (move === "west") {
				newBoard[tile.row][tile.col - 1].type = "tile";
			} else if (move === "east") {
				newBoard[tile.row][tile.col + 1].type = "tile";
			} else if (move === "north") {
				newBoard[tile.row - 1][tile.col].type = "tile";
			} else if (move === "south") {
				newBoard[tile.row + 1][tile.col].type = "tile";
			}
			setBoardState(newBoard);
		}
	};

	const determineMove = tile =>
		tile.row > 0 && boardState[tile.row - 1][tile.col].type === "emptyTile"
			? "north"
			: tile.row < nrOfRows && boardState[tile.row + 1][tile.col].type === "emptyTile"
			? "south"
			: tile.col > 0 && boardState[tile.row][tile.col - 1].type === "emptyTile"
			? "west"
			: tile.row < colsPerRow && boardState[tile.row][tile.col + 1].type === "emptyTile"
			? "east"
			: undefined;

	const makeRows = () =>
		Object.keys(boardState).map(i => <Row key={i} row={boardState[i]} onHandleClick={onHandleClick} />);

	return <div className='board'>{makeRows()}</div>;
}

export { Board };
