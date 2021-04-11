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

export const updateCurrentResultsSectionIndex = (
  value?: number | null, switchTo?: 'prev' | 'next',
): ResultActionType => ({
  type: ResultsActionTypes.UpdateCurrentResultSectionIndex,
  payload: { switchTo, value }
});

export const selectJobZoneAction = (value: number): ResultActionType => ({
  type: ResultsActionTypes.SelectJobZone,
  payload: { value },
})
