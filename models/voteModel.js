const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  id: {
    type: String,
    default: '5d6ede6a0ba62570afcedd3b'
  },
  upVote: {
    type: Number,
    required: [true, 'A vote is required'],
    default: 0
  },
  downVote: {
    type: Number,
    required: [true, 'A vote is required'],
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Vote = mongoose.model('Vote', voteSchema);
module.exports = Vote;
