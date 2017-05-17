/// <reference path="../b3.ts" />
/// <reference path="../core/Decorator.ts" />
/// <reference path="../core/Tick.ts" />

namespace b3 {
	export class Timer extends Decorator {
		delay = 0
		constructor(params) {
			super(params)
			this.name = 'Timer';
			this.delay = params.delay;
		}

		open(tick) {
			var startTime = (new Date()).getTime();
			tick.blackboard.set('startTime', startTime, tick.tree.id, this.id);
		}
		
		tick(tick) {
			if (!this.child) {
				return Status.ERROR;
			}

			var currTime = (new Date()).getTime();
			var startTime = tick.blackboard.get('startTime', tick.tree.id, this.id);

			if (currTime - startTime >= this.delay) {
				 return this.child._execute(tick);
			}

			return Status.RUNNING;
		}
	}
}