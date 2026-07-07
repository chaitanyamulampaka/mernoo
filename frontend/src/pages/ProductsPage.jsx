import { useEffect, useState } from 'react';
import api from '../services/api';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', description: '', price: '', category: '', stock: '', available: true });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    const response = await api.get('/products');
    setProducts(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/products', {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        available: Boolean(form.available)
      });
      setForm({ name: '', description: '', price: '', category: '', stock: '', available: true });
      setMessage('Product created successfully.');
      fetchProducts();
    } catch (error) {
      setMessage(error.response?.data?.error || 'Unable to create product.');
    }
  };

  const handleDelete = async (id) => {
    await api.delete(`/products/${id}`);
    setMessage('Product removed.');
    fetchProducts();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-white">Products</h2>
        <p className="mt-2 text-slate-400">Create and manage inventory items with a glossy, focused layout.</p>
      </div>

      {message ? <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-200">{message}</div> : null}

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
          <h3 className="text-lg font-semibold text-white">Inventory</h3>
          {loading ? <p className="mt-4 text-slate-400">Loading products…</p> : (
            <div className="mt-4 space-y-3">
              {products.map((product) => (
                <div key={product._id} className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/70 p-4">
                  <div>
                    <p className="font-medium text-white">{product.name}</p>
                    <p className="text-sm text-slate-400">{product.category} • ${product.price} • Stock {product.stock}</p>
                  </div>
                  <button onClick={() => handleDelete(product._id)} className="rounded-lg bg-rose-500/20 px-3 py-2 text-sm text-rose-300 transition hover:bg-rose-500/30">Delete</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
          <h3 className="text-lg font-semibold text-white">Create product</h3>
          <div className="mt-4 space-y-3">
            <input className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-slate-100 outline-none ring-0" placeholder="Product name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-slate-100 outline-none ring-0" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
            <input className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-slate-100 outline-none ring-0" type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            <input className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-slate-100 outline-none ring-0" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
            <input className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-slate-100 outline-none ring-0" type="number" placeholder="Stock" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} required />
            <label className="flex items-center gap-2 text-sm text-slate-400">
              <input type="checkbox" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} />
              Available for sale
            </label>
          </div>
          <button className="mt-4 rounded-lg bg-emerald-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-emerald-400" type="submit">Save product</button>
        </form>
      </div>
    </div>
  );
}
