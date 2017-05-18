/// <reference path="../b3.ts" />
/// <reference path="../core/Composite.ts" />
/// <reference path="../core/Tick.ts" />

namespace b3 {
	/**
	 * Selector称为选择节点或优先级节点，会从左到右依次执行所有的子节点，只要子节点返回failure，就执行后续的子节点，
	 * 直到有一个节点返回success或running为止，这时会停止后续子节点的执行，向
	 * 父节点返回success或running，若所有子节点都返回failure，那么他会向父节点返回failure
	 * 
	 * 当子节点返回running时，会终止后续节点的执行，并记住该子节点，下次tick时会从该子节点开始
	 * 执行
	 */

	export class Selector extends Composite {

		open(tick) {
			tick.blackboard.set('runningIndex', 0, tick.tree.id, this.id);
		}

		tick(tick) {
			let index = tick.blackboard.get('runningIndex', tick.tree.id, this.id);
			if (index >= this.children.length) {
				return Status.FAILURE
			}

			let status = this.children[index].execute(tick);
			if (status == Status.FAILURE) {
				tick.blackboard.set('runningIndex', index + 1, tick.tree.id, this.id);
				return Status.RUNNING;
			}
			else if (status === Status.RUNNING) {
				tick.blackboard.set('runningIndex', index, tick.tree.id, this.id);
				return Status.RUNNING;
			}

			return status;
		}

		// tick(tick) {
		// 	let child = tick.blackboard.get('runningChild', tick.tree.id, this.id);
		// 	for (let i = child; i < this.children.length; i++) {
		// 		let status = this.children[i]._execute(tick);

		// 		if (status !== Status.FAILURE) {
		// 			if (status === Status.RUNNING) {
		// 				tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
		// 			}

		// 			return status;
		// 		}
		// 	}

		// 	return Status.FAILURE;
		// }
	}
}