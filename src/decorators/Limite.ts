/// <reference path="../b3.ts" />
/// <reference path="../core/Decorator.ts" />
/// <reference path="../core/Tick.ts" />

namespace b3 {
	export class Limite extends Decorator {
		maxLoop = 1
		constructor(params) {
			super(params)
			this.name = 'Limite';
			this.maxLoop = params.maxLoop;
		}

		open(tick) {
			tick.blackboard.set('count', 0, tick.tree.id, this.id);
		}
		
		tick(tick) {
			if (!this.child)return Status.ERROR;

			var count = tick.blackboard.get('count', tick.tree.id, this.id);

			if (count < this.maxLoop) {
				var status = this.child._execute(tick);

				if (status == Status.SUCCESS || status == Status.FAILURE)
					tick.blackboard.set('i', count + 1, tick.tree.id, this.id);

				return status;
			}

			return Status.FAILURE;
		}
	}
}