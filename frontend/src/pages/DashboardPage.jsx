import { useEffect, useState } from 'react';
import api from '../services/api';

function StatCard({ label, value, accent, subtitle }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-2xl shadow-slate-950/40 backdrop-blur ${accent}`}>
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
    </div>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState({ users: 0, products: 0, orders: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [usersRes, productsRes, ordersRes] = await Promise.all([
          api.get('/users'),
          api.get('/products'),
          api.get('/orders')
        ]);
        setStats({
          users: usersRes.data.length,
          products: productsRes.data.length,
          orders: ordersRes.data.length
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-500/10 via-slate-900 to-violet-500/10 p-6 shadow-2xl shadow-black/20">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300">Mernoo workspace</p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Welcome back to your admin hub</h2>
            <p className="mt-2 max-w-2xl text-slate-400">Track every customer, product, and order in one elegant workspace built for calm, fast operations.</p>
          </div>
          <div className="rounded-full border border-white/10 bg-slate-950/60 px-4 py-2 text-sm text-slate-300">Live control panel</div>
        </div>
      </div>

      {loading ? (
        <p className="text-slate-400">Loading summary…</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          <StatCard label="Users" value={stats.users} subtitle="Team and customers" accent="border-cyan-400/20" />
          <StatCard label="Products" value={stats.products} subtitle="Inventory items" accent="border-emerald-400/20" />
          <StatCard label="Orders" value={stats.orders} subtitle="Open and completed" accent="border-violet-400/20" />
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
          <h3 className="text-lg font-semibold text-white">What you can do</h3>
          <ul className="mt-4 space-y-3 text-slate-400">
            <li>• Create, update, and remove users, products, and orders.</li>
            <li>• Switched between sections without leaving the flow of work.</li>
            <li>• Use the built-in sample data whenever your database is still warming up.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
          <h3 className="text-lg font-semibold text-white">Quick notes</h3>
          <p className="mt-3 text-sm leading-7 text-slate-400">Mernoo is designed to look polished while staying simple. It is ready for your next CRUD feature, analytics widget, or reporting view.</p>
        </div>
      </div>
    </div>
  );
}
