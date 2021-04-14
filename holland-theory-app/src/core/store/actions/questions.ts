import { AnswerEntity } from '../../interfaces/answer';
import { QuestionEntity } from '../../interfaces/question';
import { QuestionActionType, QuestionsActionTypes } from '../action-types/questions';

export const setQuestionsDataAction = (
  nextQuestionsLink: string, totalNumberOfQuestions: number, answerVariants: AnswerEntity[],
): QuestionActionType => ({
  type: QuestionsActionTypes.SetQuestionsData,
  payload: { nextQuestionsLink, totalNumberOfQuestions, answerVariants },
});

export const setQuestionsAction = (
  questions: QuestionEntity[],
): QuestionActionType => ({
  type: QuestionsActionTypes.SetQuestions,
  payload: { questions },
});

export const setCurrentQuestionIndexAction = (
  currentQuestionIndex: number,
): QuestionActionType => ({
  type: QuestionsActionTypes.SetCurrentQuestion,
  payload: { currentQuestionIndex }
});

export const setAnswerForQuestionAction = (
  answerValue: number, questionIndex: number,
): QuestionActionType => ({
  type: QuestionsActionTypes.SetAnswerForQuestion,
  payload: { answerValue, questionIndex },
});

export const setNextQuestionIndexAction = (): QuestionActionType => ({
  type: QuestionsActionTypes.SetNextQuestionIndex,
});

export const updateQuestionsAction = (
  questions: QuestionEntity[], nextQuestionsLink: string,
): QuestionActionType => ({
  type: QuestionsActionTypes.UpdateQuestions,
  payload: { questions, nextQuestionsLink },
});
