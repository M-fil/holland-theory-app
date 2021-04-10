import React from 'react';
import { AnswerEntity } from '../../../../../../core/interfaces/answer';

interface AnswersListProps {
  answerVariants: AnswerEntity[];
}

const AnswersList: React.FC<AnswersListProps> = ({
  answerVariants,
}) => {
  return (
    <div className='current-question-block__answer-variants'>
      {(answerVariants || []).map((answer) => {
        return (
          <label key={String(answer.value)}>
            {answer.name}
            <input
              type='radio'
              value={answer.value}
              name='answers'
            />
          </label>
        );
      })}
    </div>
  );
};

export default AnswersList;
