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

	const classNames = props.animate + " " + props.tile.type;
	return (
		<div
			className={classNames}
			data-id={props.tile.id}
			data-row={props.tile.row}
			data-col={props.tile.col}
			onClick={onClick}>
			<img
				src={props.tile.imgPath + "row-" + props.tile.row + "-col-" + props.tile.col + ".jpg"}
				alt='tile'></img>
		</div>
	);
}

export { Tile };
