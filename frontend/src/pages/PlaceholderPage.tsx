import './PlaceholderPage.css';

type PlaceholderPageProps = {
  title: string;
};

const PlaceholderPage = ({ title }: PlaceholderPageProps) => {
  return (
    <section className="placeholder glass-panel">
      <p className="eyebrow">Reserved</p>
      <h2>{title}</h2>
      <p>Drop your hackathon feature brief here once the challenge unlocks.</p>
      <div className="placeholder-dashed">Future components live here.</div>
    </section>
  );
};

export default PlaceholderPage;

