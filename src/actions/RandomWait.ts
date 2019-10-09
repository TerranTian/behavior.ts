import { Wait } from "./Wait";
import { randomInter } from "../core/Helper";

export class RandomWait extends Wait {
	constructor(min:number = 0,max:number =10) {
		super(randomInter(min,max));
	}
}