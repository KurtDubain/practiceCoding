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

// 自定义指令对象
const myDirective = {
    // 当被绑定的元素插入到 DOM 中时
    inserted(el) {
      el.focus(); // 当插入到 DOM 中时，自动聚焦元素
    },
    // 当绑定元素的值更新时
    update(el, binding) {
      el.style.backgroundColor = binding.value; // 更新元素的背景颜色
    },
  };
  
  export default myDirective;
  