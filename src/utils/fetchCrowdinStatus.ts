import { ProgressObject } from './types';

export default async function fetchCrowdinStatus(
  projectID: string,
  recordID: string,
  crowdinApiKey: string,
  localesInThisRecord: Array<string>,
  setSourceLocale: React.Dispatch<React.SetStateAction<string[]>>
) {
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
  ).json();

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
  ).json();

  const progressObject: ProgressObject = {};

  fileProgressResponse.data.map((progress: any) => {
    if (localesInThisRecord.includes(progress.data.languageId)) {
      progressObject[progress.data.languageId] = progress.data.phrases;
    }
  });

  return progressObject;
}
