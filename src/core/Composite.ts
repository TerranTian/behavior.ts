import { BaseNode } from "./BaseNode";

export class Composite extends BaseNode {
	constructor(children:BaseNode[] = []){
		super();
		this.children = children;
	}
}