const aws = require('aws-sdk');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });
const path = require('path');

const s3 = new aws.S3({
  endpoint: new aws.Endpoint('sgp1.digitaloceanspaces.com/image'),
  accessKeyId: process.env.SPACES_ACCESS_KEY_ID,
  secretAccessKey: process.env.SPACES_ACCESS_KEY,
});

exports.uploadSingle = upload.single('file');

exports.uploadFile = (req, res) => {
  const params = {
    Bucket: 'coder9s',
    Key: `${req.file.originalname}-${Date.now()}${path.extname(req.file.originalname)}`,
    Body: req.file.buffer,
    ContentType: req.file.mimetype,
    ACL: 'public-read',
  };
  s3.upload(params, (err, data) => {
    if (err) {
      res.status(500).json({ error: true, Message: err });
    } else {
      res.json(data);
    }
  });
};
