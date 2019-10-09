import { Decorator } from "../core/Decorator";
import { Status } from "../core/Status";

/**
 * 如果子节点返回success，则返回failure
 * 如果子节点返回failure, 则返回success
 */
export class Inverter extends Decorator {
	
	onTick() {
		let status = this.child.tick();

		if (status == Status.SUCCESS) {
			status = Status.FAILURE;
		} else if (status == Status.FAILURE) {
			status = Status.SUCCESS;
		}

		return status;
	}
}