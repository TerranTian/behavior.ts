import { Status } from "../core/Status";
import { Composite } from "../core/Composite";

/**
 * Selector称为选择节点或优先级节点，会从左到右依次执行所有的子节点，只要子节点返回failure，就执行后续的子节点，
 * 直到有一个节点返回success或running为止，这时会停止后续子节点的执行，向
 * 父节点返回success或running，若所有子节点都返回failure，那么他会向父节点返回failure
 * 
 * 当子节点返回running时，会终止后续节点的执行，并记住该子节点，下次tick时会从该子节点开始
 * 执行
 * 
 * 
 * It will return success as soon as one of its child tasks return success. 
 * If a child task returns failure then it will sequentially run the next task. 
 * If a child node return running it will return running.
 * If no child task returns success then it will return failure.
 *
 */

export class Selector extends Composite {

	private _runningIndex = 0;
	onOpen() {
		this._runningIndex = 0;
	}

	onTick() {
		let index = this._runningIndex;
		for (let i = index; i < this.children.length; i++) {
			let status = this.children[i].tick();

			if(status == Status.FAILURE) continue;
			
			if (status === Status.RUNNING) {
				this._runningIndex = i;
			}
			return status
		}

		return Status.FAILURE;
	}
}