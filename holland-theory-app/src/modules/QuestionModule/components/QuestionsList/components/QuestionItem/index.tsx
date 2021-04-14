import './styles.scss';
import React, { useContext, useEffect, useMemo, useRef } from 'react';

import { StoreContext } from '../../../../../../core/store';

interface QuestionItemProps {
  questionNumber: number;
  text: string;
  index: number;
  scrollToTargetItem: (xCoord: number) => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  questionNumber, text, index, scrollToTargetItem,
}) => {
  const { nextQuestionIndex, currentQuestionIndex } = useContext(StoreContext).state;
  const isItemDisabled = useMemo(() => index > nextQuestionIndex - 1, [index, nextQuestionIndex]);
  const activeClassName = useMemo(
    () => (currentQuestionIndex === index) ? 'question-item_active' : '',
    [index, currentQuestionIndex],
  );
  const disabledClassName = useMemo(
    () => isItemDisabled ? 'question-item_disabled' : '',
    [isItemDisabled],
  );
  const targetItemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const current = targetItemRef.current;
    if (current) {
      const targetIndex = Number(current.dataset.questionItemIndex);
      if (targetIndex) {
        scrollToTargetItem(targetIndex);
      }
    }
  }, [scrollToTargetItem, nextQuestionIndex]);

  return (
    <div
      className={`question-item questions-list__item ${activeClassName} ${disabledClassName}`}
      data-question-item-index={index}
      ref={(nextQuestionIndex - 1 === index) ? targetItemRef : null}
    >
      <span className='question-item__text'>
        {`${questionNumber}) ${text}`}
      </span>
    </div>
  );
};

export default QuestionItem;
