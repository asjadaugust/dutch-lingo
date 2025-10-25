import { useAppSelector } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import './welcome-screen.css';

export const WelcomeScreen = () => {
  const { user } = useAppSelector(state => state.auth);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/home');
  };

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="welcome-emoji">🎉</div>
        <h1>Welcome to Dutch Lingo, {user?.displayName?.split(' ')[0]}!</h1>
        <p className="welcome-subtitle">
          You're about to embark on an exciting journey to learn Dutch vocabulary.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Spaced Repetition</h3>
            <p>Learn efficiently with science-backed algorithms</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Daily Goals</h3>
            <p>Build a consistent learning habit</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Achievements</h3>
            <p>Earn badges and track your progress</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Statistics</h3>
            <p>Monitor your learning journey</p>
          </div>
        </div>

        <button onClick={handleGetStarted} className="get-started-button">
          Get Started
        </button>

        <p className="welcome-note">
          💡 Tip: Consistent daily practice is the key to mastering Dutch vocabulary!
        </p>
      </div>
    </div>
  );
};
