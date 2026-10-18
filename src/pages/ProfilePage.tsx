import { LogOut, MapPin, Plus, Trash2, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { deleteAddress, fetchAddresses, saveAddress, updateProfile } from '../lib/api';
import { DELIVERY_ZONES } from '../lib/config';
import type { Address } from '../types';

export default function ProfilePage() {
  const { user, profile, signOut, refreshProfile } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(profile?.fullName ?? '');
  const [phone, setPhone] = useState(profile?.phone ?? '');
  const [saving, setSaving] = useState(false);

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [newLine1, setNewLine1] = useState('');
  const [newArea, setNewArea] = useState('');
  const [newCity, setNewCity] = useState('Kano');

  useEffect(() => {
    setFullName(profile?.fullName ?? '');
    setPhone(profile?.phone ?? '');
  }, [profile]);

  useEffect(() => {
    if (user) void fetchAddresses(user.id).then(setAddresses);
  }, [user]);

  const handleSaveProfile = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await updateProfile(user.id, { fullName, phone });
      await refreshProfile();
      toast('Profile updated');
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Could not save your profile', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleAddAddress = async () => {
    if (!user || !newLine1.trim()) {
      toast('Enter a street address first', 'error');
      return;
    }
    try {
      const created = await saveAddress(user.id, {
        label: 'Home',
        line1: newLine1.trim(),
        area: newArea.trim(),
        city: newCity,
        isDefault: addresses.length === 0,
      });
      setAddresses((prev) => [...prev, created]);
      setNewLine1('');
      setNewArea('');
      toast('Address saved');
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Could not save the address', 'error');
    }
  };

  const handleDeleteAddress = async (id: string) => {
    try {
      await deleteAddress(id);
      setAddresses((prev) => prev.filter((a) => a.id !== id));
      toast('Address removed');
    } catch (e) {
      toast(e instanceof Error ? e.message : 'Could not remove the address', 'error');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="mx-auto max-w-[760px] space-y-6">
      <h1 className="font-display text-[clamp(26px,3.2vw,34px)] font-bold text-[#0A2E24]">
        Your account
      </h1>

      <section className="rounded-2xl border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] p-6">
        <h2 className="mb-5 flex items-center gap-2 font-display text-lg font-bold text-[#0A2E24]">
          <User size={18} className="text-[#DF5F49]" />
          Your details
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-[12.5px] font-semibold text-[#3D4E46]">Full name</span>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border-[1.5px] border-[#E4DACA] bg-[#FAF5EC] px-4 py-3 text-sm outline-none focus:border-[#E9A93A]"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[12.5px] font-semibold text-[#3D4E46]">Phone</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel"
              className="w-full rounded-xl border-[1.5px] border-[#E4DACA] bg-[#FAF5EC] px-4 py-3 text-sm outline-none focus:border-[#E9A93A]"
            />
          </label>
        </div>
        <p className="mt-3 text-[12.5px] text-[#6C7C73]">
          Signed in as {user?.email}
        </p>
        <button
          onClick={handleSaveProfile}
          disabled={saving}
          className="mt-4 rounded-full bg-[#E9A93A] px-5 py-2.5 text-sm font-bold text-[#3A2A08] shadow-[0_3px_0_#C68A22] transition enabled:hover:-translate-y-0.5 disabled:opacity-60"
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </section>

      <section className="rounded-2xl border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] p-6">
        <h2 className="mb-5 flex items-center gap-2 font-display text-lg font-bold text-[#0A2E24]">
          <MapPin size={18} className="text-[#DF5F49]" />
          Delivery addresses
        </h2>

        {addresses.length > 0 && (
          <ul className="mb-5 space-y-2.5">
            {addresses.map((a) => (
              <li
                key={a.id}
                className="flex items-center gap-3 rounded-xl border-[1.5px] border-[#E4DACA] bg-[#FAF5EC] px-4 py-3"
              >
                <MapPin size={15} className="shrink-0 text-[#6C7C73]" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold">{a.line1}</span>
                  <span className="block text-[12px] text-[#6C7C73]">
                    {[a.area, a.city].filter(Boolean).join(', ')}
                  </span>
                </span>
                {a.isDefault && (
                  <span className="shrink-0 rounded-full bg-[#DDEBE3] px-2.5 py-1 text-[10px] font-bold text-[#0F4132]">
                    DEFAULT
                  </span>
                )}
                <button
                  onClick={() => handleDeleteAddress(a.id)}
                  aria-label={`Remove ${a.line1}`}
                  className="shrink-0 text-[#6C7C73] transition hover:text-[#DF5F49]"
                >
                  <Trash2 size={15} />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="grid gap-3 sm:grid-cols-[2fr_1fr_1fr]">
          <input
            value={newLine1}
            onChange={(e) => setNewLine1(e.target.value)}
            placeholder="House number and street"
            aria-label="Street address"
            className="rounded-xl border-[1.5px] border-[#E4DACA] bg-[#FAF5EC] px-4 py-3 text-sm outline-none focus:border-[#E9A93A]"
          />
          <input
            value={newArea}
            onChange={(e) => setNewArea(e.target.value)}
            placeholder="Area"
            aria-label="Area"
            className="rounded-xl border-[1.5px] border-[#E4DACA] bg-[#FAF5EC] px-4 py-3 text-sm outline-none focus:border-[#E9A93A]"
          />
          <select
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
            aria-label="City"
            className="rounded-xl border-[1.5px] border-[#E4DACA] bg-[#FAF5EC] px-4 py-3 text-sm outline-none focus:border-[#E9A93A]"
          >
            {DELIVERY_ZONES.filter((z) => z.live).map((z) => (
              <option key={z.city}>{z.city}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleAddAddress}
          className="mt-3.5 flex items-center gap-2 rounded-full border-[1.5px] border-[#E4DACA] px-4 py-2.5 text-sm font-semibold transition hover:border-[#166049]"
        >
          <Plus size={15} />
          Add address
        </button>
      </section>

      <button
        onClick={handleSignOut}
        className="flex w-full items-center justify-center gap-2 rounded-full border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] py-3.5 text-sm font-semibold text-[#B23A26] transition hover:border-[#DF5F49]"
      >
        <LogOut size={16} />
        Sign out
      </button>
    </div>
  );
}
