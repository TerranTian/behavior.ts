/// <reference path="../b3.ts" />
/// <reference path="../core/Decorator.ts" />
/// <reference path="../core/Tick.ts" />

namespace b3 {
	/**
	 * 如果子节点返回success，则返回failure
	 * 如果子节点返回failure, 则返回success
	 */
	export class Inverter extends Decorator {
		constructor(params) {
			super(params)
		}

		tick(tick) {
			let status = this.child.execute(tick);

			if (status == Status.SUCCESS) {
				status = Status.FAILURE;
			} else if (status == Status.FAILURE) {
				status = Status.SUCCESS;
			}

			return status;
		}
	}
}