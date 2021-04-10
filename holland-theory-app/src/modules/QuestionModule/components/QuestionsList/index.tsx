import './styles.scss';
import React, { useContext, useCallback, MouseEvent } from 'react';

import { StoreContext } from '../../../../core/store';
import QuestionItem from './components/QuestionItem';
import * as QuestionActions from '../../../../core/store/actions/questions';

const QuestionsList: React.FC = () => {
  const { questions, nextQuestionIndex } = useContext(StoreContext).state;
  const { dispatch } = useContext(StoreContext);

  const onSelectQuestion = useCallback((event: MouseEvent<HTMLDivElement>) => {
    const target = (event.target as HTMLDivElement).closest('[data-question-item-index]') as HTMLDivElement;

    if (target) {
      const targetIndex = Number(target.dataset.questionItemIndex);
      const isItemDisabled = targetIndex > nextQuestionIndex;

      if (!isItemDisabled) {
        dispatch(QuestionActions.setCurrentQuestionIndexAction(targetIndex));
      }
    }
  }, [nextQuestionIndex, dispatch]);

  return (
    <div
      className='questions-list'
      onClick={onSelectQuestion}
    >
      <div className='questions-list__wrapper'>
        {(questions || []).map((question, index) => (
          <QuestionItem
            key={String(question.index)}
            index={index}
            questionNumber={question.index}
            text={question.text}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionsList;