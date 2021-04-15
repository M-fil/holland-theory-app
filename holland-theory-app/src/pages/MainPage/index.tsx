import './styles.scss';
import React, { useContext } from 'react';

import { StoreContext } from '../../core/store';
import QuestionModule from '../../modules/QuestionModule';
import ResultsPage from '../ResultsPage';
import HeaderModule from '../../modules/HeaderModule';
import FooterModule from '../../modules/FooterModule';
import MainContainer from '../../core/components/MainContainer';

const MainPage: React.FC = () => {
  const { isTestFinished } = useContext(StoreContext).state;

  return (
    <MainContainer>
      <HeaderModule />
      <main id='main-block'>
        {isTestFinished ? (
          <ResultsPage />
        ) : (
          <QuestionModule />
        )}
      </main>
      <FooterModule />
    </MainContainer>
  );
};

export default MainPage;
