import type { RenderConfigScreenCtx } from 'datocms-plugin-sdk';
import { Button, Canvas, SwitchField, TextField } from 'datocms-react-ui';
import s from './styles.module.css';
import { useState } from 'react';
import type { FieldPreferences } from '../utils/types';

type Props = {
  ctx: RenderConfigScreenCtx;
};

export default function ConfigScreen({ ctx }: Props) {
  const [crowdinApiKey, setCrowdinAPIKey] = useState(
    (ctx.plugin.attributes.parameters.crowdinApiKey as string) || ''
  );
  const [crowdinProjectId, setcrowdinProjectId] = useState(
    (ctx.plugin.attributes.parameters.crowdinProjectId as string) || ''
  );
  const [crowdinFieldPreferences, setCrowdinFieldPreferences] = useState(
    (ctx.plugin.attributes.parameters
      .crowdinFieldPreferences as FieldPreferences) || {
      locationField: false,
      JSONField: false,
      dateField: false,
      colorField: false,
      numberLinkField: false,
      SEOField: false,
      structuredTextAndBlockField: true,
    }
  );

  return (
    <Canvas ctx={ctx}>
      <div className={s.form}>
        <TextField
          name="crowdinApiKey"
          id="apiKey"
          label="Crowdin API key"
          value={crowdinApiKey}
          onChange={(newValue) => {
            setCrowdinAPIKey(newValue);
          }}
        />
        <TextField
          name="crowdinProjectId"
          id="crowdinProjectId"
          label="Crowdin project ID"
          value={crowdinProjectId}
          onChange={(newValue) => {
            setcrowdinProjectId(newValue);
          }}
        />
        <p>When sending translations from a record to crowdin:</p>
        <SwitchField
          name="sendLocationField"
          id="sendLocationField"
          label="Send location fields"
          value={crowdinFieldPreferences.locationField}
          onChange={(newValue) =>
            setCrowdinFieldPreferences({
              ...crowdinFieldPreferences,
              locationField: newValue,
            })
          }
        />
        <SwitchField
          name="sendColorField"
          id="sendColorField"
          label="Send color fields"
          value={crowdinFieldPreferences.colorField}
          onChange={(newValue) =>
            setCrowdinFieldPreferences({
              ...crowdinFieldPreferences,
              colorField: newValue,
            })
          }
        />
        <SwitchField
          name="sendJSONField"
          id="sendJSONField"
          label="Send JSON fields"
          value={crowdinFieldPreferences.JSONField}
          onChange={(newValue) =>
            setCrowdinFieldPreferences({
              ...crowdinFieldPreferences,
              JSONField: newValue,
            })
          }
        />
        <SwitchField
          name="sendDateField"
          id="sendDateField"
          label="Send date fields"
          value={crowdinFieldPreferences.dateField}
          onChange={(newValue) =>
            setCrowdinFieldPreferences({
              ...crowdinFieldPreferences,
              dateField: newValue,
            })
          }
        />
        <SwitchField
          name="sendNumberField"
          id="sendNumberField"
          label="Send number and boolean fields"
          value={crowdinFieldPreferences.numberLinkField}
          onChange={(newValue) =>
            setCrowdinFieldPreferences({
              ...crowdinFieldPreferences,
              numberLinkField: newValue,
            })
          }
        />
        <SwitchField
          name="sendSEOField"
          id="sendSEOField"
          label="Send SEO fields"
          value={crowdinFieldPreferences.SEOField}
          onChange={(newValue) =>
            setCrowdinFieldPreferences({
              ...crowdinFieldPreferences,
              SEOField: newValue,
            })
          }
        />
        <SwitchField
          name="sendStructuredTextAndBlockField"
          id="sendStructuredTextAndBlockField"
          label="Send Structured Text, block and asset fields"
          hint="Only the translatable parts will be sent and the schema of the data will be kept intact"
          value={crowdinFieldPreferences.structuredTextAndBlockField}
          onChange={(newValue) =>
            setCrowdinFieldPreferences({
              ...crowdinFieldPreferences,
              structuredTextAndBlockField: newValue,
            })
          }
        />
      </div>

      <Button
        fullWidth
        onClick={() => {
          ctx
            .updatePluginParameters({
              crowdinApiKey,
              crowdinProjectId,
              crowdinFieldPreferences,
            })
            .then(() => {
              ctx.notice('Crowding configuration saved successfully!');
            });
        }}
      >
        Save
      </Button>
    </Canvas>
  );
}
