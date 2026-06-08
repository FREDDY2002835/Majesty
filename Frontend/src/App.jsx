import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/login.jsx";
import RegisterPage from "./pages/register.jsx";
import DashboardPage from "./pages/dashboard.jsx";
import HistoryPage from "./pages/history.jsx";
import SavedPage from "./pages/saved.jsx";
import LanguagesPage from "./pages/languages.jsx";
import ProfilePage from "./pages/profile.jsx";
import SettingsPage from "./pages/settings.jsx";
import HelpPage from "./pages/help.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/dashboard/history" element={<HistoryPage/>}/>
      <Route path="/dashboard/Saved" element={<SavedPage/>}/>
      <Route path="/dashboard/Languages" element={<LanguagesPage/>}/>
      <Route path="/dashboard/Profile" element={<ProfilePage/>}/>
      <Route path="/dashboard/Settings" element={<SettingsPage/>}/>
      <Route path="/dashboard/Help" element={<HelpPage/>}/>
    </Routes>
  );
}