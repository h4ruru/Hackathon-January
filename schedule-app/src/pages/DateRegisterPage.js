import React, { useState } from "react";

const DateRegisterPage = ({ user }) => {
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [events, setEvents] = useState([]);

  const handleRegisterDate = () => {
    if (date.trim() && description.trim()) {
      setEvents([...events, { date, description }]);
      setDate("");
      setDescription("");
    }
  };

  return (
    <div>
      <h2>行ける日登録</h2>
      {user && <p>Logged in as: {user}</p>}
      <input 
        type="date" 
        value={date} 
        onChange={(e) => setDate(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Event Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
      />
      <button onClick={handleRegisterDate}>Register</button>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event.date}: {event.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default DateRegisterPage;
