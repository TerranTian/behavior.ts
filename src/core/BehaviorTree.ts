/// <reference path="../b3.ts" />
/// <reference path="./BaseNode.ts" />
/// <reference path="./Tick.ts" />

namespace b3 {
	export class BehaviorTree {
		readonly id: string
		private _root: BaseNode

		debug = null
		constructor(params) {
			this.id = createUUID();
			this._root = params.root
		}

		tick(target, blackboard) {
			if (!blackboard) {
				throw 'The blackboard parameter is obligatory and must be an instance of b3.Blackboard';
			}

			let tick = new Tick();
			tick.debug = this.debug;
			tick.target = target;
			tick.blackboard = blackboard;
			tick.tree = this;

			let state = this._root.execute(tick);

			return state;
		}
	}
}