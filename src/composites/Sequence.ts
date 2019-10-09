import { Composite } from "../core/Composite";
import { Status } from "../core/Status";

/**
 * Sequence称为顺序节点，他会从左向右依次执行所有的子节点，只要子节点返回success，
 * 它就执行后续的子节点。如果某个子节点返回failure或running，它会停止后续节点的执行，
 * 并向父节点返回failure或running。若所有的子节点都返回suceess，则向父节点返回success。
 * 
 * 当子节点返回running时，会终止后续节点的执行，并记住该子节点，下次tick时会从该子节点开始
 * 执行
 * 
 * It will return failure as soon as one of its child node return failure.
 * If a child node returns success then it will sequentially run the next task. 
 * If all child nodes return success then it will return success.
 * If a child returns running it will return running.
 * 
 */
export class Sequence extends Composite {
	
	private _runningIndex = 0;
	onOpen() {
		this._runningIndex = 0;
	}

	onTick() {
		for (let i = this._runningIndex; i < this.children.length; i++) {
			let status = this.children[i].tick();

			if(status == Status.SUCCESS) continue;
			
			if (status === Status.RUNNING) {
				this._runningIndex = i;
			}
			return status
		}

		return Status.SUCCESS;
	}
}