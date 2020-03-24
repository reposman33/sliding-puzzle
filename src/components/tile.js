import React from "react";
import "./tile.scss";

function Tile(props) {
	const onClick = () => {
		props.onHandleClick({
			type: props.tile.type,
			row: props.tile.row,
			col: props.tile.col,
			id: props.tile.id
		});
	};

	return (
		<div
			className={props.tile.type}
			data-id={props.tile.id}
			data-row={props.tile.row}
			data-col={props.tile.col}
			onClick={onClick}>
			<img src={props.tile.display} alt='Tiled image' />
			{/* <p>{props.tile.display}</p> */}
		</div>
	);
}

export { Tile };
