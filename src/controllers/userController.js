import { User } from '../models/User.js';

export const getUsers = async (req, res) => {
  try {
    const events = await User.getAll();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const event = await User.getById(req.params.id);
    if (!event) return res.status(404).json({ message: 'User not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const event = await User.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const event = await User.update(req.params.id, req.body);
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    console.log("deleteUser is called")
    const result = await User.delete(req.params.id);
    console.log("result", result)
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
