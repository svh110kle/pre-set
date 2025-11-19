import { type FormEvent, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import InputField from '../components/InputField';
import FormShell from '../components/FormShell';
import { useAuth } from '../hooks/useAuth';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await register(form);
      navigate('/roles');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormShell
      title="Create your space"
      subtitle="Spin up an account and jump straight into hack-ready dashboards."
      footer={
        <p>
          Already on board? <Link to="/login">Sign in</Link>
        </p>
      }
    >
      <form className="body-grid" onSubmit={handleSubmit}>
        <InputField
          label="Username"
          name="username"
          value={form.username}
          placeholder="captain_kepler"
          onChange={(value) => handleChange('username', value)}
        />
        <InputField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          placeholder="you@email.com"
          onChange={(value) => handleChange('email', value)}
        />
        <InputField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          placeholder="••••••••"
          onChange={(value) => handleChange('password', value)}
        />
        {error && <p style={{ color: '#ff9b9b' }}>{error}</p>}
        <button className="cta-btn" disabled={submitting}>
          {submitting ? 'Creating...' : 'Create account'}
        </button>
      </form>
    </FormShell>
  );
};

export default RegisterPage;

