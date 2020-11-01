const bgimage = require('@src/assets/img/credit_search/score_bg.png');
export default class DashBoard {
  constructor(canvas, trackW = 6, rx = 300, ry = 300, radius = 280, innerLineW = 10) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.trackW = trackW;
    this.rx = rx;
    this.ry = ry;
    this.radius = radius;
    this.innerLineW = innerLineW;
  }
  // 画弧度
  drawArc(score) {
    score = +score;
    let toRadian;
    if (score > 100 - 14.4 / 2.088) {
      toRadian = this.angleToRadian((score + 14.4 / 2.088 - 100) * 2.088);
    } else if (score == 100 - 14.4 / 2.088) {
      toRadian = Math.PI * 2;
    } else {
      toRadian = this.angleToRadian(180 - 14.4 + score * 2.088);
    };
    // 半圆轨道
    this.ctx.beginPath();
    this.ctx.strokeStyle = '#eee';
    this.ctx.lineWidth = this.trackW;
    this.ctx.arc(this.rx, this.ry, this.radius, Math.PI * 0.92, Math.PI * 0.08, false);
    this.ctx.stroke();
    // 圆弧
    this.ctx.beginPath();
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#439CF6';
    this.ctx.lineWidth = this.innerLineW;
    this.ctx.arc(this.rx, this.ry, this.radius, Math.PI * 0.92, toRadian, false);
    this.ctx.stroke();
  }
  // 画分数
  drawScore(score) {
    let level = () => {
      if (0 <= +score && +score < 10) return '1';
      if (10 <= +score && +score < 20) return '2';
      if (20 <= +score && +score < 30) return '3';
      if (30 <= +score && +score < 40) return '4';
      if (40 <= +score && +score < 50) return '5';
      if (50 <= +score && +score < 60) return '6';
      if (60 <= +score && +score < 70) return '7';
      if (70 <= +score && +score < 80) return '8';
      if (80 <= +score && +score < 90) return '9';
      if (90 <= +score && +score <= 100) return '10';
    };
    let levelJson = {
      '1': '#fd2521',
      '2': '#ff361a',
      '3': '#ff5114',
      '4': '#ff730d',
      '5': '#ff9a05',
      '6': '#e0b008',
      '7': '#abb713',
      '8': '#7dbe1c',
      '9': '#5cc223',
      '10': '#40c729'
    };
    this.ctx.fillStyle = levelJson[level()];
    this.ctx.beginPath();
    this.ctx.font = '32px Microsoft Yahei';
    this.ctx.textAlign = 'center';
    this.ctx.fillText(score, this.rx, this.ry);
  }
  // 画表盘
  async drawBg() {
    let image = new Image(image, 50, 50, 500, 323.2);
    image.src = bgimage;
    image.onload = () => {
      this.ctx.drawImage(image, 50, 50);
    };
  }
  // 计算点
  angleToRadian(angle) {
    return Math.PI / 180 * angle;
  }
  // 画点
  drawPoint(score) {
    score = +score;
    let toRadian;
    if (score > 100 - 14.4 / 2.088) {
      toRadian = this.angleToRadian((score + 14.4 / 2.088 - 100) * 2.088);
    } else if (score == 100 - 14.4 / 2.088) {
      toRadian = Math.PI * 2;
    } else {
      toRadian = this.angleToRadian(180 - 14.4 + score * 2.088);
    }
    this.ctx.beginPath();
    this.ctx.fillStyle = '#ffffff';
    this.ctx.arc( this.rx + this.radius * Math.cos( toRadian ), this.ry + this.radius * Math.sin( toRadian ), 5, 0, Math.PI * 2 );
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.fillStyle = '#439CF6';
    this.ctx.arc( this.rx + this.radius * Math.cos( toRadian ), this.ry + this.radius * Math.sin( toRadian ), 3, 0, Math.PI * 2 );
    this.ctx.fill();
  }
  // 生成仪表盘
  init(score) {
    return new Promise((resolve, reject) => {
      let image = new Image();
      image.src = bgimage;
      image.onload = () => {
        this.ctx.drawImage(image, 50, 33, 234, 150);
        this.drawArc(score);
        this.drawScore(score);
        this.drawPoint(score);
        // let dataurl = this.canvas.toDataURL('image/png');
        // resolve(this.dataURLtoBlob(dataurl));
      };
    });
  }
  // 生成图片
  canvas2image() {
    return this.canvas.toDataURL("image/png");
  }
  // base64转blob
  dataURLtoBlob(dataurl) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    };
    return new Blob([u8arr], { type: mime });
  }
}
