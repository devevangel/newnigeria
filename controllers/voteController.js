const Vote = require('./../models/voteModel');
const catchAsync = require('./../utils/catchAsync');
//const AppError = require('./../utils/appError');

exports.validateVote = (req, res, next) => {
  if (req.body.voted !== null && req.body.voted === 1) {
    res.status(200).json({
      status: 'voted',
      message: 'You have already voted'
    });
  } else {
    next();
  }
};

exports.upVote = catchAsync(async (req, res, next) => {
  const votes = await Vote.findOneAndUpdate(
    { id: '5d6ede6a0ba62570afcedd3b' },
    { $inc: { upVote: 1 } },
    { upsert: true, new: true }
  );
  res.status(201).json({
    status: 'success',
    voted: 1,
    data: votes
  });
});

exports.downVote = catchAsync(async (req, res, next) => {
  const votes = await Vote.findOneAndUpdate(
    { id: '5d6ede6a0ba62570afcedd3b' },
    { $inc: { downVote: 1 } },
    { upsert: true, new: true }
  );
  res.status(201).json({
    status: 'success',
    voted: 1,
    data: votes
  });
});

exports.getVotes = catchAsync(async (req, res, next) => {
  const votes = await Vote.findOne({ id: '5d6ede6a0ba62570afcedd3b' });
  res.status(200).json({
    status: 'success',
    data: votes
  });
});
