import './styles.scss';
import React, { useState, useMemo } from 'react';

import ChartBlock from './components/Chart';
import LinksList from './components/LinksList';
import { OccupationCategories } from '../../core/constants/occupation';
import { ResultsContext } from './constants/context';

const ResultsModule: React.FC = () => {
  const [highlightedColor, setHighlightedColor] = useState<OccupationCategories | null>(null);
  const contextValue = useMemo(() => ({
    highlightedColor,
    setHighlightedColor,
  }), [highlightedColor, setHighlightedColor]);

  return (
    <ResultsContext.Provider value={contextValue}>
      <div className='results-module'>
        <div className='results-module__wrapper'>
          <div className='results-module__chart-container'>
            <ChartBlock />
          </div>
          <LinksList />
        </div>
      </div>
    </ResultsContext.Provider>
  );
};

export default ResultsModule;
