import { Button } from 'datocms-react-ui';
import type { ProgressObject } from '../utils/types';
import s from '../entrypoints/styles.module.css';
import handleDeleteFile from '../utils/handleDeleteFile';
import type { Modal } from 'datocms-plugin-sdk';

type PropTypes = {
  isLoading: boolean;
  crowdinIsSetup: boolean;
  fileWasSubmited: boolean;
  localeProgresses: ProgressObject;
  currentLocale: string;
  openModal: (modal: Modal) => Promise<unknown>;
  notice: (message: string) => Promise<void>;
  setFileWasSubmited: React.Dispatch<React.SetStateAction<boolean>>;
  setLocaleProgresses: React.Dispatch<React.SetStateAction<ProgressObject>>;
  crowdinApiKey: string;
  projectID: string;
  recordID: string;
  sourceLocale: string;
};

const DeleteFileButton = ({
  isLoading,
  crowdinIsSetup,
  fileWasSubmited,
  localeProgresses,
  currentLocale,
  openModal,
  notice,
  setFileWasSubmited,
  setLocaleProgresses,
  crowdinApiKey,
  projectID,
  recordID,
  sourceLocale,
}: PropTypes) => {
  return (
    <>
      {!isLoading &&
        crowdinIsSetup &&
        fileWasSubmited &&
        currentLocale === sourceLocale && (
          <div className={s.currentLocaleContainer}>
            <p>This was the locale sent for translation as a source</p>
            <p>Change locales to see their respective status on crowdin</p>
            <Button
              onClick={() => {
                handleDeleteFile(
                  openModal,
                  notice,
                  setFileWasSubmited,
                  setLocaleProgresses,
                  crowdinApiKey,
                  projectID,
                  recordID
                );
              }}
              buttonType="muted"
            >
              Delete translation file
            </Button>
          </div>
        )}
    </>
  );
};

export default DeleteFileButton;
