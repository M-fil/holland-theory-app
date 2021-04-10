import { QuestionEntity } from '../../interfaces/question';
import { QuestionsActionTypes } from '../action-types/questions';
import { MainActionType } from '../action-types';
import { AnswerEntity } from '../../interfaces/answer';

export interface State {
  questions: QuestionEntity[];
  nextQuestionsLink: string;
  totalNumberOfQuestions: number;
  answerVariants: AnswerEntity[];
  currentQuestionIndex: number;
}

export const initialState: State = {
  questions: [],
  nextQuestionsLink: '',
  totalNumberOfQuestions: 0,
  answerVariants: [],
  currentQuestionIndex: 0,
};

export const mainReducer = (state: State = initialState, action: MainActionType): State  => {
  switch(action.type) {
    case QuestionsActionTypes.SetQuestionsData:
      return {
        ...state,
        nextQuestionsLink: action.payload.nextQuestionsLink,
        totalNumberOfQuestions: action.payload.totalNumberOfQuestions,
        answerVariants: action.payload.answerVariants,
      };
    case QuestionsActionTypes.SetQuestions:
      return {
        ...state,
        questions: action.payload.questions,
      };
    case QuestionsActionTypes.SetCurrentQuestion:
      return {
        ...state,
        currentQuestionIndex: action.payload.currentQuestionIndex,
      };
    default:
      return state;
  }
};
