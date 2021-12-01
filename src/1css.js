import './css/1.css';
import './css/3.less';
import './css/4.scss';

// raw-loader
const txt = require('./1.txt');
console.log('wewqewqe')
console.log(txt);
document.querySelector('#app').innerHTML = txt.default;

// type:asset
const txt2 = require('./1.txt');
document.querySelector('#app').innerHTML = txt2;
