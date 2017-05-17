/// <reference path="../b3.ts" />
/// <reference path="../core/Decorator.ts" />
/// <reference path="../core/Tick.ts" />

namespace b3 {
	export class TimeLimite extends Decorator {
		maxTime = 0
		constructor(params) {
			super(params)
			this.name = 'TimeLimite';
			this.maxTime = params.maxTime;
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

			var status = this.child._execute(tick);
			if (currTime - startTime > this.maxTime) {
				return Status.FAILURE;
			}

			return status;
		}
	}
}