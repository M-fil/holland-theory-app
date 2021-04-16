import { SectionEntity } from '../interfaces/sections';

export enum SectionIndexes {
  Results = 0,
  JobZones = 1,
  CareersList = 2,
  RestartTest = 3,
}

export const DefaultSections: SectionEntity[] = [
  {
    key: 'results',
    index: SectionIndexes.Results,
  },
  {
    key: 'job-zones',
    index: SectionIndexes.JobZones,
  },
  {
    key: 'careers-list',
    index: SectionIndexes.CareersList,
  },
  {
    key: 'restart-test',
    index: SectionIndexes.RestartTest,
  },
];
