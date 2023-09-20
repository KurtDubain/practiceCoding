// 用于追踪依赖关系的全局变量
let activeEffect = null;

// 响应式劫持函数
function reactive(obj) {
  // 对象的属性访问拦截
  return new Proxy(obj, {
    get(target, key) {
      // 收集依赖
      track(target, key);
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      // 触发更新
      trigger(target, key);
      return true;
    },
    deleteProperty(target, key) {
      delete target[key];
      // 触发更新
      trigger(target, key);
      return true;
    }
  });
}

// 收集依赖
function track(target, key) {
  if (activeEffect) {
    // 将当前依赖关系添加到全局的 activeEffect 中
    let depsMap = target.__depsMap;
    if (!depsMap) {
      depsMap = target.__depsMap = new Map();
    }
    let dep = depsMap.get(key);
    if (!dep) {
      dep = new Set();
      depsMap.set(key, dep);
    }
    dep.add(activeEffect);
  }
}

// 触发更新
function trigger(target, key) {
  const depsMap = target.__depsMap;
  if (depsMap) {
    const dep = depsMap.get(key);
    if (dep) {
      dep.forEach(effect => {
        effect(); // 执行副作用函数
      });
    }
  }
}

// 副作用函数
function effect(fn) {
  activeEffect = fn;
  fn(); // 首次执行以收集依赖
  activeEffect = null;
}

// 示例用法
const state = reactive({
  count: 0
});

effect(() => {
  console.log('Count changed:', state.count);
});

state.count++; // 更新属性值，并触发副作用函数