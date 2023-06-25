export default async function sendFileToCrowdin(
  formatedFields: object,
  crowdinProjectId: string,
  crowdinApiKey: string,
  recordID: string,
  sourceLocale: string
) {
  const {
    data: { id: storageId },
  } = await (
    await fetch('https://api.crowdin.com/api/v2/storages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${crowdinApiKey}`,
        'Crowdin-API-FileName': `record${recordID}Source${sourceLocale}.json`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formatedFields, null, 2),
    })
  ).json();

  await fetch(
    `https://api.crowdin.com/api/v2/projects/${crowdinProjectId}/files`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${crowdinApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          storageId,
          name: `record${recordID}Source${sourceLocale}.json`,
        },
        null,
        2
      ),
    }
  );
}
