import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <div style={{ padding: '2rem', textAlign: 'center' }}>
              <h1>🇳🇱 Dutch Lingo</h1>
              <p>Dutch Vocabulary Learning App</p>
              <p style={{ color: '#666', marginTop: '1rem' }}>
                ✅ Setup complete! Ready for implementation.
              </p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
