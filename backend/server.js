
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const app = express();


app.use(cors()); 
app.use(express.json()); 

const authRoutes = require('./routes/auth.routes');
const questionRoutes = require('./routes/questions.routes');
app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Kết nối MongoDB thành công!'))
  .catch(err => console.error('Lỗi kết nối MongoDB:', err));


app.get('/', (req, res) => {
  res.json({ message: 'Backend đang chạy!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server khởi động tại http://localhost:${PORT}`);
});
