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
);

-- SAMPLE DATA
INSERT INTO users (name, email, password, role)
VALUES
('Alexandra Lopez', 'alex@test.com', 'test', 'organizer'),
('John Doe', 'john@test.com', '$2a$10$F4Q9nLb1YhHnHXoE3tD7de1J6zNEmV.SG.bktm/3wxI9/b1FkhJW', 'attendee'),
('Admin User', 'admin@test.com', '$2a$10$F4Q9nLb1YhHnHXoE3tD7de1J6zNEmV.SG.bktm/3wxI9/b1FkhJW', 'admin');

-- password for all: pass123

INSERT INTO events (name, date, location, price, created_by)
VALUES
('Tech Summit 2025', '2025-11-01', 'San Francisco', 99.99, 1),
('Design Expo', '2025-12-10', 'New York', 49.00, 1),
('AI Conference', '2026-01-15', 'Seattle', 120.00, 1);