const express = require('express');
const voteController = require('./../controllers/voteController');

const router = express.Router();

router.route('/').get(voteController.getVotes);

router
  .route('/upVotes')
  .patch(voteController.validateVote, voteController.upVote);

router
  .route('/downVotes')
  .patch(voteController.validateVote, voteController.downVote);

module.exports = router;
