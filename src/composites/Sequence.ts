/// <reference path="../b3.ts" />
/// <reference path="../core/Composite.ts" />
/// <reference path="../core/Tick.ts" />

namespace b3 {
	export class Sequence extends Composite {
		constructor(params) {
			super(params)
			this.name = 'Sequence';
		}

		open(tick) {
			tick.blackboard.set('runningChild', 0, tick.tree.id, this.id);
		}

		tick(tick) {
			var child = tick.blackboard.get('runningChild', tick.tree.id, this.id);
			for (var i = child; i < this.children.length; i++) {
				var status = this.children[i]._execute(tick);

				if (status !== Status.SUCCESS) {
					if (status === Status.RUNNING) {
						tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
					}
					return status;
				}
			}

			return Status.SUCCESS;
		}
	}
}