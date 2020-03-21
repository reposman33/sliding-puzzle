import React from "react";
import "./tile.scss";

function Tile(props) {
	const onClick = () => {
		props.onHandleClick({
			type: props.tile.type,
			row: props.tile.row,
			col: props.tile.col,
			id: props.tile.id,
			display: props.tile.display,
			animation: props.tile.animation
		});
	};

	const classNames = [];
	if (!!props.tile.animation) {
		classNames.push(props.tile.animation);
	}
	if (props.tile.type === "emptyTile") {
		classNames.push("emptyTile");
	}
	if (props.tile.type === "tile") {
		classNames.push("tile");
	}
	console.log(classNames);
	return (
		<div
			className={classNames.join(" ")}
			data-id={props.tile.id}
			data-row={props.tile.row}
			data-col={props.tile.col}
			onClick={onClick}>
			<p>{props.tile.display}</p>
		</div>
	);
}

export { Tile };
