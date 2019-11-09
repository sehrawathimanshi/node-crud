const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dbConstants = require('../../config/dbConstants');

const blogSchema = mongoose.Schema({
  blogHtml: {
    type: String,
    required: true
  },
  heading: {
    type: String,
    required: true
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  status: {
    type: String,
    enum: ['PENDING_APPROVAL', 'APPROVED', 'REJECTED'],
    default: dbConstants.BLOG_STATUSES['PENDING_APPROVAL']
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  modifiedAt: {
    type: Date,
    default: new Date()
  },
});

module.exports = mongoose.model("blog", blogSchema);
