import { Decorator } from "../core/Decorator";
import { Status } from "../core/Status";
import { Action } from "../core/Action";


/**
 * 用于指定子节点的最长运行时间
 * 如果子节点的的运行时间超过了maxTime，则取消子节点的运行，直接返回failure，
 * 否则返回子节点的返回值
 * 
 */
export class TimeLimite extends Decorator {
	constructor(child:Action,public maxTime = 0) {
		super(child)
	}

	private _startTime:number = 0
	onOpen() {
		this._startTime = Date.now();
	}
	onTick() {
		let currTime =Date.now();;
		let status = this.child.tick();
		if (currTime - this._startTime > this.maxTime) {
			return Status.FAILURE;
		}

		return status;
	}
}