import { OccupationCategories } from "../../constants/occupation";

export enum ResultsActionTypes {
  UpdateResults = '[Results] UpdateResults',
  SetIsTestFinished = '[Results] SetIsTestFinished',
}

export interface UpdateResultsActionType {
  type: ResultsActionTypes.UpdateResults,
  payload: { occupationKey: OccupationCategories, value: number },
}

export interface SetIsTestFinishedActionType {
  type: ResultsActionTypes.SetIsTestFinished,
  payload: { isFinished: boolean },
}

export type ResultActionType = UpdateResultsActionType
  | SetIsTestFinishedActionType;
