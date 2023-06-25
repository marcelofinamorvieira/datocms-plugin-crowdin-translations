import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import s from '../entrypoints/styles.module.css';
import { ProgressObject } from '../utils/types';
import { Button } from 'datocms-react-ui';
import handleFetchLocale from '../utils/handleFetchLocale';
import { RenderItemFormSidebarPanelCtx } from 'datocms-plugin-sdk';

type PropTypes = {
  localeProgresses: ProgressObject;
  currentLocale: string;
  isLoading: boolean;
  crowdinIsSetup: boolean;
  fileWasSubmited: boolean;
  ctx: RenderItemFormSidebarPanelCtx;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  sourceLocale: Array<string>;
};

const FetchLocaleButton = ({
  localeProgresses,
  currentLocale,
  isLoading,
  crowdinIsSetup,
  fileWasSubmited,
  ctx,
  setIsLoading,
  sourceLocale,
}: PropTypes) => {
  return (
    <>
      {!isLoading &&
        crowdinIsSetup &&
        fileWasSubmited &&
        sourceLocale[0] !== currentLocale &&
        localeProgresses[currentLocale] && (
          <div className={s.containerSidebar}>
            <div className={s.progressCircleContainerContainer}>
              <div className={s.progressCircleContainer}>
                <CircularProgressbar
                  styles={buildStyles({
                    pathTransitionDuration: 1,
                    pathColor: `rgba(62, 152, 199)`,
                    textColor: 'rgba(62, 152, 199)',
                    trailColor: '#d6d6d6',
                  })}
                  value={Math.floor(
                    (localeProgresses[currentLocale].translated /
                      localeProgresses[currentLocale].total) *
                      100
                  )}
                  text={`${Math.floor(
                    (localeProgresses[currentLocale].translated /
                      localeProgresses[currentLocale].total) *
                      100
                  )}%`}
                />
                <p
                  style={{
                    color: 'rgba(62, 152, 199)',
                    fontWeight: 'bold',
                    marginTop: '3px',
                  }}
                >
                  Translated
                </p>
              </div>
              <div className={s.progressCircleContainer}>
                <CircularProgressbar
                  styles={buildStyles({
                    pathTransitionDuration: 1,
                    pathColor: `#66CC66`,
                    textColor: '#66CC66',
                    trailColor: '#d6d6d6',
                  })}
                  value={Math.floor(
                    (localeProgresses[currentLocale].approved /
                      localeProgresses[currentLocale].total) *
                      100
                  )}
                  text={`${Math.floor(
                    (localeProgresses[currentLocale].approved /
                      localeProgresses[currentLocale].total) *
                      100
                  )}%`}
                />
                <p
                  style={{
                    color: '#66CC66',
                    fontWeight: 'bold',
                    marginTop: '3px',
                  }}
                >
                  Approved
                </p>
              </div>
            </div>
            <Button
              onClick={() => {
                setIsLoading(true);
                handleFetchLocale(ctx, sourceLocale).then(() => {
                  setIsLoading(false);
                  ctx.notice('Locale translation fetched successfully!');
                });
              }}
            >
              Fetch this locale
            </Button>
          </div>
        )}
    </>
  );
};

export default FetchLocaleButton;
