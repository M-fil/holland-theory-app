import React, { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { QuestionEntity } from '../../core/interfaces/question';

import { onetWebService } from '../../core/services/onet-web';
import { StoreContext } from '../../core/store';
import * as QuestionActions from '../../core/store/actions/questions';

interface QuestionsQueryResult {
  question: QuestionEntity[],
}

const MainPage: React.FC = () => {
  const [t] = useTranslation();
  const { state, dispatch } = useContext(StoreContext);

  useEffect(() => {
    console.log(state.questions)
  }, [state.questions]);

  useEffect(() => {
    onetWebService.makeRequest<QuestionsQueryResult>('mpp/interestprofiler/questions')
      .then((result) => {
        console.log('result.data', result.data);
        dispatch(QuestionActions.setQuestionsActions(result.data?.question || []));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  return (
    <div>
      {t('title')}
    </div>
  )
}

export default MainPage
