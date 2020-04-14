import React from "react";
import "./header.scss";

const Header = ({ headerText, progressbar, percentage }) => {
	return (
		<header className='header'>
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
