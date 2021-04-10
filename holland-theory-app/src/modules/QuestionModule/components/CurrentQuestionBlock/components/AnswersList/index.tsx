import React, { ChangeEvent, useCallback, useState, useContext } from 'react';
import { useEffect } from 'react';
import { AnswerEntity } from '../../../../../../core/interfaces/answer';
import { StoreContext } from '../../../../../../core/store';

interface AnswersListProps {
  answerVariants: AnswerEntity[];
  handleSelectedValue: (value: number) => void;
  currentAnswerValue: number;
}

const AnswersList: React.FC<AnswersListProps> = ({
  answerVariants, handleSelectedValue, currentAnswerValue,
}) => {
  const [selectedValue, setSelectedValue] = useState<number>(-1);
  const [lastEnabledQuestionValue, setLastEnabledQuestionValue] = useState(-1);
  const { nextQuestionIndex, currentQuestionIndex } = useContext(StoreContext).state;

  useEffect(() => {
    setLastEnabledQuestionValue(-1);
    setSelectedValue(-1);
  }, [nextQuestionIndex]);

  useEffect(() => {
    if (currentQuestionIndex !== nextQuestionIndex) {
      setSelectedValue(currentAnswerValue);
    }
    if (currentQuestionIndex === nextQuestionIndex - 1) {
      setSelectedValue(lastEnabledQuestionValue);
    }
  }, [nextQuestionIndex, currentAnswerValue, currentQuestionIndex, lastEnabledQuestionValue]);

  const onInputSelectHandle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numberValue = Number(value);
    setSelectedValue(numberValue);
    if (currentQuestionIndex === nextQuestionIndex - 1) {
      setLastEnabledQuestionValue(numberValue);
    }
    handleSelectedValue(numberValue);
  }, [handleSelectedValue, currentQuestionIndex, nextQuestionIndex]);

  return (
    <div className='current-question-block__answer-variants'>
      {(answerVariants || []).map((answer) => {
        return (
          <label key={String(answer.value)}>
            {answer.name}
            <input
              type='radio'
              name='answers'
              value={answer.value}
              onChange={onInputSelectHandle}
              checked={selectedValue === answer.value}
            />
          </label>
        );
      })}
    </div>
  );
};

export default AnswersList;
