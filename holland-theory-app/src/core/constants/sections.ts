import { SectionEntity } from '../interfaces/sections';

export enum SectionIndexes {
  Results = 0,
  JobZones = 1,
  JobsList = 2,
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
    key: 'jobs-list',
    index: SectionIndexes.JobsList,
  },
];
