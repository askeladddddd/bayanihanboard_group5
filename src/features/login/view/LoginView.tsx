import React from 'react';
import { useLoginViewModel } from '../viewmodel/useLoginViewModel';
import { Button } from '../../../shared-components/Button/Button';

export const LoginView: React.FC = () => {
  const {
    credentials,
    errorMsg,
    isLoading,
    handleInputChange,
    submitLogin
  } = useLoginViewModel();

  return (
    <div className="login-container" style={{ maxWidth: '400px', margin: '4rem auto', padding: '2rem', border: '1px solid var(--color-border)', borderRadius: '8px', background: 'var(--color-white)' }}>
      <h2 style={{ marginBottom: '1.5rem', textAlign: 'center', color: 'var(--color-primary)' }}>Sign In</h2>
      <form onSubmit={submitLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        
        {errorMsg && <div style={{ color: 'red', fontSize: '0.875rem' }}>{errorMsg}</div>}

        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
          <input
            id="email"
            type="email"
            value={credentials.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={isLoading}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}
          />
        </div>

        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Password</label>
          <input
            id="password"
            type="password"
            value={credentials.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            disabled={isLoading}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--color-border)' }}
          />
        </div>

        <Button type="submit" disabled={isLoading} style={{ marginTop: '1rem' }}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </div>
  );
};

export default LoginView;
