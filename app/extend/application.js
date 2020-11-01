// 由于egg官方提供的mongoose版本为5.4，为旧版本。所以新版本api无法使用，需要注意
const gridfs = require('gridfs-stream');

module.exports = {
  savefile(fileStream) {
    return new Promise((reslove, reject) => {
      gridfs.mongo = this.mongoose.mongo;
      const gfs = gridfs(this.mongooseDB.db, this.mongoose.mongo);
      const writestream = gfs.createWriteStream({
        filename: fileStream.filename,
        content_type: fileStream.mineType,
      });
      fileStream.pipe(writestream);
      writestream
        .on('close', file => {
          reslove(file);
        })
        .on('error', err => {
          reject(err);
        });
    });
  },
};
