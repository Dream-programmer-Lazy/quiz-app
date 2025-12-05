import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const apiUrl = process.env.API_URL || "http://localhost:8000/api";

export default function QuestionManager() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${apiUrl}/questions`)
      .then(res => res.json())
      .then(data => {
        setQuestions(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError('Lỗi tải dữ liệu');
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>Quản lý câu hỏi</Typography>
        {loading ? (
          <Typography>Đang tải dữ liệu...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nội dung</TableCell>
                <TableCell>Đáp án đúng</TableCell>
                <TableCell>Đáp án</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {questions.map(q => (
                <TableRow key={q._id}>
                  <TableCell>{q.content}</TableCell>
                  <TableCell>{q.options[q.answer]}</TableCell>
                  <TableCell>{q.options.join(', ')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Container>
  );
}
