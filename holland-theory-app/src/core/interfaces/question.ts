export type OccupationCategory = 'Realistic' | 'Investigative' | 'Artistic' | 'Social' | 'Enterprising' | 'Conventional';

export interface QuestionEntity {
  index: number;
  text: string;
  area: OccupationCategory;
  answerValue: number,
}
