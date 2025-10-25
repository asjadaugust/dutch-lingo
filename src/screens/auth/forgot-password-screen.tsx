import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/validation';
import './forgot-password-screen.css';

export const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    setEmailError('');

    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    // Mock API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (error) {
      setEmailError('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className="forgot-password-container">
        <div className="forgot-password-card">
          <div className="success-icon">✅</div>
          <h1>Check Your Email</h1>
          <p className="success-message">
            We've sent password reset instructions to <strong>{email}</strong>
          </p>
          <p className="helper-text">
            If you don't see the email, check your spam folder.
          </p>
          <button onClick={() => navigate('/login')} className="back-button">
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-card">
        <h1>🔐 Reset Password</h1>
        <p className="subtitle">
          Enter your email address and we'll send you instructions to reset your password.
        </p>
        
        <form onSubmit={handleSubmit} className="forgot-password-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className={emailError ? 'error' : ''}
              autoComplete="email"
              placeholder="Enter your email"
              autoFocus
            />
            {emailError && <span className="error-message">{emailError}</span>}
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? 'Sending...' : 'Send Reset Instructions'}
          </button>
        </form>

        <div className="footer">
          <a href="/login" className="back-link">← Back to Login</a>
        </div>
      </div>
    </div>
  );
};
