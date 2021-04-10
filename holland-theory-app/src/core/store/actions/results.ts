import { OccupationCategories } from '../../constants/occupation';
import { ResultActionType, ResultsActionTypes } from '../action-types/results';

export const updateResultsAction = (
  occupationKey: OccupationCategories, value: number,
): ResultActionType => ({
  type: ResultsActionTypes.UpdateResults,
  payload: { occupationKey, value },
});