import { OccupationCategories } from '../../constants/occupation';
import { ResultActionType, ResultsActionTypes } from '../action-types/results';

export const updateResultsAction = (
  occupationKey: OccupationCategories, value: number,
): ResultActionType => ({
  type: ResultsActionTypes.UpdateResults,
  payload: { occupationKey, value },
});

export const setIsTestFinishedAction = (
  isFinished: boolean,
): ResultActionType => ({
  type: ResultsActionTypes.SetIsTestFinished,
  payload: { isFinished },
});
