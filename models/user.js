const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address'],
  },
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
  ],
}, {
  toJSON: {
    virtuals: true,
  },
  id: false,
});

// Virtual to count friends
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;



