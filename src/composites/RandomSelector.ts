/// <reference path="../b3.ts" />
/// <reference path="../core/Composite.ts" />
/// <reference path="../core/Tick.ts" />

namespace b3 {
	export class RandomSelector extends Composite {
		constructor(params) {
			super(params)
			this.name = 'RandomSelector';
		}

		open(tick) {
			tick.blackboard.set('indies', b3.randomRange(this.children.length), tick.tree.id, this.id);
			tick.blackboard.set('runningChild', 0, tick.tree.id, this.id);
		}

		tick(tick) {
			let indies:number[] = tick.blackboard.get('indies', tick.tree.id, this.id); 
			var child = tick.blackboard.get('runningChild', tick.tree.id, this.id);
			for (var i = child; i < indies.length; i++) {
				var status = this.children[indies[i]]._execute(tick);

				if (status !== Status.FAILURE) {
					if (status === Status.RUNNING) {
						tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
					}

					return status;
				}
			}

			return Status.FAILURE;
		}
	}
}