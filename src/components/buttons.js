import React from "react";
import { I18n } from "../Services/I18n";
import "../constants";
import * as constants from "../constants";
import "./buttons.scss";

const Buttons = ({ onScramble, setBoardState, makeBoard }) => {
	const onClickScramble = (level, speed) => {
		onScramble(level, speed);
	};

	const onClickMakePuzzle = image => {
		setBoardState(makeBoard(image));
	};

	return (
		<React.Fragment>
			<div>
				<div className='scrambleButtonsHeader'>{I18n.get("BUTTONS_SCRAMBLE_HEADER_TEXT")}</div>
				<button
					onClick={() => {
						onClickScramble(constants.BEGINNER_NROFSCRAMBLES, constants.ADAGIO_SCRAMBLESPEED);
					}}>
					{I18n.get("BUTTON_SCRAMBLE_LEVEL_1")}
				</button>
				<button
					onClick={() => {
						onClickScramble(constants.INTERMEDIATE_NROFSCRAMBLES, constants.MODERATO_SCRAMBLESPEED);
					}}>
					{I18n.get("BUTTON_SCRAMBLE_LEVEL_2")}
				</button>
				<button
					onClick={() => {
						onClickScramble(constants.PRO_NROFSCRAMBLES, constants.ALLEGRO_SCRAMBLESPEED);
					}}>
					{I18n.get("BUTTON_SCRAMBLE_LEVEL_3")}
				</button>
			</div>
			<div>
				<button onClick={() => onClickMakePuzzle("Amsterdam")}>
					{I18n.get("BUTTON_SELECT_IMAGE_AMSTERDAM")}
				</button>
				<button onClick={() => onClickMakePuzzle("Worldmap")}>{I18n.get("BUTTON_SELECT_IMAGE_WORLD")}</button>
			</div>
			)
		</React.Fragment>
	);
};

export { Buttons };
