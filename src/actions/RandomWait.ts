/// <reference path="../b3.ts" />
/// <reference path="../actions/Wait.ts" />
/// <reference path="../core/Tick.ts" />

namespace b3 {
	export class RandomWait extends Wait {
		constructor(params) {
			super(params)
			this.endTime = randomInter(params.min||0,params.max||10);
		}
	}
}