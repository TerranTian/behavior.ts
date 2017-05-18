/// <reference path="../b3.ts" />
/// <reference path="../core/Decorator.ts" />
/// <reference path="../core/Tick.ts" />

namespace b3 {
	/**
	 * 用于指定子节点的最大运行次数maxLoop，当运行次数小于maxLoop时，返回子节点的返回值
	 * 否则直接返回failure
	 */
	export class Limite extends Decorator {
		maxLoop = 1
		constructor(params) {
			super(params)
			this.maxLoop = params.maxLoop;
		}

		open(tick) {
			tick.blackboard.set('count', 0, tick.tree.id, this.id);
		}

		tick(tick) {
			if (!this.child)return Status.ERROR;

			let count = tick.blackboard.get('count', tick.tree.id, this.id);

			if (count >= this.maxLoop) {
				return Status.FAILURE;
			}

			let status = this.child.execute(tick);
			if (status == Status.RUNNING){
				tick.blackboard.set('i', count + 1, tick.tree.id, this.id);
			}

			return status;
		}

		// tick(tick) {
		// 	if (!this.child)return Status.ERROR;

		// 	let count = tick.blackboard.get('count', tick.tree.id, this.id);

		// 	if (count < this.maxLoop) {
		// 		let status = this.child._execute(tick);

		// 		if (status == Status.SUCCESS || status == Status.FAILURE)
		// 			tick.blackboard.set('i', count + 1, tick.tree.id, this.id);

		// 		return status;
		// 	}

		// 	return Status.FAILURE;
		// }
	}
}