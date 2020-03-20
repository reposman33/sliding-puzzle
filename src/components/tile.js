import React from "react";
import "./tile.scss";

function Tile(props) {
	const onClick = () => {
		props.onHandleClick({
			type: props.tile.type,
			row: props.tile.row,
			col: props.tile.col,
			tileId: props.tile.tileId
		});
	};

	return (
		<div
			className={props.tile.classList.join(" ")}
			data-id={props.tile.tileId}
			data-row={props.tile.row}
			data-col={props.tile.col}
			onClick={onClick}>
			<p>{props.tile.tileId}</p>
		</div>
	);
}

export { Tile };
