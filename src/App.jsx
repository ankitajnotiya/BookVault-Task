import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PeoplePage from '../app/page';
import MyInfoPage from '../app/my-info';
import TeamManagementPage from '../app/team-management';
import ProjectSetupPage from '../app/project-setup';
import HiringPage from '../app/hiring';
import ReportPage from '../app/report';
import SettingsPage from '../app/settings';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex">
        <Routes>
          <Route path="/" element={<PeoplePage />} />
          <Route path="/my-info" element={<MyInfoPage />} />
          <Route path="/team-management" element={<TeamManagementPage />} />
          <Route path="/project-setup" element={<ProjectSetupPage />} />
          <Route path="/hiring" element={<HiringPage />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
