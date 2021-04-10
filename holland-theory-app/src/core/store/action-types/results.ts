import { OccupationCategories } from "../../constants/occupation";

export enum ResultsActionTypes {
  UpdateResults = '[Results] UpdateResults',
}

export interface UpdateResultsActionType {
  type: ResultsActionTypes.UpdateResults,
  payload: { occupationKey: OccupationCategories, value: number },
}

export type ResultActionType = UpdateResultsActionType;
