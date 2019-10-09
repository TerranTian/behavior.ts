import { Composite } from "../core/Composite";
import { randomRange } from "../core/Helper";
import { Status } from "../core/Status";

/**
 * 同Selector节点，不同的是它的子节点执行顺序是随机的。
 */

export class RandomSelector extends Composite {

	private _indies:number[] = [];
	private _runningIndex:number = 0;

	onOpen() {
		this._runningIndex = 0;
		this._indies = randomRange(this.children.length);
	}

	onTick() {
		let indies:number[] = this._indies; 
		let index = this._runningIndex;
		for (let i = index; i < indies.length; i++) {
			let status = this.children[indies[i]].tick();

			if(status == Status.FAILURE) continue;
			
			if (status === Status.RUNNING) {
				this._runningIndex = i;
			}
			return status;	
		}

		return Status.FAILURE;
	}
}