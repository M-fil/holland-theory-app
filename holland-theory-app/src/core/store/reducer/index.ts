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
  nextQuestionIndex: number,
}

export const initialState: State = {
  questions: [],
  nextQuestionsLink: '',
  totalNumberOfQuestions: 0,
  answerVariants: [],
  currentQuestionIndex: 0,
  nextQuestionIndex: 0,
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
    case QuestionsActionTypes.SetAnswerForQuestion: {
      const { answerValue, questionIndex } = action.payload;
      let targetQuestion = state.questions[questionIndex];
      if (targetQuestion) {
        targetQuestion = {
          ...targetQuestion,
          answerValue,
        };
      }
      return {
        ...state,
      };
    }
    case QuestionsActionTypes.SetNextQuestionIndex: {
      const isLastQuestion =  (state.currentQuestionIndex + 1) > state.totalNumberOfQuestions;

      return {
        ...state,
        nextQuestionIndex: isLastQuestion
          ? state.nextQuestionIndex
          : state.nextQuestionIndex + 1,
      };
    }
    default:
      return state;
  }
};
