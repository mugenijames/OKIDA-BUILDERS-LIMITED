const TeamMember = {
  getAll: () => db.query('SELECT * FROM team_members'),
  getById: (id) => db.query('SELECT * FROM team_members WHERE member_id = ?', [id]),
  create: (data) => db.query('INSERT INTO team_members SET ?', data),
  update: (id, data) => db.query('UPDATE team_members SET ? WHERE member_id = ?', [data, id]),
  delete: (id) => db.query('DELETE FROM team_members WHERE member_id = ?', [id])
};

module.exports = TeamMember;