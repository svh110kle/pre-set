import { type FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import InputField from '../components/InputField';
import FormShell from '../components/FormShell';
import { useAuth } from '../hooks/useAuth';

const ForgotPasswordPage = () => {
  const { forgot } = useAuth();
  const [form, setForm] = useState({ email: '', newPassword: '' });
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus(null);
    setError(null);
    try {
      await forgot(form.email, form.newPassword);
      setStatus('Password updated. Jump back to login.');
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <FormShell
      title="Reset fast"
      subtitle="No email loops. Just set a new password while in dev mode."
      footer={
        <p>
          Back to <Link to="/login">login</Link>
        </p>
      }
    >
      <form className="body-grid" onSubmit={handleSubmit}>
        <InputField
          label="Email"
          name="email"
          value={form.email}
          onChange={(value) => setForm((prev) => ({ ...prev, email: value }))}
        />
        <InputField
          label="New password"
          name="newPassword"
          type="password"
          value={form.newPassword}
          onChange={(value) => setForm((prev) => ({ ...prev, newPassword: value }))}
        />
        {status && <p style={{ color: '#7cffa6' }}>{status}</p>}
        {error && <p style={{ color: '#ff9b9b' }}>{error}</p>}
        <button className="cta-btn" disabled={submitting}>
          {submitting ? 'Updating...' : 'Save new password'}
        </button>
      </form>
    </FormShell>
  );
};

export default ForgotPasswordPage;

