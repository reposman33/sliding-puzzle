import React from "react";
import { Board } from "./components/board";
import "./App.scss";

function App() {
	const HEADER_TEXT = "Schuif de puzzel terug!";

	return (
		<div className='App'>
			<header className='header'>
				<p>{HEADER_TEXT}</p>
			</header>
			<Board />
		</div>
	);
}

export default App;
