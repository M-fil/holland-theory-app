import { QuestionEntity } from '../../interfaces/question';

export enum QuestionsActionTypes {
  SetQuestions = '[Questions] SetQuestions',
}

export interface SetQuestionsActionType {
  type: QuestionsActionTypes.SetQuestions;
  payload: { questions: QuestionEntity[] };
}

export type QuestionActionType = SetQuestionsActionType;
