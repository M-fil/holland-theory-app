import './styles.scss';
import React, { ChangeEvent, useMemo } from 'react';

import { AnswersActiveObject, AnswersInactiveObject, AnswersValues } from '../../../../../../core/constants/answers';

interface AnswerItemProps {
  value: number;
  name: string;
  onAnswerSelectHandle: (event: ChangeEvent<HTMLInputElement>) => void;
  selectedValue: number;
}

const AnswerItem: React.FC<AnswerItemProps> = ({
  value, name, onAnswerSelectHandle, selectedValue,
}) => {
  const isChecked = useMemo(() => selectedValue === value, [selectedValue, value]);
  const source = isChecked
    ? AnswersActiveObject[value as AnswersValues].default
    : AnswersInactiveObject[value as AnswersValues].default;

  return (
    <div className='answer-item'>
        <div className='answer-item__title-info'>
          {name}
        </div>
      <label
        title={name}
        className='answer-item__label'
      >
        <img
          src={source}
          alt={name}
          className='answer-item__image'
        />
        <input
          type='radio'
          className='answer-item__radio-button'
          name='answers'
          value={value}
          onChange={onAnswerSelectHandle}
          checked={isChecked}
        />
      </label>
    </div>
  );
};

export default AnswerItem;
