import './styles.scss';
import React from 'react';

import ChartBlock from './components/Chart';
import LinksList from './components/LinksList';

const ResultsModule: React.FC = () => {
  return (
    <div className='results-module'>
      <div className='results-module__wrapper'>
        <div className='results-module__chart-container'>
          <ChartBlock />
        </div>
        <LinksList />
      </div>
    </div>
  );
};

export default ResultsModule;
