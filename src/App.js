import React from "react";
import { Board } from "./components/board";
import "./App.scss";

function App() {
	return (
		<div className='App'>
			<header className='header'>
				<p>Arrange the tiles</p>
			</header>
			<Board />
		</div>
	);
}

export default App;
