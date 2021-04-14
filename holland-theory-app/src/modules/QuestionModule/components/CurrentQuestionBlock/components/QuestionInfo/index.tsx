import './styles.scss';
import React from 'react';

import { OccupationCategories } from '../../../../../../core/constants/occupation';
import { getOccupationColors } from '../../../../../../core/constants/occupation';

interface QuestionInfoProps {
  occupationArea: OccupationCategories;
  questionText: string;
}

const OccupationColors = getOccupationColors(1);

const QuestionInfo: React.FC<QuestionInfoProps> = React.memo(({
  questionText, occupationArea,
}) => {
  return (
    <div className='current-question-main-info'>
      <div
        className='current-question-main-info__color-block'
      >
        <div
          className='color-block__inside'
          style={{
            backgroundColor: OccupationColors[occupationArea],
          }}
        />
      </div>
      <span className='current-question-main-info__question-text'>
        {questionText}
      </span>
    </div>
  );
});

export default QuestionInfo;
