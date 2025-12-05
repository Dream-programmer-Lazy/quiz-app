import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';
import { UserContext } from './UserContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import './App.css';

import { LoginForm, RegisterForm } from './login/LoginRegister';
import QuestionManager from './admin/QuestionManager';
import UserManager from './admin/UserManager';
import QuestionSetup from './question/QuestionSetup';
import QuestionTest from './question/QuestionTest';
import TestResult from './question/TestResult';
import HistoryPage from './question/HistoryPage';

function AppContent() {
  const { userRole } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className="App">
      <header className="App-header">
        {userRole === 'admin' && (
          <AppBar position="static" color="default" sx={{ mb: 3 }}>
            <Toolbar>
              <Button color="primary" onClick={() => navigate('/questions')} sx={{ mr: 2 }}>
                Quản lý câu hỏi
              </Button>
              <Button color="primary" onClick={() => navigate('/users')}>
                Quản lý tài khoản
              </Button>
            </Toolbar>
          </AppBar>
        )}
        <Routes>
          <Route path="/" element={
            <>
              <h1>Chào mừng đến với Question Web</h1>
              <div className="button-group">
                <button className="btn btn-login" onClick={() => window.location.href = '/login'}>Đăng nhập</button>
                <button className="btn btn-register" onClick={() => window.location.href = '/register'}>Đăng ký</button>
              </div>
            </>
          } />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/question-setup" element={<QuestionSetup />} />
          <Route path="/question-test" element={<QuestionTest />} />
          <Route path="/test-result" element={<TestResult />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/questions" element={<QuestionManager />} />
          <Route path="/users" element={<UserManager />} />
        </Routes>
      </header>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
