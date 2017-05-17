/// <reference path="../b3.ts" />
/// <reference path="../core/Action.ts" />
/// <reference path="../core/Tick.ts" />

namespace b3 {
	export class Wait extends Action {

		private endTime: number = 0
		constructor(params) {
			super(params)
			this.name = 'Wait';
			this.endTime = params.milliseconds || 0;
		}

		open(tick) {
			var startTime = (new Date()).getTime();
			tick.blackboard.set('startTime', startTime, tick.tree.id, this.id);
		}

		tick(tick: Tick) {
			var currTime = (new Date()).getTime();
			var startTime = +tick.blackboard.get('startTime', tick.tree.id, this.id);

			if (currTime - startTime > this.endTime) {
				return Status.SUCCESS;
			}

			return Status.RUNNING;
		}
	}
}