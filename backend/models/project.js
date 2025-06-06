const Project = {
  getAll: () => db.query('SELECT * FROM projects'),
  getById: (id) => db.query('SELECT * FROM projects WHERE project_id = ?', [id]),
  create: (data) => db.query('INSERT INTO projects SET ?', data),
  update: (id, data) => db.query('UPDATE projects SET ? WHERE project_id = ?', [data, id]),
  delete: (id) => db.query('DELETE FROM projects WHERE project_id = ?', [id])
};

module.exports = Project;