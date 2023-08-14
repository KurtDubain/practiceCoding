var b = 1
let obj ={
    b : 2,
    getb:function(){
        var b = 3
        return console.log(this.b)
    }
}

console.log(obj.getb())


new Promise((resolve,reject)=>{
    resolve('success')
}).then(()=>{
    throw new Error('1')
}).catch((error)=>{
    console.log(error);
}).catch((error)=>{
    throw new Error('2')
})

var a = 10
function b(){
    a = 100
}
b()
console.log(a)

var a = 10
function b(){
    a = 100
    return ;
    function a(){}
}
b()
console.log(a);

var a = 10
if(true){
    var a = 100
}
console.log(a);

var name = "win";
const obj1 = {
  name: 'obj1',
  a: ()=>{
​    console.log(this.name);
  }
}
const obj11 = {
  name: 'obj11'
}
obj1.a.call(obj11);
// win

var resource = ["a.png","b.png","c.png"];
for(var i = 0;i < resource.length;i++){
  var img = new Image();
  img.src = resource[i];
  img.onload = function(){
​    console.log(i);
  }
}
// 3 3 3

let arr = [];
for(let i = 0; i <10;i++){
    arr.push((finish)=>{
        console.log(i);
        return function(){
            finish();
        }
    })                    
}
var func = arr.reduce((pre,cur)=>cur(pre)); 
func() 
// 0// 1,2,3,4,5,6,7,8,9

var obj2 = { a: 10, b: 0};
obj2 ?. b 
obj2.b ?? obj2.a 
// 0// 10

2.1 << 1 // 4

