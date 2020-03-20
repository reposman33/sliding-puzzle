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
			const tileId = row * colsPerRow + col;
			const type = tileId === emptyTile ? "emptyTile" : "tile";

			board[row][col] = {
				tileId: tileId,
				row: row,
				col: col,
				classList: [type],
				type: type
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
			newBoard[tile.row][tile.col].classList.push(move);
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
