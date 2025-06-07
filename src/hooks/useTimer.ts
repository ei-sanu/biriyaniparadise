import { useState, useEffect, useRef } from 'react';

interface UseTimerProps {
  initialTime?: number;
  onComplete?: () => void;
}

interface UseTimerReturn {
  time: number;
  isActive: boolean;
  isPaused: boolean;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  setTime: (time: number) => void;
  formatTime: (time: number) => string;
}

const useTimer = ({ initialTime = 0, onComplete }: UseTimerProps = {}): UseTimerReturn => {
  const [time, setTime] = useState<number>(initialTime);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const countRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (countRef.current) clearInterval(countRef.current);
    };
  }, []);

  useEffect(() => {
    if (time === 0 && isActive) {
      if (countRef.current) clearInterval(countRef.current);
      setIsActive(false);
      setIsPaused(false);
      if (onComplete) onComplete();
    }
  }, [time, isActive, onComplete]);

  const start = () => {
    setIsActive(true);
    setIsPaused(false);
    countRef.current = window.setInterval(() => {
      setTime((time) => {
        if (time <= 1) {
          if (countRef.current) clearInterval(countRef.current);
          return 0;
        }
        return time - 1;
      });
    }, 1000);
  };

  const pause = () => {
    if (countRef.current) clearInterval(countRef.current);
    setIsPaused(true);
  };

  const resume = () => {
    setIsPaused(false);
    countRef.current = window.setInterval(() => {
      setTime((time) => {
        if (time <= 1) {
          if (countRef.current) clearInterval(countRef.current);
          return 0;
        }
        return time - 1;
      });
    }, 1000);
  };

  const reset = () => {
    if (countRef.current) clearInterval(countRef.current);
    setIsActive(false);
    setIsPaused(false);
    setTime(initialTime);
  };

  const formatTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return hours > 0
      ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
      : `${formattedMinutes}:${formattedSeconds}`;
  };

  return {
    time,
    isActive,
    isPaused,
    start,
    pause,
    resume,
    reset,
    setTime,
    formatTime,
  };
};

export default useTimer;