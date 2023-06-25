import { RenderItemFormSidebarPanelCtx } from 'datocms-plugin-sdk';
import { Button, Canvas, Spinner } from 'datocms-react-ui';
import { useEffect, useState } from 'react';
import SendRecordButton from '../components/SendRecordButton';
import { ProgressObject } from '../utils/types';
import fetchCrowdinStatus from '../utils/fetchCrowdinStatus';
import 'react-circular-progressbar/dist/styles.css';
import FetchLocaleButton from '../components/FetchLocaleButton';
import LoadingSpinner from '../components/LoadingSpinner';
import DeleteFileButton from '../components/DeleteFileButton';
import s from './styles.module.css';

type PropTypes = {
  ctx: RenderItemFormSidebarPanelCtx;
};

export default function CrowdinSidebar({ ctx }: PropTypes) {
  const crowdinIsSetup = !!(
    ctx.plugin.attributes.parameters.crowdinApiKey &&
    ctx.plugin.attributes.parameters.crowdinProjectId
  );
  const [isLoading, setIsLoading] = useState(true);
  const [fileWasSubmited, setFileWasSubmited] = useState(false);
  const [localeProgresses, setLocaleProgresses] = useState<ProgressObject>({});
  const [sourceLocale, setSourceLocale] = useState(['']);

  const recordID = ctx.item?.id || '';

  useEffect(() => {
    if (recordID && crowdinIsSetup)
      fetchCrowdinStatus(
        ctx.plugin.attributes.parameters.crowdinProjectId as string,
        recordID,
        ctx.plugin.attributes.parameters.crowdinApiKey as string,
        ctx.formValues.internalLocales as Array<string>,
        setSourceLocale
      ).then((response) => {
        if (response) {
          setFileWasSubmited(true);
          setLocaleProgresses(response);
        }
        setIsLoading(false);
      });
  }, []);

  return (
    <Canvas ctx={ctx}>
      <LoadingSpinner isLoading={isLoading} />
      <SendRecordButton
        ctx={ctx}
        setFileWasSubmited={setFileWasSubmited}
        setLocaleProgresses={setLocaleProgresses}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
        fileWasSubmited={fileWasSubmited}
        crowdinIsSetup={crowdinIsSetup}
        setSourceLocale={setSourceLocale}
      />

      <FetchLocaleButton
        localeProgresses={localeProgresses}
        currentLocale={ctx.locale}
        isLoading={isLoading}
        fileWasSubmited={fileWasSubmited}
        crowdinIsSetup={crowdinIsSetup}
        ctx={ctx}
        setIsLoading={setIsLoading}
        sourceLocale={sourceLocale}
      />

      <DeleteFileButton
        localeProgresses={localeProgresses}
        isLoading={isLoading}
        crowdinIsSetup={crowdinIsSetup}
        fileWasSubmited={fileWasSubmited}
        currentLocale={ctx.locale} //i should've just passed the context
        openModal={ctx.openModal}
        notice={ctx.notice}
        setFileWasSubmited={setFileWasSubmited}
        setLocaleProgresses={setLocaleProgresses}
        crowdinApiKey={ctx.plugin.attributes.parameters.crowdinApiKey as string}
        projectID={ctx.plugin.attributes.parameters.crowdinProjectId as string}
        recordID={recordID}
        sourceLocale={sourceLocale[0]}
      />

      {!crowdinIsSetup && (
        <p>
          To use this plugin please setup the Crowdin API Key and project ID on
          the plugin configuration page
        </p>
      )}
      {!isLoading &&
        crowdinIsSetup &&
        fileWasSubmited &&
        !localeProgresses[ctx.locale] &&
        ctx.locale !== sourceLocale[0] && (
          <div className={s.currentLocaleContainer}>
            <p>
              This locale is not listed inside your Crowdin project as a
              translatable locale.
            </p>
            <p>
              You can add <b>"{ctx.locale}"</b> to your Crowdin project if you'd
              like this locale to also be translated.
            </p>
          </div>
        )}
    </Canvas>
  );
}
