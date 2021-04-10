import { OccupationCategories } from '../constants/occupation';

export interface QuestionEntity {
  index: number;
  text: string;
  area: OccupationCategories;
  answerValue: number,
}
