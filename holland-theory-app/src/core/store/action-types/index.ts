import { QuestionActionType } from './questions';
import { ResultActionType } from './results';

export type MainActionType = QuestionActionType
  | ResultActionType;
