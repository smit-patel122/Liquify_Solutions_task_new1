const express = require('express');
const router = express.Router();

// Mock teams data
const teams = ['Team A', 'Team B', 'Team C'];

router.get('/', (req, res) => {
  res.json(teams);
});

module.exports = router;
