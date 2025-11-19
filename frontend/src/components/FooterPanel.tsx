import './FooterPanel.css';

const FooterPanel = () => {
  return (
    <footer className="footer glass-panel">
      <div>
        <h4>About</h4>
        <p>Hand-crafted for the hackathon warm-up. Swap in your own story later.</p>
      </div>
      <div>
        <h4>Contact</h4>
        <p>hello@{'{{PROJECT_NAME}}'}.dev</p>
      </div>
      <div>
        <h4>Social</h4>
        <div className="footer-social">
          <span>LinkedIn</span>
          <span>Twitter/X</span>
          <span>GitHub</span>
        </div>
      </div>
      <div className="footer-copy">
        © {new Date().getFullYear()} {'{{PROJECT_NAME}}'}. All rights reserved.
      </div>
    </footer>
  );
};

export default FooterPanel;

