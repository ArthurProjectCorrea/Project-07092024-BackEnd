const express = require('express');
const Example = require('../models/Example');
const router = express.Router();

// GET: Fetch all examples
router.get('/', async (req, res) => {
  try {
    const examples = await Example.find();
    res.json(examples);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST: Add a new example
router.post('/', async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const newExample = new Example({ name, description });
    await newExample.save();
    res.status(201).json(newExample);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
