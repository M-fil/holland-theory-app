import { Urls } from '../constants/urls';
import { JobZoneEntity, OccupationCategoryDescription } from '../interfaces/jobs';
import { onetWebService } from './onet-web';

interface JobZonesQueryResult {
  job_zone: JobZoneEntity[],
}

interface OccupationCategoriesQueryResult {
  result: OccupationCategoryDescription[],
}

export const getAllJobZones = async (): Promise<JobZoneEntity[] | null> => {
  try {
    const result = await onetWebService.makeRequest<JobZonesQueryResult>(Urls.JobZones);
    if (result.data) {
      return result.data.job_zone;
    }

    return [];
  } catch {
    return null;
  }
};

export const getOccupationCategoriesDescriptions = async (): Promise<
  OccupationCategoryDescription[] | null
> => {
  try {
    const result = await onetWebService.makeRequest<OccupationCategoriesQueryResult>(
      Urls.OccupationCategoriesDescriptions,
    );
    if (result.data) {
      return result.data.result;
    }

    return [];
  } catch {
    return null;
  }
};
