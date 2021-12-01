import './1css';

const fn1 = async () => {
    await setTimeout(() => { console.log('1111') }, 1000);
}
fn1();

// ES7 装饰器 
// @babel/plugin-proposal-decorators @babel/plugin-proposal-class-properties
function readonly(target, key, desc) {
    console.log(target, key, desc);
    desc.writable = false;
}
class Person {
    @readonly PI=3.14
}
let p = new Person();
p.PI = 3.15;
// readonly生效了，开始报错，不让写 Uncaught TypeError: Cannot assign to read only property 'PI' of object '#<Person>'
console.log(p.PI)