const express = require('express');
const router = express.Router();
const Thought = require('../../models/thought');
const User = require('../../models/user');
const mongoose = require('mongoose');

// GET all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single thought by its _id
router.get('/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST to create a new thought
router.post('/', async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Log the request body for debugging

    const { thoughtText, username, userId } = req.body;

    // Ensure the required fields are present
    if (!thoughtText || !username || !userId) {
      return res.status(400).json({ message: 'Thought text, username, and userId are required.' });
    }

    // Create a new thought
    const thought = await Thought.create({ thoughtText, username });

    // Update the user's thoughts array
    await User.findByIdAndUpdate(userId, { $push: { thoughts: thought._id } });

    res.status(201).json(thought);
  } catch (err) {
    console.error('Error creating thought:', err); // Log error details for debugging
    res.status(500).json({ message: 'An error occurred while creating the thought.', error: err });
  }
});

// PUT to update a thought by its _id
router.put('/:thoughtId', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE to remove a thought by its _id
router.delete('/:thoughtId', async (req, res) => {
  try {
    const { thoughtId } = req.params;

    console.log('Deleting Thought ID:', thoughtId); // Log the thoughtId being processed

    // Check if the provided thoughtId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(thoughtId)) {
      console.log('Invalid ObjectId format:', thoughtId); // Log invalid format
      return res.status(400).json({ message: 'Invalid thoughtId format' });
    }

    // Find and delete the thought
    const thought = await Thought.findByIdAndDelete(thoughtId);
    console.log('Deleted Thought:', thought); // Log the deleted thought

    if (!thought) {
      console.log('Thought not found:', thoughtId); // Log if thought was not found
      return res.status(404).json({ message: 'Thought not found' });
    }

    // Check if the thought has a userId and update the User model
    if (thought.userId) {
      console.log('Updating User ID:', thought.userId); // Log the userId being processed
      await User.findByIdAndUpdate(thought.userId, { $pull: { thoughts: thought._id } });
    }

    res.json({ message: 'Thought deleted' });
  } catch (err) {
    console.error('Error deleting thought:', err); // Log error details for debugging
    res.status(500).json({ message: 'An error occurred while deleting the thought.', error: err.message });
  }
});


// POST to create a reaction
router.post('/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $push: { reactions: req.body } }, { new: true });
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE to pull and remove a reaction
router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, { $pull: { reactions: { reactionId: req.params.reactionId } } }, { new: true });
    if (!thought) return res.status(404).json({ message: 'Thought not found' });
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;



