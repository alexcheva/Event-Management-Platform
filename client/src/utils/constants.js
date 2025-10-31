export const roles = ["Atendee", "Organizer", "Venue", "Admin"];

// User
// id, name, email, role, hashedPassword,
export const userFields = [
    { name: "name", label: "User Name" },
    { name: "email", label: "Email" },
    { name: "role", label: "Role" },
    { name: "password", label: "password" },
  ];

// Event
// id, organizerId, title, description, venueId, startAt, endAt, capacity, status
export const eventFields = [
  { name: "title", label: "Event Name" },
  { name: "date", label: "Date"},
  { name: "location", label: "Location" },
  { name: "price", label: "Price", type: "number" },
  // { name: "endAt", label: "DateAndTime" },
  // { name: "capacity", label: "DateAndTime" },
];