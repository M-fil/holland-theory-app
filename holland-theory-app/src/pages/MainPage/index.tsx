import React, { useContext } from 'react';

import { StoreContext } from '../../core/store';
import QuestionModule from '../../modules/QuestionModule';
import ResultsPage from '../ResultsPage';

const MainPage: React.FC = () => {
  const { isTestFinished } = useContext(StoreContext).state;

  return (
    <>
      {!isTestFinished ? (
        <ResultsPage />
      ) : (
        <QuestionModule />
      )}
    </>
  );
};

export default MainPage;
