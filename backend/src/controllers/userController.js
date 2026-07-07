import User from '../model/User.js';
import { fallbackStore } from '../utils/fallbackStore.js';

const useFallback = () => fallbackStore.users;

export const getUsers = async (_req, res) => {
  try {
    const users = await User.find();
    if (users.length) return res.json(users);
    return res.json(useFallback());
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) return res.json(user);
    const fallback = fallbackStore.users.find((item) => item._id === req.params.id);
    return fallback ? res.json(fallback) : res.status(404).json({ error: 'User not found' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (user) return res.json(user);
    const fallback = fallbackStore.users.find((item) => item._id === req.params.id);
    return fallback ? res.json({ ...fallback, ...req.body }) : res.status(404).json({ error: 'User not found' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) return res.json({ message: 'User deleted' });
    return res.status(404).json({ error: 'User not found' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
