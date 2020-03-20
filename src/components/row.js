import React from "react";
import { Tile } from "./tile";
import "./row.scss";

function Row(props) {
	const makeTiles = (row, onHandleClick) =>
		Object.keys(row).map(i => <Tile key={row[i].id} tile={row[i]} onHandleClick={onHandleClick} />);

	return <div className='row'>{makeTiles(props.row, props.onHandleClick)}</div>;
}

export { Row };
