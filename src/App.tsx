import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginScreen } from './screens/auth/login-screen';
import { SignupScreen } from './screens/auth/signup-screen';
import { HomeScreen } from './screens/home/home-screen';
import { WelcomeScreen } from './screens/onboarding/welcome-screen';
import { useAppSelector } from './redux/store';
import './App.css';

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAppSelector(state => state.auth);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/onboarding" element={
            <ProtectedRoute>
              <WelcomeScreen />
            </ProtectedRoute>
          } />
          <Route path="/welcome" element={
            <ProtectedRoute>
              <WelcomeScreen />
            </ProtectedRoute>
          } />
          <Route path="/home" element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <HomeScreen />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/forgot-password" element={
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h1>Forgot Password</h1>
              <p>Coming soon...</p>
              <a href="/login">Back to Login</a>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
