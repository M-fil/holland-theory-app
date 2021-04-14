import './styles.scss';
import React, { useContext, useMemo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { StoreContext } from '../../../../core/store';
import AnswersList from './components/AnswersList';
import ProgressBar from './components/ProgressBar';
import QuestionInfo from './components/QuestionInfo';
import ProgressInfoBlock from './components/ProgressInfoBlock';
import * as QuestionActions from '../../../../core/store/actions/questions';
import * as ResultsActions from '../../../../core/store/actions/results';
import * as QuestionService from '../../../../core/services/questions';
import ButtonBlock from '../../../../core/components/ButtonsBlock';
import ButtonItem from '../../../../core/components/ButtonItem';

const DEFAULT_ANSWER_VALUE = -1;

const CurrentQuestionBlock: React.FC = () => {
  const {
    totalNumberOfQuestions, answerVariants, currentQuestionIndex, questions,
    nextQuestionIndex, nextQuestionsLink,
  } = useContext(StoreContext).state;
  const { dispatch } = useContext(StoreContext);
  const [showFinishTestButton, setShowFinishTestButton] = useState<boolean>(false);
  const [answer, setAnswer] = useState<number>(DEFAULT_ANSWER_VALUE);
  const [t] = useTranslation();
  const currentQuestion = useMemo(() => questions[currentQuestionIndex], [questions, currentQuestionIndex]);
  const currentAnswerValue = useMemo(() => !!currentQuestion ? currentQuestion.answerValue : -1, [currentQuestion]);
  const isLastEnabledQuestionSelected = useMemo(() => currentQuestionIndex === nextQuestionIndex - 1, [nextQuestionIndex, currentQuestionIndex]);
  const isContinueButtonDisabled = useMemo(() => answer < 0 || !isLastEnabledQuestionSelected, [isLastEnabledQuestionSelected, answer]);

  const sendAnswer = useCallback(() => {
    const isAllowToSendAnswer = answer > 0;

    if (isAllowToSendAnswer) {
      dispatch(QuestionActions.setNextQuestionIndexAction());
      dispatch(QuestionActions.setCurrentQuestionIndexAction(currentQuestionIndex + 1));
      dispatch(QuestionActions.setAnswerForQuestionAction(answer, currentQuestionIndex));
      dispatch(ResultsActions.updateResultsAction(currentQuestion.area, answer));
      setAnswer(DEFAULT_ANSWER_VALUE);
    }
  }, [answer, currentQuestion?.area, currentQuestionIndex, dispatch]);

  const onConfirmAnswer = useCallback(() => {
    if (nextQuestionIndex >= totalNumberOfQuestions) {
      setShowFinishTestButton(true);
    }
    sendAnswer();

    if (questions.length === nextQuestionIndex) {
      QuestionService.getNextQuestions(nextQuestionsLink)
        .then((result) => {
          if (result) {
            dispatch(QuestionActions.updateQuestionsAction(
              result.questions, result.nextQuestionsLink,
            ));
          }
        });
    }
  }, [nextQuestionIndex, totalNumberOfQuestions, sendAnswer, questions.length, nextQuestionsLink, dispatch]);

  const onFinishTestClickHandler = useCallback(() => {
    dispatch(ResultsActions.setIsTestFinishedAction(true));
  }, [dispatch]);

  const onAnswerValueChange = useCallback((answerValue: number) => {
    if (!isLastEnabledQuestionSelected) {
      dispatch(QuestionActions.setAnswerForQuestionAction(answerValue, currentQuestionIndex));
    }

    setAnswer(answerValue);
  }, [isLastEnabledQuestionSelected, currentQuestionIndex, dispatch]);

  return (
    <div className='current-question-block'>
      <div className='current-question-block__top-block'>
        {currentQuestion && (
          <>
            <ProgressInfoBlock
              questionIndex={currentQuestion.index}
            />
            <ProgressBar
              currentValue={nextQuestionIndex - 1}
              endValue={totalNumberOfQuestions}
            />
          </>
        )}
      </div>
      <div className='current-question-block__main-content'>
        {currentQuestion && (
          <QuestionInfo
            questionText={currentQuestion.text}
            occupationArea={currentQuestion.area}
          />
        )}
        <AnswersList
          answerVariants={answerVariants}
          handleSelectedValue={onAnswerValueChange}
          currentAnswerValue={currentAnswerValue}
          currentQuestionArea={currentQuestion?.area}
        />
        <ButtonBlock>
          {showFinishTestButton ? (
            <ButtonItem
              title={t('finish-test-button')}
              onClick={onFinishTestClickHandler}
            />
          ) : (
            <ButtonItem
              title={t('confirm-button')}
              onClick={onConfirmAnswer}
              otherButtonProps={{
                disabled: isContinueButtonDisabled,
              }}
            />
          )}
        </ButtonBlock>
      </div>
    </div>
  );
};

export default CurrentQuestionBlock;
