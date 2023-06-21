import multer from "multer";

class UploadImage {
  public upload: any = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => cb(null, 'public/uploads/'),
      filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
    })
  });

  constructor() {
    this.uploadImage();
  }

  uploadImage = (): void => this.upload.single('cover');
}

class UploadImages {
  public upload: any = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => cb(null, 'public/uploads/'),
      filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
    })
  });

  constructor() {
    this.uploadImages();
  }

  uploadImages = (): void => this.upload.fields([ { name: 'cover', maxCount: 1 }, { name: 'background', maxCount: 1 } ]);
}

class UploadVideo {
  public upload: any = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => cb(null, 'public/uploads/'),
      filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
    })
  });

  constructor() {
    this.uploadVideo();
  }

  uploadVideo = (): void => this.upload.single('video');
}

class UploadVideos {
  public upload: any = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => cb(null, 'public/uploads/'),
      filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
    })
  });

  constructor() {
    this.uploadVideos();
  }

  uploadVideos = (): void => this.upload.array('videos[]');
}

class UploadSeason {
  public upload: any = multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => cb(null, 'public/uploads/'),
      filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
    })
  });

  constructor() {
    this.uploadVideos();
  }

  uploadVideos = (): void => this.upload.fields([ { name: 'videos[]' }, { name: 'thumbs[]' } ]);
}

export const uploadImage = new UploadImage().upload;
export const uploadImages = new UploadImages().upload;
export const uploadVideo = new UploadVideo().upload;
export const uploadVideos = new UploadVideos().upload;
export const uploadSeason = new UploadSeason().upload;