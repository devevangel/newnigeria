const express = require('express');
const videoPostController = require('./../controllers/videoController');

const router = express.Router();

router
  .route('/')
  .get(videoPostController.getVideoPosts)
  .post(
    videoPostController.upload.single('clip'),
    videoPostController.uploadClip,
    videoPostController.createVideoPost
  );

module.exports = router;
