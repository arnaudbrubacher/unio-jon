import express from 'express';

const router = express.Router();

// Define a simple route for the home page
router.get('/', (req, res) => {
  res.send('Welcome to my Express app!');
});

export default router;
