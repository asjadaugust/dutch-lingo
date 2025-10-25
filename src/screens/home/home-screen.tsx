import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/store';
import { logout } from '../../redux/slices/auth-slice';
import { initializeWordbank } from '../../redux/slices/wordbankSlice';
import { useNavigate } from 'react-router-dom';
import { WordCategory } from '../../types/models';
import './home-screen.css';

export const HomeScreen = () => {
  const { user } = useAppSelector(state => state.auth);
  const { totalWords, isLoading, isInitialized, error } = useAppSelector(state => state.wordbank);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize wordbank when component mounts
    if (!isInitialized && !isLoading) {
      dispatch(initializeWordbank());
    }
  }, [dispatch, isInitialized, isLoading]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const categories = Object.values(WordCategory);

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>🇳🇱 Dutch Lingo</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      
      {isLoading && !isInitialized && (
        <div className="loading-section">
          <div className="loading-spinner"></div>
          <p>Loading vocabulary database...</p>
          <small>Preparing {totalWords > 0 ? totalWords : '1,600+'} Dutch words for you</small>
        </div>
      )}

      {error && (
        <div className="error-section">
          <p>⚠️ {error}</p>
          <button onClick={() => dispatch(initializeWordbank())} className="retry-button">
            Retry
          </button>
        </div>
      )}

      {isInitialized && (
        <>
          <div className="welcome-section">
            <h2>Welcome back, {user?.displayName || 'User'}!</h2>
            <p>Ready to continue your Dutch learning journey?</p>
            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-number">{totalWords.toLocaleString()}</span>
                <span className="stat-label">Total Words</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">{categories.length}</span>
                <span className="stat-label">Categories</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">0</span>
                <span className="stat-label">Learned</span>
              </div>
            </div>
          </div>

          <div className="dashboard-cards">
            <div className="card">
              <h3>📚 Daily Lesson</h3>
              <p>Continue where you left off</p>
              <button className="card-button">Start Learning</button>
            </div>

            <div className="card">
              <h3>📖 Word Bank</h3>
              <p>Browse all {totalWords.toLocaleString()} words</p>
              <button className="card-button">Explore Words</button>
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

          <div className="categories-section">
            <h3>📚 Explore by Category</h3>
            <div className="categories-grid">
              {categories.slice(0, 6).map(category => (
                <div key={category} className="category-card">
                  <span className="category-emoji">{getCategoryEmoji(category)}</span>
                  <span className="category-name">{category}</span>
                  <span className="category-count">Click to explore</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const getCategoryEmoji = (category: WordCategory): string => {
  const emojiMap: Record<WordCategory, string> = {
    [WordCategory.GREETINGS]: '👋',
    [WordCategory.NUMBERS]: '🔢',
    [WordCategory.COLORS]: '🎨',
    [WordCategory.FOOD]: '🍽️',
    [WordCategory.FAMILY]: '👨‍👩‍👧‍👦',
    [WordCategory.HOUSE]: '🏠',
    [WordCategory.BODY]: '🙋',
    [WordCategory.CLOTHES]: '👕',
    [WordCategory.WEATHER]: '🌤️',
    [WordCategory.TIME]: '⏰',
    [WordCategory.ANIMALS]: '🐶',
    [WordCategory.NATURE]: '🌳',
    [WordCategory.TRANSPORT]: '🚗',
    [WordCategory.WORK]: '💼',
    [WordCategory.SCHOOL]: '📚',
    [WordCategory.SHOPPING]: '🛒',
    [WordCategory.HEALTH]: '🏥',
    [WordCategory.SPORTS]: '⚽',
    [WordCategory.HOBBIES]: '🎮',
    [WordCategory.EMOTIONS]: '😊',
    [WordCategory.VERBS]: '🏃',
    [WordCategory.COMMON]: '📝',
  };
  return emojiMap[category] || '📝';
};
