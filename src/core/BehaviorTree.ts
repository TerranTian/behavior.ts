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
		}

		tick(target, blackboard) {
			if (!blackboard) {
				throw 'The blackboard parameter is obligatory and must be an ' +
				'instance of b3.Blackboard';
			}

			var tick = new Tick();
			tick.debug      = this.debug;
			tick.target = target;
			tick.blackboard = blackboard;
			tick.tree = this;

			var state = this._root._execute(tick);
			var lastOpenNodes = blackboard.get('openNodes', this.id);
			var currOpenNodes = tick._openNodes.slice(0);

			var start = 0;
			var i;
			for (i = 0; i < Math.min(lastOpenNodes.length, currOpenNodes.length); i++) {
				start = i + 1;
				if (lastOpenNodes[i] !== currOpenNodes[i]) {
					break;
				}
			}

			// close the nodes
			for (i = lastOpenNodes.length - 1; i >= start; i--) {
				lastOpenNodes[i]._close(tick);
			}

			/* POPULATE BLACKBOARD */
			blackboard.set('openNodes', currOpenNodes, this.id);
			blackboard.set('nodeCount', tick._nodeCount, this.id);

			return state;
		}
	}
}