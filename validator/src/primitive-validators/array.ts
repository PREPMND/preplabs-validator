import type { arrayValidator } from "../types.ts";
class ArrayValidator<T> {
    #minLength?: number;
    #maxLength?: number;
    #nonEmpty = false;

    min(length:number):this{
        this.#minLength = length;
        return this;
    }
    max(length:number):this{
        this.#maxLength = length;
        return this;
    }
    nonEmpty():this{
        this.#nonEmpty = true;
        return this;
    }
    check(value:unknown):arrayValidator<T>{
        if(!Array.isArray(value)){
            throw new Error("Expected an array.");
        }
        if(this.#nonEmpty && value.length===0){
            throw new Error("Array cannot be empty.");
        }
        if(this.#minLength!==undefined && value.length<this.#minLength){
            throw new Error(`Minimum array length is ${this.#minLength}`);
        }
        if(this.#maxLength!==undefined && value.length>this.#maxLength){
            throw new Error(`Maximum array length is ${this.#maxLength}`);
        }
        return{
            ok:true,
            value
        };

    }

    safeCheck(value:unknown):arrayValidator<T>{
        try{
            return this.check(value);
        }catch(err:any){
            return{
                ok:false,
                value:[],
                error:err.message
            };
        }

    }
}
export function array<T>() {
    return new ArrayValidator<T>();
}