function Foo() {
    if (!(this instanceof Foo)) {
      return new Foo();
    }
  
    if (typeof Foo.count === 'undefined') {
      Foo.count = 1;
    }
  
    this.id = Foo.count++;
  }
  
  // 示例用法
  const obj1 = new Foo();
  console.log(obj1); // { id: 1 }
  
  const obj2 = Foo();
  console.log(obj2); // { id: 2 }
  
  const obj3 = new Foo();
  console.log(obj3); // { id: 3 }
console.log(Foo)
console.log(Foo)
console.log(Foo)