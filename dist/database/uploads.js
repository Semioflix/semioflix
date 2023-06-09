"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

class UploadImage {
   __init() {this.upload = _multer2.default.call(void 0, {
    storage: _multer2.default.diskStorage({
      destination: (req, file, cb) => cb(null, 'public/uploads/'),
      filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
    })
  })}

  constructor() {;UploadImage.prototype.__init.call(this);UploadImage.prototype.__init2.call(this);
    this.uploadImage();
  }

  __init2() {this.uploadImage = () => this.upload.single('cover')}
}

class UploadVideo {
   __init3() {this.upload = _multer2.default.call(void 0, {
    storage: _multer2.default.diskStorage({
      destination: (req, file, cb) => cb(null, 'public/uploads/'),
      filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
    })
  })}

  constructor() {;UploadVideo.prototype.__init3.call(this);UploadVideo.prototype.__init4.call(this);
    this.uploadVideo();
  }

  __init4() {this.uploadVideo = () => this.upload.single('video')}
}

class UploadVideos {
   __init5() {this.upload = _multer2.default.call(void 0, {
    storage: _multer2.default.diskStorage({
      destination: (req, file, cb) => cb(null, 'public/uploads/'),
      filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
    })
  })}

  constructor() {;UploadVideos.prototype.__init5.call(this);UploadVideos.prototype.__init6.call(this);
    this.uploadVideos();
  }

  __init6() {this.uploadVideos = () => this.upload.array('videos[]')}
}


 const uploadImage = new UploadImage().upload; exports.uploadImage = uploadImage;
 const uploadVideo = new UploadVideo().upload; exports.uploadVideo = uploadVideo;
 const uploadVideos = new UploadVideos().upload; exports.uploadVideos = uploadVideos;