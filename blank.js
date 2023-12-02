function limitConcurrency(promises, limit) {
    const results = []; // 存储所有 Promise 的结果
    let runningCount = 0; // 当前正在运行的 Promise 数量
  
    function runNext() {
      if (promises.length === 0) {
        // 所有 Promise 都已执行完毕，返回结果
        return Promise.resolve(results);
      }
  
      const promise = promises.shift(); // 取出下一个待执行的 Promise
      runningCount++;
  
      return promise()
        .then((result) => {
          results.push(result);
        })
        .catch((error) => {
          results.push(error);
        })
        .finally(() => {
          runningCount--;
          runNext(); // 继续执行下一个 Promise
        });
    }
  
    // 控制并发数量
    const concurrentPromises = [];
    while (runningCount < limit && promises.length > 0) {
      concurrentPromises.push(runNext());
    }
  
    return Promise.all(concurrentPromises);
  }
  
  // 示例用法
  const promises = [
    () => new Promise((resolve) => setTimeout(() => resolve(1), 1000)),
    () => new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
    () => new Promise((resolve) => setTimeout(() => resolve(3), 1500)),
    () => new Promise((resolve) => setTimeout(() => resolve(4), 500)),
    () => new Promise((resolve) => setTimeout(() => resolve(5), 800)),
  ];
  
  limitConcurrency(promises, 2)
    .then((results) => {
      console.log(results);
    })
    .catch((error) => {
      console.error(error);
    });