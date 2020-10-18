const express = require('express');
const picturePostController = require('./../controllers/pictureController');

const router = express.Router();

router
  .route('/')
  .post(
    picturePostController.upload.single('photo'),
    picturePostController.uploadPicture,
    picturePostController.createPicturePost
  )
  .get(picturePostController.getPicturePosts);

module.exports = router;
