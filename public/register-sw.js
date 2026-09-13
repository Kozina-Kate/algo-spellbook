const registrationScript = document.currentScript;

if ('serviceWorker' in navigator && location.protocol === 'https:' && registrationScript) {
	window.addEventListener('load', () => {
		const ownUrl = new URL(registrationScript.src);
		const scope = ownUrl.pathname.replace(/register-sw\.js$/, '');
		navigator.serviceWorker.register(`${scope}sw.js`, { scope });
	});
}
