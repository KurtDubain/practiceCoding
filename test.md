# 总结一下Vue2和Vue3各自的响应式原理

在自己校招以及自己开发的过程中，常会遇到相关Vue响应式系统的一些问题，结合自己平日里对源码以及一些大佬的博客的阅读，简单说明一下自己对Vue2.X和3.X两种不同响应式实现的解析，并附带一些简单代码，供自己平日里学习记录。

**如有不严谨的地方，欢迎读者在下面评论指正**

***
## Vue2

首先，Vue2的响应式原理是基于Object.defineProperty方法实现数据劫持，同时结合订阅发布模式来实现响应式系统的设计。所以我们从如下几个方面来分析Vue2的响应式原理。

<div style="font-size:0.9rem">

>响应式数据劫持；

>依赖收集；

>订阅发布模式；

>实际应用；
</div>

接下来我会结合简单的代码来讲解：

### 响应式数据劫持
<div style="max-width: 90%; overflow: auto;">
  <pre>
    <code class="language-javascript">
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
    </code>
  </pre>
</div>

通过利用defineReactive方法，实现将对象的属性转换为“响应式”的，其中方法的参数分别为 **要进行响应式劫持的对象** 、**对象的属性名**、**属性的初始值**，其中**dep**是一个依赖收集器对象，用于管理与该属性相关的所有watcher对象。

在这里，首先创建一个dep依赖收集器，用于收集依赖同时发布消息，利用defineProperty方法对当前对象的当前属性调用get和set方法，其中：
>get方法用于处理获取数据以及数据初始化的情况，在初始化的时候会进行依赖收集，将当前对象的当前属性添加到Watcher上，进行观察；

>set方法用于在数据发生变化的时候，进行更新处理，发布更新消息，遍历所有的Watcher对象，对指定数据进行更新。

正因为是将对应的属性进行绑定处理，而不是将对象进行统一管理，所以对于数组或者对象属性的新增或者删除，Vue2的机制不能直接监听到

### 依赖收集
<div style="max-width: 90%; overflow: auto;">
  <pre>
    <code class="language-javascript">
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
    </code>
  </pre>
</div>

Dep是一个依赖收集器，用来管理一个属性相关的所有Watcher对象，其中的方法：
>`addWatcher(watcher)`：将一个 Watcher 对象添加到依赖列表中。

>`notify()`：遍历所有的 Watcher 对象，并调用它们的 update 方法，触发更新。

依赖收集器类似于数据劫持和观察者队列的一个桥梁，当一个观察者被创建的时候，他会将自身注册到依赖收集器重，这样依赖收集器就知道了哪些观察者对应于特定的属性，同时利用这种方式能够在数据发生变化的时候动态地通知所有注册的观察者，触发对应的回调操作。

### 订阅发布模式
<div style="max-width: 90%; overflow: auto;">
  <pre>
    <code class="language-javascript">
//用于追踪依赖关系的全局变量
let activeWatcher = null;
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
    </code>
  </pre>
</div>
上述是一个简单的观察者对象，他会观察一个特定的属性，当属性发生变化的时候，就会触发对应的更新回调函数，其中：

>`vm`：指Vue实例，这是一个拥有响应式数据的对象；

>`key`：指要观察的属性名；

>`updateCallback`：当属性发生变化的时候触发的回调函数

>`update()`：更新方法，当触发这个方法的时候，对对应的对象的属性进行更新操作；

>`activeWatcher`：在获取数据的时候能够正确的建立依赖关系，同时确保更新的时候能够更新指定的数据，避免依赖注入混乱（在Watcher中使用this来确保获取对应的依赖，在getter中确保获取的Watcher是活跃的，而不是null）。

### 应用以及笔者留言
<div style="max-width: 90%; overflow: auto;">
  <pre>
    <code class="language-javascript">
class Vue {
  constructor(options) {
    this.data = options.data;
    this.initData(this.data);
    new Watcher(this, 'dataValue', this.updateView);
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
vm.data.dataValue = 'Updated Value'; // 视图会自动更新
 </code>
  </pre>
</div>

上述创建了一个简单的Vue类来注册Vue实例，负责响应式数据管理、初始化以及更新操作，同时对Vue的data中的‘dataValue’进行监听，具体如下：

>`constructor`：接收options，主要是对options中的data进行响应式处理，然后利用Watcher来进行data中的dataValue的监听，同时调用一次updateView进行初始化；

>`initData(data)`：对传入的对象进行遍历，将里面的每个数据处理成响应式数据；

>`updateView()`：更新视图或其他回调操作；

>`Watcher()`：监听dataValue以及其他data中的响应式属性，在发生状态变化的时候进行回调更新操作。

**以上就是一个简单的Vue2响应式系统的实现过程**

***
## Vue3

不同于Vue2，Vue3的响应式主要是基于使用ref和reactive，来将制定数据转换为响应式数据，他主要是结合ES6中提供的Proxy方法以及副作用函数的使用来实现的响应式处理，这一点不同于Vue2的手动创建Vue实例和Watcher。我会从如下几个方面来介绍Vue3的响应式：
<div style="font-size:0.9rem">

>Proxy和Reflect的拦截操作；

>track和trigger方法实现依赖收集；

>Effect副作用函数；

>实际应用；
</div>

接下来我会结合简单的代码来讲解：

***

### Vue3的Proxy劫持

### Vue3的依赖收集

### Vue3的副作用函数的使用

### Vue3应用示例以及笔者留言

## 源代码
### Vue2
<div style="max-width: 90%; overflow: auto;">
  <pre>
    <code class="language-javascript">      
// 用于追踪依赖关系的全局变量
let activeWatcher = null;
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
    </code>
  </pre>
</div>

### Vue3
<div style="max-width: 90%; overflow: auto;">
  <pre>
    <code class="language-javascript">
// 用于追踪依赖关系的全局变量
let activeEffect = null;
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key);
      return Reflect.get(target, key); // 使用 Reflect 获取属性值
    },
    set(target, key, value) {
      Reflect.set(target, key, value); // 使用 Reflect 设置属性值
      trigger(target, key);
      return true;
    },
    deleteProperty(target, key) {
      const success = Reflect.deleteProperty(target, key); // 使用 Reflect 删除属性
      trigger(target, key);
      return success;
    }
  });
}
function track(target, key) {
  if (activeEffect) {
    let depsMap = target.__depsMap || (target.__depsMap = new Map());
    let dep = depsMap.get(key) || (depsMap.set(key, new Set()), depsMap.get(key));
    dep.add(activeEffect);
  }
}
function trigger(target, key) {
  const depsMap = target.__depsMap;
  if (depsMap) {
    const dep = depsMap.get(key);
    if (dep) {
      dep.forEach(effect => {
        effect();
      });
    }
  }
}
function effect(fn) {
  const effectFn = () => {
    try {
      activeEffect = fn;
      return fn();
    } finally {
      activeEffect = null;
    }
  };
  effectFn(); // 立即执行一次
  return effectFn;
}
const state = reactive({
  count: 0
});
const double = effect(() => {
  console.log('Double:', state.count * 2);
});
state.count++; // 触发 double 函数执行
    </code>
  </pre>
</div>