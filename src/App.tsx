import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';

// Pages
import HomePage from './pages/HomePage';
import NewProjectPage from './pages/NewProjectPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import NewMachinePage from './pages/NewMachinePage';
import MachineDetailPage from './pages/MachineDetailPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/new" element={<NewProjectPage />} />
          <Route path="/project/:id" element={<ProjectDetailPage />} />
          <Route path="/project/:projectId/machine/new" element={<NewMachinePage />} />
          <Route path="/project/:projectId/machine/:machineId" element={<MachineDetailPage />} />
          <Route path="*" element={<Navigate to="/\" replace />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;