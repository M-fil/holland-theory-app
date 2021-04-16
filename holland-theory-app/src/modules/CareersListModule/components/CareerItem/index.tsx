import './styles.scss';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { FitType } from '../../../../core/interfaces/careers';

interface CareerItemProps {
  title: string;
  description: string;
  code: string;
  fit: FitType;
  extraClassName?: string;
  positionInList: number;
  bestFitColor?: string;
  greatFitColor?: string;
  goodFitColor?: string;
}

const DEFAULT_BEST_FIT_COLOR = '#17A765';
const DEFAULT_GREET_FIT_COLOR = '#FABC05';
const DEFAULT_GOOD_FIT_COLOR = '#4D8BF5';

const CareerItem: React.FC<CareerItemProps> = ({
  title, description, code, fit, extraClassName = '', positionInList,
  bestFitColor = DEFAULT_BEST_FIT_COLOR, greatFitColor = DEFAULT_GREET_FIT_COLOR,
  goodFitColor = DEFAULT_GOOD_FIT_COLOR,
}) => {
  const [t] = useTranslation();

  const getFitColor = useCallback(() => {
    switch (fit) {
      case 'Best':
        return bestFitColor;
      case 'Good':
        return goodFitColor;
      case 'Great':
        return greatFitColor;
      default:
        return goodFitColor;
    }
  }, [bestFitColor, fit, goodFitColor, greatFitColor]);

  const getFitTitle = useCallback(() => {
    switch (fit) {
      case 'Best':
        return t('fit.best');
      case 'Good':
        return t('fit.good');
      case 'Great':
        return t('fit.great');
      default:
        return t('fit.good');
    }
  }, [fit, t]);

  return (
    <div
      className={`career-item ${extraClassName}`}
      title={description}
      data-career-code={code}
    >
      <div className='career-item__wrapper'>
        <div
          className='career-item__fit-container'
          title={getFitTitle()}
          style={{
            backgroundColor: getFitColor(),
          }}
        >
          <div className='career-item__fit-circle' />
        </div>
        <span className='career-item__title'>
          {`${positionInList}) ${title}`}
        </span>
      </div>
    </div>
  );
};

export default CareerItem;
