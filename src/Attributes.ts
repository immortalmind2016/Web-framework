
export class Attributes<T>{
    constructor(
        private data:T
        ){
        
    }
    //Return only T[name]=> string for example
    get=<K extends keyof T>(key:K):T[K]=>{
        // This will be always to instance of the attribute
        // If we make it as normal function without arrow function 
        // this will refer to User class so user.data is undefined
        return this.data[key]
    }
    set(update:T):void{
        this.data={...this.data,...update}
    }
    getAll():T{
        return this.data
    }
}


//SOLUTION#1 (bad)
// const id=attrs.get("id");;
//We should do type gaurd (t his problem)
// if(typeof id==="number"){

// }

//SOLUTION#2 (bad)
// using type assersion (belive us, trust us)
// const id=attrs.get("id") as number

//SOLUTION#3 
// we need to ts know that name 100% is a string
// Use keyof with Generic