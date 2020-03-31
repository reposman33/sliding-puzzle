class I18n {
	defaultLanguage = "nl";

	static UITexts = {
		HEADER_TEXT: { en: "Unscramble the puzzle!", nl: "Schuif de puzzel terug!" },
		SUBHEADER_TEXT: { en: "Attempted moves:", nl: "Pogingen:" },
		DISPLAYPROGRESSTEXT: { en: "Please wait... scrambling", nl: "Even wachten... husselen..." },
		FINISHEDPROGRESSTEXT: { en: "Finished. Start unscrambling", nl: "Klaar Probeer de puzzel te maken" },
		BUTTON_SCRAMBLE_LEVEL_1: { en: "Simple scramble", nl: "Beginnend puzzelaar" },
		BUTTON_SCRAMBLE_LEVEL_2: { en: "Intermediate scramble", nl: "Gevorderd puzzelaar" },
		BUTTON_SCRAMBLE_LEVEL_3: { en: "Pro scramble", nl: "Professionele puzzelaar" },
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
