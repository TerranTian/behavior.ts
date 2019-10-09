import { Decorator } from "../core/Decorator";
import { Action } from "../core/Action";
import { Status } from "../core/Status";

/**
 * Timer节点设置了一个定时器，他不会立即执行子节点，而是等时间到了
 * 才去执行
 */
export class Timer extends Decorator {
	constructor(child:Action,public delay = 0) {
		super(child)
	}

	private _startTime:number = 0
	onOpen() {
		this._startTime = Date.now();
	}

	onTick() {
		let currTime = Date.now();

		if (currTime - this._startTime >= this.delay) {
			let status = this.child.tick();
			return status
		}

		return Status.RUNNING;
	}
}