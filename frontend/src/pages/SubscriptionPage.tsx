import { planOptions } from '../data/navLinks';
import PlanCard from '../components/PlanCard';
import { userService } from '../services/userService';
import { useAuth } from '../hooks/useAuth';
import './SubscriptionPage.css';
import { useState } from 'react';

const SubscriptionPage = () => {
  const { user, updateUserLocally } = useAuth();
  const [saving, setSaving] = useState<string | null>(null);

  const handleSelect = async (plan: string) => {
    try {
      setSaving(plan);
      const { user: updated } = await userService.updatePlan(plan);
      updateUserLocally(updated);
    } finally {
      setSaving(null);
    }
  };

  return (
    <section className="plans-page">
      <header>
        <p className="eyebrow">Plans</p>
        <h2>Scale pricing later, but test flows right now.</h2>
      </header>
      <div className="plan-grid">
        {planOptions.map((plan) => (
          <PlanCard
            key={plan.name}
            name={plan.name}
            price={plan.price}
            tagline={plan.tagline}
            features={plan.features}
            active={user?.plan === plan.name}
            onSelect={() => handleSelect(plan.name)}
          />
        ))}
      </div>
      {saving && <p>Updating {saving} plan…</p>}
    </section>
  );
};

export default SubscriptionPage;

