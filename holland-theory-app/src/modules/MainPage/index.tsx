import React, { useContext } from 'react';

import { StoreContext } from '../../core/store';
import QuestionModule from '../QuestionModule';
import JobSelectionModule from '../JobSelectionModule';

const MainPage: React.FC = () => {
  const { isTestFinished } = useContext(StoreContext).state;

  return (
    <main>
      {!isTestFinished ? (
        <JobSelectionModule />
      ) : (
        <QuestionModule />
      )}
    </main>
  );
};

export default MainPage;
