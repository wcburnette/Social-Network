const mongoose = require('mongoose');
const { Schema } = mongoose;

const reactionSchema = new Schema({
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toLocaleDateString(),
  },
}, {
  toJSON: {
    getters: true,
  },
  id: false,
});

// Export the reactionSchema for embedding in Thought schema
module.exports = reactionSchema;




