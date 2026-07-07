import { useEffect, useState } from 'react';
import api from '../services/api';

const initialForm = {
  user: '',
  items: [{ product: '', quantity: 1, price: 0 }],
  total: 0,
  shippingAddress: '',
  paymentMethod: '',
  status: 'Pending'
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchData = async () => {
    setLoading(true);
    const [ordersRes, usersRes, productsRes] = await Promise.all([
      api.get('/orders'),
      api.get('/users'),
      api.get('/products')
    ]);
    setOrders(ordersRes.data);
    setUsers(usersRes.data);
    setProducts(productsRes.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/orders', { ...form, total: Number(form.total) });
      setForm(initialForm);
      setMessage('Order created successfully.');
      fetchData();
    } catch (error) {
      setMessage(error.response?.data?.error || 'Unable to create order.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-white">Orders</h2>
        <p className="mt-2 text-slate-400">Review purchases and create new orders in a polished command view.</p>
      </div>

      {message ? <div className="rounded-lg border border-violet-500/30 bg-violet-500/10 p-3 text-sm text-violet-200">{message}</div> : null}

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
          <h3 className="text-lg font-semibold text-white">Recent orders</h3>
          {loading ? <p className="mt-4 text-slate-400">Loading orders…</p> : (
            <div className="mt-4 space-y-3">
              {orders.map((order) => (
                <div key={order._id} className="rounded-xl border border-white/10 bg-slate-950/70 p-4">
                  <p className="font-medium text-white">{order.user}</p>
                  <p className="text-sm text-slate-400">Status: {order.status} • Total: ${order.total}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
          <h3 className="text-lg font-semibold text-white">Create order</h3>
          <div className="mt-4 space-y-3">
            <select className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-slate-100 outline-none ring-0" value={form.user} onChange={(e) => setForm({ ...form, user: e.target.value })} required>
              <option value="">Select user</option>
              {users.map((user) => <option key={user._id} value={user._id}>{user.name}</option>)}
            </select>
            <select className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-slate-100 outline-none ring-0" value={form.items[0].product} onChange={(e) => setForm({ ...form, items: [{ ...form.items[0], product: e.target.value, price: Number(products.find((product) => product._id === e.target.value)?.price || 0) }] })} required>
              <option value="">Select product</option>
              {products.map((product) => <option key={product._id} value={product._id}>{product.name}</option>)}
            </select>
            <input className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-slate-100 outline-none ring-0" type="number" placeholder="Quantity" value={form.items[0].quantity} onChange={(e) => setForm({ ...form, items: [{ ...form.items[0], quantity: Number(e.target.value) }] })} required />
            <input className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-slate-100 outline-none ring-0" placeholder="Shipping address" value={form.shippingAddress} onChange={(e) => setForm({ ...form, shippingAddress: e.target.value })} required />
            <input className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-slate-100 outline-none ring-0" placeholder="Payment method" value={form.paymentMethod} onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })} required />
            <input className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-slate-100 outline-none ring-0" type="number" placeholder="Total" value={form.total} onChange={(e) => setForm({ ...form, total: e.target.value })} required />
            <select className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-slate-100 outline-none ring-0" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option>Pending</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>
          <button className="mt-4 rounded-lg bg-violet-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-violet-400" type="submit">Place order</button>
        </form>
      </div>
    </div>
  );
}
