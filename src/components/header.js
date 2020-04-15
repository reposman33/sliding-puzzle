import React from "react";
import "./header.scss";

const Header = ({ headerText, progressbar, percentage, selectLanguage, selectedLanguage }) => {
	return (
		<header className='header'>
			<div className='languagebutton'>
				<span data-lang='en' onClick={selectLanguage} class={selectedLanguage === "en" ? "selected" : ""}>
					en
				</span>
				&nbsp;/&nbsp;
				<span data-lang='nl' onClick={selectLanguage} class={selectedLanguage === "nl" ? "selected" : ""}>
					nl
				</span>
			</div>
			<p>{headerText}</p>
			<span className='progressbar'>
				{progressbar}
				<span style={{ display: !!percentage ? "inline" : "none" }} className='percentage'>
					{percentage}%
				</span>
			</span>
		</header>
	);
};
export { Header };
