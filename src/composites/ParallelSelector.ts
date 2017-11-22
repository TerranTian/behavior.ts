/// <reference path="../b3.ts" />
/// <reference path="../core/Composite.ts" />
/// <reference path="../core/Tick.ts" />

namespace b3 {
	/**
	 * ParallelSelector 
	 * It will return failure as soon as one of its child tasks return failure. 
	 * It will return success only if all its child tasks return success;
	 */
	export class ParallelSelector extends Composite {
		
		open(tick) {
			tick.blackboard.set('runningIndex', 0, tick.tree.id, this.id);
			tick.blackboard.set('count', 0, tick.tree.id, this.id);
		}

		tick(tick) {
			let child = tick.blackboard.get('runningIndex', tick.tree.id, this.id);
			let count = tick.blackboard.get('count', tick.tree.id, this.id);
			if(count => this.children.length){
				return Status.SUCCESS
			}

			for (let i = child; i < this.children.length; i++) {
				let status = this.children[i].execute(tick);

				if (status === Status.SUCCESS) {
					tick.blackboard.set('count', count+1, tick.tree.id, this.id);
					continue
				}

				if (status === Status.RUNNING) {
					tick.blackboard.set('runningIndex', i, tick.tree.id, this.id);
					continue
				}

				if (status === Status.FAILURE) {
					return Status.FAILURE
				}
			}

			return Status.RUNNING;
		}
	}
}