let a = new Promise((reslove, reject) => { reslove(1) });
a.then(data => console.log('promise', data));

let b = new Map();
b.set('bbb', ['1232321']);
console.log('Map', b.get('bbb'));

let c = new Set([1,2,3,4]);
console.log('Set size', c.size);