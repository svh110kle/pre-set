import { type FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import FormShell from '../components/FormShell';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormShell
      title="Welcome back"
      subtitle="Re-enter your cockpit. Your layout and session stay synced."
      footer={
        <p>
          Need an account? <Link to="/register">Create it</Link>
        </p>
      }
    >
      <form className="body-grid" onSubmit={handleSubmit}>
        <InputField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          placeholder="pilot@demo.com"
          onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          placeholder="••••••••"
          onChange={(value) => setForm((prev) => ({ ...prev, password: value }))}
        />
        {error && <p style={{ color: '#ff9b9b' }}>{error}</p>}
        <button className="cta-btn" disabled={submitting}>
          {submitting ? 'Checking...' : 'Enter workspace'}
        </button>
        <Link to="/forgot-password" style={{ color: '#92f4ff', textAlign: 'center' }}>
          Forgot password?
        </Link>
      </form>
    </FormShell>
  );
};

export default LoginPage;

