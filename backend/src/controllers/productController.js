import Product from '../model/Product.js';
import { fallbackStore } from '../utils/fallbackStore.js';

export const getProducts = async (_req, res) => {
  try {
    const products = await Product.find();
    if (products.length) return res.json(products);
    return res.json(fallbackStore.products);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) return res.json(product);
    const fallback = fallbackStore.products.find((item) => item._id === req.params.id);
    return fallback ? res.json(fallback) : res.status(404).json({ error: 'Product not found' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    return res.status(201).json(product);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (product) return res.json(product);
    const fallback = fallbackStore.products.find((item) => item._id === req.params.id);
    return fallback ? res.json({ ...fallback, ...req.body }) : res.status(404).json({ error: 'Product not found' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (product) return res.json({ message: 'Product deleted' });
    return res.status(404).json({ error: 'Product not found' });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
