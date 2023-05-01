function isDocumentReady(callback) {
	if (document.readyState === 'complete' || document.readyState === 'interactive') {
		callback();
	} else {
		document.addEventListener('DOMContentLoaded', callback);
	}
}


function main() {
	const videoContainer = document.querySelector('video')?.parentNode.parentNode.parentNode;
	
	if (!window.location.pathname.startsWith("/posts/") || !videoContainer) return;

	const mainContainer = document.querySelector("main#renderPageContentWrapper");
	const twoColumns = mainContainer.firstChild.firstChild.firstChild.firstChild.lastChild;
	const [leftCol, rightCol] = [...twoColumns.children].slice(-2);

	videoContainer.classList.add("v-container");
	leftCol.classList.add("pt-left-col");
	rightCol.classList.add("pt-right-col");

	let width = mainContainer.getBoundingClientRect().width + "px";

	document.documentElement.style.setProperty("--v-width", width);

	const VRO = new ResizeObserver((entries) => {
		const vHeight = entries[0].contentRect.height + 16;
		document.documentElement.style.setProperty("--col-top", vHeight + "px");
		document.documentElement.style.setProperty("--v-top", (-vHeight) + "px");
	})
	const CRO = new ResizeObserver((entries) => {
		const cWidth = entries[0].contentRect.width;
		document.documentElement.style.setProperty("--v-width", cWidth + "px");
	})
	
	VRO.observe(videoContainer);
	CRO.observe(mainContainer);
}

isDocumentReady(main);
