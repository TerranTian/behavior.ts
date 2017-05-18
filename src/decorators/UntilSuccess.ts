/// <reference path="../b3.ts" />
/// <reference path="../core/Decorator.ts" />
/// <reference path="../core/Tick.ts" />

namespace b3 {
	/**
	 * 循环执行子节点，直到子节点返回success
	 * 
	 * 如果子节点返回的不是success，则会向父节点返回running
	 * 
	 */
	export class UntilSuccess extends Decorator {
		constructor(params) {
			super(params)
		}

		tick(tick) {
			if (!this.child)return Status.ERROR;

			let status = this.child.execute(tick);
			
			if(status ==  Status.FAILURE){
				return Status.RUNNING
			}

			return status;
		}
	}
}