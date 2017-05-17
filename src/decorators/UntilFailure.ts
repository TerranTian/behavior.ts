/// <reference path="../b3.ts" />
/// <reference path="../core/Decorator.ts" />
/// <reference path="../core/Tick.ts" />

namespace b3 {
	export class UntilFailure extends Decorator {
		constructor(params) {
			super(params)
			this.name = 'UntilFailure';
		}

		tick(tick) {
			if (!this.child)return Status.ERROR;

			let status = this.child._execute(tick);
			if(status !=  Status.FAILURE){
				return Status.RUNNING
			}
			return Status.FAILURE;
		}
	}
}