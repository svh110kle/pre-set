import './PlanCard.css';

type PlanCardProps = {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  active?: boolean;
  onSelect: () => void;
};

const PlanCard = ({ name, price, tagline, features, active, onSelect }: PlanCardProps) => {
  return (
    <div className={`plan-card glass-panel ${active ? 'active' : ''}`}>
      <div className="plan-head">
        <p className="eyebrow">Plan</p>
        <h3>{name}</h3>
        <p className="plan-price">
          {price}
          <span>/month</span>
        </p>
        <p className="plan-tagline">{tagline}</p>
      </div>
      <ul>
        {features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <button className="cta-btn" onClick={onSelect}>
        {active ? 'Current Plan' : 'Choose Plan'}
      </button>
    </div>
  );
};

export default PlanCard;

