import { useEffect, useState } from 'react';
import api from '../services/api';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', age: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    const response = await api.get('/users');
    setUsers(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await api.post('/users', { ...form, age: Number(form.age) });
      setForm({ name: '', email: '', age: '' });
      setMessage('User created successfully.');
      fetchUsers();
    } catch (error) {
      setMessage(error.response?.data?.error || 'Unable to create user.');
    }
  };

  const handleDelete = async (id) => {
    await api.delete(`/users/${id}`);
    setMessage('User removed.');
    fetchUsers();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-white">Users</h2>
        <p className="mt-2 text-slate-400">Manage administrators and team members with a calmer workflow.</p>
      </div>

      {message ? <div className="rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-3 text-sm text-cyan-200">{message}</div> : null}

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
          <h3 className="text-lg font-semibold text-white">User directory</h3>
          {loading ? <p className="mt-4 text-slate-400">Loading users…</p> : (
            <div className="mt-4 space-y-3">
              {users.map((user) => (
                <div key={user._id} className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/70 p-4">
                  <div>
                    <p className="font-medium text-white">{user.name}</p>
                    <p className="text-sm text-slate-400">{user.email} • {user.age} years</p>
                  </div>
                  <button onClick={() => handleDelete(user._id)} className="rounded-lg bg-rose-500/20 px-3 py-2 text-sm text-rose-300 transition hover:bg-rose-500/30">Delete</button>
                </div>
              ))}
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20">
          <h3 className="text-lg font-semibold text-white">Create user</h3>
          <div className="mt-4 space-y-3">
            <input className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-slate-100 outline-none ring-0" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            <input className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-slate-100 outline-none ring-0" type="email" placeholder="Email address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            <input className="w-full rounded-lg border border-slate-700 bg-slate-950/70 px-3 py-2 text-slate-100 outline-none ring-0" type="number" placeholder="Age" value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} required />
          </div>
          <button className="mt-4 rounded-lg bg-cyan-500 px-4 py-2 font-medium text-slate-950 transition hover:bg-cyan-400" type="submit">Save user</button>
        </form>
      </div>
    </div>
  );
}
