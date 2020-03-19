import React from "react";
import "./tile.scss";

function Tile(props) {
	const onClick = () => {
		props.onHandleClick({ type: props.tileId, row: props.row, col: props.col });
	};

	return (
		<div
			className={props.tileId === 0 ? "emptyTile" : "tile"}
			data-id={props.tileId}
			data-row={props.row}
			data-col={props.col}
			onClick={onClick}>
			<p>{props.tileId}</p>
		</div>
	);
}

export { Tile };
