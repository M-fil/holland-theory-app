import { AnswerEntity } from '../../interfaces/answer';
import { QuestionEntity } from '../../interfaces/question';
import { QuestionActionType, QuestionsActionTypes } from '../action-types/questions';

export const setQuestionsDataAction = (
  nextQuestionsLink: string, totalNumberOfQuestions: number, answerVariants: AnswerEntity[],
): QuestionActionType => ({
  type: QuestionsActionTypes.SetQuestionsData,
  payload: { nextQuestionsLink, totalNumberOfQuestions, answerVariants },
});

export const setQuestionsAction = (questions: QuestionEntity[]) => ({
  type: QuestionsActionTypes.SetQuestions,
  payload: { questions },
});
