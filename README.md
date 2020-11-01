# kuma-egg

## 部署

因为egg.js使用了很多不明所以的包，会导致`npm install`经常莫名其妙的失败。失败问题记录于此，以示后人。

### 报错：`Error: pngquant failed to build, make sure that libpng-dev is installed`

解决办法：
`yum install libpng12-1.2.50-10.el7.x86_64 libpng12-devel-1.2.50-10.el7.x86_64`
