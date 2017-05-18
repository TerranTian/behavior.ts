/// <reference path="../b3.ts" />
/// <reference path="../core/Decorator.ts" />
/// <reference path="../core/Tick.ts" />

namespace b3 {
	/**
	 * 用于指定子节点的最长运行时间
	 * 如果子节点的的运行时间超过了maxTime，则取消子节点的运行，直接返回failure，
	 * 否则返回子节点的返回值
	 * 
	 */
	export class TimeLimite extends Decorator {
		maxTime = 0
		constructor(params) {
			super(params)
			this.maxTime = params.maxTime;
		}

		open(tick) {
			let startTime = (new Date()).getTime();
			tick.blackboard.set('startTime', startTime, tick.tree.id, this.id);
		}
		tick(tick) {
			let currTime = (new Date()).getTime();
			let startTime = tick.blackboard.get('startTime', tick.tree.id, this.id);

			let status = this.child.execute(tick);
			if (currTime - startTime > this.maxTime) {
				//force to close the action node
				this.child._close(tick);
				return Status.FAILURE;
			}

			return status;
		}
	}
}