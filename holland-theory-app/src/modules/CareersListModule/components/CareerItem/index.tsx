import './styles.scss';
import React from 'react';

interface CareerItemProps {
  title: string;
  description: string;
  code: string;
  isGreetFit: boolean;
  extraClassName?: string;
}

const CareerItem: React.FC<CareerItemProps> = ({
  title, description, code, isGreetFit, extraClassName = '',
}) => {
  return (
    <div
      className={`career-item ${extraClassName}`}
      title={description}
      data-career-code={code}
    >
      <div className='career-item__wrapper'>
        <span className='career-item__fit-text'>
          {isGreetFit}
        </span>
        <span className='career-item__title'>
          {title}
        </span>
      </div>
    </div>
  );
};

export default CareerItem;
