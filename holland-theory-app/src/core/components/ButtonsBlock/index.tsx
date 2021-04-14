import styles from './styles.module.scss';
import React, { ReactNode, useCallback, useContext, useMemo } from 'react';

import ButtonItem from '../ButtonItem';
import i18n from '../../i18n';
import { StoreContext } from '../../store';
import * as ResultsActions from '../../store/actions/results';

interface ButtonsBlockProps {
  onNext?: () => void;
  onPrev?: () => void;
  titles?: {
    next: string,
    prev: string,
  };
  children?: ReactNode;
}

const DEFAULT_TITLES = {
  next: i18n.t('results-page.next-button'),
  prev: i18n.t('results-page.prev-button'),
};

const ButtonsBlock: React.FC<ButtonsBlockProps> = ({
  onNext = null, onPrev = null, titles = DEFAULT_TITLES,
  children = null,
}) => {
  const { dispatch } = useContext(StoreContext);
  const { sections, currentSectionIndex } = useContext(StoreContext).state.resultsSections;
  const isPrevButtonDisabled = useMemo(() => currentSectionIndex === 0, [currentSectionIndex]);
  const isNextButtonDisabled = useMemo(() => currentSectionIndex === sections.length - 1, [currentSectionIndex, sections]);

  const onNextButtonClick = useCallback(() => {
    if (onNext) {
      onNext();
    } else {
      dispatch(ResultsActions.updateCurrentResultsSectionIndex(null, 'next'));
    }
  }, [dispatch, onNext]);

  const onPrevButtonClick = useCallback(() => {
    if (onPrev) {
      onPrev();
    } else {
      dispatch(ResultsActions.updateCurrentResultsSectionIndex(null, 'prev'));
    }
  }, [dispatch, onPrev]);

  return (
    <div className={styles.buttonsBlock}>
      <div className={styles.buttonsBlockWrapper}>
        {children || (
          <>
            <ButtonItem
              title={titles.prev}
              onClick={onPrevButtonClick}
              otherButtonProps={{
                disabled: isPrevButtonDisabled,
              }}
            />
            <ButtonItem
              title={titles.next}
              onClick={onNextButtonClick}
              otherButtonProps={{
                disabled: isNextButtonDisabled,
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ButtonsBlock;
