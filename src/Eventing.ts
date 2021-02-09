type Callback=()=>void;
//Eventing system
export class Eventing {
    private events:{[key:string]:Callback[]}={}
       //Registers an event handler with this object , so otherparts ofapp know when something changed
    on=(eventName:string,callback:Callback):void=>{
        //Quick example
        let handelrs=this.events[eventName]||[]
        this.events[eventName]=[...handelrs,callback];
    } 
    trigger=(eventName:string):void=>{
        let handelrs=this.events[eventName]
        if(!handelrs||handelrs.length==0)
        return
        this.events[eventName].forEach((callback)=>{
            callback()
        })
    }
}