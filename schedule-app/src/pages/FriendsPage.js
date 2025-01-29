import React, { useState } from "react";

const FriendsPage = ({ user }) => {
  const [friendName, setFriendName] = useState("");
  const [friends, setFriends] = useState([]);

  const addFriend = () => {
    if (friendName.trim()) {
      setFriends([...friends, friendName]);
      setFriendName("");
    }
  };

  return (
    <div>
      <h2>友達リスト</h2>
      {user && <p>名前: {user}</p>}
      <input 
        type="text" 
        placeholder="Add a friend" 
        value={friendName} 
        onChange={(e) => setFriendName(e.target.value)} 
      />
      <button onClick={addFriend}>追加</button>
      <ul>
        {friends.map((friend, index) => (
          <li key={index}>{friend}</li>
        ))}
      </ul>
    </div>
  );
};

export default FriendsPage;
