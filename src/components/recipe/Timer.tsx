import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import useTimer from '../../hooks/useTimer';
import { motion } from 'framer-motion';

interface TimerProps {
  prepTime: number;
  cookTime: number;
}

const Timer = ({ prepTime, cookTime }: TimerProps) => {
  const [timerType, setTimerType] = useState<'prep' | 'cook'>('prep');
  const [initialTime, setInitialTime] = useState<number>(prepTime * 60);
  const [customTime, setCustomTime] = useState<number>(0);
  const [showCustom, setShowCustom] = useState<boolean>(false);
  const [notificationShown, setNotificationShown] = useState<boolean>(false);

  const playAlarm = () => {
    const audio = new Audio('/timer-sound.mp3');
    audio.play().catch(error => console.error('Error playing sound:', error));

    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Timer Complete!', {
        body: 'Your cooking timer has finished.',
        icon: '/favicon.svg'
      });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      setNotificationShown(true);
    }
  };

  const {
    time,
    isActive,
    isPaused,
    start,
    pause,
    resume,
    reset,
    setTime: updateTime,
    formatTime
  } = useTimer({
    initialTime: initialTime,
    onComplete: playAlarm
  });

  useEffect(() => {
    updateTime(initialTime);
  }, [initialTime, updateTime]);

  const handleTimerTypeChange = (type: 'prep' | 'cook') => {
    if (isActive) reset();
    setTimerType(type);
    setInitialTime(type === 'prep' ? prepTime * 60 : cookTime * 60);
    setShowCustom(false);
  };

  const handleCustomTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setCustomTime(value);
    }
  };

  const setCustomTimer = () => {
    if (customTime > 0) {
      if (isActive) reset();
      setInitialTime(customTime * 60);
      setShowCustom(false);
    }
  };

  const requestNotificationPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(() => {
        setNotificationShown(false);
      });
    }
  };

  const timerProgress = ((initialTime - time) / initialTime) * 100;

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <h3 className="text-xl font-semibold mb-4 flex items-center">
        <Clock className="mr-2 text-primary-500" />
        Cooking Timer
      </h3>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => handleTimerTypeChange('prep')}
          className={`px-4 py-2 rounded-l-md transition ${
            timerType === 'prep'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Prep Time ({prepTime} min)
        </button>
        <button
          onClick={() => handleTimerTypeChange('cook')}
          className={`px-4 py-2 rounded-r-md transition ${
            timerType === 'cook'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Cook Time ({cookTime} min)
        </button>
      </div>

      <div className="relative h-48 w-48 mx-auto mb-6">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#f1f1f1"
            strokeWidth="8"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            className="text-primary-500"
            strokeDasharray="282.7"
            strokeDashoffset={282.7 - (282.7 * timerProgress) / 100}
            initial={{ strokeDashoffset: 282.7 }}
            animate={{ strokeDashoffset: 282.7 - (282.7 * timerProgress) / 100 }}
            transition={{ duration: 0.5 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-3xl font-mono font-bold">{formatTime(time)}</p>
        </div>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        {!isActive ? (
          <button
            onClick={start}
            className="bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 transition"
            aria-label="Start timer"
          >
            <Play size={24} />
          </button>
        ) : isPaused ? (
          <button
            onClick={resume}
            className="bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 transition"
            aria-label="Resume timer"
          >
            <Play size={24} />
          </button>
        ) : (
          <button
            onClick={pause}
            className="bg-yellow-600 text-white p-3 rounded-full hover:bg-yellow-700 transition"
            aria-label="Pause timer"
          >
            <Pause size={24} />
          </button>
        )}
        <button
          onClick={reset}
          className="bg-gray-600 text-white p-3 rounded-full hover:bg-gray-700 transition"
          aria-label="Reset timer"
        >
          <RotateCcw size={24} />
        </button>
      </div>

      <div className="flex justify-center">
        {!showCustom ? (
          <button
            onClick={() => setShowCustom(true)}
            className="text-primary-600 dark:text-primary-400 hover:underline colors-black"
          >
            Set custom timer
          </button>
        ) : (
          <div className="flex items-center space-x-2 text-colors-black dark:text-gray-800">
            <input
              type="number"
              min="1"
              value={customTime || ''}
              onChange={handleCustomTimeChange}
              className="w-20 px-2 py-1 border rounded text-center"
              placeholder="mins"
            />
            <button
              onClick={setCustomTimer}
              className="px-3 py-1 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition"
            >
              Set
            </button>
            <button
              onClick={() => setShowCustom(false)}
              className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {notificationShown && (
        <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900 rounded-md">
          <p className="text-sm">
            Allow notifications to receive alerts when your timer finishes.
          </p>
          <button
            onClick={requestNotificationPermission}
            className="mt-2 text-sm bg-primary-600 text-white px-3 py-1 rounded-md hover:bg-primary-700 transition"
          >
            Allow Notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default Timer;
