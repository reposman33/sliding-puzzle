import React, { useState } from "react";
import { Tile } from "./tile";
import "./board.scss";

//const onClick = (tile: {}) => {};

function Board() {
	const colsPerRow = 4;
	const rows = [0, 1, 2, 3];
	const cols = [0, 1, 2, 3];
	const initialState = rows.map(row =>
		cols.map(col => ({ tileId: `tile${row * colsPerRow + col}`, row: row, col: col }))
	);
	// the empty tile is at top left position
	const emptyTile = initialState[0][0];

	const [boardState, setBoardState] = useState(initialState);

	const onHandleClick = tile => {
		if (tile.type === "emptyTile") {
			return;
		}
	};

	return (
		<div className='board'>
			<div className='row'>
				<Tile class='emptyTile' tileId='emptyTile' row='0' col='0' onHandleClick={onHandleClick} />
				<Tile class='tile' tileId='tile1' row='0' col='1' onHandleClick={onHandleClick} />
				<Tile class='tile' tileId='tile2' row='0' col='2' onHandleClick={onHandleClick} />
				<Tile class='tile' tileId='tile3' row='0' col='3' onHandleClick={onHandleClick} />
			</div>
			<div className='row'>
				<Tile class='tile' tileId='tile4' row='1' col='0' onHandleClick={onHandleClick} />
				<Tile class='tile' tileId='tile5' row='1' col='1' onHandleClick={onHandleClick} />
				<Tile class='tile' tileId='tile6' row='1' col='2' onHandleClick={onHandleClick} />
				<Tile class='tile' tileId='tile7' row='1' col='3' onHandleClick={onHandleClick} />
			</div>
			<div className='row'>
				<Tile class='tile' tileId='tile8' row='2' col='0' onHandleClick={onHandleClick} />
				<Tile class='tile' tileId='tile9' row='2' col='1' onHandleClick={onHandleClick} />
				<Tile class='tile' tileId='tile10' row='2' col='2' onHandleClick={onHandleClick} />
				<Tile class='tile' tileId='tile11' row='2' col='3' onHandleClick={onHandleClick} />
			</div>
			<div className='row'>
				<Tile class='tile' tileId='tile12' row='3' col='0' onHandleClick={onHandleClick} />
				<Tile class='tile' tileId='tile13' row='3' col='1' onHandleClick={onHandleClick} />
				<Tile class='tile' tileId='tile14' row='3' col='2' onHandleClick={onHandleClick} />
				<Tile class='tile' tileId='tile15' row='3' col='3' onHandleClick={onHandleClick} />
			</div>
		</div>
	);
}

export { Board };
