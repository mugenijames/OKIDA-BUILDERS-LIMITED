const TeamMember = require('../models/TeamMember');

exports.getAllTeamMembers = async (req, res) => {
  try {
    const [members] = await TeamMember.getAll();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createTeamMember = async (req, res) => {
  try {
    await TeamMember.create(req.body);
    res.status(201).json({ message: 'Team member added' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add team member' });
  }
};

exports.updateTeamMember = async (req, res) => {
  try {
    await TeamMember.update(req.params.id, req.body);
    res.json({ message: 'Team member updated' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update team member' });
  }
};

exports.deleteTeamMember = async (req, res) => {
  try {
    await TeamMember.delete(req.params.id);
    res.json({ message: 'Team member deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete team member' });
  }
};
