// 用于追踪依赖关系的全局变量
let activeWatcher = null;

// 响应式劫持函数
function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return;
  }

  Object.keys(obj).forEach(key => {
    let value = obj[key];

    // 递归处理嵌套对象
    observe(value);

    // 创建 Dep 对象
    const dep = new Dep();

    Object.defineProperty(obj, key, {
      get() {
        // 收集依赖
        if (activeWatcher) {
          dep.addWatcher(activeWatcher);
        }
        return value;
      },
      set(newValue) {
        if (newValue !== value) {
          // 更新值
          value = newValue;

          // 触发依赖更新
          dep.notify();
        }
      }
    });
  });
}

// 依赖收集器
class Dep {
  constructor() {
    this.watchers = [];
  }

  addWatcher(watcher) {
    this.watchers.push(watcher);
  }

  notify() {
    this.watchers.forEach(watcher => watcher.update());
  }
}

// 观察者
class Watcher {
  constructor(vm, key, updateCallback) {
    this.vm = vm;
    this.key = key;
    this.updateCallback = updateCallback;

    // 设置当前 Watcher 为活跃 Watcher
    activeWatcher = this;

    // 访问数据以收集依赖
    this.vm[this.key];

    // 重置活跃 Watcher
    activeWatcher = null;
  }

  update() {
    this.updateCallback.call(this.vm, this.vm[this.key]);
  }
}

// 示例用法
// const vm = {};
const data = {
  count: 0
};
observe(data);

new Watcher(vm, 'count', function(newValue) {
  console.log('Count changed:', newValue);
});

data.count++; // 更新属性值，并触发 Watcher 的更新回调

class Observer{
  constructor(){
      this.subers = []
  }
  subscribe(suber){
      this.subers.push(suber)
  }
  unSubscribe(suber){
      this.subers = this.subers.filter((item)=>item!==suber)
  }
  noify(data){
      this.subers.forEach(suber=>suber.update(data))
  }
}

class Subsciber{
  constructor(name){
      this.name=name
  }
  update(data){
      console.log(`${this.name}更新了${data}数据`)
  }
}


// 打算撒打算
// 用于追踪依赖关系的全局变量
// 依赖收集器
class Dep {
  constructor() {
    this.watchers = [];
  }

  addWatcher(watcher) {
    this.watchers.push(watcher);
  }

  notify() {
    this.watchers.forEach(watcher => watcher.update());
  }
}

// 响应式劫持函数
function defineReactive(obj, key, value) {
  const dep = new Dep();

  Object.defineProperty(obj, key, {
    get() {
      if (activeWatcher) {
        dep.addWatcher(activeWatcher);
      }
      return value;
    },
    set(newValue) {
      if (newValue !== value) {
        value = newValue;
        dep.notify();
      }
    }
  });
}

// 观察者
class Watcher {
  constructor(vm, key, updateCallback) {
    this.vm = vm;
    this.key = key;
    this.updateCallback = updateCallback;
    activeWatcher = this;
    this.vm[this.key];
    activeWatcher = null;
  }

  update() {
    this.updateCallback.call(this.vm, this.vm[this.key]);
  }
}

// Vue 实例
class Vue {
  constructor(options) {
    this.data = options.data;
    this.initData(this.data);

    // 创建 Watcher 实例，监听数据变化
    new Watcher(this, 'dataValue', this.updateView);

    // 初始渲染
    this.updateView(this.data.dataValue);
  }

  initData(data) {
    Object.keys(data).forEach(key => {
      defineReactive(data, key, data[key]);
    });
  }

  updateView(value) {
    console.log('更新视图：', value);
  }
}

// 使用示例
const vm = new Vue({
  data: {
    dataValue: 'Hello, Vue!'
  }
});

// 数据变化
vm.data.dataValue = 'Updated Value'; // 视图会自动更新
