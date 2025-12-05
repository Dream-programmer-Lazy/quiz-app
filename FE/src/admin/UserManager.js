import React, { useEffect, useState } from 'react';
import { Container, Typography, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

const apiUrl = process.env.API_URL || "http://localhost:8000/api";

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${apiUrl}/users`)
      .then(res => res.json())
      .then(data => {
        setUsers(Array.isArray(data) ? data : []);
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
        <Typography variant="h4" gutterBottom>Quản lý tài khoản người dùng</Typography>
        {loading ? (
          <Typography>Đang tải dữ liệu...</Typography>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên đăng nhập</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Vai trò</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(u => (
                <TableRow key={u._id}>
                  <TableCell>{u.username}</TableCell>
                  <TableCell>{u.email}</TableCell>
                  <TableCell>{u.userRole}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Container>
  );
}
