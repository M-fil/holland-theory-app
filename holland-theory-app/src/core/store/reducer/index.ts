import { QuestionEntity } from '../../interfaces/question';
import { QuestionsActionTypes } from '../action-types/questions';
import { MainActionType } from '../action-types';

export interface State {
  questions: QuestionEntity[];
}

export const initialState: State = {
  questions: [],
};

export const mainReducer = (state: State = initialState, action: MainActionType): State  => {
  switch(action.type) {
    case QuestionsActionTypes.SetQuestions:
      return {
        ...state,
        questions: action.payload.questions,
      };
    default:
      return state;
  }
};
