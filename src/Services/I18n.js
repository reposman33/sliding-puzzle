class I18n {
	defaultLanguage = "nl";

	static UITexts = {
		HEADER_TEXT: { en: "Unscramble the puzzle!", nl: "Los de puzzel op!" },
		SUBHEADER_TEXT: { en: "Attempted moves:", nl: "Pogingen:" },
		DISPLAYPROGRESSTEXT: { en: "Please wait... scrambling", nl: "Even wachten... husselen..." },
		FINISHEDPROGRESSTEXT: { en: "Finished. Start unscrambling", nl: "Klaar. Probeer de puzzel te maken" },
		BUTTONS_SCRAMBLE_HEADER_TEXT: {
			en: "Click a button to scramble the puzzle",
			nl: "Klik op een knop om de puzzel te husselen"
		},
		BUTTON_SCRAMBLE_LEVEL_1: { en: "25 scrambles", nl: "25 hussels" },
		BUTTON_SCRAMBLE_LEVEL_2: { en: "50 scrambles scramble", nl: " 50 hussels" },
		BUTTON_SCRAMBLE_LEVEL_3: { en: "150 scrambles", nl: "150 hussels" },
		BUTTON_SELECT_IMAGE_AMSTERDAM: { en: "Amsterdam", nl: "Amsterdam" },
		BUTTON_SELECT_IMAGE_WORLD: { en: "Worldmap", nl: "Wereldkaart" }
	};
	static get = token => {
		return I18n.UITexts[token].hasOwnProperty(navigator.language.substr(0, 2))
			? I18n.UITexts[token][navigator.language.substr(0, 2)]
			: I18n.UITexts[token][I18n.defaultLanguage];
	};
}

export { I18n };
