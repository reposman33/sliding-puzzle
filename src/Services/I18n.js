class I18n {
	static selectedLanguage = ["en", "nl"].includes(navigator.language) ? navigator.language : "en";
	static selectLanguage(lang) {
		I18n.selectedLanguage = lang;
	}

	static UITexts = {
		HEADER_TEXT: { en: "Unscramble the puzzle!", nl: "Los de puzzel op!" },
		SUBHEADER_TEXT: { en: "Attempted moves:", nl: "Hussels:" },
		DISPLAYPROGRESSTEXT: { en: "Please wait... scrambling", nl: "Even wachten... husselen..." },
		FINISHEDPROGRESSTEXT: { en: "Start unscrambling", nl: "Probeer de puzzel te maken" },
		BUTTONS_SCRAMBLE_HEADER_TEXT: {
			en: "Click a button to scramble the puzzle",
			nl: "Klik op een knop om de puzzel te husselen",
		},
		BUTTON_SCRAMBLE_LEVEL_1: { en: "25 scrambles", nl: "25 hussels" },
		BUTTON_SCRAMBLE_LEVEL_2: { en: "50 scrambles scramble", nl: " 50 hussels" },
		BUTTON_SCRAMBLE_LEVEL_3: { en: "150 scrambles", nl: "150 hussels" },
		BUTTON_SELECT_IMAGE_AMSTERDAM: { en: "Amsterdam", nl: "Amsterdam" },
		BUTTON_SELECT_IMAGE_WORLD: { en: "Worldmap", nl: "Wereldkaart" },
		LABEL_BUTTON_SELECT_IMAGE: { en: "Select a puzzle", nl: "Selecteer een puzzel" },
	};
	static get = (token) => I18n.UITexts[token][I18n.selectedLanguage];
}

export { I18n };
