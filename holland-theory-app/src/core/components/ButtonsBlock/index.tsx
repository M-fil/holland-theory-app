import styles from './styles.module.scss';
import React, { useCallback, useContext, useMemo } from 'react';

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
}

const mockFn = () => {};
const DEFAULT_TITLES = {
  next: i18n.t('results-page.next-button'),
  prev: i18n.t('results-page.prev-button'),
};

const ButtonsBlock: React.FC<ButtonsBlockProps> = ({
  onNext = mockFn, onPrev = mockFn, titles = DEFAULT_TITLES,
}) => {
  const { dispatch } = useContext(StoreContext);
  const { sections, currentSectionIndex } = useContext(StoreContext).state.resultsSections;
  const isPrevButtonDisabled = useMemo(() => currentSectionIndex === 0, [currentSectionIndex]);
  const isNextButtonDisabled = useMemo(() => currentSectionIndex === sections.length - 1, [currentSectionIndex, sections]);

  const onNextButtonClick = useCallback(() => {
    dispatch(ResultsActions.updateCurrentResultsSectionIndex(null, 'next'));
    onNext();
  }, [dispatch, onNext]);

  const onPrevButtonClick = useCallback(() => {
    dispatch(ResultsActions.updateCurrentResultsSectionIndex(null, 'prev'));
    onPrev();
  }, [dispatch, onPrev]);

  return (
    <div className={styles.buttonsBlock}>
      <div className={styles.buttonsBlockWrapper}>
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
      </div>
    </div>
  );
};

export default ButtonsBlock;
