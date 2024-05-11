import { useState, useEffect, Dispatch, SetStateAction } from 'react';

const initBeforeUnLoad = (showExitPrompt: boolean) => {
	window.onbeforeunload = (event: BeforeUnloadEvent) => {
		if (showExitPrompt) {
			const e = event || window.event;
			e.preventDefault();
			if (e) {
				e.returnValue = '';
			}

			return '';
		}
	};
};


export default function useExitPrompt(defaultState: boolean): [boolean, Dispatch<SetStateAction<boolean>>] {
	const [showExitPrompt, setShowExitPrompt] = useState(defaultState);

	useEffect(() => {
		window.onload = function () {
			initBeforeUnLoad(showExitPrompt);
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		initBeforeUnLoad(showExitPrompt);
	}, [showExitPrompt]);

	return [showExitPrompt, setShowExitPrompt];
}
