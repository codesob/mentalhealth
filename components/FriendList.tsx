import React from "react";
import Link from "next/link";

interface Friend {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string;
  lastMessageTime?: string;
  online?: boolean;
  status?: "PENDING" | "ACCEPTED" | "BLOCKED";
  mood?: string;
  lastActive?: string;
}

const FriendList: React.FC = () => {
  const [friends, setFriends] = React.useState<Friend[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [pendingRequests, setPendingRequests] = React.useState<Friend[]>([]);
  const [showPending, setShowPending] = React.useState(false);

  React.useEffect(() => {
    // Fetch friends and pending requests from API
    fetchFriends();
    fetchPendingRequests();
  }, []);

  const fetchFriends = async () => {
    try {
      const response = await fetch("/api/friends");
      const data = await response.json();
      setFriends(data);
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  const fetchPendingRequests = async () => {
    try {
      const response = await fetch("/api/friends/pending");
      const data = await response.json();
      setPendingRequests(data);
    } catch (error) {
      console.error("Error fetching pending requests:", error);
    }
  };

  const handleFriendRequest = async (
    friendId: string,
    action: "accept" | "reject"
  ) => {
    try {
      await fetch(`/api/friends/${friendId}/${action}`, { method: "POST" });
      fetchFriends();
      fetchPendingRequests();
    } catch (error) {
      console.error(`Error ${action}ing friend request:`, error);
    }
  };

  const filteredFriends = friends.filter((friend) =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="friend-list-container">
      <div className="friend-list-header">
        <input
          type="text"
          placeholder="Search friends..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <div className="tabs">
          <button
            className={`tab ${!showPending ? "active" : ""}`}
            onClick={() => setShowPending(false)}
          >
            Friends ({friends.length})
          </button>
          <button
            className={`tab ${showPending ? "active" : ""}`}
            onClick={() => setShowPending(true)}
          >
            Pending ({pendingRequests.length})
          </button>
        </div>
      </div>

      <div className="friends-grid">
        {(showPending ? pendingRequests : filteredFriends).map((friend) => (
          <div key={friend.id} className="friend-card">
            <div className="friend-avatar">
              <img
                src={friend.avatar || "/avatars/default.png"}
                alt={friend.name}
              />
              <span
                className={`status-indicator ${
                  friend.online ? "online" : "offline"
                }`}
              />
            </div>
            <div className="friend-info">
              <h3>{friend.name}</h3>
              {friend.mood && (
                <p className="mood">Feeling: {friend.mood}</p>
              )}
              {friend.lastActive && (
                <p className="last-active">
                  Last active: {friend.lastActive}
                </p>
              )}
              {showPending ? (
                <div className="request-actions">
                  <button
                    onClick={() => handleFriendRequest(friend.id, "accept")}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleFriendRequest(friend.id, "reject")}
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <Link href={`/chat/${friend.id}`}>
                  <button className="chat-button">Chat</button>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendList;
