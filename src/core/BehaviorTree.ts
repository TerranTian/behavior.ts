import { BaseNode } from "./BaseNode";

import { Action } from "./Action";

export class BehaviorTree {
	private _root: BaseNode
	readonly target;

	constructor(node:Action,target) {
		this._root = node;
		this._root.setTree(this);
		
		this.target = target;
	}

	tick() {
		let status = this._root.tick();
		return status;
	}
}
