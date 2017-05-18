/// <reference path="../b3.ts" />
/// <reference path="./BaseNode.ts" />

namespace b3 {
	export class Composite extends BaseNode {
		children:BaseNode[]
		constructor(params){
			super(params);
			this.children = (params.children || []).slice(0);
		}
	}
}