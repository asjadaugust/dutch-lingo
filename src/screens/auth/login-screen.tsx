import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { loginAsync, clearError } from '../../redux/slices/auth-slice';
import './login-screen.css';

export const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector(state => state.auth);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setEmailError('');
    setPasswordError('');
    dispatch(clearError());

    // Validate fields
    let hasError = false;

    if (!email.trim()) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      hasError = true;
    }

    if (hasError) return;

    // Attempt login
    const result = await dispatch(loginAsync({ email, password }));
    
    if (loginAsync.fulfilled.match(result)) {
      // Redirect to home on success
      navigate('/home');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🇳🇱 Dutch Lingo</h1>
        <h2>Sign In</h2>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className={emailError ? 'error' : ''}
              autoComplete="email"
            />
            {emailError && <span className="error-message">{emailError}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className={passwordError ? 'error' : ''}
              autoComplete="current-password"
            />
            {passwordError && <span className="error-message">{passwordError}</span>}
          </div>

          {error && (
            <div className="error-banner">
              {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className="login-button"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <a href="/forgot-password" className="link">Forgot Password?</a>
          <span className="separator">•</span>
          <a href="/signup" className="link">Create Account</a>
        </div>
      </div>
    </div>
  );
};
