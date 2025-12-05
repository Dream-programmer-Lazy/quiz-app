import React, { useState, useEffect, useRef } from 'react';

function playSound(type) {
  const audio = new Audio(type === 'correct' ? '/correct.mp3' : '/wrong.mp3');
  audio.play();
}

export default function QuestionTest({ questions, time, onFinish }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]); // {answer: idx, correct: bool}
  const [secondsLeft, setSecondsLeft] = useState(time * 60);
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setSecondsLeft(s => {
        if (s <= 1) {
          clearInterval(timerRef.current);
          if (onFinish) onFinish(answers);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [answers, onFinish]);

  const handleAnswer = idx => {
    if (answers[current]) return; // Đã trả lời
    const correct = idx === questions[current].answer;
    setAnswers(a => {
      const newA = [...a];
      newA[current] = { answer: idx, correct };
      return newA;
    });
    playSound(correct ? 'correct' : 'wrong');
    setTimeout(() => {
      if (current < questions.length - 1) setCurrent(current + 1);
      else if (onFinish) onFinish([...answers, { answer: idx, correct }]);
    }, 700);
  };

  const correctCount = answers.filter(a => a && a.correct).length;

  return (
    <div className="test-container">
      <div className="test-header">
        <span>Câu {current + 1}/{questions.length}</span>
        <span>Đúng: {correctCount}</span>
        <span>Thời gian: {Math.floor(secondsLeft / 60)}:{(secondsLeft % 60).toString().padStart(2, '0')}</span>
      </div>
      <div className="test-question">
        <div className="test-content">{questions[current].content}</div>
        <div className="test-options">
          {questions[current].options.map((opt, idx) => (
            <button
              key={idx}
              className={
                answers[current]
                  ? idx === questions[current].answer
                    ? 'option correct'
                    : idx === answers[current].answer
                      ? 'option wrong'
                      : 'option'
                  : 'option'
              }
              disabled={!!answers[current]}
              onClick={() => handleAnswer(idx)}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
