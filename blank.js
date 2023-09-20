function Parent(name,sex,age,job){
    this.name = name
    this.sex = sex
    this.age = age
    this.job = job
    this.myIntro = function(){
        console.log(`我叫${this.name}，是个${this.job}`)
    }
}
function myNew(constructor,...args){
    const newObj = Object.create(constructor.prototype)
    const result = constructor.apply(newObj,args)
    return result instanceof Object?result:newObj
}

const par1 = new Parent('haha','男',13,'老师')
Parent.prototype.Showme = function(){
    console.log(`作为一个${this.job}，我是个${this.sex}人，我的年龄为${this.age}`)
}
// par1.Showme()
function Child(name,parent){
    this.parent = parent
    Parent.call(this,name)
    
}
Child.prototype = Object.create(Parent.prototype)
Child.prototype.construtor = Child
Child.prototype.showPar= function(){
    console.log(`我的家长是${this.parent.name}`)
}
const child1 = new Child('哈哈',par1)
child1.Showme()
child1.myIntro()
child1.showPar()

