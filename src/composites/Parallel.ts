/// <reference path="../b3.ts" />
/// <reference path="../core/Composite.ts" />
/// <reference path="../core/Tick.ts" />

namespace b3 {
	/**
	 * Parallel 并行执行所有的子节点，如果某个子节点返回failure或running，它会停止后续节点的执行，
	 * 并向父节点返回failure或running。若所有的子节点都返回suceess，则向父节点返回success。
	 * 
	 * 当子节点返回running时，会终止后续节点的执行，并记住该子节点，下次tick时会从该子节点开始
	 * 执行
	 */
	export class Parallel extends Composite {
		
		open(tick) {
			tick.blackboard.set('runningIndex', 0, tick.tree.id, this.id);
		}

		tick(tick) {
			let child = tick.blackboard.get('runningIndex', tick.tree.id, this.id);
			for (let i = child; i < this.children.length; i++) {
				let status = this.children[i].execute(tick);

				if (status !== Status.SUCCESS) {
					if (status === Status.RUNNING) {
						tick.blackboard.set('runningIndex', i, tick.tree.id, this.id);
					}
					return status;
				}
			}

			return Status.SUCCESS;
		}
	}
}