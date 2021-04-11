import './styles.scss';
import React, { useCallback, useContext, useMemo } from 'react';
import { SectionIndexes } from '../../core/constants/sections';
import { StoreContext } from '../../core/store';

import JobSelectionModule from '../../modules/JobSelectionModule';
import ResultsModule from '../../modules/ResultsModule';
import ButtonsBlock from '../../core/components/ButtonsBlock';

const ResultsPage: React.FC = () => {
  const { resultsSections } = useContext(StoreContext).state;
  const currentSectionIndex = useMemo(() => resultsSections.currentSectionIndex, [resultsSections.currentSectionIndex]);

  const renderSpecificBlock = useCallback(() => {
    switch (currentSectionIndex) {
      case SectionIndexes.Results:
      default:
        return (
          <ResultsModule />
        );
      case SectionIndexes.JobZones:
        return (
          <JobSelectionModule />
        );
    }
  }, [currentSectionIndex]);

  return (
    <div className='results-page'>
      <div className='results-page__wrapper'>
        <div className='results-page__main-block'>
          <div className='results-page__content'>
            {renderSpecificBlock()}
          </div>
          <ButtonsBlock />
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
