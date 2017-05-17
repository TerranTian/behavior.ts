/// <reference path="../b3.ts" />
/// <reference path="../core/Decorator.ts" />
/// <reference path="../core/Tick.ts" />

namespace b3 {
	export class Inverter extends Decorator {
		constructor(params) {
			super(params)
			this.name = 'Inverter';
		}

		tick(tick) {
			if (!this.child) {
				return Status.ERROR;
			}

			var status = this.child._execute(tick);

			if (status == Status.SUCCESS) {
				status = Status.FAILURE;
			} else if (status == Status.FAILURE) {
				status = Status.SUCCESS;
			}

			return status;
		}
	}
}