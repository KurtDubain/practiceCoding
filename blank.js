this.name = 'a'
var obj = {
  name:'b',
  getName:()=>{
    return this.name
  }
}
var getName = obj.getName
console.log(getName(),obj.getName())