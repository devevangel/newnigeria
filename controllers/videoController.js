const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Video = require('./../models/videoPostModel');
const catchAsync = require('./../utils/catchAsync');
const APIFeatures = require('./../utils/apiFeatures');

const storage = multer.diskStorage({});

exports.upload = multer({ storage: storage });

exports.uploadClip = catchAsync(async (req, res, next) => {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

  const uploadedFile = await cloudinary.uploader.upload(req.file.path, {
    public_id: `video-${Date.now()}`,
    folder: 'LegacyEA/videos/',
    resource_type: 'video',
    format: 'mp4',
    overwrite: true,
    transformation: { quality: 65 }
  });

  req.videoData = uploadedFile;
  next();
});

exports.createVideoPost = catchAsync(async (req, res, next) => {
  const videoPost = await Video.create({
    caption: req.body.caption,
    state: req.body.state,
    city: req.body.city,
    url: req.videoData.secure_url
  });
  res.status(201).json({
    status: 'success',
    data: videoPost
  });
});

exports.getVideoPosts = catchAsync(async (req, res, next) => {
  //EXECUTE QUERY
  const features = new APIFeatures(Video.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const videoPosts = await features.query;

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: videoPosts.length,
    data: videoPosts
  });
});
