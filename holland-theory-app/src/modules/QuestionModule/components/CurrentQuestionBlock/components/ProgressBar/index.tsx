import React from 'react';

interface ProgressBarProps {
  currentValue: number;
  endValue: number;
}

const ProgressBar: React.FC<ProgressBarProps> = React.memo(({
  currentValue, endValue,
}) => {
  return (
    <div className='current-question-block__progress-block progress-block'>
      <span className='progress-block__number-text'>
        {`${currentValue}/${endValue}`}
      </span>
      <div className='progress-block__progress-bar'>
        <div className='progress-block__progress-line' />
      </div>
    </div>
  );
});

export default ProgressBar;
