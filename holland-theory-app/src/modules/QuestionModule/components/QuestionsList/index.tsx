import './styles.scss';
import React, { useContext, useCallback, MouseEvent, UIEvent, useRef } from 'react';

import { StoreContext } from '../../../../core/store';
import QuestionItem from './components/QuestionItem';
import * as QuestionActions from '../../../../core/store/actions/questions';
import * as QuestionService from '../../../../core/services/questions';

const QuestionsList: React.FC = () => {
  const {
    questions, nextQuestionIndex, nextQuestionsLink, isAllQuestionsWereLoaded,
  } = useContext(StoreContext).state;
  const { dispatch } = useContext(StoreContext);
  const questionListRef = useRef<HTMLDivElement | null>(null);

  const onSelectQuestion = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const target = (event.target as HTMLDivElement).closest('[data-question-item-index]') as HTMLDivElement;

    if (target) {
      const targetIndex = Number(target.dataset.questionItemIndex);
      const isItemDisabled = targetIndex > nextQuestionIndex - 1;

      if (!isItemDisabled) {
        dispatch(QuestionActions.setCurrentQuestionIndexAction(targetIndex));
      }
    }
  }, [nextQuestionIndex, dispatch]);

  const loadQuestionsWithScrolling = useCallback((event: UIEvent<HTMLDivElement>) => {
    if (!isAllQuestionsWereLoaded) {
      const target = event.target as HTMLDivElement;
      const wasScrolledValue = target.scrollWidth - target.scrollLeft;
      const wasScrolledToTheEnd = wasScrolledValue <= target.clientWidth;

      if (wasScrolledToTheEnd) {
        QuestionService.getNextQuestions(nextQuestionsLink)
          .then((result) => {
            if (result) {
              dispatch(QuestionActions.updateQuestionsAction(
                result.questions, result.nextQuestionsLink,
              ));
            }
          });
      }
    }
  }, [dispatch, isAllQuestionsWereLoaded, nextQuestionsLink]);

  const scrollToTargetItem = useCallback((targetIndex: number) => {
    const current = questionListRef.current;
    if (current) {
      const oneItemScrollWidth = (current.scrollWidth / questions.length);
      current.scrollTo({
        top: 0,
        left: oneItemScrollWidth * targetIndex,
        behavior: 'smooth',
      });
    }
  }, [questionListRef, questions]);

  return (
    <div
      className='questions-list'
      onClick={onSelectQuestion}
    >
      <div
        className='questions-list__wrapper'
        onScroll={loadQuestionsWithScrolling}
        ref={questionListRef}
      >
        {(questions || []).map((question, index) => (
          <QuestionItem
            key={String(question.index)}
            index={index}
            questionNumber={question.index}
            text={question.text}
            scrollToTargetItem={scrollToTargetItem}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionsList;