import { Decorator } from "../core/Decorator";
import { Status } from "../core/Status";

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

	onTick() {
		let status = this.child.tick();
		
		if(status ==  Status.FAILURE){
			return Status.RUNNING
		}

		return status;
	}
}