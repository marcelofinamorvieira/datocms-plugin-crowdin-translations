import type { RenderItemFormSidebarPanelCtx } from 'datocms-plugin-sdk';
import cleanupFormValues from '../utils/cleanupFormValues';
import sendFileToCrowdin from '../utils/sendFileToCrowdin';
import { Button } from 'datocms-react-ui';
import type { FieldPreferences, ProgressObject } from '../utils/types';
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

interface FormValues {
  internalLocales: Array<string>;
  [key: string]: unknown;
}

async function handleSendRecord(
  crowdinProjectId: string,
  crowdinApiKey: string,
  formValues: FormValues,
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
            // Check if formValues has internalLocales property
            const formValues = ctx.formValues as Record<string, unknown>;
            const locales = Array.isArray(formValues.internalLocales) 
              ? formValues.internalLocales 
              : [];
            
            // Check if ctx.item and ctx.item.id exist
            if (!ctx.item?.id) {
              console.error('Record ID is missing');
              setIsLoading(false);
              return;
            }
              
            handleSendRecord(
              ctx.plugin.attributes.parameters.crowdinProjectId as string,
              ctx.plugin.attributes.parameters.crowdinApiKey as string,
              { ...formValues, internalLocales: locales } as FormValues,
              ctx.item.id,
              ctx.locale,
              ctx.plugin.attributes.parameters
                .crowdinFieldPreferences as FieldPreferences,
              setFileWasSubmited,
              setLocaleProgresses,
              locales,
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
