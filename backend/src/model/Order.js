import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 }
});

const orderSchema = new mongoose.Schema({
  user: { type: String, required: true },
  items: [orderItemSchema],
  total: { type: Number, required: true, min: 0 },
  shippingAddress: { type: String, required: true, trim: true },
  paymentMethod: { type: String, required: true, trim: true },
  status: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
