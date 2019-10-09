import { Composite } from "../core/Composite";
import { Status } from "../core/Status";

/**
 * ParallelAll 
 * It will return failure as soon as one of its child tasks return failure. 
 * It will return success only if all its child tasks return success;
 */
export class ParallelAll extends Composite {

	private count:number = 0;
	private _closedMap = {};

	onOpen() {
		this.count = 0;
		this._closedMap = {};
	}

	onTick() {
		if (this.count >= this.children.length) {
			return Status.SUCCESS
		}

		for (let i = 0; i < this.children.length; i++) {
			let child = this.children[i];
			if(this._closedMap[child.id]) continue;

			let status = child.tick();

			if (status === Status.SUCCESS) {
				this.count++;
				this._closedMap[child.id] = true;
				continue
			}

			if (status === Status.FAILURE) {
				return Status.FAILURE
			}
		}

		return Status.RUNNING;
	}

	onClose(){
		
	}
}