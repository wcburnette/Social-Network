const mongoose = require('mongoose');
const { Schema } = mongoose;
const reactionSchema = require('./reaction'); // Assuming the reactionSchema is saved as Reaction.js

// Define the Thought schema
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => new Date(timestamp).toLocaleDateString(),
  },
  username: {
    type: String,
    required: true,
  },
  // Embed the reactions array using the reactionSchema
  reactions: [reactionSchema],
});

// Add a virtual property to count the number of reactions
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Ensure virtuals are included in the output
thoughtSchema.set('toJSON', { virtuals: true });

// Create and export the Thought model
const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
