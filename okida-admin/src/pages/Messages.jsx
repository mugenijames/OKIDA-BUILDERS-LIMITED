// src/pages/Messages.jsx
import React, { useEffect, useState } from "react";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/messages");
      if (!res.ok) throw new Error("Failed to fetch messages");
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/messages/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setMessages(messages.filter((msg) => msg.id !== id));
      } else {
        throw new Error("Failed to delete message");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div>
      <h2>Manage Messages</h2>
      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <ul>
          {messages.map(({ id, name, email, subject, content }) => (
            <li key={id} style={{ marginBottom: "20px" }}>
              <strong>{subject}</strong> from {name} ({email})
              <p>{content}</p>
              <button onClick={() => handleDelete(id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Messages;
