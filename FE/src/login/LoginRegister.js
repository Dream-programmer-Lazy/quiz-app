import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import './LoginRegister.css';

const apiUrl = process.env.API_URL || "http://localhost:8000/api";

export function LoginForm({ onBack, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser, setUserRole } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setError(data?.error?.message || "Đăng nhập thất bại");
      } else {
        // Lưu vào context
        setUser(data);
        setUserRole(data.userRole);
        // Điều hướng theo role
        if (data.userRole === 'player') {
          navigate('/question-setup');
        } else if (data.userRole === 'admin') {
          navigate('/dashboard');
        }
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      setError("Lỗi kết nối server");
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-login" disabled={loading}>
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      <button className="btn btn-back" onClick={onBack}>Quay lại</button>
    </div>
  );
}

export function RegisterForm({ onBack, onSuccess }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setError(data?.error?.message || "Đăng ký thất bại");
      } else {
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      setError("Lỗi kết nối server");
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2>Đăng ký</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Xác nhận mật khẩu"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-register" disabled={loading}>
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
      <button className="btn btn-back" onClick={onBack}>Quay lại</button>
    </div>
  );
}
