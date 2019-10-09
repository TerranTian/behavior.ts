import { Status } from "../core/Status";
import { Composite } from "../core/Composite";

/**
 * ParallelSome 
 * It will return success as soon as one of its child tasks return success. 
 * It will return failure only if all its child tasks return failure;
 */
export class ParallelSome extends Composite {
	
	private _count:number = 0;
	private _closedMap = {};

	onOpen() {
		this._count = 0;
		this._closedMap = {};
	}

	onTick() {
		if(this._count >= this.children.length){
			return Status.FAILURE
		}

		for (let i = 0; i < this.children.length; i++) {
			let child = this.children[i];
			if(this._closedMap[child.id]) continue;

			let status = this.children[i].tick();

			if (status === Status.FAILURE) {
				this._count++;
				this._closedMap[child.id] = true;
				continue
			}

			if (status === Status.SUCCESS) {
				return Status.SUCCESS
			}
		}

		return Status.RUNNING;
	}

	onClose(){
	}
}