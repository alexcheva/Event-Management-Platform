import API from '../api/api';
export const globals = {
  // Fetch all events
  async fetchEvents() {
    const res = await fetch(`${API}/events`);
    if (!res.ok) throw new Error("Failed to fetch events");
    return await res.json();
  },
  // Fetch enrollments by ID
  async fetchUsers() {
    console.log("fetching users", `${API}/users`);
    const res = await API.get('/users');
    const users = res.body;
    console.log("res in fetchUsers", res.body);
    // if (!res.ok) throw new Error("Failed to fetch users");
    return await users;
  },

  async handleDeleteEvent(id) {
    console.log("delete event id", id)
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    const res = await API.delete(`/events/${id}`);
    console.log(res);
  },

  async handleDeleteUser(id) {
    console.log("delete user id", id)
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    console.log("nahdleDeleteUser confirmed")
    const res = await API.delete(`/users/${id}`);
    console.log(res);
  },

  // Add an event
  async addEvent(event) {
    const res = await fetch(`${API}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(event),
    });
    if (!res.ok) throw new Error("Failed to add event");
    return await res.json();
  },

  // Example: Generic API call
  async request(path, options = {}) {
    const res = await fetch(`${process.env.REACT_APP_API_URL}${path}`, options);
    if (!res.ok) {
      const message = await res.text();
      throw new Error(message || "Network error");
    }
    return await res.json();
  },
};

