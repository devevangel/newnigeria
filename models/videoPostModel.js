const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      maxlength: [100, 'Caption should be a 100 characters or less'],
      required: [true, 'A caption is required']
    },
    state: {
      type: String,
      required: [true, 'State is required']
    },
    city: {
      type: String
    },
    url: {
      type: String,
      required: [true, 'A video clip is required']
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// videoSchema.virtual('date').get(function() {
//   return this.createdAt.getDate();
// });

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;
