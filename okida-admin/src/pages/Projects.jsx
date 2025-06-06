// src/pages/Projects.jsx
import React, { useEffect, useState } from 'react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', description: '', image_url: '' });
  const [editingId, setEditingId] = useState(null);
  const [editingProject, setEditingProject] = useState({ title: '', description: '', image_url: '' });

  const fetchProjects = async () => {
    const res = await fetch('http://localhost:5000/api/projects');
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleAdd = async () => {
    const res = await fetch('http://localhost:5000/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProject),
    });
    if (res.ok) {
      setNewProject({ title: '', description: '', image_url: '' });
      fetchProjects();
    }
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/projects/${id}`, { method: 'DELETE' });
    fetchProjects();
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setEditingProject(project);
  };

  const handleUpdate = async () => {
    await fetch(`http://localhost:5000/api/projects/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingProject),
    });
    setEditingId(null);
    setEditingProject({ title: '', description: '', image_url: '' });
    fetchProjects();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Projects</h2>
      <div className="flex gap-2 mb-6">
        <input className="border p-2" placeholder="Title" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} />
        <input className="border p-2" placeholder="Description" value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} />
        <input className="border p-2" placeholder="Image URL" value={newProject.image_url} onChange={(e) => setNewProject({ ...newProject, image_url: e.target.value })} />
        <button className="bg-blue-600 text-white px-4 py-2" onClick={handleAdd}>Add</button>
      </div>

      <ul className="space-y-4">
        {projects.map((p) => (
          <li key={p.id} className="border p-4 rounded-md">
            {editingId === p.id ? (
              <div className="space-y-2">
                <input className="border p-2 w-full" value={editingProject.title} onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })} />
                <input className="border p-2 w-full" value={editingProject.description} onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })} />
                <input className="border p-2 w-full" value={editingProject.image_url} onChange={(e) => setEditingProject({ ...editingProject, image_url: e.target.value })} />
                <div className="flex gap-2">
                  <button className="bg-green-600 text-white px-4 py-2" onClick={handleUpdate}>Save</button>
                  <button className="bg-gray-400 text-white px-4 py-2" onClick={() => setEditingId(null)}>Cancel</button>
                </div>
              </div>
            ) : (
              <div>
                <h4 className="font-bold">{p.title}</h4>
                <p>{p.description}</p>
                <img src={p.image_url} alt={p.title} className="w-48 h-auto my-2" />
                <div className="flex gap-2">
                  <button className="bg-yellow-500 text-white px-4 py-1" onClick={() => handleEdit(p)}>Edit</button>
                  <button className="bg-red-600 text-white px-4 py-1" onClick={() => handleDelete(p.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
