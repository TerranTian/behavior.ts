import { createUUID } from "./Helper";
import { Status } from "./Status";
import { BehaviorTree } from "./BehaviorTree";
export class BaseNode {

	children:BaseNode[] = null;

	private _tree:BehaviorTree = null;
	setTree(tree:BehaviorTree){
		this._tree = tree;
		if(this.children && this.children.length>0){
			this.children.forEach(child=>child._tree = tree);
		}
	}
	get tree(){
		return this._tree;
	}
	
	readonly id: string;
	private _isOpened = false;
	constructor() {
		this.id = createUUID()
	}

	tick() {
		if (!this._isOpened) {
			this.open();
		}
		let status = this.onTick();
		if (status !== Status.RUNNING) {
			this.close();
		}

		return status;
	}

	private open() {
		this._isOpened = true;
		this.onOpen();
	}

	private close() {
		if(!this._isOpened) return;

		if(this.children && this.children.length>0){
			this.children.forEach(child=>child.close());
		}

		this._isOpened = false;
		this.onClose();
	}

	protected onTick(): Status { return Status.SUCCESS }
	protected onOpen() { }
	protected onClose() { }
}