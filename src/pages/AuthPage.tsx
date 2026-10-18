import { AlertCircle, ArrowLeft, Loader2, MailCheck } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DishArt from '../components/DishArt';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function AuthPage({ mode }: { mode: 'signin' | 'signup' }) {
  const { signIn, signUp, authAvailable } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [confirmSent, setConfirmSent] = useState(false);

  const isSignUp = mode === 'signup';
  const redirectTo = (location.state as { from?: string } | null)?.from ?? '/kitchens';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      if (isSignUp) {
        const result = await signUp({ email, password, fullName, phone });
        if (result.error) {
          setError(result.error);
          return;
        }
        if (result.needsConfirmation) {
          setConfirmSent(true);
          return;
        }
        toast(`Welcome to KanoEats, ${fullName.split(' ')[0]}`);
        navigate(redirectTo, { replace: true });
      } else {
        const result = await signIn(email, password);
        if (result.error) {
          setError(result.error);
          return;
        }
        toast('Welcome back');
        navigate(redirectTo, { replace: true });
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (confirmSent) {
    return (
      <AuthLayout>
        <div className="text-center">
          <MailCheck size={48} className="mx-auto mb-4 text-[#166049]" strokeWidth={1.6} />
          <h1 className="font-display text-2xl font-bold text-[#0A2E24]">Check your email</h1>
          <p className="mt-2.5 text-sm text-[#6C7C73]">
            We sent a confirmation link to <strong className="text-[#14201B]">{email}</strong>. Open
            it to finish setting up your account.
          </p>
          <Link
            to="/signin"
            className="mt-6 inline-block rounded-full bg-[#E9A93A] px-5 py-2.5 text-sm font-bold text-[#3A2A08] shadow-[0_3px_0_#C68A22]"
          >
            Back to sign in
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <Link
        to="/"
        className="mb-6 inline-flex items-center gap-2 text-[13.5px] font-semibold text-[#6C7C73] transition hover:text-[#14201B]"
      >
        <ArrowLeft size={16} />
        Back to home
      </Link>

      <h1 className="font-display text-[28px] font-bold text-[#0A2E24]">
        {isSignUp ? 'Create your account' : 'Welcome back'}
      </h1>
      <p className="mt-1.5 text-sm text-[#6C7C73]">
        {isSignUp
          ? 'Order from verified Arewa kitchens across Kano.'
          : 'Sign in to track orders and reorder your favourites.'}
      </p>

      {!authAvailable && (
        <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-[#FBEFD6] px-4 py-3.5 text-[13px] text-[#7A5510]">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>
            Accounts need a Supabase connection. Add your project credentials to{' '}
            <code className="rounded bg-[#F0DFB8] px-1">.env.local</code> — see the README.
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {isSignUp && (
          <>
            <Field
              label="Full name"
              value={fullName}
              onChange={setFullName}
              placeholder="Amina Bello"
              required
              autoComplete="name"
            />
            <Field
              label="Phone number"
              value={phone}
              onChange={setPhone}
              placeholder="0812 345 6789"
              type="tel"
              required
              autoComplete="tel"
            />
          </>
        )}

        <Field
          label="Email address"
          value={email}
          onChange={setEmail}
          placeholder="you@example.com"
          type="email"
          required
          autoComplete="email"
        />
        <Field
          label="Password"
          value={password}
          onChange={setPassword}
          placeholder={isSignUp ? 'At least 8 characters' : 'Your password'}
          type="password"
          required
          minLength={isSignUp ? 8 : undefined}
          autoComplete={isSignUp ? 'new-password' : 'current-password'}
        />

        {error && (
          <p role="alert" className="flex items-start gap-2 text-[13px] text-[#B23A26]">
            <AlertCircle size={15} className="mt-0.5 shrink-0" />
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting || !authAvailable}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#DF5F49] py-3.5 text-sm font-bold text-white shadow-[0_3px_0_#B94733] transition enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {submitting && <Loader2 size={16} className="animate-spin" />}
          {isSignUp ? 'Create account' : 'Sign in'}
        </button>
      </form>

      <p className="mt-5 text-center text-[13.5px] text-[#6C7C73]">
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <Link
          to={isSignUp ? '/signin' : '/signup'}
          className="font-semibold text-[#DF5F49] hover:underline"
        >
          {isSignUp ? 'Sign in' : 'Create one'}
        </Link>
      </p>
    </AuthLayout>
  );
}

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen bg-[#FAF5EC] lg:grid-cols-2">
      <div className="flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-[400px]">{children}</div>
      </div>

      {/* Decorative panel, hidden on small screens where it would only add scroll */}
      <div className="relative hidden items-center justify-center overflow-hidden bg-[#0A2E24] lg:flex">
        <div className="relative z-10 max-w-sm px-10 text-center">
          <DishArt art="suya" className="mx-auto h-40 w-40" />
          <h2 className="mt-7 font-display text-3xl font-bold text-white">
            Your favourite Northern delicacies, served hot
          </h2>
          <p className="mt-3.5 text-sm text-white/65">
            Tsire suya, fluffy masa, thick miyan taushe and chilled kunun aya — from kitchens we
            visit and verify ourselves.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  ...rest
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12.5px] font-semibold text-[#3D4E46]">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border-[1.5px] border-[#E4DACA] bg-[#FFFDF8] px-4 py-3 text-sm outline-none transition focus:border-[#E9A93A]"
        {...rest}
      />
    </label>
  );
}
