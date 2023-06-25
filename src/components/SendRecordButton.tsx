import { RenderItemFormSidebarPanelCtx } from 'datocms-plugin-sdk';
import cleanupFormValues from '../utils/cleanupFormValues';
import sendFileToCrowdin from '../utils/sendFileToCrowdin';
import { Button } from 'datocms-react-ui';
import { FieldPreferences, ProgressObject } from '../utils/types';
import fetchCrowdinStatus from '../utils/fetchCrowdinStatus';

type PropTypes = {
  ctx: RenderItemFormSidebarPanelCtx;
  setFileWasSubmited: React.Dispatch<React.SetStateAction<boolean>>;
  setLocaleProgresses: React.Dispatch<React.SetStateAction<ProgressObject>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  crowdinIsSetup: boolean;
  fileWasSubmited: boolean;
  setSourceLocale: React.Dispatch<React.SetStateAction<string[]>>;
};

async function handleSendRecord(
  crowdinProjectId: string,
  crowdinApiKey: string,
  formValues: any,
  recordID: string,
  currentLocale: string,
  fieldPreferences: FieldPreferences,
  setFileWasSubmited: React.Dispatch<React.SetStateAction<boolean>>,
  setLocaleProgresses: React.Dispatch<React.SetStateAction<ProgressObject>>,
  localeList: Array<string>,
  setSourceLocale: React.Dispatch<React.SetStateAction<string[]>>
) {
  const usedLocales = formValues.internalLocales; // to specify to crowdin which locales this file should be translated to

  const cleanValues = cleanupFormValues(
    formValues,
    currentLocale,
    fieldPreferences
  );

  await sendFileToCrowdin(
    cleanValues,
    crowdinProjectId,
    crowdinApiKey,
    recordID,
    currentLocale
  );

  await fetchCrowdinStatus(
    crowdinProjectId,
    recordID,
    crowdinApiKey,
    localeList as Array<string>,
    setSourceLocale
  ).then((response) => {
    if (response) {
      setFileWasSubmited(true);
      setLocaleProgresses(response);
    }
  });
}

const SendRecordButton: React.FC<PropTypes> = ({
  ctx,
  setFileWasSubmited,
  setLocaleProgresses,
  setIsLoading,
  isLoading,
  crowdinIsSetup,
  fileWasSubmited,
  setSourceLocale,
}) => {
  return (
    <>
      {!isLoading && crowdinIsSetup && !fileWasSubmited && (
        <Button
          onClick={() => {
            setIsLoading(true);
            handleSendRecord(
              ctx.plugin.attributes.parameters.crowdinProjectId as string,
              ctx.plugin.attributes.parameters.crowdinApiKey as string,
              ctx.formValues,
              ctx.item!.id,
              ctx.locale,
              ctx.plugin.attributes.parameters
                .crowdinFieldPreferences as FieldPreferences,
              setFileWasSubmited,
              setLocaleProgresses,
              ctx.formValues.internalLocales as Array<string>,
              setSourceLocale
            ).then(() => {
              setIsLoading(false);
            });
          }}
        >
          Send current locale to crowdin
        </Button>
      )}
    </>
  );
};

export default SendRecordButton;
