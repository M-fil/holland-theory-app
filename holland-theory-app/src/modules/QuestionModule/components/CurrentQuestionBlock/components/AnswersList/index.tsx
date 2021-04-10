import React, { ChangeEvent, useCallback } from 'react';
import { AnswerEntity } from '../../../../../../core/interfaces/answer';

interface AnswersListProps {
  answerVariants: AnswerEntity[];
  handleSelectedValue: (value: number) => void;
}

const AnswersList: React.FC<AnswersListProps> = ({
  answerVariants, handleSelectedValue,
}) => {
  const onInputSelectHandle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    handleSelectedValue(Number(selectedValue));
  }, [handleSelectedValue]);

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
              onChange={onInputSelectHandle}
            />
          </label>
        );
      })}
    </div>
  );
};

export default AnswersList;
