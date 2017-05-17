namespace b3 {
	export let VERSION = '0.2.0';

	// Returning status

	export enum Status {
		SUCCESS = 1,
		FAILURE = 2,
		RUNNING = 3,
		ERROR = 4
	}

	// Node categories
	export let COMPOSITE = 'composite';
	export let DECORATOR = 'decorator';
	export let ACTION = 'action';
	export let CONDITION = 'condition';

	export function createUUID() {
		var s = [];
		var hexDigits = "0123456789abcdef";
		for (var i = 0; i < 36; i++) {
			s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}
		// bits 12-15 of the time_hi_and_version field to 0010
		s[14] = "4";

		// bits 6-7 of the clock_seq_hi_and_reserved to 01
		s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);

		s[8] = s[13] = s[18] = s[23] = "-";

		var uuid = s.join("");
		return uuid;
	};


	export function randomRange(len: number) {
		let indies = [],i=0;while(i<len)indies.push(i++);
		var m = indies.length;
		while (m) {
			let i = Math.floor(Math.random() * m--);
			[indies[m], indies[i]] = [indies[i], indies[m]];
		}
		return indies;
	}
}