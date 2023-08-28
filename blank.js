function diffObjects(oldObj, newObj, path = '') {
    const patches = [];
  
    function compareValues(oldVal, newVal, path) {
        if (typeof oldVal === 'object' && oldVal !== null && typeof newVal === 'object' && newVal !== null) {
            compareObjects(oldVal, newVal, path);
        } else if (oldVal !== newVal) {
            patches.push(`Change ${path}: ${oldVal} => ${newVal}`);
        }
    }
  
    function compareObjects(oldObj, newObj, path) {
        const allKeys = new Set([...Object.keys(oldObj), ...Object.keys(newObj)]);
        for (const key of allKeys) {
            const oldVal = oldObj[key];
            const newVal = newObj[key];
            const newPath = path ? `${path}.${key}` : key;
            if (!(key in oldObj)) {
                patches.push(`Add ${newPath}: ${newVal}`);
            } else if (!(key in newObj)) {
                patches.push(`Remove ${newPath}: ${oldVal}`);
            } else {
                compareValues(oldVal, newVal, newPath);
            }
        }
    }
  
    compareObjects(oldObj, newObj, path);
    return patches;
  }
  const oldObject = {
    name: 'Alice',
    age: 30,
    address: {
        street: '123 Main St',
        city: 'CityA'
    }
};

const newObject = {
    name: 'Alice',
    address: {
        street: '456 Elm St',
        city: 'CityB'
    },
    hha:'22'
};

const diff = diffObjects(oldObject, newObject);

console.log(diff);
