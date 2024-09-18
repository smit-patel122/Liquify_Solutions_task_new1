const express = require('express');
const router = express.Router();
const Player = require('../models/Player');

router.get('/', async (req, res) => {
  try {
    const players = await Player.find(req.query);
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const player = await Player.findById(req.params.id);
    res.json(player);
  } catch (error) {
    res.status(404).json({ message: 'Player not found' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { name, role, isCaptain, isViceCaptain, team } = req.body;
    const uniqueRoles = await Player.validateUniqueRoles(team, isCaptain, isViceCaptain);
    if (!uniqueRoles) return res.status(400).json({ message: 'Team already has a captain or vice-captain' });

    const player = new Player({ name, role, isCaptain, isViceCaptain, team });
    await player.save();
    res.status(201).json(player);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { name, role, isCaptain, isViceCaptain, team } = req.body;
    const uniqueRoles = await Player.validateUniqueRoles(team, isCaptain, isViceCaptain);
    if (!uniqueRoles) return res.status(400).json({ message: 'Team already has a captain or vice-captain' });

    const player = await Player.findByIdAndUpdate(req.params.id, { name, role, isCaptain, isViceCaptain, team }, { new: true });
    res.json(player);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Player.findByIdAndDelete(req.params.id);
    res.json({ message: 'Player deleted' });
  } catch (error) {
    res.status(404).json({ message: 'Player not found' });
  }
});

module.exports = router;
