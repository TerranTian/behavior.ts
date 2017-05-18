/// <reference path="../b3.ts" />
namespace b3 {
	export class Blackboard {
		private _baseMemory;
		private _treeMemory;

		constructor() {
			this._baseMemory = {};
			this._treeMemory = {};
		}

		private _getTreeMemory(treeScope) {
			if (!this._treeMemory[treeScope]) {
				this._treeMemory[treeScope] = {
					'nodeMemory': {},
					'openNodes': [],
					'traversalDepth': 0,
					'traversalCycle': 0,
				};
			}
			return this._treeMemory[treeScope];
		}

		private _getNodeMemory(treeMemory, nodeScope:string) {
			let memory = treeMemory.nodeMemory;
			if (!memory[nodeScope]) {
				memory[nodeScope] = {};
			}

			return memory[nodeScope];
		}

		private _getMemory(treeScope:string, nodeScope:string) {
			let memory = this._baseMemory;

			if (treeScope) {
				memory = this._getTreeMemory(treeScope);

				if (nodeScope) {
					memory = this._getNodeMemory(memory, nodeScope);
				}
			}

			return memory;
		}

		set(key:string|number, value:any, treeScope:string, nodeScope:string) {
			let memory = this._getMemory(treeScope, nodeScope);
			memory[key] = value;
		}

		get(key:string|number, treeScope:string, nodeScope:string) {
			let memory = this._getMemory(treeScope, nodeScope);
			return memory[key];
		}
	}
}