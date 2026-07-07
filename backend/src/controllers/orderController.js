import Order from '../model/Order.js';
import { fallbackStore } from '../utils/fallbackStore.js';

export const getOrders = async (_req, res) => {
  try {
    const orders = await Order.find();
    if (orders.length) return res.json(orders);
    return res.json(fallbackStore.orders);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) return res.json(order);
    const fallback = fallbackStore.orders.find((item) => item._id === req.params.id);
    return fallback ? res.json(fallback) : res.status(404).json({ error: 'Order not found' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    return res.status(201).json(order);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (order) return res.json(order);
    const fallback = fallbackStore.orders.find((item) => item._id === req.params.id);
    return fallback ? res.json({ ...fallback, ...req.body }) : res.status(404).json({ error: 'Order not found' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (order) return res.json({ message: 'Order deleted' });
    return res.status(404).json({ error: 'Order not found' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
