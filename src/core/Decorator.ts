/// <reference path="../b3.ts" />
/// <reference path="./BaseNode.ts" />

namespace b3 {
	export class Decorator extends BaseNode {
		child:BaseNode
		constructor(params){
			super(params);
			this.child = params.child || null;
			this.category = DECORATOR
		}
	}
}