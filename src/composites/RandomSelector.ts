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
			tick.blackboard.set('runningChild', 0, tick.tree.id, this.id);
		}

		tick(tick) {
			let indies:number[] = tick.blackboard.get('indies', tick.tree.id, this.id); 
			let index = tick.blackboard.get('runningChild', tick.tree.id, this.id);

			if(index >= this.children.length){
				return Status.FAILURE;
			}
			
			let status = this.children[indies[index]].execute(tick);
			if(status == Status.FAILURE){
				tick.blackboard.set('runningChild', index+1, tick.tree.id, this.id);
				return Status.RUNNING;
			}else if(status == Status.RUNNING){
				tick.blackboard.set('runningChild', index, tick.tree.id, this.id);
				return Status.RUNNING;
			}

			return status;
		}

		// tick(tick) {
		// 	let indies:number[] = tick.blackboard.get('indies', tick.tree.id, this.id); 
		// 	let child = tick.blackboard.get('runningChild', tick.tree.id, this.id);
		// 	for (let i = child; i < indies.length; i++) {
		// 		let status = this.children[indies[i]]._execute(tick);

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