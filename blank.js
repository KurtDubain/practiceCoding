function apply(context,...args){
    context = context || window
    const fn = Symbol('fn')
    context[fn] = this
    const result = context[fn](...args)
    delete context[fn]
    return result
}
function newIt(constructor,...args){
    const newObj = Object.create(constructor.prototype)
    const result = constructor.apply(newObj,...args)
    return result instanceof Object?result:newObj
}
function throttle(func,delay){
    let timer = null
    return function(...args){
        if(timer===null){
            timer = setTimeout(()=>{
                func.apply(this,...args)
                timer = null
            },delay)
        }
    }
}
function debounce(func,delay){
    let timer
    return function(...args){
        clearTimeout(timer)
        timer = setTimeout(()=>{
            func.apply(this,...args)
        })
    }
}
function sleep(delay){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            resolve()
        },delay)
    })
}
function curry(fn){
    return function curried(...args){
        if(args.length>=fn.length){
            return fn.apply(this,args)
        }else{
            return function(...nextArgs){
                return curried.apply(this,args.concat(nextArgs))
            }
        }
    }
}
function add(a,b,c){
    return a+b+c
}
const addCurried = curry(add)
const step2 = addCurried(1)(3)
const result = step2(8)
console.log(result)

class EventBus{
    constructor(){
        this.events = {}
    }
    on(name,func){
        if(!this.events[name]){
            this.events[name]=[]
        }
        this.events[name].push(func)
    }
    off(name){
        if(this.events[name]){
            delete this.events[name]
        }
    }
    emit(name,...args){
        if(this.events[name]){
            this.event[name].forEach((func)=>{
                func(...args)
            })
        }
    }
}

class Observer{
    constructor(){
        this.subers=[]
    }
    sub(name){
        this.subers.push(name)
    }
    UnSub(name){
        this.subers.filter(item=>name!==item)
    }
    notify(){
        this.subers.forEach(item=>{
            item.update()
        })
    }
}
class Subscriber{
    constructor(name){
        this.name = name
    }
    update(){
        console.log(`我就是我${this.name}`)
    }
}