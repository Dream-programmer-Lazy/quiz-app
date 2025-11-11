
const API_BASE = 'http://localhost:5000/api';
let currentUser = null;
let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer = null;


function showScreen(screenId) {
  ['login-screen', 'settings-screen', 'quiz-screen', 'result-screen'].forEach(id => {
    document.getElementById(id).style.display = 'none';
  });
  document.getElementById(screenId).style.display = 'block';
}


async function handleLogin() {
  const username = document.getElementById('username').value.trim();
  if (!username) return alert('Vui lòng nhập tên!');
  
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    });
    const data = await res.json();
    if (data.user) {
      currentUser = data.user;
      loadAvatars();
      showScreen('settings-screen');

      const s = currentUser.settings;
      document.getElementById('bgMusic').checked = s.backgroundMusic;
      document.getElementById('soundFx').checked = s.soundEffects;
      document.getElementById('questionTimer').checked = s.questionTimer;
      document.getElementById('testTimer').checked = s.testTimer;
      document.getElementById('numQuestions').value = s.numQuestions;
      document.getElementById('user-avatar').src = `assets/avatars/${s.avatar}`;
    }
  } catch (err) {
    alert('Không kết nối được server!');
  }
}


function loadAvatars() {
  const avatars = ['avatar1.png', 'avatar2.png', 'avatar3.png'];
  const container = document.getElementById('avatar-list');
  container.innerHTML = avatars.map(avatar => 
    `<img src="assets/avatars/${avatar}" onclick="selectAvatar('${avatar}')">`
  ).join('');

  const current = currentUser.settings.avatar;
  const img = container.querySelector(`img[src="assets/avatars/${current}"]`);
  if (img) img.classList.add('selected');
}

function selectAvatar(avatar) {
  document.querySelectorAll('#avatar-list img').forEach(img => img.classList.remove('selected'));
  event.target.classList.add('selected');
  currentUser.settings.avatar = avatar;
  document.getElementById('user-avatar').src = `assets/avatars/${avatar}`;
}


async function saveSettings() {
  const settings = {
    backgroundMusic: document.getElementById('bgMusic').checked,
    soundEffects: document.getElementById('soundFx').checked,
    questionTimer: document.getElementById('questionTimer').checked,
    testTimer: document.getElementById('testTimer').checked,
    numQuestions: parseInt(document.getElementById('numQuestions').value),
    avatar: currentUser.settings.avatar
  };

  currentUser.settings = settings;


  await startQuiz();
}


async function startQuiz() {
  try {
    const res = await fetch(`${API_BASE}/questions/random?count=${currentUser.settings.numQuestions}`);
    questions = await res.json();
    if (questions.length === 0) {
      alert('Chưa có câu hỏi! Hãy thêm câu hỏi trước.');
      showScreen('result-screen');
      return;
    }
    currentQuestionIndex = 0;
    score = 0;
    showScreen('quiz-screen');
    loadQuestion();
  } catch (err) {
    alert('Lỗi khi tải câu hỏi!');
  }
}


function loadQuestion() {
  const q = questions[currentQuestionIndex];
  document.getElementById('current-q').textContent = currentQuestionIndex + 1;
  document.getElementById('total-q').textContent = questions.length;
  document.getElementById('question-content').textContent = q.content;

  const btns = document.getElementById('answer-buttons');
  if (q.type === 'true_false') {
    btns.innerHTML = `
      <button onclick="submitAnswer('true')">Đúng</button>
      <button onclick="submitAnswer('false')">Sai</button>
    `;
  } else {
    btns.innerHTML = q.options.map(opt => 
      `<button onclick="submitAnswer('${opt}')">${opt}</button>`
    ).join('');
  }


  if (currentUser.settings.questionTimer) {
    startTimer(30); 
  }
}


function submitAnswer(answer) {
  if (timer) clearInterval(timer);

  const q = questions[currentQuestionIndex];
  const isCorrect = answer === q.correctAnswer;
  

  if (currentUser.settings.soundEffects) {
    const sound = document.getElementById(isCorrect ? 'correct-sound' : 'wrong-sound');
    sound.currentTime = 0;
    sound.play();
  }

  if (isCorrect) score++;


  if (currentQuestionIndex + 1 < questions.length) {
    currentQuestionIndex++;
    loadQuestion();
  } else {
    showResult();
  }
}


function startTimer(seconds) {
  let timeLeft = seconds;
  document.getElementById('time-left').textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('time-left').textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      submitAnswer(''); 
    }
  }, 1000);
}


function showResult() {
  document.getElementById('score-result').textContent = score;
  document.getElementById('total-result').textContent = questions.length;
  showScreen('result-screen');
}


function goToAddQuestion() {
  document.getElementById('add-question-form').style.display = 'block';
  document.querySelectorAll('input[name="q-type"]').forEach(radio => {
    radio.onclick = () => {
      const type = radio.value;
      const container = document.getElementById('options-container');
      if (type === 'true_false') {
        container.innerHTML = '';
      } else {
        container.innerHTML = `
          <input type="text" id="optA" placeholder="Đáp án A"><br>
          <input type="text" id="optB" placeholder="Đáp án B"><br>
          <input type="text" id="optC" placeholder="Đáp án C"><br>
          <input type="text" id="optD" placeholder="Đáp án D"><br>
          <label>Đáp án đúng:
            <select id="correct-opt">
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </label>
        `;
      }
    };
  });
}

async function submitNewQuestion() {
  const content = document.getElementById('q-content').value.trim();
  const type = document.querySelector('input[name="q-type"]:checked').value;
  if (!content) return alert('Vui lòng nhập nội dung!');

  let data = { content, type };

  if (type === 'true_false') {
    data.correctAnswer = prompt('Đáp án đúng? (true/false)');
    if (!['true', 'false'].includes(data.correctAnswer)) return alert('Chỉ nhập true hoặc false!');
  } else {
    const opts = ['optA', 'optB', 'optC', 'optD'].map(id => document.getElementById(id)?.value.trim());
    if (opts.some(o => !o)) return alert('Vui lòng điền đủ 4 đáp án!');
    const correctLabel = document.getElementById('correct-opt').value;
    const correctIndex = ['A','B','C','D'].indexOf(correctLabel);
    data.options = opts;
    data.correctAnswer = opts[correctIndex];
  }

  try {
    const res = await fetch(`${API_BASE}/questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      alert('Thêm câu hỏi thành công!');
      document.getElementById('q-content').value = '';
      document.getElementById('add-question-form').style.display = 'none';
    } else {
      alert('Lỗi khi thêm câu hỏi!');
    }
  } catch (err) {
    alert('Không kết nối được server!');
  }
}


function restartQuiz() {
  document.getElementById('add-question-form').style.display = 'none';
  showScreen('settings-screen');
}


window.onload = () => {

  document.getElementById('bg-music').volume = 0.3;
};
