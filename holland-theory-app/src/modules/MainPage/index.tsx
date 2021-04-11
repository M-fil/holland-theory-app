import React, { useContext } from 'react';

import { StoreContext } from '../../core/store';
import QuestionModule from '../QuestionModule';
import ResultsModule from '../ResultsModule';

const MainPage: React.FC = () => {
  const { isTestFinished } = useContext(StoreContext).state;

  return (
    <main>
      {!isTestFinished ? (
        <ResultsModule />
      ) : (
        <QuestionModule />
      )}
    </main>
  );
};

export default MainPage;
