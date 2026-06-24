import { useState } from 'react';
import { LoginStatus, DEFAULT_CREDENTIALS } from '../model/login.model';
import type { LoginCredentials } from '../model/login.model';

export const useLoginViewModel = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>(DEFAULT_CREDENTIALS);
  const [status, setStatus] = useState<LoginStatus>(LoginStatus.IDLE);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleInputChange = (field: keyof LoginCredentials, value: string) => {
    setCredentials(prev => ({ ...prev, [field]: value }));
    if (errorMsg) setErrorMsg(null);
  };

  const validateForm = (): boolean => {
    if (!credentials.email.includes('@')) {
      setErrorMsg('Invalid email address');
      return false;
    }
    if (credentials.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const submitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus(LoginStatus.LOADING);
    try {
      // Simulated POST /auth/login API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (credentials.email === 'test@example.com' && credentials.password === 'password123') {
        setStatus(LoginStatus.SUCCESS);
        window.location.href = '/dashboard';
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (err: any) {
      setStatus(LoginStatus.ERROR);
      setErrorMsg(err.message || 'Login failed');
    }
  };

  return {
    credentials,
    status,
    errorMsg,
    handleInputChange,
    submitLogin,
    isLoading: status === LoginStatus.LOADING
  };
};
