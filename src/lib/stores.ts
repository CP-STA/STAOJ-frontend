import { readable } from 'svelte/store';

let offset = 0;
let synced = false;
(async () => {
	let response = await fetch('https://worldtimeapi.org/api/timezone/GMT');
	let data = await response.json();
	offset = data.unixtime - Math.floor(new Date().getTime() / 1000);
	synced = true;
})();

export const time = readable<null | Date>(null, function start(set) {
	const interval = setInterval(() => {
		if (synced) {
			let date = new Date((offset + Math.floor(new Date().getTime() / 1000)) * 1000);
			set(date);
		} else {
			set(null);
		}
	}, 1000);

	return function stop() {
		clearInterval(interval);
	};
});
