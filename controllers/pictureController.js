const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const Picture = require('./../models/picturePostModel');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');

const storage = multer.diskStorage({});

exports.upload = multer({ storage: storage });

exports.uploadPicture = catchAsync(async (req, res, next) => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

  const uploadedFile = await cloudinary.uploader.upload(req.file.path, {
    folder: 'LegacyEA/pictures/',
    public_id: `photo-${Date.now()}`,
    format: 'jpeg',
    overwrite: true,
    transformation: [{ width: 500, height: 500, crop: 'limit', quality: 50 }]
  });

  req.pictureData = uploadedFile;
  next();
});

exports.createPicturePost = catchAsync(async (req, res, next) => {
  const picturePost = await Picture.create({
    caption: req.body.caption,
    state: req.body.state,
    city: req.body.city,
    url: req.pictureData.secure_url
  });

  res.status(201).json({
    status: 'success',
    data: picturePost
  });
});

exports.getPicturePosts = catchAsync(async (req, res, next) => {
  //EXECUTE QUERY
  const features = new APIFeatures(Picture.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const picturePosts = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: picturePosts.length,
    data: picturePosts
  });
});
