/// <reference path="../b3.ts" />
/// <reference path="../core/Composite.ts" />
/// <reference path="../core/Tick.ts" />

namespace b3 {
	/**
	 * Sequence称为顺序节点，他会从左向右依次执行所有的子节点，只要子节点返回success，
	 * 它就执行后续的子节点。如果某个子节点返回failure或running，它会停止后续节点的执行，
	 * 并向父节点返回failure或running。若所有的子节点都返回suceess，则向父节点返回success。
	 * 
	 * 当子节点返回running时，会终止后续节点的执行，并记住该子节点，下次tick时会从该子节点开始
	 * 执行
	 */
	export class Sequence extends Composite {
		
		open(tick) {
			tick.blackboard.set('runningIndex', 0, tick.tree.id, this.id);
		}

		tick(tick) {
			let index = tick.blackboard.get('runningIndex', tick.tree.id, this.id);
			if (index >= this.children.length) {
				return Status.SUCCESS
			}

			let status = this.children[index].execute(tick);

			if (status == Status.SUCCESS) {
				tick.blackboard.set('runningIndex', index + 1, tick.tree.id, this.id);
				return Status.RUNNING;
			}
			if (status === Status.RUNNING) {
				tick.blackboard.set('runningChild', index, tick.tree.id, this.id);
				return Status.RUNNING;
			}

			return status;
		}

		// tick(tick) {
		// 	let child = tick.blackboard.get('runningChild', tick.tree.id, this.id);
		// 	for (let i = child; i < this.children.length; i++) {
		// 		let status = this.children[i]._execute(tick);

		// 		if (status !== Status.SUCCESS) {
		// 			if (status === Status.RUNNING) {
		// 				tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
		// 			}
		// 			return status;
		// 		}
		// 	}

		// 	return Status.SUCCESS;
		// }
	}
}