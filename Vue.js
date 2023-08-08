// 用于记录Vue的一些算法
// 全局事件总线
class Eventbus{
    constructor(){
        this.event = {}
    }
    on(name,func){
        if(!this.event[name]){
            this.event[name]=[]
        }
        this.event[name].push(func)
    }
    off(name){
        if(this.event[name]){
            delete this.event[name]
        }
    }
    emit(name,...args){
        if(this.event[name]){
            this.event[name].forEach(func=>[
                func(...args)
            ])
        }
    }
}