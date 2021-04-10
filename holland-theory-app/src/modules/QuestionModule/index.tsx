import React, { useContext, useEffect } from 'react';

import { StoreContext } from '../../core/store';
import * as QuestionActions from '../../core/store/actions/questions';
import * as QuestionService from '../../core/services/questions';
import CurrentQuestionBlock from './components/CurrentQuestionBlock';
import QuestionsList from './components/QuestionsList';

const QuestionModule: React.FC = () => {
  const { dispatch } = useContext(StoreContext);

  useEffect(() => {
    const getQuestions = async () => {
      const data = await QuestionService.getQuestions();
      if (data) {
        const { questions, nextQuestionsLink, totalNumberOfQuestions, answerVariants } = data;
        dispatch(QuestionActions.setQuestionsAction(questions));
        dispatch(QuestionActions.setQuestionsDataAction(
          nextQuestionsLink, totalNumberOfQuestions, answerVariants,
        ));
      }
    };

    getQuestions();
  }, [dispatch]);

  return (
    <div>
      <CurrentQuestionBlock />
      <QuestionsList />
    </div>
  );
};

export default QuestionModule;
