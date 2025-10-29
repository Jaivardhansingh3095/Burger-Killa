import { useEffect, useState } from 'react';

function SessionTimer({
  minutes = 14,
  seconds = 59,
  invalidateSession,
  sessionId,
}) {
  const [min, setMin] = useState(minutes);
  const [sec, setSec] = useState(seconds);
  useEffect(
    function () {
      if (sec === 0 && min === 0) {
        invalidateSession({ sessionId, status: 'expired' });
        return;
      }
      const tick = setInterval(() => {
        setSec((prev) => {
          if (prev === 0) {
            return 59;
          }
          return prev - 1;
        });

        if (sec === 0)
          setMin((prev) => {
            if (prev === 0) return prev;
            return prev - 1;
          });
      }, 1000);

      return () => clearInterval(tick);
    },
    [sec],
  );

  return (
    <div className="flex flex-col items-center justify-center gap-1 px-2 py-2 sm:px-5">
      <span className="text-xs text-gray-400 sm:text-sm">Prices Valid For</span>
      <span className="flex items-center justify-center gap-2 text-green-500">
        <span className="font-semibold sm:text-lg">
          {min > 9 ? min : '0' + min}
        </span>
        <span className="text-xs sm:text-sm">mins</span>
        <span className="font-semibold sm:text-lg">
          {sec > 9 ? sec : '0' + sec}
        </span>
        <span className="text-xs sm:text-sm">seconds</span>
      </span>
    </div>
  );
}

export default SessionTimer;
