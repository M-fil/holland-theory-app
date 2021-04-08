import { QuestionEntity } from '../../interfaces/question';
import { QuestionActionType, QuestionsActionTypes } from '../action-types/questions';

export const setQuestionsActions = (questions: QuestionEntity[]): QuestionActionType => ({
  type: QuestionsActionTypes.SetQuestions,
  payload: { questions },
});
