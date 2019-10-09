import { Action } from "./Action";
import { BaseNode } from "./BaseNode";

export class Decorator extends BaseNode {
	constructor(protected child:Action){
		super();
		this.children = [child];
	}
}