import './css/1.css';
import './css/3.less';
import './css/4.scss';
import img2Src from './images/011.png';

const txt = require('./1.txt');
console.log('wewqewqe')
console.log(txt);
document.querySelector('#app').innerHTML = txt.default;

// require img
const img1Src = require('./images/011.png');
const img1 = new Image();
img1.src = img1Src;
document.body.appendChild(img1);

// import img
const img2 = new Image();
img2.src = img2Src;
document.body.appendChild(img2);
