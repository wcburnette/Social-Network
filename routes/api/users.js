const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const Thought = require('../../models/thought');

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('thoughts').populate('friends');
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single user by its _id and populated thought and friend data
router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST a new user
router.post('/', async (req, res) => {
  try {
    // Ensure the required fields are present
    if (!req.body.username || !req.body.email) {
      return res.status(400).json({ message: 'Username and email are required.' });
    }

    // Validate that the email follows the correct format
    const emailPattern = /.+@.+\..+/;
    if (!emailPattern.test(req.body.email)) {
      return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    console.log('Request Body:', req.body); // Log the request body for debugging

    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    console.error(err); // Log error details for debugging
    if (err.code === 11000) { // Handle unique constraint errors for email or username
      return res.status(400).json({ message: 'Username or email already exists.' });
    }
    res.status(500).json({ message: 'An error occurred while creating the user.', error: err });
  }
});


// PUT to update a user by its _id
router.put('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // Validate that the userId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId format' });
    }

    // Validate that the required fields (e.g., username, email) are present
    if (!req.body.username || !req.body.email) {
      return res.status(400).json({ message: 'Username and email are required.' });
    }

    // Validate email format
    const emailPattern = /.+@.+\..+/;
    if (!emailPattern.test(req.body.email)) {
      return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    // Find the user by ID and update their data
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      req.body,  // The updated user data comes from the request body
      { new: true, runValidators: true }  // Options to return the updated document and run validations
    ).populate('thoughts').populate('friends');

    // If no user was found, return a 404 error
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Return the updated user data
    res.json(updatedUser);

  } catch (err) {
    console.error(err); // Log error details for debugging
    res.status(500).json({ message: 'An error occurred while updating the user.', error: err.message });
  }
});


// DELETE to remove user by its _id
router.delete('/:userId', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    await Thought.deleteMany({ _id: { $in: user.thoughts } });
    res.json({ message: 'User and associated thoughts deleted' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to add a new friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $addToSet: { friends: req.params.friendId } }, // Prevent duplicates
      { new: true } // Return the updated document
    ).populate('friends');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});


// DELETE to remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } }, // Remove the friend
      { new: true } // Return the updated document
    ).populate('friends');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
