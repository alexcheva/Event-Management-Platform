export const roles = ["Atendee", "Organizer", "Venue", "Admin"];

// User
// id, name, email, role, hashedPassword,
export const userFields = [
    { name: "name", label: "User Name" },
    { name: "email", label: "Email" },
    { name: "role", 
      label: "Role", 
      type: "select",
      options: [
        { label: "Atendee", value: "atendee" },
        { label: "Organizer", value: "organizer" },
        { label: "Admin", value: "admin" },
        { label: "Venue", value: "venue" },
      ],
    },
    { name: "password", label: "password" },
  ];

// Event
// id, organizerId, title, description, venueId, startAt, endAt, capacity, status
    // name, 
    // date, 
    // location, 
    // price, 
    // created_by, 
    // description, 
    // start_time, 
    // end_time

export const eventFields = [
  { name: "name", label: "Event Name" },
  { name: "date", label: "Date", type: "date" },
  { name: "start_time", label: "Starts at", type: "time" },
  { name: "end_time", label: "Ends at", type: "time" },
  { name: "description", label: "Description", multiline: true, rows: 4 },
  { name: "location", label: "Location" },
  { name: "price", label: "Price", type: "number" },
];