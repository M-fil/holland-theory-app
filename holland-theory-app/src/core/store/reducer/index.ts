import { QuestionEntity } from '../../interfaces/question';
import { QuestionsActionTypes } from '../action-types/questions';
import { ResultsActionTypes } from '../action-types/results';
import { MainActionType } from '../action-types';
import { AnswerEntity } from '../../interfaces/answer';
import { OccupationCategories } from '../../constants/occupation';
import { SectionEntity } from '../../interfaces/sections';
import { DefaultSections } from '../../constants/sections';
import { CareerEntity } from '../../interfaces/careers';

export interface State {
  questions: QuestionEntity[];
  nextQuestionsLink: string;
  totalNumberOfQuestions: number;
  answerVariants: AnswerEntity[];
  currentQuestionIndex: number;
  nextQuestionIndex: number,
  isAllQuestionsWereLoaded: boolean,
  results: {
    [prop in OccupationCategories]: number;
  },
  resultsSections: {
    currentSectionIndex: number,
    sections: SectionEntity[],
  },
  isTestFinished: boolean,
  selectedJobZone: number,
  resultCareers: CareerEntity[],
}

export const initialState: State = {
  questions: [],
  nextQuestionsLink: '',
  totalNumberOfQuestions: 0,
  answerVariants: [],
  currentQuestionIndex: 0,
  nextQuestionIndex: 1,
  isAllQuestionsWereLoaded: false,
  results: {
    Realistic: 0,
    Investigative: 0,
    Artistic: 0,
    Social: 0,
    Enterprising: 0,
    Conventional: 0,
  },
  resultsSections: {
    currentSectionIndex: 0,
    sections: DefaultSections,
  },
  isTestFinished: false,
  selectedJobZone: 1,
  resultCareers: [],
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
    case QuestionsActionTypes.SetCurrentQuestion: {
      const { currentQuestionIndex } = action.payload;
      const { totalNumberOfQuestions } = state;

      return {
        ...state,
        currentQuestionIndex: Math.min(currentQuestionIndex, totalNumberOfQuestions - 1),
      };
    }
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
    case QuestionsActionTypes.UpdateQuestions: {
      const { questions: newQuestions, nextQuestionsLink } = action.payload;
      const { totalNumberOfQuestions, questions } = state;

      return {
        ...state,
        questions: [
          ...state.questions,
          ...newQuestions,
        ],
        nextQuestionsLink,
        isAllQuestionsWereLoaded: totalNumberOfQuestions === questions.length,
      };
    }
    case ResultsActionTypes.UpdateResults: {
      const { occupationKey, value } = action.payload;
      const currentOccupationValue = state.results[occupationKey];

      console.log('occupationKey', occupationKey);

      return {
        ...state,
        results: {
          ...state.results,
          [occupationKey]: currentOccupationValue + value,
        },
      };
    }
    case ResultsActionTypes.SetIsTestFinished:
      return {
        ...state,
        isTestFinished: action.payload.isFinished,
      };
    case ResultsActionTypes.UpdateCurrentResultSectionIndex: {
      const { value, switchTo } = action.payload;
      const { currentSectionIndex, sections } = state.resultsSections;

      if (switchTo) {
        return {
          ...state,
          resultsSections: {
            ...state.resultsSections,
            currentSectionIndex: switchTo === 'next'
              ? Math.min(currentSectionIndex + 1, sections.length - 1)
              : Math.max(currentSectionIndex - 1, 0),
          },
        };
      }

      return {
        ...state,
        resultsSections: {
          ...state.resultsSections,
          currentSectionIndex: value || 0,
        },
      };
    };
    case ResultsActionTypes.SelectJobZone:
      return {
        ...state,
        selectedJobZone: action.payload.value,
      };
    case ResultsActionTypes.SetFinalCareers:
      return {
        ...state,
        resultCareers: action.payload.careers,
      };
    default:
      return state;
  }
};
