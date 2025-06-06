import React, { useEffect, useState } from 'react';

const TeamMembers = () => {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({ name: '', role: '', photoUrl: '' });
  const [file, setFile] = useState(null); 
  const [editingId, setEditingId] = useState(null);

  const fetchMembers = async () => {
    const res = await fetch('http://localhost:5000/api/team-members');
    const data = await res.json();
    setMembers(data);
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

    if (file) {
      formData.append('photo', file);
    } else {
      formData.append('photoUrl', form.photoUrl);
    }

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
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Team Members</h2>
      <div className="mb-4 space-y-2">
        <input
          className="border p-2 w-full rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2 w-full rounded"
          placeholder="Role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />

        <label>
          Upload photo from file:
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        {/* <label>
          Or enter photo URL:
          <input
            className="border p-2 w-full rounded"
            placeholder="Photo URL"
            value={form.photoUrl}
            onChange={(e) => setForm({ ...form, photoUrl: e.target.value })}
          />
        </label> */}

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          {editingId ? 'Update Member' : 'Add Member'}
        </button>
      </div>

      <ul className="space-y-4">
        {members.map((member) => (
          <li
            key={member.member_id}
            className="bg-white p-4 rounded shadow flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <img
                src={
                  member.photo.startsWith('http')
                    ? member.photo
                    : `http://localhost:5000/uploads/${member.photo}`
                }
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{member.name}</h3>
                <p>{member.role}</p>
              </div>
            </div>
            <div className="space-x-2">
              <button
                className="bg-yellow-400 px-3 py-1 rounded text-white"
                onClick={() => handleEdit(member)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 px-3 py-1 rounded text-white"
                onClick={() => handleDelete(member.member_id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamMembers;
