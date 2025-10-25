import { useAppSelector, useAppDispatch } from '../../redux/store';
import { logout } from '../../redux/slices/auth-slice';
import { useNavigate } from 'react-router-dom';
import './home-screen.css';

export const HomeScreen = () => {
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>🇳🇱 Dutch Lingo</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      
      <div className="welcome-section">
        <h2>Welcome back, {user?.displayName || 'User'}!</h2>
        <p>Ready to continue your Dutch learning journey?</p>
      </div>

      <div className="dashboard-cards">
        <div className="card">
          <h3>📚 Daily Lesson</h3>
          <p>Continue where you left off</p>
          <button className="card-button">Start Learning</button>
        </div>

        <div className="card">
          <h3>📊 Your Progress</h3>
          <p>Track your learning stats</p>
          <button className="card-button">View Stats</button>
        </div>

        <div className="card">
          <h3>🎯 Achievements</h3>
          <p>See what you've accomplished</p>
          <button className="card-button">View Badges</button>
        </div>
      </div>
    </div>
  );
};
