import './styles.scss';
import React, { useEffect, useMemo, useRef, useState } from 'react';

interface ProgressBarProps {
  currentValue: number;
  endValue: number;
}

const ProgressBar: React.FC<ProgressBarProps> = React.memo(({
  currentValue, endValue,
}) => {
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const [progressLineWidth, setProgressLineWidth] = useState<number>(0);
  const completedBarLineClassName = useMemo(
    (): string => currentValue === endValue ? 'progress-block__progress-line_completed' : '',
    [currentValue, endValue],
  );

  useEffect(() => {
    const current = progressBarRef.current;
    if (current) {
      const progressBarWidth = current.clientWidth;
      const widthOfOnePercent = progressBarWidth / endValue;
      setProgressLineWidth(widthOfOnePercent * currentValue);
    }
  }, [currentValue, endValue]);

  return (
    <div className='progress-block'>
      <span className='progress-block__number-text'>
        {`${currentValue}/${endValue}`}
      </span>
      <div
        ref={progressBarRef}
        className='progress-block__progress-bar'
      >
        <div
          className={`progress-block__progress-line ${completedBarLineClassName}`}
          style={{
            width: progressLineWidth,
          }}
        />
      </div>
    </div>
  );
});

export default ProgressBar;
