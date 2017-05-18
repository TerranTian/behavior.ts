/// <reference path="../b3.ts" />
/// <reference path="./BehaviorTree.ts" />
/// <reference path="./BaseNode.ts" />

namespace b3 {
	export class Tick {
		tree: BehaviorTree = null;
		debug = null;
		blackboard: Blackboard = null
		target = null

		constructor() {
		}

		_enterNode(node) {}
		_openNode(node) { }
		_tickNode(node) { }
		_closeNode(node) {}
		_exitNode(node) {}
	}

}