import React, { useEffect, useState } from 'react';

const TeamMembers = () => {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ name: '', role: '', photoUrl: '' });
  const [file, setFile] = useState(null); 
  const [editingId, setEditingId] = useState(null);

  const fetchMembers = async () => {
    const res = await fetch('http://localhost:5000/api/team-members');
    const data = await res.json();
    const normalized = data.map(member => ({
      ...member,
      photo: typeof member.photo === 'string' ? member.photo : '',
    }));
    setMembers(normalized);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSubmit = async () => {
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `http://localhost:5000/api/team-members/${editingId}`
      : 'http://localhost:5000/api/team-members';

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('role', form.role);
    if (file) formData.append('photo', file);
    else formData.append('photoUrl', form.photoUrl);

    const res = await fetch(url, {
      method,
      body: formData,
    });

    if (res.ok) {
      setForm({ name: '', role: '', photoUrl: '' });
      setFile(null);
      setEditingId(null);
      fetchMembers();
    } else {
      alert('Failed to save member');
    }
  };

  const handleEdit = (member) => {
    setForm({ name: member.name, role: member.role, photoUrl: member.photo });
    setFile(null); 
    setEditingId(member.member_id);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/team-members/${id}`, {
      method: 'DELETE',
    });
    fetchMembers();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Manage Team Members</h2>

      {/* Form Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 space-y-4">
        <input
          className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border border-gray-300 p-3 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />
        <input
          type="file"
          accept="image/*"
          className="border border-gray-300 p-2 w-full rounded-md"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
          onClick={handleSubmit}
        >
          {editingId ? 'Update Member' : 'Add Member'}
        </button>
      </div>

      {/* Members List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div
            key={member.member_id}
            className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center"
          >
            <img
              src={
                typeof member.photo === 'string' && member.photo.startsWith('http')
                  ? member.photo
                  : `http://localhost:5000/uploads/${member.photo || 'default.jpg'}`
              }
              alt={member.name}
              className="w-24 h-24 rounded-full object-cover mb-3 border-2 border-gray-200"
            />
            <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{member.role}</p>
            <div className="flex space-x-2">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                onClick={() => handleEdit(member)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleDelete(member.member_id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembers;
