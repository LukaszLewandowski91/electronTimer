import React, { useEffect, useState } from "react";
import { render } from "react-dom";

const App = () => {
  const statuses = {
    work: "work",
    rest: "rest",
    off: "off",
  };
  const [status, setStatus] = useState(statuses.off);
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);

  const formatTime = (myTime) => {
    let minutes = Math.floor(myTime / 60);
    let seconds = myTime - minutes * 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const startTimer = () => {
    setStatus(statuses.work);
    setTime(1200);
    setTimer(
      setInterval(() => {
        setTime((time) => time - 1);
      }, 1000)
    );
  };

  const stopTimer = () => {
    setTimer(clearInterval(timer));
    setStatus(statuses.off);
    setTime(0);
  };

  useEffect(() => {
    if (time === 0 && status === statuses.work) {
      playBell();
      setStatus(statuses.rest);
      setTime(20);
    } else if (time === 0 && status === statuses.rest) {
      playBell();
      setStatus(statuses.work);
      setTime(1200);
    }
  });

  const playBell = () => {
    const bell = new Audio("./sounds/bell.wav");
    bell.play();
  };

  const closeApp = () => {
    window.close();
  };
  return (
    <div>
      <h1>Protect your eyes</h1>

      {status === statuses.off && (
        <div>
          <p>
            According to optometrists in order to save your eyes, you should
            follow the 20/20/20. It means you should to rest your eyes every 20
            minutes for 20 seconds by looking more than 20 feet away.
          </p>
          <p>
            This app will help you track your time and inform you when it's time
            to rest.
          </p>
        </div>
      )}
      {status === statuses.work && <img src="./images/work.png" />}
      {status === statuses.rest && <img src="./images/rest.png" />}
      {status !== statuses.off && (
        <div className="timer">{formatTime(time)}</div>
      )}
      {status === statuses.off && (
        <button className="btn" onClick={() => startTimer()}>
          Start
        </button>
      )}
      {status !== statuses.off && (
        <button className="btn" onClick={() => stopTimer()}>
          Stop
        </button>
      )}
      <button className="btn btn-close" onClick={() => closeApp()}>
        X
      </button>
    </div>
  );
};

render(<App />, document.querySelector("#app"));
