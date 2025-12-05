import React, { useEffect, useState, useRef, useContext } from 'react';
import { UserContext } from '../UserContext';

const apiUrl = process.env.API_URL || "http://localhost:8000/api";

export default function TestResult({ answers, questions, onNewTest, onViewHistory }) {
  const { user } = useContext(UserContext);
  const userId = user?._id;
  const sentRef = useRef(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Tính điểm
    let correct = 0;
    const answerArr = answers.map((a, idx) => {
      const qid = questions[idx]._id || questions[idx].id;
      const isCorrect = a.answer === questions[idx].answer;
      if (isCorrect) correct++;
      return {
        question: qid,
        selected: a.answer
      };
    });
    setScore(correct);
    // Gửi kết quả lên server
    if (sentRef.current) return;
    sentRef.current = true;
    fetch(`${apiUrl}/results`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: userId, score: correct, answers: answerArr })
    })
      .then(res => res.json())
      .then(() => setLoading(false))
      .catch(() => {
        setError('Lỗi gửi kết quả');
        setLoading(false);
      });
  }, [answers, questions, userId]);

  if (loading) return <div className="form-container">Đang lưu kết quả...</div>;
  if (error) return <div className="form-container error-message">{error}</div>;

  return (
    <div className="form-container">
      <h2>Kết quả bài test</h2>
      <div>Điểm số: <b>{score}</b> / {questions.length}</div>
      <div style={{ marginTop: 20 }}>
        <button className="btn btn-login" onClick={onNewTest}>Làm bài test mới</button>
        <button className="btn btn-register" onClick={onViewHistory} style={{ marginLeft: 10 }}>Xem lịch sử</button>
      </div>
    </div>
  );
}
