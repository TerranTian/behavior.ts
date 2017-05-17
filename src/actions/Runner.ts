/// <reference path="../b3.ts" />
/// <reference path="../core/Action.ts" />
/// <reference path="../core/Tick.ts" />

namespace b3 {
	export class Runner extends Action {
		constructor(params) {
			super(params)
			this.name = 'Runner';
		}

		tick(tick: Tick) {
			return Status.RUNNING;
		}
	}
}