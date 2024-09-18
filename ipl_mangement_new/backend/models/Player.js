const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  isCaptain: { type: Boolean, default: false },
  isViceCaptain: { type: Boolean, default: false },
  team: { type: String, required: true }
});

// Define the static method `validateUniqueRoles`
playerSchema.statics.validateUniqueRoles = async function(team, isCaptain, isViceCaptain) {
  const filter = { team };
  if (isCaptain) filter.isCaptain = true;
  if (isViceCaptain) filter.isViceCaptain = true;

  const existingPlayers = await this.find(filter);
  const hasCaptain = existingPlayers.some(p => p.isCaptain);
  const hasViceCaptain = existingPlayers.some(p => p.isViceCaptain);

  if ((isCaptain && hasCaptain) || (isViceCaptain && hasViceCaptain)) {
    return false; // Team already has a captain or vice-captain
  }
  return true;
};

module.exports = mongoose.model('Player', playerSchema);
