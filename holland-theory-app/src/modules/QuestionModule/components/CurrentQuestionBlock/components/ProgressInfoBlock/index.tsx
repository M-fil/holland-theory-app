import './styles.scss';
import React from 'react';

interface ProgressInfoBlockProps {
  questionIndex: number;
}

const ProgressInfoBlock: React.FC<ProgressInfoBlockProps> = React.memo(({
  questionIndex,
}) => (
  <div className='question-number-block'>
    <span className='question-number-block__text'>
      {questionIndex}
    </span>
  </div>
));

export default ProgressInfoBlock;
