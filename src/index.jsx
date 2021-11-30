import './1css';

// const fn1 = async () => {
//     await setTimeout(() => { console.log('1111') }, 1000);
// }
// fn1();

// ES7 装饰器 
// @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties
function readonly(target, key, desc) {
    console.log(target, key, desc);
    desc.writeable = false;
}
class Person {
    @readonly PI=3.14
}
let p = new Person();
p.PI = 3.15;
console.log(p.PI)