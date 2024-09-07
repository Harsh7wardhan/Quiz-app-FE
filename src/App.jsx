import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './pages/Home/Home';
import Report from './pages/Report/Report';
import Question from './pages/Question/Question';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/question/:id" element={<Question />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </Router>
  )
}

export default App
