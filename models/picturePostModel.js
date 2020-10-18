const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema(
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
      required: [true, 'A photo is required']
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

// pictureSchema.virtual('date').get(function() {
//   return this.createdAt;
// });

const Picture = mongoose.model('Picture', pictureSchema);
module.exports = Picture;
