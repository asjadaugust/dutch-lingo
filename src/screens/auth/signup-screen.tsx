import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { signupAsync, clearError } from '../../redux/slices/auth-slice';
import { validatePassword, validateEmail, getPasswordStrengthColor, getPasswordStrengthLabel } from '../../utils/validation';
import './signup-screen.css';

export const SignupScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [termsError, setTermsError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector(state => state.auth);

  const passwordValidation = validatePassword(password);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // Clear previous errors
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setTermsError('');
    dispatch(clearError());

    let hasError = false;

    // Validate name
    if (!name.trim()) {
      setNameError('Name is required');
      hasError = true;
    }

    // Validate email
    if (!email.trim()) {
      setEmailError('Email is required');
      hasError = true;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      hasError = true;
    }

    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      hasError = true;
    } else if (!passwordValidation.isValid) {
      setPasswordError(passwordValidation.errors[0]);
      hasError = true;
    }

    // Validate confirm password
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      hasError = true;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      hasError = true;
    }

    // Validate terms
    if (!acceptedTerms) {
      setTermsError('You must accept the terms and conditions');
      hasError = true;
    }

    if (hasError) return;

    // Attempt signup
    const result = await dispatch(signupAsync({ name, email, password }));
    
    if (signupAsync.fulfilled.match(result)) {
      // Redirect to onboarding on success
      navigate('/onboarding');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>🇳🇱 Dutch Lingo</h1>
        <h2>Create Account</h2>
        <p className="signup-subtitle">Start your Dutch learning journey today!</p>
        
        <form onSubmit={handleSubmit} className="signup-form">
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              className={nameError ? 'error' : ''}
              autoComplete="name"
              placeholder="Enter your full name"
            />
            {nameError && <span className="error-message">{nameError}</span>}
          </div>

          {/* Email Field */}
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
              placeholder="Enter your email"
            />
            {emailError && <span className="error-message">{emailError}</span>}
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                disabled={isLoading}
                className={passwordError ? 'error' : ''}
                autoComplete="new-password"
                placeholder="Create a strong password"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {passwordError && <span className="error-message">{passwordError}</span>}
            
            {/* Password Strength Indicator */}
            {password && (passwordFocused || !passwordValidation.isValid) && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div 
                    className={`strength-fill strength-${passwordValidation.strength}`}
                    style={{ 
                      width: passwordValidation.strength === 'weak' ? '33%' : 
                             passwordValidation.strength === 'medium' ? '66%' : '100%',
                      backgroundColor: getPasswordStrengthColor(passwordValidation.strength)
                    }}
                  />
                </div>
                <span 
                  className="strength-label"
                  style={{ color: getPasswordStrengthColor(passwordValidation.strength) }}
                >
                  {getPasswordStrengthLabel(passwordValidation.strength)}
                </span>
                {!passwordValidation.isValid && (
                  <ul className="password-requirements">
                    {passwordValidation.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isLoading}
              className={confirmPasswordError ? 'error' : ''}
              autoComplete="new-password"
              placeholder="Confirm your password"
            />
            {confirmPasswordError && <span className="error-message">{confirmPasswordError}</span>}
          </div>

          {/* Terms & Conditions */}
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
                disabled={isLoading}
              />
              <span>
                I accept the <a href="/terms" target="_blank">Terms & Conditions</a> and{' '}
                <a href="/privacy" target="_blank">Privacy Policy</a>
              </span>
            </label>
            {termsError && <span className="error-message">{termsError}</span>}
          </div>

          {/* Server Error */}
          {error && (
            <div className="error-banner">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit" 
            disabled={isLoading}
            className="signup-button"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        {/* Footer */}
        <div className="signup-footer">
          Already have an account?{' '}
          <a href="/login" className="link">Sign In</a>
        </div>
      </div>
    </div>
  );
};
