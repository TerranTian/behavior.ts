/// <reference path="../b3.ts" />
/// <reference path="../core/Composite.ts" />
/// <reference path="../core/Tick.ts" />

namespace b3 {
	/**
	 * 同Selector节点，不同的是它的子节点执行顺序是随机的。
	 */

	export class RandomSelector extends Composite {

		open(tick) {
			tick.blackboard.set('indies', b3.randomRange(this.children.length), tick.tree.id, this.id);
			tick.blackboard.set('runningIndex', 0, tick.tree.id, this.id);
		}

		tick(tick) {
			let indies:number[] = tick.blackboard.get('indies', tick.tree.id, this.id); 
			let index = tick.blackboard.get('runningIndex', tick.tree.id, this.id);
			for (let i = index; i < indies.length; i++) {
				let status = this.children[indies[i]].execute(tick);

				if(status == Status.FAILURE) continue;
				
				if (status === Status.RUNNING) {
					tick.blackboard.set('runningIndex', i, tick.tree.id, this.id);
				}
				return status;	
			}

			return Status.FAILURE;
		}
	}
}