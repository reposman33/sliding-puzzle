import React, { useState } from "react";
import { Row } from "./row";
import "./board.scss";

//const onClick = (tile: {}) => {};

function Board() {
	const colsPerRow = 4;
	const rowsPerBoard = 4;
	const rows = [0, 1, 2, 3];
	const cols = [0, 1, 2, 3];
	const initialState = rows.map(row =>
		cols.map(col => ({ tileId: `tile${row * colsPerRow + col}`, row: row, col: col }))
	);

	const [boardState, setBoardState] = useState(initialState);
	const onHandleClick = tile => {
		if (tile.type === "emptyTile") {
			return;
		}
	};

	const makeRows = (rowsPerBoard, colsPerRow, onHandleClick) => {
		const rows = [];
		for (let row = 0; row < rowsPerBoard; row++) {
			rows.push(<Row key={row} row={row} colsPerRow={colsPerRow} onHandleClick={onHandleClick} />);
		}
		return rows;
	};

	return <div className='board'>{makeRows(rowsPerBoard, colsPerRow, onHandleClick)}</div>;
}

export { Board };
