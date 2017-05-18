/// <reference path="../b3.ts" />
/// <reference path="../core/Decorator.ts" />
/// <reference path="../core/Tick.ts" />

namespace b3 {
	/**
	 * Timer节点设置了一个定时器，他不会立即执行子节点，而是等时间到了
	 * 才去执行
	 */
	export class Timer extends Decorator {
		delay = 0
		constructor(params) {
			super(params)
			this.delay = params.delay;
		}

		open(tick) {
			let startTime = (new Date()).getTime();
			tick.blackboard.set('startTime', startTime, tick.tree.id, this.id);
		}

		tick(tick) {
			let currTime = (new Date()).getTime();
			let startTime = tick.blackboard.get('startTime', tick.tree.id, this.id);

			if (currTime - startTime >= this.delay) {
				let status = this.child.execute(tick);
				 return status
			}

			return Status.RUNNING;
		}
	}
}