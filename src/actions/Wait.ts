import { Action } from "../core/Action";
import { Status } from "../core/Status";

export class Wait extends Action {
	constructor(protected duration:number = 0) {
		super();
	}

	private _startTime = 0
	onOpen() {
		this._startTime = Date.now();
	}

	onTick() {
		let currTime =  Date.now();
		if (currTime - this._startTime > this.duration) {
			return Status.SUCCESS;
		}

		return Status.RUNNING;
	}
}