import './styles.scss';
import React, { ChangeEvent, useCallback, useState, useContext, useEffect, useMemo } from 'react';

import { AnswerEntity } from '../../../../../../core/interfaces/answer';
import { StoreContext } from '../../../../../../core/store';
import * as ResultsActions from '../../../../../../core/store/actions/results';
import { OccupationCategories } from '../../../../../../core/constants/occupation';
import AnswerItem from '../AnswerItem';

interface AnswersListProps {
  answerVariants: AnswerEntity[];
  handleSelectedValue: (value: number) => void;
  currentAnswerValue: number;
  currentQuestionArea: OccupationCategories;
}

const AnswersList: React.FC<AnswersListProps> = ({
  answerVariants, handleSelectedValue, currentAnswerValue, currentQuestionArea,
}) => {
  const [selectedValue, setSelectedValue] = useState<number>(-1);
  const [lastEnabledQuestionValue, setLastEnabledQuestionValue] = useState(-1);
  const { nextQuestionIndex, currentQuestionIndex } = useContext(StoreContext).state;
  const { dispatch } = useContext(StoreContext);
  const targetName = useMemo(() => {
    const targetAnswer = answerVariants.find((answer) => answer.value === selectedValue);
    return targetAnswer ? targetAnswer.name : '';
  }, [answerVariants, selectedValue]);

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

  const onAnswerSelectHandle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const numberValue = Number(value);
    const isChangedLastEnabledQuestion = currentQuestionIndex === nextQuestionIndex - 1;
    if (!isChangedLastEnabledQuestion && selectedValue > 0) {
      const updatedValue = numberValue - selectedValue;
      dispatch(ResultsActions.updateResultsAction(currentQuestionArea, updatedValue));
    }
    setSelectedValue(numberValue);
    if (currentQuestionIndex === nextQuestionIndex - 1) {
      setLastEnabledQuestionValue(numberValue);
    }
    handleSelectedValue(numberValue);
  }, [handleSelectedValue, currentQuestionIndex, nextQuestionIndex, dispatch, currentQuestionArea, selectedValue]);

  return (
    <div className='answer-variants'>
      <div className='answer-variants__list'>
        {(answerVariants || []).map((answer) => (
          <AnswerItem
            key={String(answer.value)}
            value={answer.value}
            name={answer.name}
            onAnswerSelectHandle={onAnswerSelectHandle}
            selectedValue={selectedValue}
          />
        ))}
      </div>
      <div className='answer-variants__selected-answer'>
        {targetName}
      </div>
    </div>
  );
};

export default AnswersList;
