import type { Modal } from 'datocms-plugin-sdk';
import type { ProgressObject } from './types';

export default async function handleDeleteFile(
  openModal: (modal: Modal) => Promise<unknown>,
  notice: (message: string) => Promise<void>,
  setFileWasSubmited: React.Dispatch<React.SetStateAction<boolean>>,
  setLocaleProgresses: React.Dispatch<React.SetStateAction<ProgressObject>>,
  crowdinApiKey: string,
  projectID: string,
  recordID: string
) {
  const confirmedDeletion = await openModal({
    id: 'deletionConfirmation',
    title: 'Are you sure you want to delete the file?',
    width: 's',
  });

  if (!confirmedDeletion) {
    return;
  }

  setFileWasSubmited(false);
  setLocaleProgresses({});
  notice('Translation file deleted successfully');

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

  const fileID = fileIDResponse.data[0].data.id;

  await fetch(
    `https://api.crowdin.com/api/v2/projects/${projectID}/files/${fileID}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${crowdinApiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );
}
