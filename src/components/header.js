import React from "react";
import { I18n } from "../Services/I18n";
import "./header.scss";

const Header = ({ subHeaderText, moveCount }) => {
	return (
		<header className='header'>
			<p>{I18n.get("HEADER_TEXT")}</p>
			<p className='subHeader'>{moveCount ? `${subHeaderText} ${moveCount}` : ""}</p>
		</header>
	);
};
export { Header };

// const Header = ({ updateHeaderReference, moveCount }) => {
// 	const [subHeaderText, setSubHeaderText] = useState("");
// 	const [_moveCount, setMoveCount] = useState(moveCount);

// 	useEffect(() =>
// 		updateHeaderReference({
// 			updateHeaderText: text => setSubHeaderText(text),
// 			updateMoveCount: count => setMoveCount(count)
// 		})
// 	);

// 	return (
// 		<header className='header'>
// 			<p>{I18n.get("HEADER_TEXT")}</p>
// 			<p className='subHeader'>{_moveCount ? `${subHeaderText} ${_moveCount}` : ""}</p>
// 		</header>
// 	);
// };
// export { Header };
