import img2Src from './images/1.png';

// require img html-loader
const img1Src = require('./images/1.png');
const img1 = new Image();
img1.src = img1Src;
document.body.appendChild(img1);

// import img html-loader
const img2 = new Image();
img2.src = img2Src;
document.body.appendChild(img2);