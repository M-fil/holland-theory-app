import { OccupationCategories } from "../../constants/occupation";
import { CareerEntity } from "../../interfaces/careers";

export enum ResultsActionTypes {
  UpdateResults = '[Results] UpdateResults',
  SetIsTestFinished = '[Results] SetIsTestFinished',
  UpdateCurrentResultSectionIndex = '[Results] UpdateCurrentResultSectionIndex',
  SelectJobZone = '[Results] SelectJobZone',
  SetFinalCareers = '[Results] SetFinalCareers',
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

export interface SetFinalCareersActionType {
  type: ResultsActionTypes.SetFinalCareers,
  payload: { careers: CareerEntity[] },
}

export type ResultActionType = UpdateResultsActionType
  | SetIsTestFinishedActionType
  | UpdateCurrentResultSectionIndexActionType
  | SelectJobZoneActionType
  | SetFinalCareersActionType;
