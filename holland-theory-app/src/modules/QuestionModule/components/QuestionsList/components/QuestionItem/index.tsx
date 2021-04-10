import './styles.scss';
import React, { useContext, useMemo } from 'react';

import { StoreContext } from '../../../../../../core/store';

interface QuestionItemProps {
  questionNumber: number;
  text: string;
  index: number;
}

const QuestionItem: React.FC<QuestionItemProps> = ({
  questionNumber, text, index,
}) => {
  const { nextQuestionIndex, currentQuestionIndex } = useContext(StoreContext).state;
  const isItemDisabled = useMemo(() => index > nextQuestionIndex, [index, nextQuestionIndex]);
  const activeClassName = useMemo(
    () => (currentQuestionIndex === index) ? 'question-item_active' : '',
    [index, currentQuestionIndex],
  );
  const disabledClassName = useMemo(
    () => isItemDisabled ? 'question-item_disabled' : '',
    [isItemDisabled],
  );

  return (
    <div
      className={`question-item questions-list__item ${activeClassName} ${disabledClassName}`}
      data-question-item-index={index}
    >
      <span className='question-item__text'>
        {`${questionNumber}) ${text}`}
      </span>
    </div>
  );
};

export default QuestionItem;
