import { QuestionEntity } from '../../interfaces/question';
import { QuestionsActionTypes } from '../action-types/questions';
import { ResultsActionTypes } from '../action-types/results';
import { MainActionType } from '../action-types';
import { AnswerEntity } from '../../interfaces/answer';
import { OccupationCategories } from '../../constants/occupation';

export interface State {
  questions: QuestionEntity[];
  nextQuestionsLink: string;
  totalNumberOfQuestions: number;
  answerVariants: AnswerEntity[];
  currentQuestionIndex: number;
  nextQuestionIndex: number,
  results: {
    [prop in OccupationCategories]: number;
  },
}

export const initialState: State = {
  questions: [],
  nextQuestionsLink: '',
  totalNumberOfQuestions: 0,
  answerVariants: [],
  currentQuestionIndex: 0,
  nextQuestionIndex: 1,
  results: {
    Realistic: 0,
    Investigative: 0,
    Artistic: 0,
    Social: 0,
    Enterprising: 0,
    Conventional: 0,
  },
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
      const targetQuestions = state.questions;
      if (targetQuestions[questionIndex]) {
        targetQuestions[questionIndex] = {
          ...targetQuestions[questionIndex],
          answerValue,
        };
      }

      return {
        ...state,
        questions: targetQuestions,
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
    };
    case ResultsActionTypes.UpdateResults: {
      const { occupationKey, value } = action.payload;
      const currentOccupationValue = state.results[occupationKey];

      return {
        ...state,
        results: {
          ...state.results,
          [occupationKey]: currentOccupationValue + value,
        },
      };
    }
    default:
      return state;
  }
};
