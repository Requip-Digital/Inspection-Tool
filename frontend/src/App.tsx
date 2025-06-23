import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { Toaster } from 'react-hot-toast';

// Pages
import HomePage from './pages/HomePage';
import NewProjectPage from './pages/NewProjectPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import NewMachinePage from './pages/NewMachinePage';
import MachineDetailPage from './pages/MachineDetailPage';
import LoginPage from './pages/LoginPage';

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAppContext();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/project/new"
            element={
              <ProtectedRoute>
                <NewProjectPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/project/:id"
            element={
              <ProtectedRoute>
                <ProjectDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/project/:projectId/machine/new"
            element={
              <ProtectedRoute>
                <NewMachinePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/project/:projectId/machine/:machineId"
            element={
              <ProtectedRoute>
                <MachineDetailPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <Toaster position="bottom-right" />
    </AppProvider>
  );
}

export default App;