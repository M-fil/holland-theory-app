import { AnswerEntity } from '../../interfaces/answer';
import { QuestionEntity } from '../../interfaces/question';

export enum QuestionsActionTypes {
  SetQuestionsData = '[Questions] SetQuestionsData',
  SetQuestions = '[Questions] SetQuestions',
  SetCurrentQuestion = '[Questions] SetCurrentQuestion',
}

export interface SetQuestionsDataActionType {
  type: QuestionsActionTypes.SetQuestionsData;
  payload: {
    nextQuestionsLink: string,
    totalNumberOfQuestions: number,
    answerVariants: AnswerEntity[],
  };
}

export interface SetQuestionsActionType {
  type: QuestionsActionTypes.SetQuestions;
  payload: { questions: QuestionEntity[] };
}

export interface SetCurrentQuestionActionType {
  type: QuestionsActionTypes.SetCurrentQuestion;
  payload: { currentQuestionIndex: number };
}

export type QuestionActionType = SetQuestionsDataActionType
  | SetQuestionsActionType
  | SetCurrentQuestionActionType;
