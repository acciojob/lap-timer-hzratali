import React, { useState, useEffect } from "react";

function LapTimer() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let timerId;

    if (isRunning) {
      timerId = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 10);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTime(0);
    setLaps([]);
  };

  const addLap = () => {
    setLaps((prevLaps) => [...prevLaps, time]);
  };

  const formatTime = (time) => {
    const minutes = Math.floor((time / 6000) % 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((time / 100) % 60)
      .toString()
      .padStart(2, "0");
    const milliseconds = (time % 100).toString().padStart(2, "0");
    return `${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div>
      <h1>Lap Timer</h1>
      <p>Time: {formatTime(time)}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={resetTimer}>Reset</button>
      <button onClick={addLap}>Lap</button>
      <ul>
        {laps.map((lap, index) => (
          <li key={index}>
            Lap {index + 1}: {formatTime(lap)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LapTimer;
