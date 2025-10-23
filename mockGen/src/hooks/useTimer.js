import { useState, useEffect, useRef } from "react";

/**
 * Custom hook to manage a countdown timer.
 * @param {number} initialTimeInSeconds - The total time for the quiz.
 * @param {function} onTimeUp - Callback function to execute when the timer hits 0.
 */
export function useTimer(initialTimeInSeconds, onTimeUp) {
  const [timeLeft, setTimeLeft] = useState(initialTimeInSeconds);
  // useRef holds the interval ID so we can clear it
  const intervalRef = useRef(null);

  useEffect(() => {
    // Start the timer
    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current);
          onTimeUp(); // Call the onTimeUp callback
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup: Clear the interval when the component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [initialTimeInSeconds, onTimeUp]); // Re-run if these change

  // Function to format time (e.g., 65 seconds -> 01:05)
  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return { timeLeft, formattedTime: formatTime() };
}
