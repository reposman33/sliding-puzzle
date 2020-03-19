import React from "react";
import { Tile } from "./tile";
import "./row.scss";

function Row(props) {
	const makeTiles = (row, colsPerRow, onHandleClick) => {
		const tiles = [];
		for (let i = 0; i < colsPerRow; i++) {
			let tileId = row * colsPerRow + i;
			tiles.push(<Tile key={tileId} tileId={tileId} row={row} col={i} onHandleClick={onHandleClick} />);
		}
		return tiles;
	};

	return <div className='row'>{makeTiles(props.row, props.colsPerRow, props.onHandleClick)}</div>;
}

export { Row };
