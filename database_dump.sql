-- DATABASE: eventdb
CREATE DATABASE eventdb;
\c eventdb;

-- USERS TABLE
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'attendee',
  created_at TIMESTAMP DEFAULT NOW()
);

-- EVENTS TABLE
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  location VARCHAR(150),
  price DECIMAL(10,2),
  created_by INT REFERENCES users(id) ON DELETE CASCADE
  description TEXT,
  start_time TIME,
  end_time TIME
);

-- Ticket types available for each event
CREATE TABLE event_ticket_types (
  id SERIAL PRIMARY KEY,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL, -- e.g. General, VIP, Early Bird
  price DECIMAL(10,2) NOT NULL,
  capacity INT NOT NULL,
  sold INT DEFAULT 0
);

-- Ticket purchase records
CREATE TABLE tickets (
  id SERIAL PRIMARY KEY,
  event_id INTEGER REFERENCES events(id),
  user_id INTEGER REFERENCES users(id),
  ticket_type_id INTEGER REFERENCES event_ticket_types(id),
  qr_code TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- SAMPLE DATA
INSERT INTO users (name, email, password, role)
VALUES
('Alexandra Lopez', 'alex@test.com', '$2a$10$F4Q9nLb1YhHnHXoE3tD7de1J6zNEmV.SG.bktm/3wxI9/b1FkhJW', 'organizer'),
('John Doe', 'john@test.com', '$2a$10$F4Q9nLb1YhHnHXoE3tD7de1J6zNEmV.SG.bktm/3wxI9/b1FkhJW', 'attendee'),
('Admin User', 'admin@test.com', '$2a$10$F4Q9nLb1YhHnHXoE3tD7de1J6zNEmV.SG.bktm/3wxI9/b1FkhJW', 'admin');

-- password for all: pass123

INSERT INTO events (name, date, location, price, created_by, description, start_time, end_time),
VALUES
('Tech Summit 2025', '2025-11-01', 'San Francisco', 99.99, 1, 'Wrole day event with multiple rooms and speakers', '09:00:00',	'23:00:00'),
('Design Expo', '2025-12-10', 'New York', 49.00, 1,'Showcase of art and design with vendors and speakers',	'06:00:00',	'21:00:00'),
('AI Conference', '2026-01-15', 'Seattle', 120.00, 1,'Cutting edge in the AI world - prototypes, robots, technology with lots of speakers and vendors', '10:00:00',	'21:00:00');

INSERT INTO event_ticket_types (id, event_id, type, price, capacity, sold) VALUES
(1,	1,	'general',	99.00,	60,	1),
(2,	1,	'vip',	199.00,	25,	1);


INSERT INTO tickets (id, event_id, user_id, ticket_type_id, qr_code, created_at),
VALUES
(1,	1,	4,	1,	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKtSURBVO3BQY7DVgwFwX6E7n/lziy5+oAg2XEYVsU/rDGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRinWKMUapVijFGuUYo1y8VASvknljiTcodIl4ZtUnijWKMUapVijXLxM5U1JuCMJJypPqLwpCW8q1ijFGqVYo1x8WBLuULkjCZ1Kl4QuCScqdyThDpVPKtYoxRqlWKNcDJOETqVLwmTFGqVYoxRrlIthVLokdCpdEiYp1ijFGqVYo1x8mMovSUKn8oTKLynWKMUapVijXLwsCb9MpUtCp3KShF9WrFGKNUqxRol/+A9LQqfyf1asUYo1SrFGuXgoCZ1Kl4Q3qXQqXRLuUDlJwptUPqlYoxRrlGKNcvFhKl0S7lDpktCpdConSeiS0Kl0KidJ6FS6JJwkoVN5olijFGuUYo1y8WFJOFE5SUKncpKETqVT6ZJwRxJOknCShE7lTcUapVijFGuUi5cloVPpknCShE7lJAknSbgjCScqXRI6lZMkfFKxRinWKMUa5eJlKl0STpLQqXRJ6FROVO5IQqdykoSTJHQq31SsUYo1SrFGiX/4D0vCHSpdEk5UuiScqPybijVKsUYp1ijxDw8k4ZtUnkhCp9Il4UTllxVrlGKNUqxRLl6m8qYknCThRKVTeSIJncpJEjqVLgmdyhPFGqVYoxRrlIsPS8IdKk+odEk4UelUTpJwh8qJypuKNUqxRinWKBfDJKFTOUlCp3JHEjqVLgmdyicVa5RijVKsUS6GUemS0KnckYRO5ZcVa5RijVKsUS4+TOWTVE5UvikJdyShU3miWKMUa5RijXLxsiR8UxLuULlDpUvCicodKm8q1ijFGqVYo8Q/rDGKNUqxRinWKMUapVijFGuUYo1SrFGKNUqxRinWKMUapVijFGuUYo3yD5fIBPq0mE3uAAAAAElFTkSuQmCC	2025-11-02 23:11:42.522434',),
(2,	1,	4, 2,	'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAAAAklEQVR4AewaftIAAAKiSURBVO3BQW7sWAwEwUxC979yjZdcPUCQur/NYYT5wRqjWKMUa5RijVKsUYo1SrFGKdYoxRqlWKMUa5RijVKsUYo1SrFGKdYoFw+pfFMSOpU3JaFT+aYkPFGsUYo1SrFGuXhZEt6kcpKEE5UuCZ3KHUl4k8qbijVKsUYp1igXH6ZyRxKeUOmS0Km8SeWOJHxSsUYp1ijFGuXij1PpktCpdEnoVCYp1ijFGqVYo1wMl4T/k2KNUqxRijXKxYcl4V9SOUnCE0n4TYo1SrFGKdYoFy9T+c2S0Kl0SThR+c2KNUqxRinWKOYHf5jKm5LwlxVrlGKNUqxRLh5S6ZJwh0qXhE7ljiScqHRJ6FTelIQTlS4JTxRrlGKNUqxRzA8+SOWOJJyodEk4UfmmJHQqJ0l4U7FGKdYoxRrl4iGVkyR0KneonKg8kYQTlZMknCShU/mkYo1SrFGKNcrFh6l0SehUTpLQqZwkoVPpknCicpKEE5V/qVijFGuUYo1y8VASOpUnVE6S0Kk8odIl4Q6VkyScqHRJeKJYoxRrlGKNcvGyJNyRhE9KwhMqXRJOknCi8knFGqVYoxRrlIuHVL4pCScqJ0k4UXlC5SQJn1SsUYo1SrFGuXhZEt6kcpKETqVLQqdyRxI6lTuScKLSJeGJYo1SrFGKNcrFh6nckYQ7VE5UTpJwRxKeUPmkYo1SrFGKNcrFH5eETqVLwonKSRJOVLokdCrfVKxRijVKsUa5GCYJncpJEk5UuiScqHRJ+KZijVKsUYo1ysWHJeFfSkKn8klJuEOlS8ITxRqlWKMUa5SLl6l8k0qXhJMkdCrfpPJJxRqlWKMUaxTzgzVGsUYp1ijFGqVYoxRrlGKNUqxRijVKsUYp1ijFGqVYoxRrlGKNUqxR/gMn1O7+UStyKgAAAABJRU5ErkJggg==	2025-11-02 23:14:37.535531');
