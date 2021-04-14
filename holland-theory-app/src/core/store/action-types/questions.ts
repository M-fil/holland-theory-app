import { AnswerEntity } from '../../interfaces/answer';
import { QuestionEntity } from '../../interfaces/question';

export enum QuestionsActionTypes {
  SetQuestionsData = '[Questions] SetQuestionsData',
  SetQuestions = '[Questions] SetQuestions',
  SetCurrentQuestion = '[Questions] SetCurrentQuestion',
  SetAnswerForQuestion = '[Questions] SetAnswerForQuestion',
  SetNextQuestionIndex = '[Question] SetNextQuestionIndex',
  UpdateQuestions = '[Question] UpdateQuestions',
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

export interface SetAnswerForQuestionActionType {
  type: QuestionsActionTypes.SetAnswerForQuestion,
  payload: { answerValue: number, questionIndex: number },
}

export interface SetNextQuestionIndexActionType {
  type: QuestionsActionTypes.SetNextQuestionIndex,
}

export interface UpdateQuestionsActionType {
  type: QuestionsActionTypes.UpdateQuestions,
  payload: { questions: QuestionEntity[], nextQuestionsLink: string },
}

export type QuestionActionType = SetQuestionsDataActionType
  | SetQuestionsActionType
  | SetCurrentQuestionActionType
  | SetAnswerForQuestionActionType
  | SetNextQuestionIndexActionType
  | UpdateQuestionsActionType;
