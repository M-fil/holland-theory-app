import { OccupationCategories } from "../constants/occupation";

export interface JobZoneEntity {
  title: string,
  href: string,
  value: number,
  education: string,
  experience: string,
  training: string,
}

export interface OccupationCategoryDescription {
  area: OccupationCategories,
  description: string
}
