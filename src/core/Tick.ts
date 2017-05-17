/// <reference path="../b3.ts" />
/// <reference path="./BehaviorTree.ts" />
/// <reference path="./BaseNode.ts" />
namespace b3 {
	export class Tick {
		tree: BehaviorTree = null;
		debug = null;
		blackboard: Blackboard
		target = null
		_openNodes: BaseNode[];
		_nodeCount = 0;

		constructor() {
			this.tree = null;
			this.debug = null;
			this.target = null;
			this.blackboard = null;

			this._openNodes = [];
			this._nodeCount = 0;
		}

		_enterNode(node) {
			this._nodeCount++;
			this._openNodes.push(node);
		}
		
		_openNode(node) { }
		_tickNode(node) { }
		_closeNode(node) {
			this._openNodes.pop();
		}
		_exitNode(node) { }

	}

}