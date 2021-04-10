import React from 'react';
import { OccupationCategories } from '../../../../../../core/constants/occupation';

interface QuestionInfoProps {
  occupationArea: OccupationCategories;
  questionText: string;
}

const QuestionInfo: React.FC<QuestionInfoProps> = React.memo(({
  questionText, occupationArea,
}) => {
  return (
    <div className='current-question-block__main-info main-info'>
      {occupationArea}
      <div className='main-info__color-block' />
      <span className='main-info__question-text'>
        {questionText}
      </span>
    </div>
  );
});

export default QuestionInfo;
