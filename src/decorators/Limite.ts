import { Decorator } from "../core/Decorator";
import { Status } from "../core/Status";
import { Action } from "../core/Action";

/**
 * 用于指定子节点的最大运行次数maxLoop，当运行次数小于maxLoop时，返回子节点的返回值
 * 否则直接返回failure
 */
export class Limite extends Decorator {
	constructor(child:Action,private maxLoop:number =1) {
		super(child);
	}

	private _count = 0;
	onOpen() {
		this._count = 0;
	}

	onTick() {
		if (this._count >= this.maxLoop) {
			return Status.FAILURE;
		}

		let status = this.child.tick();
		this._count += 1;

		return status;
	}
}