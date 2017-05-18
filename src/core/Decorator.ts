/// <reference path="../b3.ts" />
/// <reference path="./Action.ts" />

namespace b3 {
	export class Decorator extends BaseNode {
		child:Action
		constructor(params){
			super(params);
			this.child = params.child || null;
		}
	}
}