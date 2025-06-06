import React, { useEffect, useState } from 'react';

const Services = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchServices = async () => {
    const res = await fetch('http://localhost:5000/api/services');
    const data = await res.json();
    setServices(data);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSubmit = async () => {
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `http://localhost:5000/api/services/${editingId}`
      : 'http://localhost:5000/api/services';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ title: '', description: '' });
      setEditingId(null);
      fetchServices();
    }
  };

  const handleEdit = (service) => {
    setForm({ title: service.title, description: service.description });
    setEditingId(service.id);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/services/${id}`, { method: 'DELETE' });
    fetchServices();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Services</h2>
      <div className="mb-4 space-y-2">
        <input
          className="border p-2 w-full rounded"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="border p-2 w-full rounded"
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          {editingId ? 'Update Service' : 'Add Service'}
        </button>
      </div>
      <ul className="space-y-4">
        {services.map((service) => (
          <li
            key={service.id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{service.title}</h3>
              <p>{service.description}</p>
            </div>
            <div className="space-x-2">
              <button
                className="bg-yellow-400 px-3 py-1 rounded text-white"
                onClick={() => handleEdit(service)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 px-3 py-1 rounded text-white"
                onClick={() => handleDelete(service.id)}
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

export default Services;
