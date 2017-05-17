/// <reference path="../b3.ts" />
/// <reference path="./BaseNode.ts" />

namespace b3{
	export class Action extends BaseNode {
		constructor(params) {
			super(params)
			this.category = ACTION;
		}
	}
}