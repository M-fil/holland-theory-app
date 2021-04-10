import './styles.module.scss';
import React, { useContext, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { StoreContext } from '../../../../core/store';
import AnswersList from './components/AnswersList';
import ProgressBar from './components/ProgressBar';
import QuestionInfo from './components/QuestionInfo';

const CurrentQuestionBlock: React.FC = () => {
  const {
    totalNumberOfQuestions, answerVariants, currentQuestionIndex, questions,
  } = useContext(StoreContext).state;
  const [t] = useTranslation();
  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);

  const onConfirmAnswer = useCallback(() => {}, []);

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
            currentValue={currentQuestion.index}
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
      <AnswersList answerVariants={answerVariants} />
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
