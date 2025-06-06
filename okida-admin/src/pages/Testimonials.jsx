import React, { useEffect, useState } from 'react';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({ name: '', message: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchTestimonials = async () => {
    const res = await fetch('http://localhost:5000/api/testimonials');
    const data = await res.json();
    setTestimonials(data);
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleSubmit = async () => {
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId
      ? `http://localhost:5000/api/testimonials/${editingId}`
      : 'http://localhost:5000/api/testimonials';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ name: '', message: '' });
      setEditingId(null);
      fetchTestimonials();
    }
  };

  const handleEdit = (testimonial) => {
    setForm({ name: testimonial.name, message: testimonial.message });
    setEditingId(testimonial.id);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/testimonials/${id}`, { method: 'DELETE' });
    fetchTestimonials();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Manage Testimonials</h2>
      <div className="mb-4 space-y-2">
        <input
          className="border p-2 w-full rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <textarea
          className="border p-2 w-full rounded"
          placeholder="Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          {editingId ? 'Update Testimonial' : 'Add Testimonial'}
        </button>
      </div>
      <ul className="space-y-4">
        {testimonials.map((t) => (
          <li
            key={t.id}
            className="bg-white p-4 rounded shadow flex justify-between items-start"
          >
            <div>
              <h3 className="font-semibold">{t.name}</h3>
              <p>{t.message}</p>
            </div>
            <div className="space-x-2">
              <button
                className="bg-yellow-400 px-3 py-1 rounded text-white"
                onClick={() => handleEdit(t)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 px-3 py-1 rounded text-white"
                onClick={() => handleDelete(t.id)}
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

export default Testimonials;
