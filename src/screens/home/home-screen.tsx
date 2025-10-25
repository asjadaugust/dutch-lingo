import { useAppSelector, useAppDispatch } from '../../redux/store';
import { logout } from '../../redux/slices/auth-slice';
import { useNavigate } from 'react-router-dom';
import { sampleWords, getWordsByCategory } from '../../data/words';
import { WordCategory } from '../../types/models';
import './home-screen.css';

export const HomeScreen = () => {
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const totalWords = sampleWords.length;
  const categories = Object.values(WordCategory);

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
        <div className="stats-row">
          <div className="stat-item">
            <span className="stat-number">{totalWords}</span>
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
          <p>Browse all {totalWords} words</p>
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
          {categories.slice(0, 6).map(category => {
            const wordsInCategory = getWordsByCategory(category).length;
            return (
              <div key={category} className="category-card">
                <span className="category-emoji">{getCategoryEmoji(category)}</span>
                <span className="category-name">{category}</span>
                <span className="category-count">{wordsInCategory} words</span>
              </div>
            );
          })}
        </div>
      </div>
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
  };
  return emojiMap[category] || '📝';
};
