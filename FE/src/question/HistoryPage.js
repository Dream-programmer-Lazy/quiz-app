import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

const apiUrl = process.env.API_URL || "http://localhost:8000/api";

export default function HistoryPage({ onNewTest, onBack }) {
  const { user } = useContext(UserContext);
  const userId = user?._id;
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetch(`${apiUrl}/results/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        setHistory(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError('Lỗi tải lịch sử');
        setLoading(false);
      });
  }, [userId]);

  if (loading) return <div className="form-container">Đang tải lịch sử...</div>;
  if (error) return <div className="form-container error-message">{error}</div>;

  return (
    <div className="form-container">
      <h2>Lịch sử làm bài</h2>
      {history.length === 0 && <div>Chưa có bài test nào.</div>}
      {history.length > 0 && (
        <table style={{ width: '100%', marginBottom: 20, borderCollapse: 'collapse', border: '2px solid #333' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid #333', padding: '6px' }}>Thời gian</th>
              <th style={{ border: '1px solid #333', padding: '6px' }}>Điểm</th>
              <th style={{ border: '1px solid #333', padding: '6px' }}>Số câu</th>
            </tr>
          </thead>
          <tbody>
            {history.map((h, i) => (
              <tr key={h._id || i}>
                <td style={{ border: '1px solid #333', padding: '6px' }}>{new Date(h.createdAt).toLocaleString()}</td>
                <td style={{ border: '1px solid #333', padding: '6px' }}>{h.score}</td>
                <td style={{ border: '1px solid #333', padding: '6px' }}>{h.answers?.length || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="btn btn-login" onClick={onNewTest}>Làm bài test mới</button>
      <button className="btn btn-back" onClick={onBack} style={{ marginLeft: 10 }}>Về trang chủ</button>
    </div>
  );
}
