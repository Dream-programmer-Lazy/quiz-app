import React, { useState } from 'react';

const apiUrl = process.env.API_URL || "http://localhost:8000/api";

export default function QuestionSetup({ onStartTest }) {
  const [count, setCount] = useState(5);
  const [time, setTime] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/questions/random?count=${count}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error?.message || "Không lấy được câu hỏi");
      } else {
        onStartTest(data, time);
      }
    } catch (err) {
      setError("Lỗi kết nối server");
    }
    setLoading(false);
  };

  return (
    <div className="form-container">
      <h2>Thi trắc nghiệm</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Số câu hỏi:
          <input type="number" min={1} max={20} value={count} onChange={e => setCount(e.target.value)} required />
        </label>
        <label>
          Thời gian (phút):
          <input type="number" min={1} max={60} value={time} onChange={e => setTime(e.target.value)} required />
        </label>
        <button type="submit" className="btn btn-login" disabled={loading}>
          {loading ? "Đang lấy câu hỏi..." : "Bắt đầu"}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}
