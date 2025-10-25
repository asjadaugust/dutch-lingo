import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginScreen } from './screens/auth/login-screen';
import { HomeScreen } from './screens/home/home-screen';
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
          <Route path="/signup" element={
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h1>Sign Up</h1>
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
