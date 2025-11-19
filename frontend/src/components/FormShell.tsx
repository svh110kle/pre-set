import { type PropsWithChildren } from 'react';
import './FormShell.css';

type FormShellProps = {
  title: string;
  subtitle: string;
  footer?: React.ReactNode;
};

const FormShell = ({ title, subtitle, footer, children }: PropsWithChildren<FormShellProps>) => {
  return (
    <div className="form-shell glass-panel">
      <div>
        <p className="form-shell-label">Welcome to {'{{PROJECT_NAME}}'}</p>
        <h1>{title}</h1>
        <p className="subtitle">{subtitle}</p>
      </div>
      <div className="form-shell-content">{children}</div>
      {footer && <div className="form-shell-footer">{footer}</div>}
    </div>
  );
};

export default FormShell;

