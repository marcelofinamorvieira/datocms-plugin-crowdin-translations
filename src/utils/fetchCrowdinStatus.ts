import type { ProgressObject } from './types';

/**
 * Type definition for Crowdin file data
 */
interface CrowdinFileData {
  id: string;
  name: string;
  [key: string]: unknown;
}

/**
 * Type definition for Crowdin file response
 */
interface CrowdinFileResponse {
  data: Array<{
    data: CrowdinFileData;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}

/**
 * Type definition for progress data from Crowdin
 */
interface ProgressData {
  languageId: string;
  phrases: {
    translated: number;
    approved: number;
    total: number;
  };
  [key: string]: unknown;
}

/**
 * Type definition for Crowdin progress response
 */
interface CrowdinProgressResponse {
  data: Array<{
    data: ProgressData;
    [key: string]: unknown;
  }>;
  [key: string]: unknown;
}

/**
 * Fetches the translation status from Crowdin for a specific record
 * @param projectID Crowdin project ID
 * @param recordID Record ID in the CMS
 * @param crowdinApiKey API key for Crowdin authentication
 * @param localesInThisRecord Array of locale codes in this record
 * @param setSourceLocale React setState function to update source locale
 * @returns A progress object or null if file doesn't exist
 */
export default async function fetchCrowdinStatus(
  projectID: string,
  recordID: string,
  crowdinApiKey: string,
  localesInThisRecord: Array<string>,
  setSourceLocale: React.Dispatch<React.SetStateAction<string[]>>
): Promise<ProgressObject | null> {
  const fileIDResponse = await (
    await fetch(
      `https://api.crowdin.com/api/v2/projects/${projectID}/files?filter=record${recordID}Source`,
      {
        headers: {
          Authorization: `Bearer ${crowdinApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    )
  ).json() as CrowdinFileResponse;

  if (!fileIDResponse.data.length) return null;

  const fileID = fileIDResponse.data[0].data.id;

  const sourceArray = fileIDResponse.data[0].data.name.split('Source');

  setSourceLocale([sourceArray[sourceArray.length - 1].split('.json')[0]]);

  const fileProgressResponse = await (
    await fetch(
      `https://api.crowdin.com/api/v2/projects/${projectID}/files/${fileID}/languages/progress`,
      {
        headers: {
          Authorization: `Bearer ${crowdinApiKey}`,
          'Content-Type': 'application/json',
        },
      }
    )
  ).json() as CrowdinProgressResponse;

  const progressObject: ProgressObject = {};

  // Process each progress item and add to progressObject if locale is included
  for (const progress of fileProgressResponse.data) {
    if (localesInThisRecord.includes(progress.data.languageId)) {
      progressObject[progress.data.languageId] = progress.data.phrases;
    }
  }

  return progressObject;
}
