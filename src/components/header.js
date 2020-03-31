import React, { useState, useEffect } from "react";
import { I18n } from "../Services/I18n";
import "./header.scss";

const Header = ({ updateHeaderReference }) => {
	const [subHeaderText, setSubHeaderText] = useState("");

	useEffect(() => updateHeaderReference({ updateHeaderText: text => setSubHeaderText(text) }));

	return (
		<header className='header'>
			<p>{I18n.get("HEADER_TEXT")}</p>
			<p className='subHeader'>{subHeaderText}</p>
		</header>
	);
};
export { Header };
