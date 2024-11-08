import React, { useState, useEffect } from 'react';
import './Clock.css';

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [stopwatch, setStopwatch] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerInput, setTimerInput] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  useEffect(() => {
    let stopwatchInterval;
    if (isStopwatchRunning) {
      stopwatchInterval = setInterval(() => {
        setStopwatch(prevTime => prevTime + 1);
      }, 1000);
    } else if (!isStopwatchRunning && stopwatch !== 0) {
      clearInterval(stopwatchInterval);
    }
    return () => clearInterval(stopwatchInterval);
  }, [isStopwatchRunning]);

  useEffect(() => {
    let timerInterval;
    if (isTimerRunning && timer > 0) {
      timerInterval = setInterval(() => {
        setTimer(prevTime => prevTime - 1);
      }, 1000);
    } else if (timer === 0 && isTimerRunning) {
      clearInterval(timerInterval);
      setIsTimerRunning(false); 
      alert("Time's up!");
    }
    return () => clearInterval(timerInterval);
  }, [isTimerRunning, timer]);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatSeconds = (seconds) => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const startStopwatch = () => setIsStopwatchRunning(true);
  const stopStopwatch = () => setIsStopwatchRunning(false);
  const resetStopwatch = () => {
    setIsStopwatchRunning(false);
    setStopwatch(0);
  };

  const handleTimerInputChange = (e) => setTimerInput(e.target.value);
  const startTimer = () => {
    setTimer(Number(timerInput));
    setIsTimerRunning(true);
  };
  const stopTimer = () => setIsTimerRunning(false);
  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimer(0);
    setTimerInput(0);
  };

  return (
    <div className="clock-container">
      <h1 className="clock">{formatTime(time)}</h1>

      <div className="stopwatch">
        <h2>Stopwatch: {formatSeconds(stopwatch)}</h2>
        <button onClick={startStopwatch}>Start</button>
        <button onClick={stopStopwatch}>Stop</button>
        <button onClick={resetStopwatch}>Reset</button>
      </div>

      <div className="timer">
        <h2>Timer: {formatSeconds(timer)}</h2>
        <input
          type="number"
          min="0"
          value={timerInput}
          onChange={handleTimerInputChange}
          placeholder="Set seconds"
        />
        <button onClick={startTimer} disabled={timerInput <= 0 || isTimerRunning}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default Clock;
