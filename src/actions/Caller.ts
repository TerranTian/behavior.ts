import { Action } from "../core/Action";
import { Status } from "../core/Status";

export class Caller extends Action {
	constructor(private fuc:()=>Status) {
		super();
    }
    
    onTick() {
        if(!this.fuc) return Status.FAILURE;
		return this.fuc();
	}
}