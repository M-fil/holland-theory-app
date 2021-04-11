import { OccupationCategories } from "../../constants/occupation";

export enum ResultsActionTypes {
  UpdateResults = '[Results] UpdateResults',
  SetIsTestFinished = '[Results] SetIsTestFinished',
  UpdateCurrentResultSectionIndex = '[Results] UpdateCurrentResultSectionIndex',
  SelectJobZone = '[Results] SelectJobZone',
}

export interface UpdateResultsActionType {
  type: ResultsActionTypes.UpdateResults,
  payload: { occupationKey: OccupationCategories, value: number },
}

export interface SetIsTestFinishedActionType {
  type: ResultsActionTypes.SetIsTestFinished,
  payload: { isFinished: boolean },
}

export interface UpdateCurrentResultSectionIndexActionType {
  type: ResultsActionTypes.UpdateCurrentResultSectionIndex,
  payload: { value?: number | null, switchTo?: 'next' | 'prev' },
}

export interface SelectJobZoneActionType {
  type: ResultsActionTypes.SelectJobZone,
  payload: { value: number },
}

export type ResultActionType = UpdateResultsActionType
  | SetIsTestFinishedActionType
  | UpdateCurrentResultSectionIndexActionType
  | SelectJobZoneActionType;
