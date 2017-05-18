/// <reference path="../b3.ts" />

namespace b3 {
	export class BaseNode {
		readonly id: string;

		parameters = null
		constructor(params) {
			this.id = createUUID()
			this.parameters = params;
		}

		execute(tick) {
			this._enter(tick);
			if (!tick.blackboard.get('isOpen', tick.tree.id, this.id)) {
				this._open(tick);
			}
			let status = this._tick(tick);
			if (status !== Status.RUNNING) {
				this._close(tick);
			}
			this._exit(tick);

			return status;
		}

		private _enter(tick) {
			tick._enterNode(this);
			this.enter(tick);
		}
		private _open(tick) {
			tick._openNode(this);
			tick.blackboard.set('isOpen', true, tick.tree.id, this.id);
			this.open(tick);
		}
		private _tick(tick): b3.Status {
			tick._tickNode(this);
			return this.tick(tick);
		}
		_close(tick) {
			tick._closeNode(this);
			tick.blackboard.set('isOpen', false, tick.tree.id, this.id);
			this.close(tick);
		}

		private _exit(tick) {
			tick._exitNode(this);
			this.exit(tick);
		}

		protected tick(tick): b3.Status { return Status.SUCCESS }
		protected enter(tick) { }
		protected open(tick) { }
		protected close(tick) { }
		protected exit(tick) { }
	}
}