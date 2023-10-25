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
