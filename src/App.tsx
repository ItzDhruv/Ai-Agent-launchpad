  import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, Link } from 'react-router-dom';
import ChatPage from './pages/ChatPage';
import CreateAgentPage from './pages/CreateAgentPage';
import ExplorePage from './pages/Explore';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import GiftAgentPage from './pages/GiftAgent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/create" element={<CreateAgentPage />} />
        <Route path="/chat/:agentId" element={<ChatPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/giftagent" element={<GiftAgentPage />} />
      </Routes>
    </Router>
  );
}

export default App;