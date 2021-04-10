import './styles.module.scss';
import React, { useContext, useMemo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { StoreContext } from '../../../../core/store';
import AnswersList from './components/AnswersList';
import ProgressBar from './components/ProgressBar';
import QuestionInfo from './components/QuestionInfo';
import * as QuestionActions from '../../../../core/store/actions/questions';

const CurrentQuestionBlock: React.FC = () => {
  const {
    totalNumberOfQuestions, answerVariants, currentQuestionIndex, questions, nextQuestionIndex,
  } = useContext(StoreContext).state;
  const { dispatch } = useContext(StoreContext);
  const [t] = useTranslation();
  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  const [answer, setAnswer] = useState<number>(-1);

  const onConfirmAnswer = useCallback(() => {
    const isAllowToSendAnswer = answer >= 0 && answer <= totalNumberOfQuestions;
    if (isAllowToSendAnswer) {
      dispatch(QuestionActions.setNextQuestionIndexAction());
      dispatch(QuestionActions.setCurrentQuestionIndexAction(currentQuestionIndex + 1));
      dispatch(QuestionActions.setAnswerForQuestionAction(answer, currentQuestionIndex));
    }
  }, [dispatch, currentQuestionIndex, answer, totalNumberOfQuestions]);

  const onAnswerValueChange = useCallback((answerValue: number) => {
    setAnswer(answerValue);
  }, []);

  return (
    <div className='current-question-block'>
      <div className='current-question-block__top-block'>
        <div className='current-question-block__question-number'>
          {currentQuestion && (
            <span className='current-question-block__question-number-text'>
              {currentQuestion.index}
            </span>
          )}
        </div>
        {currentQuestion && (
          <ProgressBar
            currentValue={nextQuestionIndex + 1}
            endValue={totalNumberOfQuestions}
          />
        )}
      </div>
      {currentQuestion && (
        <QuestionInfo
          questionText={currentQuestion.text}
          occupationArea={currentQuestion.area}
        />
      )}
      <AnswersList
        answerVariants={answerVariants}
        handleSelectedValue={onAnswerValueChange}
      />
      <div className='current-question-block__button-block'>
        <button
          type='button'
          onClick={onConfirmAnswer}
        >
          {t('confirm-button')}
        </button>
      </div>
    </div>
  );
};

export default CurrentQuestionBlock;
