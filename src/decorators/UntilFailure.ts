import { Decorator } from "../core/Decorator";
import { Status } from "../core/Status";

/**
 * 循环执行子节点，直到子节点返回failure
 * 
 * 如果子节点返回的不是failure，则会向父节点返回running
 * 
 */
export class UntilFailure extends Decorator {
	onTick() {
		let status = this.child.tick();
		if(status ==  Status.SUCCESS){
			return Status.RUNNING
		}
		return status;
	}
}